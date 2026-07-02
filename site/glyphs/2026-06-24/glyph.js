// 2026-06-24
// Concept: "A quiet garden at dusk" — the foundation is a dusk sky gradient.
const sky = document.createElement('div');
sky.style.position = 'fixed';
sky.style.inset = '0';
sky.style.background = 'linear-gradient(180deg, #1a1a2e 0%, #264653 55%, #606c38 100%)';
sky.style.pointerEvents = 'none';
document.body.appendChild(sky);
