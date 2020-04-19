let dotSize = 16;
let gap = 8;
let offset = dotSize + gap;
let gridSize = 24;

enum Color {
  Gray,
  Black,
  Red
}

// User defined functions
declare function init(grid: Grid): void;
declare function update(grid: Grid): void;
declare function onLeftKeyPress(): void;
declare function onRightKeyPress(): void;
declare function onUpKeyPress(): void;
declare function onDownKeyPress(): void;

function getCSSColor(color: Color): string {
  switch (color) {
    case Color.Gray:
      return "gainsboro";
    case Color.Black:
      return "black";
    case Color.Red:
      return "red";
    default:
      console.error("no CSS color defined");
      return "orange";
  }
}

class Grid {
  dots: Array<Array<Color>>;
  constructor() {
    this.dots = new Array(gridSize);
    for (let y = 0; y < gridSize; y++) {
      let row = new Array(gridSize);
      for (let i = 0; i < row.length; i++) {
        row[i] = Color.Gray;
      }
      this.dots[y] = row;
    }
  }

  getDot(x: number, y: number): Color {
    return this.dots[y][x];
  }

  setDot(x: number, y: number, val: Color) {
    this.dots[y][x] = val;
  }
}

let grid = new Grid();

function drawGrid(g: Grid) {
  push();
  translate(50, 50);
  g.dots.forEach((row, y) => {
    row.forEach((dot, x) => {
      fill(color(getCSSColor(dot)));
      circle(x * offset, y * offset, dotSize);
    });
  });
  pop();
}

function setup() {
  // TODO canvas size is a bit arbitrary
  createCanvas(652, 652);
  // Don't draw outlines around circles
  noStroke();

  init(grid);
}

function draw() {
  clear();
  update(grid);
  drawGrid(grid);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    onLeftKeyPress();
  }

  if (keyCode === RIGHT_ARROW) {
    onRightKeyPress();
  }

  if (keyCode === UP_ARROW) {
    onUpKeyPress();
  }

  if (keyCode === DOWN_ARROW) {
    onDownKeyPress();
  }
}

function endGame() {
  noLoop();
}

function setBottomText(message: string) {
  push();
  textFont("monospace");
  textSize(18);
  text(message, 42, 640);
  pop();
}

function setFrameRate(n: number): void {
  frameRate(n);
}
