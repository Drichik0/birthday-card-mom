// stars.js — star field for page 1

(function generateStars() {
  const container = document.getElementById('stars');
  const count = 160;

  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = 0.5 + Math.random() * 2.5;
    star.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      top: ${Math.random() * 100}vh;
      left: ${Math.random() * 100}vw;
      --dur: ${1.5 + Math.random() * 3}s;
      animation-delay: ${-Math.random() * 4}s;
    `;
    container.appendChild(star);
  }

  // Shooting stars
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shoot {
      from { opacity: 1; transform: translate(0,0) rotate(-15deg); }
      to   { opacity: 0; transform: translate(200px,70px) rotate(-15deg); }
    }
  `;
  document.head.appendChild(style);

  function shootingStar() {
    const s = document.createElement('div');
    s.style.cssText = `
      position: fixed;
      top: ${5 + Math.random() * 38}vh;
      left: ${Math.random() * 55}vw;
      width: ${55 + Math.random() * 90}px;
      height: 2px;
      background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 100%);
      border-radius: 2px;
      animation: shoot 0.65s ease-out forwards;
      z-index: 2;
      pointer-events: none;
    `;
    container.appendChild(s);
    setTimeout(() => s.remove(), 750);
  }

  setInterval(shootingStar, 2400 + Math.random() * 1800);
})();
