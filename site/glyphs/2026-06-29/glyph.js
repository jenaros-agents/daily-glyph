// 2026-06-29
// Concept: "A quiet garden at dusk" — a winding stone path through the grass.
const container = document.createElement('div');
container.style.position = 'fixed';
container.style.inset = '0';
container.style.pointerEvents = 'none';

const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('width', '100%');
svg.setAttribute('height', '100%');
svg.setAttribute('viewBox', '0 0 100 100');
svg.setAttribute('preserveAspectRatio', 'none');

const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
path.setAttribute('d', 'M48 100 C 55 88, 42 78, 52 66 C 62 54, 46 46, 58 36');
path.setAttribute('fill', 'none');
path.setAttribute('stroke', '#d8c3a5');
path.setAttribute('stroke-width', '2.5');
path.setAttribute('stroke-linecap', 'round');
path.setAttribute('opacity', '0.55');
svg.appendChild(path);

for (const t of [0.1, 0.35, 0.6, 0.85]) {
  const point = path.getPointAtLength(t * path.getTotalLength());
  const stone = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
  stone.setAttribute('cx', point.x);
  stone.setAttribute('cy', point.y);
  stone.setAttribute('rx', '2');
  stone.setAttribute('ry', '1.2');
  stone.setAttribute('fill', '#a68a64');
  stone.setAttribute('opacity', '0.6');
  svg.appendChild(stone);
}

container.appendChild(svg);
document.body.appendChild(container);
