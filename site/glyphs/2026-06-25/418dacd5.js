// 2026-06-25
// Seeds: moon (0.7402), palette grey/red, keyword "silence", pi digit 1, note D2 (73.42Hz), γ Cygni
const container = document.createElement('div');
container.style.position = 'absolute';
container.style.left = '55vw';
container.style.top = '8vh';
container.style.width = '38vw';
container.style.height = '38vh';
container.style.pointerEvents = 'none';

const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('width', '100%');
svg.setAttribute('height', '100%');
svg.setAttribute('viewBox', '0 0 400 280');
svg.style.opacity = '0.88';

for (let i = 0; i < 6; i++) {
  const y = 40 + i * 32;
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', 40);
  line.setAttribute('y1', y);
  line.setAttribute('x2', 360);
  line.setAttribute('y2', y);
  line.setAttribute('stroke', '#8d99ae');
  line.setAttribute('stroke-width', 1 - i * 0.12);
  line.setAttribute('opacity', 0.7 - i * 0.08);
  svg.appendChild(line);
}

const orb = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
orb.setAttribute('cx', 200);
orb.setAttribute('cy', 130);
orb.setAttribute('rx', 50);
orb.setAttribute('ry', 50 * 0.74);
orb.setAttribute('fill', '#ef233c');
orb.setAttribute('opacity', '0.15');
orb.setAttribute('filter', 'blur(12px)');
svg.appendChild(orb);

const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
pulse.setAttribute('cx', 200);
pulse.setAttribute('cy', 130);
pulse.setAttribute('r', 6);
pulse.setAttribute('fill', '#ef233c');
pulse.setAttribute('opacity', '0.9');
svg.appendChild(pulse);

const style = document.createElement('style');
style.textContent = `
  @keyframes g25-pulse {
    0%, 100% { transform: scale(1); opacity: 0.9; }
    50% { transform: scale(2); opacity: 0; }
  }
`;
document.head.appendChild(style);
pulse.style.transformOrigin = '200px 130px';
pulse.style.animation = 'g25-pulse 7.342s ease-in-out infinite';

const star = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
star.setAttribute('cx', 340);
star.setAttribute('cy', 50);
star.setAttribute('r', '3');
star.setAttribute('fill', '#edf2f4');
star.setAttribute('opacity', '0.85');
svg.appendChild(star);

container.appendChild(svg);
document.body.appendChild(container);
