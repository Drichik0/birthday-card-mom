// fireworks.js — canvas fireworks for page 1

(function() {
  const canvas = document.getElementById('fireworksCanvas');
  const ctx    = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor(x, y, color) {
      this.x = x; this.y = y;
      this.color = color;
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 5;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.alpha = 1;
      this.decay  = 0.012 + Math.random() * 0.015;
      this.size   = 2 + Math.random() * 2;
      this.gravity = 0.07;
      this.trail  = [];
    }
    update() {
      this.trail.push({ x: this.x, y: this.y });
      if (this.trail.length > 5) this.trail.shift();
      this.vy += this.gravity;
      this.x  += this.vx; this.y += this.vy;
      this.vx *= 0.97;    this.vy *= 0.97;
      this.alpha -= this.decay;
    }
    draw() {
      this.trail.forEach((pt, i) => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, this.size * (i / this.trail.length) * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color},${this.alpha * (i / this.trail.length) * 0.28})`;
        ctx.fill();
      });
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
      ctx.fill();
    }
  }

  class Rocket {
    constructor() {
      this.x  = 80 + Math.random() * (canvas.width - 160);
      this.y  = canvas.height;
      this.tx = 60 + Math.random() * (canvas.width - 120);
      this.ty = canvas.height * 0.12 + Math.random() * canvas.height * 0.48;
      const dx = this.tx - this.x, dy = this.ty - this.y;
      const dist = Math.hypot(dx, dy);
      this.vx = (dx / dist) * 12;
      this.vy = (dy / dist) * 12;
      this.exploded = false;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (Math.hypot(this.x - this.tx, this.y - this.ty) < 16) this.exploded = true;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x - this.vx * 3, this.y - this.vy * 3);
      ctx.strokeStyle = 'rgba(255,255,200,0.5)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  const COLORS = [
    '255,180,255','200,100,255','255,220,100',
    '100,220,255','255,130,180','180,255,140',
    '255,200,100','200,180,255','255,160,80',
  ];

  let particles = [], rockets = [];

  function explode(x, y) {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const count = 80 + Math.floor(Math.random() * 55);
    for (let i = 0; i < count; i++) particles.push(new Particle(x, y, color));
  }

  function launchRocket() { rockets.push(new Rocket()); }

  launchRocket();
  setInterval(() => {
    launchRocket();
    if (Math.random() > 0.45) setTimeout(launchRocket, 380);
  }, 1600);

  function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0,0,0,0.17)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    rockets = rockets.filter(r => {
      r.update();
      if (r.exploded) { explode(r.x, r.y); return false; }
      r.draw(); return true;
    });
    particles = particles.filter(p => {
      p.update();
      if (p.alpha <= 0) return false;
      p.draw(); return true;
    });
  }
  animate();
})();
