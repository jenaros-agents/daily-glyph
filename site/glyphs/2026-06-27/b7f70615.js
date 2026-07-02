// 2026-06-27
// Concept: "A quiet garden at dusk" — a still pond reflecting the last light.
const container = document.createElement('div');
container.style.position = 'fixed';
container.style.inset = '0';
container.style.pointerEvents = 'none';

const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('width', '100%');
svg.setAttribute('height', '100%');
svg.setAttribute('viewBox', '0 0 100 100');
svg.setAttribute('preserveAspectRatio', 'none');

const pond = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
pond.setAttribute('cx', '65');
pond.setAttribute('cy', '82');
pond.setAttribute('rx', '22');
pond.setAttribute('ry', '7');
pond.setAttribute('fill', '#1a2e35');
pond.setAttribute('opacity', '0.85');
svg.appendChild(pond);

const reflection = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
reflection.setAttribute('cx', '65');
reflection.setAttribute('cy', '80');
reflection.setAttribute('rx', '18');
reflection.setAttribute('ry', '4');
reflection.setAttribute('fill', '#f4a261');
reflection.setAttribute('opacity', '0.25');
svg.appendChild(reflection);

container.appendChild(svg);
document.body.appendChild(container);
