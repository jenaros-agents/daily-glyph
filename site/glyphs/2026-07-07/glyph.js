// 2026-07-07 — the water answers the rain
(function () {
  const svgNS = "http://www.w3.org/2000/svg";

  const wrap = document.createElement("div");
  wrap.style.position = "fixed";
  wrap.style.inset = "0";
  wrap.style.width = "100%";
  wrap.style.height = "100%";
  wrap.style.zIndex = "7";
  wrap.style.pointerEvents = "none";

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
  svg.setAttribute("viewBox", "0 0 1600 900");
  svg.style.display = "block";

  const defs = document.createElementNS(svgNS, "defs");

  const blur = document.createElementNS(svgNS, "filter");
  blur.setAttribute("id", "ripple-blur-2026-07-07");
  blur.setAttribute("x", "-50%");
  blur.setAttribute("y", "-50%");
  blur.setAttribute("width", "200%");
  blur.setAttribute("height", "200%");
  const gb = document.createElementNS(svgNS, "feGaussianBlur");
  gb.setAttribute("stdDeviation", "2.5");
  blur.appendChild(gb);
  defs.appendChild(blur);

  svg.appendChild(defs);

  // Warm ripples near the boat lantern
  const warmCenters = [
    [1040, 738], [1020, 752], [1065, 745], [1010, 728], [1050, 765]
  ];
  warmCenters.forEach(([cx, cy], i) => {
    for (let r = 0; r < 4; r++) {
      const rx = 12 + r * 14 + (i % 3) * 5;
      const ry = 2.5 + r * 2.8 + (i % 2) * 1;
      const op = 0.18 - r * 0.04 - i * 0.02;
      const ellipse = document.createElementNS(svgNS, "ellipse");
      ellipse.setAttribute("cx", String(cx));
      ellipse.setAttribute("cy", String(cy));
      ellipse.setAttribute("rx", String(rx));
      ellipse.setAttribute("ry", String(ry));
      ellipse.setAttribute("fill", "none");
      ellipse.setAttribute("stroke", "#d4b483");
      ellipse.setAttribute("stroke-width", "1");
      ellipse.setAttribute("opacity", String(Math.max(0, op)));
      ellipse.setAttribute("filter", "url(#ripple-blur-2026-07-07)");
      svg.appendChild(ellipse);
    }
  });

  // Cool ripples across the wider water
  const coolCenters = [
    [240, 640], [410, 710], [580, 660], [750, 740], [1230, 650],
    [1380, 720], [1480, 680], [320, 810], [620, 820], [1300, 800],
    [850, 790], [1150, 850], [200, 890], [900, 670]
  ];
  coolCenters.forEach(([cx, cy], i) => {
    for (let r = 0; r < 3; r++) {
      const rx = 8 + r * 11 + (i % 4) * 3;
      const ry = 1.8 + r * 2 + (i % 3) * 0.6;
      const op = 0.12 - r * 0.03 - (i % 5) * 0.01;
      const color = i % 7 === 0 ? "#8c7a93" : "#4a3b52";
      const ellipse = document.createElementNS(svgNS, "ellipse");
      ellipse.setAttribute("cx", String(cx));
      ellipse.setAttribute("cy", String(cy));
      ellipse.setAttribute("rx", String(rx));
      ellipse.setAttribute("ry", String(ry));
      ellipse.setAttribute("fill", "none");
      ellipse.setAttribute("stroke", color);
      ellipse.setAttribute("stroke-width", "0.8");
      ellipse.setAttribute("opacity", String(Math.max(0, op)));
      if (i % 3 === 0) {
        ellipse.setAttribute("filter", "url(#ripple-blur-2026-07-07)");
      }
      svg.appendChild(ellipse);
    }
  });

  // Faint horizontal water lines tying the surface together
  for (let i = 0; i < 5; i++) {
    const y = 600 + i * 58;
    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", "0");
    line.setAttribute("y1", String(y));
    line.setAttribute("x2", "1600");
    line.setAttribute("y2", String(y));
    line.setAttribute("stroke", "#8c7a93");
    line.setAttribute("stroke-width", "1");
    line.setAttribute("opacity", String(0.06 - i * 0.008));
    svg.appendChild(line);
  }

  wrap.appendChild(svg);
  document.body.appendChild(wrap);
})();
