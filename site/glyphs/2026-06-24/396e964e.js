// 2026-06-24
// Seeds: moon (waxing gibbous, 0.6421), palette, event_keyword "bridge", note G#2 (103.83Hz), star φ Orionis
const container = document.createElement('div');
container.style.position = 'absolute';
container.style.left = '8vw';
container.style.top = '10vh';
container.style.width = '35vw';
container.style.height = '35vh';
container.style.pointerEvents = 'none';

const phase = 0.6421;
const radius = 70;
const cx = 120;
const cy = 100;
const shadow = Math.sqrt(1 - phase) * radius;

const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('width', '100%');
svg.setAttribute('height', '100%');
svg.setAttribute('viewBox', '0 0 400 250');
svg.style.opacity = '0.92';

const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
const grad = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
grad.setAttribute('id', 'g24-orb');
grad.setAttribute('cx', '30%');
grad.setAttribute('cy', '30%');
grad.innerHTML = '<stop offset="0%" stop-color="#e94560"/><stop offset="60%" stop-color="#0f3460"/><stop offset="100%" stop-color="#1a1a2e"/>';
defs.appendChild(grad);
svg.appendChild(defs);

const moon = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
moon.setAttribute('cx', cx);
moon.setAttribute('cy', cy);
moon.setAttribute('r', radius);
moon.setAttribute('fill', 'url(#g24-orb)');
svg.appendChild(moon);

const shadowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
shadowPath.setAttribute('d', `M ${cx} ${cy - radius} A ${shadow} ${radius} 0 0 1 ${cx} ${cy + radius} A ${radius} ${radius} 0 0 0 ${cx} ${cy - radius}`);
shadowPath.setAttribute('fill', '#1a1a2e');
shadowPath.setAttribute('opacity', '0.85');
svg.appendChild(shadowPath);

const bridge = document.createElementNS('http://www.w3.org/2000/svg', 'line');
bridge.setAttribute('x1', cx + radius);
bridge.setAttribute('y1', cy);
bridge.setAttribute('x2', 380);
bridge.setAttribute('y2', 180);
bridge.setAttribute('stroke', '#e94560');
bridge.setAttribute('stroke-width', '1');
bridge.setAttribute('opacity', '0.6');
svg.appendChild(bridge);

const bridge2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
bridge2.setAttribute('x1', cx + radius);
bridge2.setAttribute('y1', cy);
bridge2.setAttribute('x2', 360);
bridge2.setAttribute('y2', 60);
bridge2.setAttribute('stroke', '#e94560');
bridge2.setAttribute('stroke-width', '0.5');
bridge2.setAttribute('opacity', '0.35');
svg.appendChild(bridge2);

const star = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
star.setAttribute('cx', 360);
star.setAttribute('cy', 60);
star.setAttribute('r', '2');
star.setAttribute('fill', '#e94560');
star.setAttribute('opacity', '0.9');
svg.appendChild(star);

container.appendChild(svg);
document.body.appendChild(container);
