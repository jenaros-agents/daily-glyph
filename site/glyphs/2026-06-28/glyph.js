// 2026-06-28
// Concept: "A quiet garden at dusk" — fireflies rising from the grass.
const container = document.createElement('div');
container.style.position = 'fixed';
container.style.inset = '0';
container.style.pointerEvents = 'none';

const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('width', '100%');
svg.setAttribute('height', '100%');
svg.setAttribute('viewBox', '0 0 100 100');
svg.setAttribute('preserveAspectRatio', 'none');

const positions = [
  [24, 74], [42, 66], [58, 78], [76, 60], [34, 82], [88, 70], [12, 86], [66, 54]
];
for (const [x, y] of positions) {
  const fly = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  fly.setAttribute('cx', x);
  fly.setAttribute('cy', y);
  fly.setAttribute('r', '0.6');
  fly.setAttribute('fill', '#f4a261');
  fly.setAttribute('opacity', '0.9');
  svg.appendChild(fly);

  const glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  glow.setAttribute('cx', x);
  glow.setAttribute('cy', y);
  glow.setAttribute('r', '2.5');
  glow.setAttribute('fill', '#f4a261');
  glow.setAttribute('opacity', '0.2');
  svg.appendChild(glow);
}

container.appendChild(svg);
document.body.appendChild(container);
