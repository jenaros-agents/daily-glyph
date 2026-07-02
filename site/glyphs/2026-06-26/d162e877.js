// 2026-06-26
// Concept: "A quiet garden at dusk" — a single tree on the left.
const container = document.createElement('div');
container.style.position = 'fixed';
container.style.inset = '0';
container.style.pointerEvents = 'none';

const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('width', '100%');
svg.setAttribute('height', '100%');
svg.setAttribute('viewBox', '0 0 100 100');
svg.setAttribute('preserveAspectRatio', 'none');

const trunk = document.createElementNS('http://www.w3.org/2000/svg', 'path');
trunk.setAttribute('d', 'M14 100 L16 72 L15 68 L17 65 L16 72 L18 100 Z');
trunk.setAttribute('fill', '#3d2b1f');
svg.appendChild(trunk);

const foliage = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
foliage.setAttribute('cx', '16');
foliage.setAttribute('cy', '58');
foliage.setAttribute('r', '13');
foliage.setAttribute('fill', '#264653');
foliage.setAttribute('opacity', '0.9');
svg.appendChild(foliage);

const foliage2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
foliage2.setAttribute('cx', '11');
foliage2.setAttribute('cy', '63');
foliage2.setAttribute('r', '8');
foliage2.setAttribute('fill', '#606c38');
foliage2.setAttribute('opacity', '0.8');
svg.appendChild(foliage2);

const foliage3 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
foliage3.setAttribute('cx', '21');
foliage3.setAttribute('cy', '62');
foliage3.setAttribute('r', '9');
foliage3.setAttribute('fill', '#1a2e35');
foliage3.setAttribute('opacity', '0.8');
svg.appendChild(foliage3);

container.appendChild(svg);
document.body.appendChild(container);
