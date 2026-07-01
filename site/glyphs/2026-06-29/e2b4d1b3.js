// 2026-06-29
// Seeds: full moon 0.9881, palette deep red, e digit 8, note G#3 (207.65Hz), Ne shells [2,8], keyword "harvest", crystal triclinic, σ Cygni
const container = document.createElement('div');
container.style.position = 'absolute';
container.style.left = '60vw';
container.style.top = '70vh';
container.style.width = '34vw';
container.style.height = '34vh';
container.style.pointerEvents = 'none';

const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('width', '100%');
svg.setAttribute('height', '100%');
svg.setAttribute('viewBox', '0 0 340 300');
svg.style.opacity = '0.92';

const shells = [2, 8];
const rBase = 18;
for (let i = 0; i < shells.length; i++) {
  const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  ring.setAttribute('cx', 170);
  ring.setAttribute('cy', 150);
  ring.setAttribute('r', rBase + i * 35);
  ring.setAttribute('fill', 'none');
  ring.setAttribute('stroke', '#9d0208');
  ring.setAttribute('stroke-width', '2');
  ring.setAttribute('opacity', '0.55');
  svg.appendChild(ring);

  for (let j = 0; j < shells[i]; j++) {
    const angle = (j / shells[i]) * Math.PI * 2;
    const x = 170 + Math.cos(angle) * (rBase + i * 35);
    const y = 150 + Math.sin(angle) * (rBase + i * 35);
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', x);
    dot.setAttribute('cy', y);
    dot.setAttribute('r', 4 - i);
    dot.setAttribute('fill', i === 0 ? '#e85d04' : '#9d0208');
    svg.appendChild(dot);
  }
}

for (let i = 0; i < 7; i++) {
  const angle = -Math.PI / 2 + (i / 6) * Math.PI;
  const x1 = 170 + Math.cos(angle) * 110;
  const y1 = 150 + Math.sin(angle) * 110;
  const x2 = 170 + Math.cos(angle) * 140;
  const y2 = 150 + Math.sin(angle) * 140;
  const ray = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  ray.setAttribute('x1', x1);
  ray.setAttribute('y1', y1);
  ray.setAttribute('x2', x2);
  ray.setAttribute('y2', y2);
  ray.setAttribute('stroke', '#6a040f');
  ray.setAttribute('stroke-width', '1');
  ray.setAttribute('opacity', '0.5');
  svg.appendChild(ray);
}

container.appendChild(svg);
document.body.appendChild(container);
