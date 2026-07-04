// 2026-07-04 — low clouds moving in from the left
(function () {
  const svgNS = "http://www.w3.org/2000/svg";

  const wrap = document.createElement("div");
  wrap.style.position = "fixed";
  wrap.style.inset = "0";
  wrap.style.width = "100%";
  wrap.style.height = "100%";
  wrap.style.zIndex = "4";
  wrap.style.pointerEvents = "none";

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
  svg.setAttribute("viewBox", "0 0 1600 900");
  svg.style.display = "block";

  const defs = document.createElementNS(svgNS, "defs");

  const cloudGrad = document.createElementNS(svgNS, "linearGradient");
  cloudGrad.setAttribute("id", "cloud-grad-2026-07-04");
  cloudGrad.setAttribute("x1", "0%");
  cloudGrad.setAttribute("y1", "0%");
  cloudGrad.setAttribute("x2", "100%");
  cloudGrad.setAttribute("y2", "0%");
  [
    ["0%", "#4a3b52", "0"],
    ["25%", "#5e4f66", "0.55"],
    ["55%", "#8c7a93", "0.35"],
    ["85%", "#4a3b52", "0.08"],
    ["100%", "#1a1a2e", "0"]
  ].forEach(([off, col, op]) => {
    const stop = document.createElementNS(svgNS, "stop");
    stop.setAttribute("offset", off);
    stop.setAttribute("stop-color", col);
    stop.setAttribute("stop-opacity", op);
    cloudGrad.appendChild(stop);
  });
  defs.appendChild(cloudGrad);

  const edgeGrad = document.createElementNS(svgNS, "linearGradient");
  edgeGrad.setAttribute("id", "cloud-edge-2026-07-04");
  edgeGrad.setAttribute("x1", "0%");
  edgeGrad.setAttribute("y1", "0%");
  edgeGrad.setAttribute("x2", "100%");
  edgeGrad.setAttribute("y2", "0%");
  [
    ["0%", "#d4b483", "0"],
    ["40%", "#e8e1d1", "0.22"],
    ["70%", "#d4b483", "0.08"],
    ["100%", "#1a1a2e", "0"]
  ].forEach(([off, col, op]) => {
    const stop = document.createElementNS(svgNS, "stop");
    stop.setAttribute("offset", off);
    stop.setAttribute("stop-color", col);
    stop.setAttribute("stop-opacity", op);
    edgeGrad.appendChild(stop);
  });
  defs.appendChild(edgeGrad);

  const blurFilter = document.createElementNS(svgNS, "filter");
  blurFilter.setAttribute("id", "cloud-blur-2026-07-04");
  blurFilter.setAttribute("x", "-50%");
  blurFilter.setAttribute("y", "-50%");
  blurFilter.setAttribute("width", "200%");
  blurFilter.setAttribute("height", "200%");
  const blur = document.createElementNS(svgNS, "feGaussianBlur");
  blur.setAttribute("stdDeviation", "6");
  blurFilter.appendChild(blur);
  defs.appendChild(blurFilter);

  svg.appendChild(defs);

  // Cloud silhouettes — slow, heavy forms drifting in from the left
  const cloudPaths = [
    {
      d: "M-80,180 Q80,110 260,155 Q420,90 620,140 Q820,100 980,165 Q1150,130 1280,190 L1280,290 Q1120,260 980,295 Q800,250 620,290 Q420,245 260,285 Q90,240 -80,270 Z",
      fill: "url(#cloud-grad-2026-07-04)",
      op: 0.75
    },
    {
      d: "M-60,320 Q110,270 300,305 Q480,250 700,300 Q900,260 1080,315 Q1220,285 1320,335 L1320,410 Q1180,385 1080,415 Q880,375 700,410 Q480,370 300,405 Q120,365 -60,400 Z",
      fill: "url(#cloud-grad-2026-07-04)",
      op: 0.55
    },
    {
      d: "M-40,420 Q140,380 320,410 Q520,365 740,410 Q960,370 1160,420 Q1260,395 1340,430 L1340,485 Q1240,465 1160,490 Q960,450 740,485 Q520,445 320,480 Q140,445 -40,475 Z",
      fill: "#4a3b52",
      op: 0.32
    }
  ];

  cloudPaths.forEach(({ d, fill, op }) => {
    const cloud = document.createElementNS(svgNS, "path");
    cloud.setAttribute("d", d);
    cloud.setAttribute("fill", fill);
    cloud.setAttribute("opacity", String(op));
    cloud.setAttribute("filter", "url(#cloud-blur-2026-07-04)");
    svg.appendChild(cloud);
  });

  // Thin lit edge where clouds part near the moon
  const edge = document.createElementNS(svgNS, "path");
  edge.setAttribute("d", "M980,165 Q1080,120 1180,160 Q1220,180 1240,220 L1240,235 Q1180,190 1100,195 Q1020,200 980,230 Z");
  edge.setAttribute("fill", "url(#cloud-edge-2026-07-04)");
  edge.setAttribute("opacity", "0.7");
  edge.setAttribute("filter", "url(#cloud-blur-2026-07-04)");
  svg.appendChild(edge);

  // Faint falling mist lines beneath the lowest cloud
  for (let i = 0; i < 5; i++) {
    const x = 220 + i * 260;
    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", String(x));
    line.setAttribute("y1", "475");
    line.setAttribute("x2", String(x + 30));
    line.setAttribute("y2", "560");
    line.setAttribute("stroke", "#8c7a93");
    line.setAttribute("stroke-width", String(1.2));
    line.setAttribute("opacity", String(0.12 - i * 0.015));
    line.setAttribute("filter", "url(#cloud-blur-2026-07-04)");
    svg.appendChild(line);
  }

  wrap.appendChild(svg);
  document.body.appendChild(wrap);
})();
