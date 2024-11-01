
window.onload = function() {
drawLegend() {
    let pIndex = 0;
    let legend = document.querySelector("div[for='myCanvas']");
    let ul = document.createElement("ul");
    legend.append(ul);
    for (let ctg of Object.keys(this.options.data)) {
      let li = document.createElement("li");
      li.style.listStyle = "none";
      li.style.borderLeft =
        "20px solid " + this.colors[pIndex % this.colors.length];
      li.style.padding = "5px";
      li.textContent = ctg;
      ul.append(li);
      pIndex++;
    }
}

drawTitle() {
    this.ctx.save();
    
    this.ctx.textBaseline = "bottom";
    this.ctx.textAlign = this.titleOptions.align;
    this.ctx.fillStyle = this.titleOptions.fill;
    this.ctx.font = `${this.titleOptions.font.weight} ${this.titleOptions.font.size} ${this.titleOptions.font.family}`;
    
    let xPos = this.canvas.width / 2;
    
    if (this.titleOptions.align == "left") {
      xPos = 10;
    }
    if (this.titleOptions.align == "right") {
      xPos = this.canvas.width - 10;
    }
    
    this.ctx.fillText(this.options.seriesName, xPos, this.canvas.height);
    
    this.ctx.restore();
}

draw() {
    this.drawSlices();
    this.drawLabels();
    this.drawTitle();
    this.drawLegend();
}



var myPiechart = new PieChart({
  canvas: myCanvas,
  seriesName: "Vinyl records",
  padding: 40,
  doughnutHoleSize: 0.4,
  data: {
    "Classical Music": 16,
    "Alternative Rock": 12,
    "Pop": 18,
    "Jazz": 32
  },
  colors: ["#80DEEA", "#FFE082", "#FFAB91", "#CE93D8"],
  titleOptions: {
    align: "center",
    fill: "black",
    font: {
      weight: "bold",
      size: "18px",
      family: "Lato"
    }
  }
});
myPiechart.draw();

}