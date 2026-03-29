// fireworks.js — canvas-based fireworks for page 1

const canvas = document.getElementById('fireworksCanvas');
const ctx    = canvas.getContext('2d');

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// Particle class
class Particle {
  constructor(x, y, color) {
    this.x  = x;
    this.y  = y;
    this.color = color;
    const angle = Math.random() * Math.PI * 2;
    const speed = 1.5 + Math.random() * 5;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.alpha = 1;
    this.decay  = 0.012 + Math.random() * 0.015;
    this.size   = 2.5 + Math.random() * 2;
    this.gravity = 0.08;
    this.trail  = [];
  }
  update() {
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > 5) this.trail.shift();
    this.vy += this.gravity;
    this.x  += this.vx;
    this.y  += this.vy;
    this.vx *= 0.97;
    this.vy *= 0.97;
    this.alpha -= this.decay;
  }
  draw() {
    // Trail
    this.trail.forEach((pt, i) => {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, this.size * (i / this.trail.length) * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.alpha * (i / this.trail.length) * 0.3})`;
      ctx.fill();
    });
    // Main dot
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
    ctx.fill();
  }
}

// Rocket (pre-explosion)
class Rocket {
  constructor() {
    this.x  = 80 + Math.random() * (canvas.width - 160);
    this.y  = canvas.height;
    this.tx = 60 + Math.random() * (canvas.width - 120);
    this.ty = canvas.height * 0.15 + Math.random() * canvas.height * 0.45;
    const dx = this.tx - this.x;
    const dy = this.ty - this.y;
    const dist = Math.hypot(dx, dy);
    this.vx = (dx / dist) * 12;
    this.vy = (dy / dist) * 12;
    this.alpha = 1;
    this.exploded = false;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (Math.hypot(this.x - this.tx, this.y - this.ty) < 15) this.exploded = true;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    // small trail
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.vx * 3, this.y - this.vy * 3);
    ctx.strokeStyle = 'rgba(255,255,200,0.5)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}

const COLORS = [
  '255,180,255',
  '200,100,255',
  '255,220,100',
  '100,220,255',
  '255,130,180',
  '180,255,140',
  '255,200,100',
  '200,180,255',
];

let particles = [];
let rockets   = [];

function explode(x, y) {
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const count = 90 + Math.floor(Math.random() * 60);
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x, y, color));
  }
}

function launchRocket() {
  rockets.push(new Rocket());
}

// Launch rockets periodically
launchRocket();
setInterval(launchRocket, 1200 + Math.random() * 800);

function animate() {
  requestAnimationFrame(animate);

  // Fade trail instead of full clear
  ctx.fillStyle = 'rgba(0,0,0,0.18)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Rockets
  rockets = rockets.filter(r => {
    r.update();
    if (r.exploded) { explode(r.x, r.y); return false; }
    r.draw();
    return true;
  });

  // Particles
  particles = particles.filter(p => {
    p.update();
    if (p.alpha <= 0) return false;
    p.draw();
    return true;
  });
}

animate();

// Keep launching rockets at a steady pace
setInterval(() => {
  launchRocket();
  if (Math.random() > 0.5) setTimeout(launchRocket, 400);
}, 1800);
