// 2026-07-01 — dusk horizon, first memory of a city
(function () {
  const svgNS = "http://www.w3.org/2000/svg";

  const wrap = document.createElement("div");
  wrap.style.position = "fixed";
  wrap.style.inset = "0";
  wrap.style.width = "100%";
  wrap.style.height = "100%";
  wrap.style.zIndex = "1";
  wrap.style.pointerEvents = "none";

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
  svg.setAttribute("viewBox", "0 0 1600 900");
  svg.style.display = "block";

  const defs = document.createElementNS(svgNS, "defs");

  const skyGrad = document.createElementNS(svgNS, "linearGradient");
  skyGrad.setAttribute("id", "sky-2026-07-01");
  skyGrad.setAttribute("x1", "0%");
  skyGrad.setAttribute("y1", "0%");
  skyGrad.setAttribute("x2", "0%");
  skyGrad.setAttribute("y2", "100%");
  [
    ["0%", "#1a1a2e"],
    ["45%", "#4a3b52"],
    ["72%", "#8c7a93"],
    ["100%", "#e8e1d1"]
  ].forEach(([off, col]) => {
    const stop = document.createElementNS(svgNS, "stop");
    stop.setAttribute("offset", off);
    stop.setAttribute("stop-color", col);
    skyGrad.appendChild(stop);
  });
  defs.appendChild(skyGrad);

  const waterGrad = document.createElementNS(svgNS, "linearGradient");
  waterGrad.setAttribute("id", "water-2026-07-01");
  waterGrad.setAttribute("x1", "0%");
  waterGrad.setAttribute("y1", "0%");
  waterGrad.setAttribute("x2", "0%");
  waterGrad.setAttribute("y2", "100%");
  [
    ["0%", "#4a3b52"],
    ["60%", "#1a1a2e"],
    ["100%", "#0d0d17"]
  ].forEach(([off, col]) => {
    const stop = document.createElementNS(svgNS, "stop");
    stop.setAttribute("offset", off);
    stop.setAttribute("stop-color", col);
    waterGrad.appendChild(stop);
  });
  defs.appendChild(waterGrad);

  const windowGlow = document.createElementNS(svgNS, "filter");
  windowGlow.setAttribute("id", "glow-2026-07-01");
  windowGlow.setAttribute("x", "-50%");
  windowGlow.setAttribute("y", "-50%");
  windowGlow.setAttribute("width", "200%");
  windowGlow.setAttribute("height", "200%");
  const blur = document.createElementNS(svgNS, "feGaussianBlur");
  blur.setAttribute("stdDeviation", "2.5");
  blur.setAttribute("result", "coloredBlur");
  windowGlow.appendChild(blur);
  const merge = document.createElementNS(svgNS, "feMerge");
  const m1 = document.createElementNS(svgNS, "feMergeNode");
  m1.setAttribute("in", "coloredBlur");
  const m2 = document.createElementNS(svgNS, "feMergeNode");
  m2.setAttribute("in", "SourceGraphic");
  merge.appendChild(m1);
  merge.appendChild(m2);
  windowGlow.appendChild(merge);
  defs.appendChild(windowGlow);

  svg.appendChild(defs);

  // Sky
  const sky = document.createElementNS(svgNS, "rect");
  sky.setAttribute("x", "0");
  sky.setAttribute("y", "0");
  sky.setAttribute("width", "1600");
  sky.setAttribute("height", "560");
  sky.setAttribute("fill", "url(#sky-2026-07-01)");
  svg.appendChild(sky);

  // Distant sun / last light
  const sun = document.createElementNS(svgNS, "ellipse");
  sun.setAttribute("cx", "880");
  sun.setAttribute("cy", "540");
  sun.setAttribute("rx", "180");
  sun.setAttribute("ry", "28");
  sun.setAttribute("fill", "#d4b483");
  sun.setAttribute("opacity", "0.55");
  svg.appendChild(sun);

  // Horizon water
  const water = document.createElementNS(svgNS, "rect");
  water.setAttribute("x", "0");
  water.setAttribute("y", "560");
  water.setAttribute("width", "1600");
  water.setAttribute("height", "340");
  water.setAttribute("fill", "url(#water-2026-07-01)");
  svg.appendChild(water);

  // City silhouette (left cluster)
  const cityPath = document.createElementNS(svgNS, "path");
  cityPath.setAttribute("d",
    "M0,560 L0,360 L55,360 L55,410 L95,410 L95,290 L150,290 L150,430 " +
    "L200,430 L200,250 L265,250 L265,380 L320,380 L320,320 L375,320 " +
    "L375,450 L430,450 L430,390 L490,390 L490,520 L540,520 L540,560 Z"
  );
  cityPath.setAttribute("fill", "#1a1a2e");
  svg.appendChild(cityPath);

  // Second city silhouette (right cluster)
  const cityPath2 = document.createElementNS(svgNS, "path");
  cityPath2.setAttribute("d",
    "M1080,560 L1080,420 L1130,420 L1130,330 L1190,330 L1190,440 " +
    "L1240,440 L1240,280 L1305,280 L1305,410 L1360,410 L1360,350 " +
    "L1415,350 L1415,460 L1470,460 L1470,400 L1530,400 L1530,560 Z"
  );
  cityPath2.setAttribute("fill", "#161627");
  svg.appendChild(cityPath2);

  // Reflection of left city in water
  const reflection = document.createElementNS(svgNS, "path");
  reflection.setAttribute("d",
    "M0,560 L0,760 L55,760 L55,710 L95,710 L95,830 L150,830 L150,690 " +
    "L200,690 L200,870 L265,870 L265,740 L320,740 L320,800 L375,800 " +
    "L375,670 L430,670 L430,730 L490,730 L490,600 L540,600 L540,560 Z"
  );
  reflection.setAttribute("fill", "#d4b483");
  reflection.setAttribute("opacity", "0.08");
  svg.appendChild(reflection);

  // Windows — deliberate warm points
  const windows = [
    [118, 320, 6, 10], [118, 340, 6, 10], [142, 320, 6, 10],
    [230, 290, 5, 8], [230, 305, 5, 8], [230, 325, 5, 8],
    [345, 345, 5, 7], [345, 360, 5, 7],
    [1160, 360, 5, 8], [1160, 375, 5, 8],
    [1270, 320, 6, 9], [1270, 335, 6, 9],
    [1390, 380, 5, 8]
  ];
  windows.forEach(([x, y, w, h]) => {
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", String(x));
    rect.setAttribute("y", String(y));
    rect.setAttribute("width", String(w));
    rect.setAttribute("height", String(h));
    rect.setAttribute("fill", "#d4b483");
    rect.setAttribute("opacity", "0.75");
    rect.setAttribute("filter", "url(#glow-2026-07-01)");
    svg.appendChild(rect);
  });

  // Subtle water lines
  for (let i = 0; i < 7; i++) {
    const y = 590 + i * 42;
    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", "0");
    line.setAttribute("y1", String(y));
    line.setAttribute("x2", "1600");
    line.setAttribute("y2", String(y));
    line.setAttribute("stroke", "#8c7a93");
    line.setAttribute("stroke-width", String(1.2 - i * 0.12));
    line.setAttribute("opacity", String(0.18 - i * 0.018));
    svg.appendChild(line);
  }

  wrap.appendChild(svg);
  document.body.appendChild(wrap);
})();
