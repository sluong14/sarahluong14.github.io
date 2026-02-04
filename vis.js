// =========================
// Helpers
// =========================
const NS = "http://www.w3.org/2000/svg";

function createSVG(w, h) {
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  return svg;
}

function svgEl(name, attrs = {}) {
  const node = document.createElementNS(NS, name);
  for (const [k, v] of Object.entries(attrs)) {
    node.setAttribute(k, v);
  }
  return node;
}

function clear(node) {
  if (node) node.innerHTML = "";
}

// =========================
// Viz 1: Brawl Stars Ranking (SVG Bar Chart)
// =========================
const brawlers = [
  { name: "Bo", score: 100 },
  { name: "Brock", score: 92 },
  { name: "Griff", score: 84 },
  { name: "Spike", score: 76 },
  { name: "Lily", score: 70 },
];

function renderBrawlerRanking(container) {
  clear(container);

  const W = 760;
  const rowH = 56;
  const pad = 28;
  const titleH = 40;
  const H = pad + titleH + brawlers.length * rowH + pad;

  const svg = createSVG(W, H);

  // Light background
  svg.appendChild(
    svgEl("rect", {
      x: 0,
      y: 0,
      width: W,
      height: H,
      fill: "#FAFFFB",
    })
  );

  // Title
  const title = svgEl("text", {
    x: pad,
    y: pad + 14,
    "font-size": "16",
    "font-weight": "700",
    fill: "#000000",
  });
  title.textContent = "My Brawl Stars Character Ranking";
  svg.appendChild(title);

  const maxScore = Math.max(...brawlers.map((d) => d.score));
  const labelX = pad + 44;
  const barX = pad + 170;
  const barMaxW = W - barX - pad - 50;

  brawlers.forEach((d, i) => {
    const y = pad + titleH + i * rowH;

    // Rank
    const rank = svgEl("text", {
      x: pad,
      y: y + 22,
      "font-size": "12",
      fill: "#333",
    });
    rank.textContent = `#${i + 1}`;
    svg.appendChild(rank);

    // Name
    const label = svgEl("text", {
      x: labelX,
      y: y + 22,
      "font-size": "12",
      fill: "#333",
    });
    label.textContent = d.name;
    svg.appendChild(label);

    // Bar background
    svg.appendChild(
      svgEl("rect", {
        x: barX,
        y: y + 6,
        width: barMaxW,
        height: 24,
        rx: 10,
        fill: "#E9EFEA",
      })
    );

    // Bar fill
    const w = (d.score / maxScore) * barMaxW;
    svg.appendChild(
      svgEl("rect", {
        x: barX,
        y: y + 6,
        width: w,
        height: 24,
        rx: 10,
        fill: "#1B4332",
        opacity: "0.92",
      })
    );

    // Score
    const score = svgEl("text", {
      x: barX + barMaxW + 10,
      y: y + 22,
      "font-size": "12",
      fill: "#333",
    });
    score.textContent = d.score;
    svg.appendChild(score);
  });

  container.appendChild(svg);
}

// =========================
// Viz 2
// =========================
async function loadSVGInto(containerId, svgFile) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const res = await fetch(svgFile);
  const svgText = await res.text();
  container.innerHTML = svgText;

  // SVG responsive
  const svg = container.querySelector("svg");
  if (svg) {
    svg.style.width = "100%";
    svg.style.height = "auto";
    svg.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const viz1 = document.getElementById("viz1");

  if (viz1) {
    renderBrawlerRanking(viz1);
  }

  loadSVGInto("viz2", "rings.svg");
});
