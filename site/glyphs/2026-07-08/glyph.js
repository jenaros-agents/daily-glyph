// 2026-07-08 — the river breathes mist after the rain
(function () {
  const svgNS = "http://www.w3.org/2000/svg";

  const wrap = document.createElement("div");
  wrap.style.position = "fixed";
  wrap.style.inset = "0";
  wrap.style.width = "100%";
  wrap.style.height = "100%";
  wrap.style.zIndex = "8";
  wrap.style.pointerEvents = "none";

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
  svg.setAttribute("viewBox", "0 0 1600 900");
  svg.style.display = "block";

  const defs = document.createElementNS(svgNS, "defs");

  const mistBlur = document.createElementNS(svgNS, "filter");
  mistBlur.setAttribute("id", "mist-blur-2026-07-08");
  mistBlur.setAttribute("x", "-50%");
  mistBlur.setAttribute("y", "-50%");
  mistBlur.setAttribute("width", "200%");
  mistBlur.setAttribute("height", "200%");
  const mb = document.createElementNS(svgNS, "feGaussianBlur");
  mb.setAttribute("stdDeviation", "14");
  mistBlur.appendChild(mb);
  defs.appendChild(mistBlur);

  const warmMistGrad = document.createElementNS(svgNS, "linearGradient");
  warmMistGrad.setAttribute("id", "warm-mist-2026-07-08");
  warmMistGrad.setAttribute("x1", "0%");
  warmMistGrad.setAttribute("y1", "0%");
  warmMistGrad.setAttribute("x2", "100%");
  warmMistGrad.setAttribute("y2", "0%");
  [
    ["0%", "#d4b483", "0"],
    ["35%", "#d4b483", "0.18"],
    ["65%", "#e8e1d1", "0.12"],
    ["100%", "#d4b483", "0"]
  ].forEach(([off, col, op]) => {
    const stop = document.createElementNS(svgNS, "stop");
    stop.setAttribute("offset", off);
    stop.setAttribute("stop-color", col);
    stop.setAttribute("stop-opacity", op);
    warmMistGrad.appendChild(stop);
  });
  defs.appendChild(warmMistGrad);

  const coolMistGrad = document.createElementNS(svgNS, "linearGradient");
  coolMistGrad.setAttribute("id", "cool-mist-2026-07-08");
  coolMistGrad.setAttribute("x1", "0%");
  coolMistGrad.setAttribute("y1", "0%");
  coolMistGrad.setAttribute("x2", "100%");
  coolMistGrad.setAttribute("y2", "0%");
  [
    ["0%", "#8c7a93", "0"],
    ["25%", "#8c7a93", "0.14"],
    ["55%", "#4a3b52", "0.22"],
    ["85%", "#8c7a93", "0.10"],
    ["100%", "#1a1a2e", "0"]
  ].forEach(([off, col, op]) => {
    const stop = document.createElementNS(svgNS, "stop");
    stop.setAttribute("offset", off);
    stop.setAttribute("stop-color", col);
    stop.setAttribute("stop-opacity", op);
    coolMistGrad.appendChild(stop);
  });
  defs.appendChild(coolMistGrad);

  svg.appendChild(defs);

  // Low drifting mist bands across the water
  const mistBands = [
    { d: "M-100,760 Q240,720 480,775 Q720,730 960,780 Q1240,740 1480,785 Q1620,755 1700,790 L1700,860 Q1500,830 1240,855 Q960,815 720,855 Q420,810 160,850 Q-100,820 -100,860 Z", fill: "url(#cool-mist-2026-07-08)", op: 0.85 },
    { d: "M-80,650 Q200,620 420,665 Q660,625 900,670 Q1160,630 1400,675 Q1580,645 1700,680 L1700,735 Q1500,710 1200,740 Q920,700 640,740 Q320,700 -80,735 Z", fill: "url(#cool-mist-2026-07-08)", op: 0.55 },
    { d: "M-60,820 Q260,790 520,830 Q800,795 1080,835 Q1360,800 1580,840 Q1660,820 1700,845 L1700,900 Q1500,885 1240,900 Q960,875 720,900 Q420,875 160,900 Q-60,880 -60,900 Z", fill: "#4a3b52", op: 0.35 }
  ];

  mistBands.forEach(({ d, fill, op }) => {
    const band = document.createElementNS(svgNS, "path");
    band.setAttribute("d", d);
    band.setAttribute("fill", fill);
    band.setAttribute("opacity", String(op));
    band.setAttribute("filter", "url(#mist-blur-2026-07-08)");
    svg.appendChild(band);
  });

  // Warm mist caught near the boat lantern (lower right)
  const warmMist = document.createElementNS(svgNS, "ellipse");
  warmMist.setAttribute("cx", "1060");
  warmMist.setAttribute("cy", "770");
  warmMist.setAttribute("rx", "220");
  warmMist.setAttribute("ry", "55");
  warmMist.setAttribute("fill", "url(#warm-mist-2026-07-08)");
  warmMist.setAttribute("opacity", "0.65");
  warmMist.setAttribute("filter", "url(#mist-blur-2026-07-08)");
  svg.appendChild(warmMist);

  // Rising vertical mist wisps
  const wisps = [
    { x: 260, y: 780, h: 110, w: 45, op: 0.16, col: "#8c7a93" },
    { x: 560, y: 740, h: 90, w: 38, op: 0.12, col: "#8c7a93" },
    { x: 820, y: 795, h: 130, w: 52, op: 0.14, col: "#4a3b52" },
    { x: 1180, y: 765, h: 100, w: 40, op: 0.13, col: "#8c7a93" },
    { x: 1430, y: 800, h: 120, w: 48, op: 0.15, col: "#4a3b52" },
    { x: 1040, y: 760, h: 85, w: 35, op: 0.18, col: "#d4b483" }
  ];

  wisps.forEach(({ x, y, h, w, op, col }) => {
    const wisp = document.createElementNS(svgNS, "ellipse");
    wisp.setAttribute("cx", String(x));
    wisp.setAttribute("cy", String(y - h / 2));
    wisp.setAttribute("rx", String(w));
    wisp.setAttribute("ry", String(h / 2));
    wisp.setAttribute("fill", col);
    wisp.setAttribute("opacity", String(op));
    wisp.setAttribute("filter", "url(#mist-blur-2026-07-08)");
    svg.appendChild(wisp);
  });

  wrap.appendChild(svg);
  document.body.appendChild(wrap);
})();
