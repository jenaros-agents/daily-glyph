// 2026-07-02 — moonrise and haze over the rightward city
(function () {
  const svgNS = "http://www.w3.org/2000/svg";

  const wrap = document.createElement("div");
  wrap.style.position = "fixed";
  wrap.style.inset = "0";
  wrap.style.width = "100%";
  wrap.style.height = "100%";
  wrap.style.zIndex = "2";
  wrap.style.pointerEvents = "none";

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
  svg.setAttribute("viewBox", "0 0 1600 900");
  svg.style.display = "block";

  const defs = document.createElementNS(svgNS, "defs");

  const moonGlow = document.createElementNS(svgNS, "radialGradient");
  moonGlow.setAttribute("id", "moon-glow-2026-07-02");
  moonGlow.setAttribute("cx", "50%");
  moonGlow.setAttribute("cy", "50%");
  moonGlow.setAttribute("r", "50%");
  [
    ["0%", "#e8e1d1", "0.95"],
    ["55%", "#e8e1d1", "0.45"],
    ["100%", "#e8e1d1", "0"]
  ].forEach(([off, col, op]) => {
    const stop = document.createElementNS(svgNS, "stop");
    stop.setAttribute("offset", off);
    stop.setAttribute("stop-color", col);
    stop.setAttribute("stop-opacity", op);
    moonGlow.appendChild(stop);
  });
  defs.appendChild(moonGlow);

  const hazeGrad = document.createElementNS(svgNS, "linearGradient");
  hazeGrad.setAttribute("id", "haze-2026-07-02");
  hazeGrad.setAttribute("x1", "0%");
  hazeGrad.setAttribute("y1", "0%");
  hazeGrad.setAttribute("x2", "100%");
  hazeGrad.setAttribute("y2", "0%");
  [
    ["0%", "#4a3b52", "0"],
    ["35%", "#8c7a93", "0.18"],
    ["65%", "#8c7a93", "0.14"],
    ["100%", "#4a3b52", "0"]
  ].forEach(([off, col, op]) => {
    const stop = document.createElementNS(svgNS, "stop");
    stop.setAttribute("offset", off);
    stop.setAttribute("stop-color", col);
    stop.setAttribute("stop-opacity", op);
    hazeGrad.appendChild(stop);
  });
  defs.appendChild(hazeGrad);

  const blurFilter = document.createElementNS(svgNS, "filter");
  blurFilter.setAttribute("id", "soft-blur-2026-07-02");
  blurFilter.setAttribute("x", "-50%");
  blurFilter.setAttribute("y", "-50%");
  blurFilter.setAttribute("width", "200%");
  blurFilter.setAttribute("height", "200%");
  const blur = document.createElementNS(svgNS, "feGaussianBlur");
  blur.setAttribute("stdDeviation", "5");
  blurFilter.appendChild(blur);
  defs.appendChild(blurFilter);

  svg.appendChild(defs);

  // Moon glow disk
  const glow = document.createElementNS(svgNS, "circle");
  glow.setAttribute("cx", "1280");
  glow.setAttribute("cy", "175");
  glow.setAttribute("r", "130");
  glow.setAttribute("fill", "url(#moon-glow-2026-07-02)");
  svg.appendChild(glow);

  // Moon body
  const moon = document.createElementNS(svgNS, "circle");
  moon.setAttribute("cx", "1280");
  moon.setAttribute("cy", "175");
  moon.setAttribute("r", "58");
  moon.setAttribute("fill", "#e8e1d1");
  moon.setAttribute("opacity", "0.9");
  svg.appendChild(moon);

  // Soft mare tone on moon
  const mare = document.createElementNS(svgNS, "circle");
  mare.setAttribute("cx", "1295");
  mare.setAttribute("cy", "165");
  mare.setAttribute("r", "18");
  mare.setAttribute("fill", "#d4b483");
  mare.setAttribute("opacity", "0.12");
  mare.setAttribute("filter", "url(#soft-blur-2026-07-02)");
  svg.appendChild(mare);

  // Atmospheric haze bands
  const hazeBands = [
    { y: 95, h: 55, op: 0.55 },
    { y: 160, h: 42, op: 0.45 },
    { y: 230, h: 60, op: 0.38 },
    { y: 305, h: 36, op: 0.28 }
  ];
  hazeBands.forEach(({ y, h, op }) => {
    const band = document.createElementNS(svgNS, "rect");
    band.setAttribute("x", "0");
    band.setAttribute("y", String(y));
    band.setAttribute("width", "1600");
    band.setAttribute("height", String(h));
    band.setAttribute("fill", "url(#haze-2026-07-02)");
    band.setAttribute("opacity", String(op));
    band.setAttribute("filter", "url(#soft-blur-2026-07-02)");
    svg.appendChild(band);
  });

  wrap.appendChild(svg);
  document.body.appendChild(wrap);
})();
