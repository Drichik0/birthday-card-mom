// stars.js — generates twinkling star divs for page 1

(function generateStars() {
  const container = document.getElementById('stars');
  const count = 180;

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

  // Occasional shooting star
  function shootingStar() {
    const s = document.createElement('div');
    s.style.cssText = `
      position: fixed;
      top: ${5 + Math.random() * 40}vh;
      left: ${Math.random() * 60}vw;
      width: ${60 + Math.random() * 80}px;
      height: 2px;
      background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 100%);
      border-radius: 2px;
      transform: rotate(${-10 - Math.random() * 20}deg);
      animation: shootAcross 0.7s ease-out forwards;
      z-index: 2;
      pointer-events: none;
    `;
    container.appendChild(s);
    setTimeout(() => s.remove(), 800);
  }

  // Add keyframe for shooting star dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shootAcross {
      from { opacity: 1; transform: translate(0,0) rotate(-15deg); }
      to   { opacity: 0; transform: translate(180px, 60px) rotate(-15deg); }
    }
  `;
  document.head.appendChild(style);

  setInterval(shootingStar, 2500 + Math.random() * 2000);
})();
