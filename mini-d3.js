import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

let svg;
const width = 800;
const height = 600;
const maxCircles = 10;

async function prepareVis() {
  svg = d3
    .select("#d3-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  svg.on("click", handleCanvasClick);
}

function handleCanvasClick(event) {
  const [x, y] = d3.pointer(event);
  const circles = svg.selectAll("circle");

  if (circles.size() >= maxCircles) {
    circles
      .filter((d, i) => i === 0)
      .transition()
      .duration(300)
      .attr("r", 0)
      .style("opacity", 0)
      .remove();
  }

  svg
    .append("circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", 0)
    .attr("fill", randomColor())
    .style("opacity", 0.8)
    .transition()
    .duration(400)
    .attr("r", Math.random() * 20 + 10)
    .style("opacity", 1);
}

function randomColor() {
  const colors = [
    "#ff0883",
    "#f900af",
    "#ff63d0",
    "#f8a7eb",
    "#ff005d",
    "#ff62bb"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

async function runApp() {
  await prepareVis();
}

runApp();