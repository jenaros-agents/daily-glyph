// 2026-06-26
// Seeds: moon 0.8273, palette earth tones, e digit 5, note E3 (164.81Hz), Fe shells [2,8,14,2], keyword "current", crystal monoclinic, ε Aquarii
const container = document.createElement('div');
container.style.position = 'absolute';
container.style.left = '5vw';
container.style.top = '42vh';
container.style.width = '35vw';
container.style.height = '38vh';
container.style.pointerEvents = 'none';

const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('width', '100%');
svg.setAttribute('height', '100%');
svg.setAttribute('viewBox', '0 0 360 300');
svg.style.opacity = '0.9';

const shells = [2, 8, 14, 2];
const colors = ['#fefae0', '#dda15e', '#606c38', '#283618'];
let r = 20;
for (let i = 0; i < shells.length; i++) {
  const count = shells[i];
  const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  ring.setAttribute('cx', 180);
  ring.setAttribute('cy', 150);
  ring.setAttribute('r', r + i * 22);
  ring.setAttribute('fill', 'none');
  ring.setAttribute('stroke', colors[i % colors.length]);
  ring.setAttribute('stroke-width', '1.5');
  ring.setAttribute('opacity', '0.5');
  svg.appendChild(ring);

  for (let j = 0; j < count; j++) {
    const angle = (j / count) * Math.PI * 2 + (i * 0.3);
    const x = 180 + Math.cos(angle) * (r + i * 22);
    const y = 150 + Math.sin(angle) * (r + i * 22);
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', x);
    dot.setAttribute('cy', y);
    dot.setAttribute('r', 2.5 - i * 0.4);
    dot.setAttribute('fill', colors[i % colors.length]);
    dot.setAttribute('opacity', '0.85');
    svg.appendChild(dot);
  }
}

const current = document.createElementNS('http://www.w3.org/2000/svg', 'path');
current.setAttribute('d', 'M 30 150 Q 100 120, 180 150 T 330 150');
current.setAttribute('fill', 'none');
current.setAttribute('stroke', '#dda15e');
current.setAttribute('stroke-width', '2');
current.setAttribute('opacity', '0.45');
svg.appendChild(current);

container.appendChild(svg);
document.body.appendChild(container);
