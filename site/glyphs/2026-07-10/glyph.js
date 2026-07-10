// 2026-07-10 — night reeds along the near bank
(function () {
  const svgNS = "http://www.w3.org/2000/svg";

  const wrap = document.createElement("div");
  wrap.style.position = "fixed";
  wrap.style.inset = "0";
  wrap.style.width = "100%";
  wrap.style.height = "100%";
  wrap.style.zIndex = "10";
  wrap.style.pointerEvents = "none";

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
  svg.setAttribute("viewBox", "0 0 1600 900");
  svg.style.display = "block";

  const defs = document.createElementNS(svgNS, "defs");

  const reedBlur = document.createElementNS(svgNS, "filter");
  reedBlur.setAttribute("id", "reed-blur-2026-07-10");
  reedBlur.setAttribute("x", "-50%");
  reedBlur.setAttribute("y", "-50%");
  reedBlur.setAttribute("width", "200%");
  reedBlur.setAttribute("height", "200%");
  const rb = document.createElementNS(svgNS, "feGaussianBlur");
  rb.setAttribute("stdDeviation", "1.6");
  reedBlur.appendChild(rb);
  defs.appendChild(reedBlur);

  const warmGlow = document.createElementNS(svgNS, "radialGradient");
  warmGlow.setAttribute("id", "reed-warm-glow-2026-07-10");
  warmGlow.setAttribute("cx", "50%");
  warmGlow.setAttribute("cy", "50%");
  warmGlow.setAttribute("r", "50%");
  [
    ["0%", "#d4b483", "0.55"],
    ["45%", "#d4b483", "0.15"],
    ["100%", "#d4b483", "0"]
  ].forEach(([off, col, op]) => {
    const stop = document.createElementNS(svgNS, "stop");
    stop.setAttribute("offset", off);
    stop.setAttribute("stop-color", col);
    stop.setAttribute("stop-opacity", op);
    warmGlow.appendChild(stop);
  });
  defs.appendChild(warmGlow);

  svg.appendChild(defs);

  // Dark bank that rises from the lower-left waterline
  const bank = document.createElementNS(svgNS, "path");
  bank.setAttribute("d", "M-20,920 L-20,720 Q60,735 140,780 Q220,820 340,835 Q480,855 620,900 L620,920 Z");
  bank.setAttribute("fill", "#161627");
  bank.setAttribute("opacity", "0.92");
  svg.appendChild(bank);

  // Tall reeds — deliberate vertical rhythms, clustered in groups
  const reeds = [
    { x: 45, y: 920, h: 260, w: 4, lean: 18 },
    { x: 72, y: 920, h: 215, w: 3, lean: -8 },
    { x: 95, y: 920, h: 245, w: 4, lean: 12 },
    { x: 118, y: 920, h: 190, w: 3, lean: -14 },
    { x: 135, y: 920, h: 230, w: 4, lean: 6 },
    { x: 158, y: 920, h: 205, w: 3, lean: -10 },
    { x: 178, y: 920, h: 250, w: 4, lean: 22 },
    { x: 205, y: 920, h: 180, w: 3, lean: -6 },
    { x: 225, y: 920, h: 215, w: 4, lean: 14 },
    { x: 248, y: 920, h: 165, w: 3, lean: -18 },
    { x: 265, y: 920, h: 200, w: 4, lean: 8 },
    { x: 285, y: 920, h: 145, w: 3, lean: -12 },
    { x: 305, y: 920, h: 175, w: 3, lean: 10 },
    { x: 325, y: 920, h: 130, w: 2, lean: -8 },
    { x: 342, y: 920, h: 155, w: 3, lean: 6 }
  ];

  reeds.forEach(({ x, y, h, w, lean }) => {
    const path = document.createElementNS(svgNS, "path");
    const tipX = x + lean;
    const tipY = y - h;
    const bend = lean * 0.4;
    path.setAttribute("d", `M${x},${y} Q${x + bend},${y - h / 2} ${tipX},${tipY}`);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "#1a1a2e");
    path.setAttribute("stroke-width", String(w));
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("opacity", "0.88");
    svg.appendChild(path);

    // Seed head at the tip
    const head = document.createElementNS(svgNS, "ellipse");
    head.setAttribute("cx", String(tipX));
    head.setAttribute("cy", String(tipY));
    head.setAttribute("rx", String(w * 1.2));
    head.setAttribute("ry", String(w * 2.6));
    head.setAttribute("fill", "#1a1a2e");
    head.setAttribute("opacity", "0.78");
    head.setAttribute("transform", `rotate(${lean * 0.8}, ${tipX}, ${tipY})`);
    svg.appendChild(head);
  });

  // A thin willow branch draping from the left edge
  const willowPath = document.createElementNS(svgNS, "path");
  willowPath.setAttribute("d",
    "M-10,480 Q40,500 80,540 Q120,590 150,650 Q170,705 160,760 " +
    "M20,485 Q60,510 95,555 Q130,600 155,655 Q172,700 165,740 " +
    "M-5,520 Q35,545 70,590 Q105,640 125,695 Q140,740 130,780"
  );
  willowPath.setAttribute("fill", "none");
  willowPath.setAttribute("stroke", "#1a1a2e");
  willowPath.setAttribute("stroke-width", "3");
  willowPath.setAttribute("stroke-linecap", "round");
  willowPath.setAttribute("opacity", "0.72");
  svg.appendChild(willowPath);

  // Hanging willow tendrils
  const tendrils = [
    { x: 80, y: 540, h: 80 },
    { x: 105, y: 575, h: 95 },
    { x: 130, y: 615, h: 110 },
    { x: 150, y: 650, h: 130 },
    { x: 165, y: 700, h: 100 },
    { x: 95, y: 555, h: 75 },
    { x: 120, y: 595, h: 90 }
  ];

  tendrils.forEach(({ x, y, h }) => {
    const t = document.createElementNS(svgNS, "path");
    t.setAttribute("d", `M${x},${y} Q${x + 6},${y + h / 2} ${x - 2},${y + h}`);
    t.setAttribute("fill", "none");
    t.setAttribute("stroke", "#1a1a2e");
    t.setAttribute("stroke-width", "1.5");
    t.setAttribute("stroke-linecap", "round");
    t.setAttribute("opacity", "0.55");
    svg.appendChild(t);
  });

  // Warm light caught on a few reeds near the boat lantern's reach
  const litReeds = [
    { x: 315, y: 765, r: 14 },
    { x: 285, y: 745, r: 10 },
    { x: 345, y: 790, r: 12 }
  ];

  litReeds.forEach(({ x, y, r }) => {
    const glow = document.createElementNS(svgNS, "circle");
    glow.setAttribute("cx", String(x));
    glow.setAttribute("cy", String(y));
    glow.setAttribute("r", String(r));
    glow.setAttribute("fill", "url(#reed-warm-glow-2026-07-10)");
    glow.setAttribute("opacity", "0.45");
    glow.setAttribute("filter", "url(#reed-blur-2026-07-10)");
    svg.appendChild(glow);
  });

  wrap.appendChild(svg);
  document.body.appendChild(wrap);
})();
