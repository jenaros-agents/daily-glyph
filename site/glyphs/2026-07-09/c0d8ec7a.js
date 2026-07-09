// 2026-07-09 — a quiet landing: fireflies above the water after dusk
(function () {
  const svgNS = "http://www.w3.org/2000/svg";

  const wrap = document.createElement("div");
  wrap.style.position = "fixed";
  wrap.style.inset = "0";
  wrap.style.width = "100%";
  wrap.style.height = "100%";
  wrap.style.zIndex = "9";
  wrap.style.pointerEvents = "none";

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
  svg.setAttribute("viewBox", "0 0 1600 900");
  svg.style.display = "block";

  const defs = document.createElementNS(svgNS, "defs");

  const glowBlur = document.createElementNS(svgNS, "filter");
  glowBlur.setAttribute("id", "firefly-blur-2026-07-09");
  glowBlur.setAttribute("x", "-100%");
  glowBlur.setAttribute("y", "-100%");
  glowBlur.setAttribute("width", "300%");
  glowBlur.setAttribute("height", "300%");
  const gb = document.createElementNS(svgNS, "feGaussianBlur");
  gb.setAttribute("stdDeviation", "3.2");
  glowBlur.appendChild(gb);
  defs.appendChild(glowBlur);

  const warmGrad = document.createElementNS(svgNS, "radialGradient");
  warmGrad.setAttribute("id", "firefly-warm-2026-07-09");
  warmGrad.setAttribute("cx", "50%");
  warmGrad.setAttribute("cy", "50%");
  warmGrad.setAttribute("r", "50%");
  [
    ["0%", "#f3e5ab", "1"],
    ["40%", "#d4b483", "0.5"],
    ["100%", "#d4b483", "0"]
  ].forEach(([off, col, op]) => {
    const stop = document.createElementNS(svgNS, "stop");
    stop.setAttribute("offset", off);
    stop.setAttribute("stop-color", col);
    stop.setAttribute("stop-opacity", op);
    warmGrad.appendChild(stop);
  });
  defs.appendChild(warmGrad);

  const coolGrad = document.createElementNS(svgNS, "radialGradient");
  coolGrad.setAttribute("id", "firefly-cool-2026-07-09");
  coolGrad.setAttribute("cx", "50%");
  coolGrad.setAttribute("cy", "50%");
  coolGrad.setAttribute("r", "50%");
  [
    ["0%", "#c9b8cf", "1"],
    ["40%", "#8c7a93", "0.45"],
    ["100%", "#8c7a93", "0"]
  ].forEach(([off, col, op]) => {
    const stop = document.createElementNS(svgNS, "stop");
    stop.setAttribute("offset", off);
    stop.setAttribute("stop-color", col);
    stop.setAttribute("stop-opacity", op);
    coolGrad.appendChild(stop);
  });
  defs.appendChild(coolGrad);

  svg.appendChild(defs);

  // Firefly positions — deliberate clusters near shore vegetation and over water
  const fireflies = [
    { x: 120, y: 570, r: 3.2, warm: true },
    { x: 160, y: 545, r: 2.4, warm: true },
    { x: 210, y: 565, r: 2.8, warm: false },
    { x: 255, y: 525, r: 2.1, warm: true },
    { x: 310, y: 555, r: 3.0, warm: false },
    { x: 380, y: 590, r: 2.5, warm: true },
    { x: 460, y: 610, r: 2.7, warm: false },
    { x: 540, y: 585, r: 2.2, warm: true },
    { x: 620, y: 615, r: 3.1, warm: true },
    { x: 710, y: 595, r: 2.3, warm: false },
    { x: 820, y: 625, r: 2.6, warm: true },
    { x: 930, y: 605, r: 2.0, warm: false },
    { x: 1050, y: 635, r: 2.9, warm: true },
    { x: 1160, y: 615, r: 2.4, warm: false },
    { x: 1260, y: 645, r: 3.0, warm: true },
    { x: 1350, y: 620, r: 2.5, warm: false },
    { x: 1430, y: 650, r: 2.2, warm: true },
    { x: 1500, y: 625, r: 2.7, warm: true },
    { x: 1560, y: 655, r: 2.3, warm: false },
    { x: 890, y: 530, r: 2.1, warm: true },
    { x: 980, y: 510, r: 2.6, warm: false },
    { x: 1080, y: 540, r: 2.2, warm: true },
    { x: 1180, y: 515, r: 2.4, warm: false },
    { x: 1270, y: 545, r: 2.0, warm: true },
    { x: 1340, y: 520, r: 2.5, warm: false },
    { x: 1420, y: 550, r: 2.1, warm: true }
  ];

  fireflies.forEach(({ x, y, r, warm }, i) => {
    const g = document.createElementNS(svgNS, "g");

    const halo = document.createElementNS(svgNS, "circle");
    halo.setAttribute("cx", String(x));
    halo.setAttribute("cy", String(y));
    halo.setAttribute("r", String(r * 3.5));
    halo.setAttribute("fill", warm ? "url(#firefly-warm-2026-07-09)" : "url(#firefly-cool-2026-07-09)");
    halo.setAttribute("opacity", String(0.22 + (i % 3) * 0.04));
    halo.setAttribute("filter", "url(#firefly-blur-2026-07-09)");
    g.appendChild(halo);

    const core = document.createElementNS(svgNS, "circle");
    core.setAttribute("cx", String(x));
    core.setAttribute("cy", String(y));
    core.setAttribute("r", String(r));
    core.setAttribute("fill", warm ? "#f3e5ab" : "#e8e1d1");
    core.setAttribute("opacity", String(0.72 + (i % 4) * 0.06));
    g.appendChild(core);

    svg.appendChild(g);
  });

  // Faint reflection flecks on the water beneath warm fireflies
  const reflections = [
    { x: 120, y: 680 },
    { x: 255, y: 655 },
    { x: 380, y: 710 },
    { x: 540, y: 690 },
    { x: 620, y: 725 },
    { x: 820, y: 735 },
    { x: 1050, y: 745 },
    { x: 1260, y: 760 },
    { x: 1430, y: 755 },
    { x: 1500, y: 775 },
    { x: 890, y: 660 },
    { x: 1080, y: 670 },
    { x: 1270, y: 680 },
    { x: 1420, y: 690 }
  ];

  reflections.forEach(({ x, y }, i) => {
    const ellipse = document.createElementNS(svgNS, "ellipse");
    ellipse.setAttribute("cx", String(x));
    ellipse.setAttribute("cy", String(y));
    ellipse.setAttribute("rx", String(5 + (i % 3) * 1.5));
    ellipse.setAttribute("ry", String(1.4 + (i % 2) * 0.5));
    ellipse.setAttribute("fill", "#d4b483");
    ellipse.setAttribute("opacity", String(0.10 + (i % 3) * 0.02));
    ellipse.setAttribute("filter", "url(#firefly-blur-2026-07-09)");
    svg.appendChild(ellipse);
  });

  wrap.appendChild(svg);
  document.body.appendChild(wrap);
})();
