import {
  ROW_COUNT,
  COL_COUNT,
  MAP_WIDTH,
  CELL_WIDTH,
  MAP_HEIGHT,
} from "./constants";
import aStar from "./a-star";
import { getMap } from "./utils";

const w = CELL_WIDTH / 2;

class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.map = getMap();

    //
    this.res = aStar(this.map, {});
    //
    this.px = 0.5 * (this.width - MAP_WIDTH);
    this.py = 0.5 * (this.height - MAP_HEIGHT);
  }
  update() {
    return this;
  }
  draw() {
    const { ctx, width, height, map, px, py } = this;

    ctx.clearRect(0, 0, width, height);

    ctx.lineCap = "round";

    // BG
    ctx.save();
    ctx.fillStyle = "#BBC";
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#0009";
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 4;
    ctx.beginPath();
    ctx.moveTo(px + CELL_WIDTH, py);
    ctx.lineTo(px + CELL_WIDTH * 5, py);
    ctx.lineTo(px + CELL_WIDTH * 5, py + CELL_WIDTH * 2);
    ctx.lineTo(px + CELL_WIDTH * 6, py + CELL_WIDTH * 2);
    ctx.lineTo(px + CELL_WIDTH * 6, py + CELL_WIDTH * 6);
    ctx.lineTo(px + CELL_WIDTH * 4, py + CELL_WIDTH * 6);
    ctx.lineTo(px + CELL_WIDTH * 4, py + CELL_WIDTH * 8);
    ctx.lineTo(px + CELL_WIDTH * 2, py + CELL_WIDTH * 8);
    ctx.lineTo(px + CELL_WIDTH * 2, py + CELL_WIDTH * 6);
    ctx.lineTo(px, py + CELL_WIDTH * 6);
    ctx.lineTo(px, py + CELL_WIDTH * 2);
    ctx.lineTo(px + CELL_WIDTH, py + CELL_WIDTH * 2);
    ctx.lineTo(px + CELL_WIDTH, py);

    ctx.closePath();
    ctx.fill();
    ctx.clip();

    ctx.strokeStyle = "#999";
    ctx.lineWidth = 1;

    (() => {
      for (let x = 0; x < COL_COUNT; x++) {
        ctx.beginPath();
        ctx.moveTo(px + CELL_WIDTH * x, py);
        ctx.lineTo(px + CELL_WIDTH * x, py + CELL_WIDTH * ROW_COUNT);
        ctx.stroke();
      }
      for (let y = 0; y < ROW_COUNT; y++) {
        ctx.beginPath();
        ctx.moveTo(px, py + CELL_WIDTH * y);
        ctx.lineTo(px + CELL_WIDTH * COL_COUNT, py + CELL_WIDTH * y);
        ctx.stroke();
      }
    })();

    ctx.restore();

    ctx.strokeStyle = "#FFF";
    ctx.lineWidth = 16;

    // BAÑOS
    ctx.fillStyle = "#99C";
    ctx.fillRect(px + CELL_WIDTH * 2, py, CELL_WIDTH, CELL_WIDTH);
    ctx.fillRect(
      px + CELL_WIDTH * 2,
      py + CELL_WIDTH * 7,
      CELL_WIDTH,
      CELL_WIDTH
    );

    // Salida
    ctx.fillStyle = "#DDD";
    ctx.fillRect(px + CELL_WIDTH, py, CELL_WIDTH, CELL_WIDTH);

    // WALLS
    map.forEach((row, y) => {
      row.forEach((cell, x) => {
        if ((y === 0 && x < 4) || (y === 1 && x === 2)) {
          return;
        }
        if (cell === "X") {
          if (x + 1 < COL_COUNT && map[y][x + 1] === "X") {
            ctx.beginPath();
            ctx.moveTo(px + x * w, py + y * w);
            ctx.lineTo(px + (x + 1) * w, py + y * w);
            ctx.stroke();
          }
          if (y + 1 < ROW_COUNT && map[y + 1][x] === "X") {
            ctx.beginPath();
            ctx.moveTo(px + x * w, py + y * w);
            ctx.lineTo(px + x * w, py + (y + 1) * w);
            ctx.stroke();
          }
        }

        if (cell === "B") {
          this.ctx.fillStyle = "#00f";
          this.ctx.fillRect(px + x * w - 10, py + y * w - 10, 20, 20);
        }
        if (cell === "Y") {
          this.ctx.fillStyle = "#ff0";
          this.ctx.fillRect(px + x * w - 10, py + y * w - 10, 20, 20);
        }
        if (cell === "R") {
          this.ctx.fillStyle = "#f00";
          this.ctx.fillRect(px + x * w - 10, py + y * w - 10, 20, 20);
        }
        if (cell === "L") {
          this.ctx.fillStyle = "#070";
          this.ctx.fillRect(px + x * w - 10, py + y * w - 10, 20, 20);
        }
        if (cell === "P") {
          this.ctx.fillStyle = "#333";
          this.ctx.fillRect(px + x * w - 10, py + y * w - 10, 20, 20);
        }
        if (cell === "C") {
          this.ctx.fillStyle = "#D82";
          this.ctx.fillRect(px + x * w - 10, py + y * w - 10, 20, 20);
        }
        /*
        else if (cell === "O") {
          
        } else if (cell === "U") {
        } else {
          this.ctx.fillStyle = "#f00";
          this.ctx.fillRect((x - 1) * w, (y - 1) * w, 2 * w, 2 * w);
        }
        */
      });
    });

    const path = this.res.path;
    if (path.length > 0) {
      ctx.strokeStyle = "#F00";
      ctx.beginPath();
      ctx.moveTo(px + path[0].x * w, py + path[0].y * w);
      for (let i = 1; i < path.length; i++) {
        ctx.lineTo(px + path[i].x * w, py + path[i].y * w);
      }
      ctx.stroke();
    }
    // const visited = this.res.visited;
    // visited.forEach((cell) => {
    //   this.ctx.fillStyle = "#d00";
    //   this.ctx.fillRect(px + cell.x * w - 10, py + cell.y * w - 10, 20, 20);
    // });
  }
}

export default Game;
