// 2026-06-25
// Concept: "A quiet garden at dusk" — distant rolling hills.
const container = document.createElement('div');
container.style.position = 'fixed';
container.style.inset = '0';
container.style.pointerEvents = 'none';

const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('width', '100%');
svg.setAttribute('height', '100%');
svg.setAttribute('preserveAspectRatio', 'none');
svg.setAttribute('viewBox', '0 0 100 100');

const hills = document.createElementNS('http://www.w3.org/2000/svg', 'path');
hills.setAttribute('d', 'M0 100 L0 62 Q18 48, 35 58 T70 55 T100 62 L100 100 Z');
hills.setAttribute('fill', '#1d2d35');
hills.setAttribute('opacity', '0.85');
svg.appendChild(hills);

const hills2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
hills2.setAttribute('d', 'M0 100 L0 70 Q25 58, 50 68 T100 65 L100 100 Z');
hills2.setAttribute('fill', '#14252c');
hills2.setAttribute('opacity', '0.7');
svg.appendChild(hills2);

container.appendChild(svg);
document.body.appendChild(container);
