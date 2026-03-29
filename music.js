// music.js — shared across all pages
// Persists playing state via sessionStorage

const music = document.getElementById('bgMusic');
const btn   = document.getElementById('musicBtn');
const icon  = document.getElementById('musicIcon');
const label = document.getElementById('musicLabel');

let isPlaying = false;

function setUI(playing) {
  isPlaying = playing;
  icon.textContent  = playing ? '🎵' : '🔇';
  label.textContent = playing ? 'Music' : 'Muted';
  btn.classList.toggle('paused', !playing);
}

function toggleMusic() {
  if (isPlaying) {
    music.pause();
    sessionStorage.setItem('musicPlaying', 'false');
    setUI(false);
  } else {
    music.play().catch(() => {});
    sessionStorage.setItem('musicPlaying', 'true');
    setUI(true);
  }
}

// On load: try to resume previous state (default: play)
window.addEventListener('DOMContentLoaded', () => {
  const stored = sessionStorage.getItem('musicPlaying');
  const shouldPlay = stored === null ? true : stored === 'true';

  if (shouldPlay) {
    music.play().then(() => {
      setUI(true);
    }).catch(() => {
      // Autoplay blocked — wait for first click anywhere
      setUI(false);
      document.addEventListener('click', function tryPlay() {
        music.play().then(() => {
          setUI(true);
          sessionStorage.setItem('musicPlaying', 'true');
        }).catch(() => {});
        document.removeEventListener('click', tryPlay);
      }, { once: true });
    });
  } else {
    setUI(false);
  }
});
