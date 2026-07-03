// 2026-07-03 — bridge of light across the water
(function () {
  const svgNS = "http://www.w3.org/2000/svg";

  const wrap = document.createElement("div");
  wrap.style.position = "fixed";
  wrap.style.inset = "0";
  wrap.style.width = "100%";
  wrap.style.height = "100%";
  wrap.style.zIndex = "3";
  wrap.style.pointerEvents = "none";

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
  svg.setAttribute("viewBox", "0 0 1600 900");
  svg.style.display = "block";

  const defs = document.createElementNS(svgNS, "defs");

  const lampGlow = document.createElementNS(svgNS, "radialGradient");
  lampGlow.setAttribute("id", "lamp-glow-2026-07-03");
  lampGlow.setAttribute("cx", "50%");
  lampGlow.setAttribute("cy", "50%");
  lampGlow.setAttribute("r", "50%");
  [
    ["0%", "#d4b483", "0.9"],
    ["40%", "#d4b483", "0.35"],
    ["100%", "#d4b483", "0"]
  ].forEach(([off, col, op]) => {
    const stop = document.createElementNS(svgNS, "stop");
    stop.setAttribute("offset", off);
    stop.setAttribute("stop-color", col);
    stop.setAttribute("stop-opacity", op);
    lampGlow.appendChild(stop);
  });
  defs.appendChild(lampGlow);

  const softBlur = document.createElementNS(svgNS, "filter");
  softBlur.setAttribute("id", "blur-2026-07-03");
  softBlur.setAttribute("x", "-50%");
  softBlur.setAttribute("y", "-50%");
  softBlur.setAttribute("width", "200%");
  softBlur.setAttribute("height", "200%");
  const blur = document.createElementNS(svgNS, "feGaussianBlur");
  blur.setAttribute("stdDeviation", "4");
  softBlur.appendChild(blur);
  defs.appendChild(softBlur);

  svg.appendChild(defs);

  // Bridge cables — thin arcs
  const cablePaths = [
    "M430,620 Q800,520 1170,620",
    "M430,620 Q800,540 1170,620",
    "M430,620 Q800,560 1170,620"
  ];
  cablePaths.forEach((d, i) => {
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", d);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "#4a3b52");
    path.setAttribute("stroke-width", String(1.5 - i * 0.3));
    path.setAttribute("opacity", String(0.5 - i * 0.1));
    svg.appendChild(path);
  });

  // Bridge deck
  const deck = document.createElementNS(svgNS, "path");
  deck.setAttribute("d", "M420,620 Q800,585 1180,620 L1180,635 Q800,600 420,635 Z");
  deck.setAttribute("fill", "#1a1a2e");
  deck.setAttribute("opacity", "0.92");
  svg.appendChild(deck);

  // Bridge towers
  const towers = [
    { x: 520, h: 115 },
    { x: 1080, h: 115 }
  ];
  towers.forEach(({ x, h }) => {
    const tower = document.createElementNS(svgNS, "rect");
    tower.setAttribute("x", String(x - 6));
    tower.setAttribute("y", String(620 - h));
    tower.setAttribute("width", "12");
    tower.setAttribute("height", String(h));
    tower.setAttribute("fill", "#1a1a2e");
    tower.setAttribute("opacity", "0.9");
    svg.appendChild(tower);
  });

  // Lamps along the bridge
  const lampCount = 9;
  for (let i = 0; i < lampCount; i++) {
    const t = i / (lampCount - 1);
    const x = 440 + t * 720;
    const archY = 620 - Math.sin(t * Math.PI) * 35;
    const y = archY - 18;

    const post = document.createElementNS(svgNS, "line");
    post.setAttribute("x1", String(x));
    post.setAttribute("y1", String(archY));
    post.setAttribute("x2", String(x));
    post.setAttribute("y2", String(y));
    post.setAttribute("stroke", "#1a1a2e");
    post.setAttribute("stroke-width", "1.5");
    post.setAttribute("opacity", "0.85");
    svg.appendChild(post);

    const glow = document.createElementNS(svgNS, "circle");
    glow.setAttribute("cx", String(x));
    glow.setAttribute("cy", String(y));
    glow.setAttribute("r", "22");
    glow.setAttribute("fill", "url(#lamp-glow-2026-07-03)");
    glow.setAttribute("opacity", "0.55");
    glow.setAttribute("filter", "url(#blur-2026-07-03)");
    svg.appendChild(glow);

    const lamp = document.createElementNS(svgNS, "circle");
    lamp.setAttribute("cx", String(x));
    lamp.setAttribute("cy", String(y));
    lamp.setAttribute("r", "4");
    lamp.setAttribute("fill", "#e8e1d1");
    lamp.setAttribute("opacity", "0.95");
    svg.appendChild(lamp);
  }

  // Reflection of bridge lamps on water
  for (let i = 0; i < lampCount; i++) {
    const t = i / (lampCount - 1);
    const x = 440 + t * 720;
    const y = 640 + Math.sin(t * Math.PI) * 18;

    const reflection = document.createElementNS(svgNS, "ellipse");
    reflection.setAttribute("cx", String(x));
    reflection.setAttribute("cy", String(y));
    reflection.setAttribute("rx", "14");
    reflection.setAttribute("ry", "3.5");
    reflection.setAttribute("fill", "#d4b483");
    reflection.setAttribute("opacity", String(0.22 - Math.abs(t - 0.5) * 0.18));
    reflection.setAttribute("filter", "url(#blur-2026-07-03)");
    svg.appendChild(reflection);
  }

  wrap.appendChild(svg);
  document.body.appendChild(wrap);
})();
