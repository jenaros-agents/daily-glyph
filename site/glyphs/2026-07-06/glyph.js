// 2026-07-06 — gentle rain over the remembered city
(function () {
  const svgNS = "http://www.w3.org/2000/svg";

  const wrap = document.createElement("div");
  wrap.style.position = "fixed";
  wrap.style.inset = "0";
  wrap.style.width = "100%";
  wrap.style.height = "100%";
  wrap.style.zIndex = "6";
  wrap.style.pointerEvents = "none";

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
  svg.setAttribute("viewBox", "0 0 1600 900");
  svg.style.display = "block";

  const defs = document.createElementNS(svgNS, "defs");

  const rainBlur = document.createElementNS(svgNS, "filter");
  rainBlur.setAttribute("id", "rain-blur-2026-07-06");
  rainBlur.setAttribute("x", "-50%");
  rainBlur.setAttribute("y", "-50%");
  rainBlur.setAttribute("width", "200%");
  rainBlur.setAttribute("height", "200%");
  const rb = document.createElementNS(svgNS, "feGaussianBlur");
  rb.setAttribute("stdDeviation", "1.2");
  rainBlur.appendChild(rb);
  defs.appendChild(rainBlur);

  const splashBlur = document.createElementNS(svgNS, "filter");
  splashBlur.setAttribute("id", "splash-blur-2026-07-06");
  splashBlur.setAttribute("x", "-50%");
  splashBlur.setAttribute("y", "-50%");
  splashBlur.setAttribute("width", "200%");
  splashBlur.setAttribute("height", "200%");
  const sb = document.createElementNS(svgNS, "feGaussianBlur");
  sb.setAttribute("stdDeviation", "2");
  splashBlur.appendChild(sb);
  defs.appendChild(splashBlur);

  svg.appendChild(defs);

  // Distant rain: thin, cool, quiet
  for (let i = 0; i < 90; i++) {
    const x = ((i * 137.5 + Math.sin(i * 0.55) * 90) % 1750) - 75;
    const y = ((i * 53.3) % 1000) - 80;
    const len = 22 + (i % 6) * 6;
    const width = 0.4 + (i % 3) * 0.25;
    const op = 0.05 + (i % 5) * 0.018;
    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", String(x));
    line.setAttribute("y1", String(y));
    line.setAttribute("x2", String(x + 2 + (i % 3)));
    line.setAttribute("y2", String(y + len));
    line.setAttribute("stroke", "#4a3b52");
    line.setAttribute("stroke-width", String(width));
    line.setAttribute("opacity", String(op));
    if (i % 4 === 0) {
      line.setAttribute("filter", "url(#rain-blur-2026-07-06)");
    }
    svg.appendChild(line);
  }

  // Near rain: slightly warmer, heavier streaks catching the light
  for (let i = 0; i < 55; i++) {
    const x = ((i * 193.7 + Math.cos(i * 0.7) * 110) % 1700) - 50;
    const y = ((i * 71.1) % 1020) - 90;
    const len = 36 + (i % 8) * 7;
    const width = 0.8 + (i % 4) * 0.35;
    const op = 0.09 + (i % 5) * 0.022;
    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", String(x));
    line.setAttribute("y1", String(y));
    line.setAttribute("x2", String(x + 3 + (i % 3)));
    line.setAttribute("y2", String(y + len));
    line.setAttribute("stroke", "#8c7a93");
    line.setAttribute("stroke-width", String(width));
    line.setAttribute("opacity", String(op));
    if (i % 3 === 0) {
      line.setAttribute("filter", "url(#rain-blur-2026-07-06)");
    }
    svg.appendChild(line);
  }

  // Rain splashes on the water and wet surfaces
  for (let i = 0; i < 26; i++) {
    const x = ((i * 257.3 + Math.sin(i * 1.2) * 70) % 1520) + 40;
    const y = 575 + (i % 6) * 32;
    const rx = 3 + (i % 5) * 1.8;
    const ry = 0.8 + (i % 3) * 0.35;
    const op = 0.12 - (i % 5) * 0.018;
    const splash = document.createElementNS(svgNS, "ellipse");
    splash.setAttribute("cx", String(x));
    splash.setAttribute("cy", String(y));
    splash.setAttribute("rx", String(rx));
    splash.setAttribute("ry", String(ry));
    splash.setAttribute("fill", "none");
    splash.setAttribute("stroke", i % 7 === 0 ? "#d4b483" : "#8c7a93");
    splash.setAttribute("stroke-width", "0.7");
    splash.setAttribute("opacity", String(op));
    splash.setAttribute("filter", "url(#splash-blur-2026-07-06)");
    svg.appendChild(splash);
  }

  wrap.appendChild(svg);
  document.body.appendChild(wrap);
})();
