// 2026-06-27
// Seeds: moon 0.8998, palette purples, e digit 2, note A#3 (233.08Hz), Fe shells [2,8,14,2], keyword "mirror", crystal orthorhombic, ξ Orionis
const container = document.createElement('div');
container.style.position = 'absolute';
container.style.left = '58vw';
container.style.top = '40vh';
container.style.width = '35vw';
container.style.height = '38vh';
container.style.pointerEvents = 'none';

const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('width', '100%');
svg.setAttribute('height', '100%');
svg.setAttribute('viewBox', '0 0 360 300');
svg.style.opacity = '0.92';

const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
const grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
grad.setAttribute('id', 'g27-mirror');
grad.setAttribute('x1', '0%');
grad.setAttribute('y1', '0%');
grad.setAttribute('x2', '100%');
grad.setAttribute('y2', '100%');
grad.innerHTML = '<stop offset="0%" stop-color="#7b2cbf" stop-opacity="0.8"/><stop offset="100%" stop-color="#10002b" stop-opacity="0"/>';
defs.appendChild(grad);
svg.appendChild(defs);

for (let i = 0; i < 5; i++) {
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('x', 60 + i * 24);
  rect.setAttribute('y', 60 + i * 24);
  rect.setAttribute('width', 240 - i * 48);
  rect.setAttribute('height', 180 - i * 36);
  rect.setAttribute('fill', 'none');
  rect.setAttribute('stroke', '#3c096c');
  rect.setAttribute('stroke-width', '1');
  rect.setAttribute('opacity', 0.6 - i * 0.08);
  rect.setAttribute('transform', `rotate(${i * 4}, 180, 150)`);
  svg.appendChild(rect);
}

const mirror = document.createElementNS('http://www.w3.org/2000/svg', 'line');
mirror.setAttribute('x1', 180);
mirror.setAttribute('y1', 40);
mirror.setAttribute('x2', 180);
mirror.setAttribute('y2', 260);
mirror.setAttribute('stroke', 'url(#g27-mirror)');
mirror.setAttribute('stroke-width', '3');
svg.appendChild(mirror);

const star = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
star.setAttribute('points', '180,50 185,65 200,65 188,75 193,90 180,80 167,90 172,75 160,65 175,65');
star.setAttribute('fill', '#7b2cbf');
star.setAttribute('opacity', '0.85');
svg.appendChild(star);

container.appendChild(svg);
document.body.appendChild(container);
