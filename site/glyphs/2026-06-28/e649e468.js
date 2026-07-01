// 2026-06-28
// Seeds: full moon 0.9542, palette teal/gold, phi digit 8, note D#3 (155.56Hz), C shells [2,4], keyword "ember", crystal orthorhombic, ω Aquarii
const container = document.createElement('div');
container.style.position = 'absolute';
container.style.left = '10vw';
container.style.top = '72vh';
container.style.width = '35vw';
container.style.height = '35vh';
container.style.pointerEvents = 'none';

const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('width', '100%');
svg.setAttribute('height', '100%');
svg.setAttribute('viewBox', '0 0 360 300');
svg.style.opacity = '0.9';

const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
const grad = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
grad.setAttribute('id', 'g28-ember');
grad.innerHTML = '<stop offset="0%" stop-color="#f4a261" stop-opacity="0.9"/><stop offset="40%" stop-color="#e9c46a" stop-opacity="0.5"/><stop offset="100%" stop-color="#264653" stop-opacity="0"/>';
defs.appendChild(grad);
svg.appendChild(defs);

const moon = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
moon.setAttribute('cx', 180);
moon.setAttribute('cy', 140);
moon.setAttribute('r', 70);
moon.setAttribute('fill', 'url(#g28-ember)');
svg.appendChild(moon);

for (let i = 0; i < 12; i++) {
  const angle = (i / 12) * Math.PI * 2;
  const x = 180 + Math.cos(angle) * 90;
  const y = 140 + Math.sin(angle) * 90;
  const spark = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  spark.setAttribute('cx', x);
  spark.setAttribute('cy', y);
  spark.setAttribute('r', 3);
  spark.setAttribute('fill', '#f4a261');
  spark.setAttribute('opacity', 0.6 - (i % 3) * 0.15);
  svg.appendChild(spark);
}

const core = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
core.setAttribute('cx', 180);
core.setAttribute('cy', 140);
core.setAttribute('r', 12);
core.setAttribute('fill', '#f4a261');
core.setAttribute('opacity', '0.95');
svg.appendChild(core);

container.appendChild(svg);
document.body.appendChild(container);
