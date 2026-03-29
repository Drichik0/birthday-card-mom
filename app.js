// app.js — SPA navigation, music, gallery, no-button

/* ===================================
   MUSIC — one audio element, never destroyed
   =================================== */
const music   = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const musicIcon = document.getElementById('musicIcon');
const musicLabel = document.getElementById('musicLabel');
let musicPlaying = false;

function setMusicUI(playing) {
  musicPlaying = playing;
  musicIcon.innerHTML = playing ? '&#9835;' : '&#9834;';
  musicLabel.textContent = playing ? 'Music' : 'Muted';
  musicBtn.classList.toggle('muted', !playing);
}

function toggleMusic() {
  if (musicPlaying) {
    music.pause();
    setMusicUI(false);
  } else {
    music.play().catch(() => {});
    setMusicUI(true);
  }
}

// Try autoplay on load; if blocked, start on first user gesture
function startMusic() {
  music.play().then(() => {
    setMusicUI(true);
  }).catch(() => {
    setMusicUI(false);
    // Wait for any user interaction on the page
    const startOnInteract = () => {
      music.play().then(() => {
        setMusicUI(true);
      }).catch(() => {});
      document.removeEventListener('click', startOnInteract);
      document.removeEventListener('touchstart', startOnInteract);
      document.removeEventListener('keydown', startOnInteract);
    };
    document.addEventListener('click', startOnInteract, { once: true });
    document.addEventListener('touchstart', startOnInteract, { once: true });
    document.addEventListener('keydown', startOnInteract, { once: true });
  });
}
window.addEventListener('DOMContentLoaded', startMusic);

/* ===================================
   PAGE NAVIGATION
   =================================== */
let currentPage = 1;
const backBtn = document.getElementById('backBtn');

function goToPage(num) {
  const prev = document.getElementById('page' + currentPage);
  const next = document.getElementById('page'  + num);
  if (!next || num === currentPage) return;

  prev.classList.remove('active');
  next.classList.add('active');
  next.scrollTop = 0; // Reset scroll position of incoming section
  currentPage = num;

  // Show/hide back button
  backBtn.style.display = num > 1 ? 'block' : 'none';

  // Reset no-btn position when re-entering page 2
  if (num === 2) resetNoBtn();

  // Trigger petals on page 3
  if (num === 3 && !petalsDone) buildPetals();
}

function goBack() {
  if (currentPage > 1) goToPage(currentPage - 1);
}

/* ===================================
   NO BUTTON — constrained to viewport
   =================================== */
const noBtn = document.getElementById('noBtn');
let noBtnFixed = false;

function resetNoBtn() {
  noBtn.style.position = '';
  noBtn.style.left = '';
  noBtn.style.top = '';
  noBtn.style.transform = '';
  noBtnFixed = false;
}

function runAwayBtn(e) {
  // Switch to fixed positioning on first move
  if (!noBtnFixed) {
    const rect = noBtn.getBoundingClientRect();
    noBtn.style.position = 'fixed';
    noBtn.style.left = rect.left + 'px';
    noBtn.style.top  = rect.top  + 'px';
    noBtnFixed = true;
  }

  const bW = noBtn.offsetWidth;
  const bH = noBtn.offsetHeight;
  const vW = window.innerWidth;
  const vH = window.innerHeight;
  const margin = 12; // keep it inside viewport edges

  const curX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : vW / 2);
  const curY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : vH / 2);

  // Try up to 8 candidate positions, pick the farthest from cursor
  let bestX = 0, bestY = 0, bestDist = -1;
  for (let i = 0; i < 8; i++) {
    const x = margin + Math.random() * (vW - bW - margin * 2);
    const y = margin + Math.random() * (vH - bH - margin * 2);
    const dist = Math.hypot(x + bW / 2 - curX, y + bH / 2 - curY);
    if (dist > bestDist) { bestDist = dist; bestX = x; bestY = y; }
  }

  // Clamp strictly to viewport
  bestX = Math.max(margin, Math.min(bestX, vW - bW - margin));
  bestY = Math.max(margin, Math.min(bestY, vH - bH - margin));

  noBtn.style.left = bestX + 'px';
  noBtn.style.top  = bestY + 'px';
  noBtn.style.transform = 'none';
}

function runAwayBtnTouch(e) {
  e.preventDefault(); // prevent scroll on touch
  runAwayBtn(e);
}

/* ===================================
   GALLERY
   =================================== */
const images = [
  'images/photo1.jpg',
  'images/photo2.jpg',
  'images/photo3.jpg',
  'images/photo4.jpg',
  'images/photo5.jpg',
  'images/photo6.jpg',
  'images/photo7.jpg',
  'images/photo8.jpg',
  'images/photo9.jpg',
  'images/photo10.jpg',
];

const captions = [
  'Always our sunshine',
  'The heart of our home',
  'Your smile, our joy',
  'Family is everything',
  'Moments like these',
  'Our guiding star',
  'So much love',
  'Cherished memories',
  'Thank you, Mi',
  'We love you forever',
];

let galleryOpen = false;

function openGallery() {
  if (galleryOpen) return;
  galleryOpen = true;

  document.getElementById('galleryIntro').style.display = 'none';
  const grid = document.getElementById('galleryGrid');
  grid.innerHTML = '';
  grid.style.display = 'grid';

  images.forEach((src, i) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.style.animationDelay = (i * 0.07) + 's';

    const img = document.createElement('img');
    img.src = src;
    img.alt = captions[i];
    img.loading = 'lazy';
    img.onerror = function() {
      item.innerHTML = `
        <div class="img-placeholder">
          <span class="ph-icon">[Photo ${i + 1}]</span>
          <small>Add photo to images/</small>
        </div>
        <div class="gallery-caption">${captions[i]}</div>`;
      item.onclick = null; // no lightbox for placeholders
    };

    const cap = document.createElement('div');
    cap.className = 'gallery-caption';
    cap.textContent = captions[i];

    item.appendChild(img);
    item.appendChild(cap);
    item.addEventListener('click', () => openLightbox(src, captions[i]));
    grid.appendChild(item);
  });
}

function openLightbox(src, caption) {
  const lb  = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  img.src = src;
  img.alt = caption;
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

// Close lightbox on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'Backspace' && currentPage > 1) goBack();
});

/* ===================================
   PAGE 3 PETALS — built once
   =================================== */
let petalsDone = false;
const PETAL_CHARS = ['🌸','🌺','💮','🌼','✿'];

function buildPetals() {
  petalsDone = true;
  const container = document.getElementById('petalsBg');
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.style.left = (Math.random() * 100) + 'vw';
    p.style.fontSize = (12 + Math.random() * 14) + 'px';
    p.style.color = `hsl(${280 + Math.random() * 60},70%,70%)`;
    p.style.animationDuration = (6 + Math.random() * 9) + 's';
    p.style.animationDelay = (-Math.random() * 12) + 's';
    p.style.opacity = 0.25 + Math.random() * 0.5;
    p.textContent = PETAL_CHARS[Math.floor(Math.random() * PETAL_CHARS.length)];
    container.appendChild(p);
  }
}
