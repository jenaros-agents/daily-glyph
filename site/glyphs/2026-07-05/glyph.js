// 2026-07-05 — a small boat with one lantern, drifting below the bridge
(function () {
  const svgNS = "http://www.w3.org/2000/svg";

  const wrap = document.createElement("div");
  wrap.style.position = "fixed";
  wrap.style.inset = "0";
  wrap.style.width = "100%";
  wrap.style.height = "100%";
  wrap.style.zIndex = "5";
  wrap.style.pointerEvents = "none";

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
  svg.setAttribute("viewBox", "0 0 1600 900");
  svg.style.display = "block";

  const defs = document.createElementNS(svgNS, "defs");

  const lanternGlow = document.createElementNS(svgNS, "radialGradient");
  lanternGlow.setAttribute("id", "lantern-glow-2026-07-05");
  lanternGlow.setAttribute("cx", "50%");
  lanternGlow.setAttribute("cy", "50%");
  lanternGlow.setAttribute("r", "50%");
  [
    ["0%", "#d4b483", "0.95"],
    ["35%", "#d4b483", "0.35"],
    ["100%", "#d4b483", "0"]
  ].forEach(([off, col, op]) => {
    const stop = document.createElementNS(svgNS, "stop");
    stop.setAttribute("offset", off);
    stop.setAttribute("stop-color", col);
    stop.setAttribute("stop-opacity", op);
    lanternGlow.appendChild(stop);
  });
  defs.appendChild(lanternGlow);

  const waterBlur = document.createElementNS(svgNS, "filter");
  waterBlur.setAttribute("id", "water-blur-2026-07-05");
  waterBlur.setAttribute("x", "-50%");
  waterBlur.setAttribute("y", "-50%");
  waterBlur.setAttribute("width", "200%");
  waterBlur.setAttribute("height", "200%");
  const blur = document.createElementNS(svgNS, "feGaussianBlur");
  blur.setAttribute("stdDeviation", "3");
  waterBlur.appendChild(blur);
  defs.appendChild(waterBlur);

  svg.appendChild(defs);

  // Boat hull — simple curved shape, lower right of the bridge
  const hull = document.createElementNS(svgNS, "path");
  hull.setAttribute("d", "M980,705 Q1065,745 1150,705 L1140,722 Q1065,755 990,722 Z");
  hull.setAttribute("fill", "#1a1a2e");
  hull.setAttribute("opacity", "0.92");
  svg.appendChild(hull);

  // Small cabin / stern rise
  const cabin = document.createElementNS(svgNS, "path");
  cabin.setAttribute("d", "M1015,710 L1025,688 L1055,688 L1062,710 Z");
  cabin.setAttribute("fill", "#161627");
  cabin.setAttribute("opacity", "0.88");
  svg.appendChild(cabin);

  // Lantern post
  const post = document.createElementNS(svgNS, "line");
  post.setAttribute("x1", "1040");
  post.setAttribute("y1", "688");
  post.setAttribute("x2", "1040");
  post.setAttribute("y2", "672");
  post.setAttribute("stroke", "#1a1a2e");
  post.setAttribute("stroke-width", "2");
  post.setAttribute("opacity", "0.9");
  svg.appendChild(post);

  // Lantern glow
  const glow = document.createElementNS(svgNS, "circle");
  glow.setAttribute("cx", "1040");
  glow.setAttribute("cy", "668");
  glow.setAttribute("r", "38");
  glow.setAttribute("fill", "url(#lantern-glow-2026-07-05)");
  glow.setAttribute("opacity", "0.6");
  glow.setAttribute("filter", "url(#water-blur-2026-07-05)");
  svg.appendChild(glow);

  // Lantern core
  const core = document.createElementNS(svgNS, "circle");
  core.setAttribute("cx", "1040");
  core.setAttribute("cy", "668");
  core.setAttribute("r", "5");
  core.setAttribute("fill", "#e8e1d1");
  core.setAttribute("opacity", "0.95");
  svg.appendChild(core);

  // Soft reflection on the water
  const reflection = document.createElementNS(svgNS, "ellipse");
  reflection.setAttribute("cx", "1040");
  reflection.setAttribute("cy", "735");
  reflection.setAttribute("rx", "34");
  reflection.setAttribute("ry", "5");
  reflection.setAttribute("fill", "#d4b483");
  reflection.setAttribute("opacity", "0.22");
  reflection.setAttribute("filter", "url(#water-blur-2026-07-05)");
  svg.appendChild(reflection);

  // Faint wake lines behind the boat
  for (let i = 0; i < 4; i++) {
    const y = 718 + i * 9;
    const line = document.createElementNS(svgNS, "path");
    line.setAttribute("d", `M${990 - i * 14},${y} Q${935 - i * 18},${y + 3} ${890 - i * 22},${y - 1}`);
    line.setAttribute("fill", "none");
    line.setAttribute("stroke", "#8c7a93");
    line.setAttribute("stroke-width", String(1.4 - i * 0.25));
    line.setAttribute("opacity", String(0.18 - i * 0.035));
    svg.appendChild(line);
  }

  wrap.appendChild(svg);
  document.body.appendChild(wrap);
})();
