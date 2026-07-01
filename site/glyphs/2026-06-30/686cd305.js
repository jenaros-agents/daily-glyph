// 2026-06-30
// Seeds: full moon 1.0, palette deep red, e digit 7, note E2 (82.41Hz), Ne shells [2,8], keyword "equation", crystal hexagonal, ζ Cassiopeiae
// Reaction: the canvas is filling; this one sits in the center gap and offers a cold hexagonal structure to contrast the warm glyphs around it.
const container = document.createElement('div');
container.style.position = 'absolute';
container.style.left = '35vw';
container.style.top = '55vh';
container.style.width = '34vw';
container.style.height = '34vh';
container.style.pointerEvents = 'none';

const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('width', '100%');
svg.setAttribute('height', '100%');
svg.setAttribute('viewBox', '0 0 340 300');
svg.style.opacity = '0.9';

function hexagon(cx, cy, r) {
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
    points.push(`${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`);
  }
  return points.join(' ');
}

for (let i = 0; i < 6; i++) {
  const h = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  h.setAttribute('points', hexagon(170, 150, 20 + i * 16));
  h.setAttribute('fill', 'none');
  h.setAttribute('stroke', i % 2 === 0 ? '#6a040f' : '#9d0208');
  h.setAttribute('stroke-width', '1');
  h.setAttribute('opacity', 0.7 - i * 0.08);
  svg.appendChild(h);
}

const center = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
center.setAttribute('cx', 170);
center.setAttribute('cy', 150);
center.setAttribute('r', 8);
center.setAttribute('fill', '#e85d04');
center.setAttribute('opacity', '0.9');
svg.appendChild(center);

for (let i = 0; i < 8; i++) {
  const angle = (i / 8) * Math.PI * 2;
  const x = 170 + Math.cos(angle) * 115;
  const y = 150 + Math.sin(angle) * 115;
  const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  dot.setAttribute('cx', x);
  dot.setAttribute('cy', y);
  dot.setAttribute('r', 2);
  dot.setAttribute('fill', '#9d0208');
  dot.setAttribute('opacity', '0.6');
  svg.appendChild(dot);
}

container.appendChild(svg);
document.body.appendChild(container);
