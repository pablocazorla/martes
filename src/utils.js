import {
  PIECES_FIXED_TOP,
  PIECES_FIXED_BOTTOM,
  PIECES,
  ROW_COUNT,
  COL_COUNT,
} from "./constants";
import aStar from "./a-star";

const regLine = new RegExp(`\n`, "g");
const regSpace = new RegExp(` `, "g");

export const toArray = (str) =>
  str.replace(regSpace, "").replace(regLine, "").split("");

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const rotatePieceRight = (piece, num) => {
  /*  
  [
    0,1,2,3,4,
    5,6,7,8,9,
    10,11,12,13,14,
    15,16,17,18,19,
    20,21,22,23,24,
  ]  
  */
  let pieceCopy = [...piece];

  if (num === 0) {
    return pieceCopy;
  }

  if (num >= 2) {
    pieceCopy = [...piece].reverse();
  }

  if (num === 2) {
    return pieceCopy;
  }

  let x = 0;
  let y = 0;
  const c = 20;

  const newPiece = [];

  for (let i = 0; i < 25; i++) {
    newPiece.push(pieceCopy[c + x - y]);
    y += 5;

    if (y > c) {
      y = 0;
      x += 1;
    }
  }
  return newPiece;
};

const constructMap = () => {
  let pieces = [...PIECES_FIXED_TOP];

  const shuffledPieces = [...PIECES].sort((a, b) => 0.5 - Math.random());

  shuffledPieces.forEach((piece) => {
    const randomRotation = getRandomInt(0, 3);
    const rotatedPiece = rotatePieceRight(piece, randomRotation);
    pieces.push(rotatedPiece);
  });
  pieces = pieces.concat([...PIECES_FIXED_BOTTOM]);

  const a = Array.from(new Array(ROW_COUNT), () => Array(COL_COUNT).fill("O"));

  let p_x = 0;
  let p_y = 0;

  for (let pNum = 0; pNum < pieces.length; pNum++) {
    const p = pieces[pNum];

    let x = 0;
    let y = 0;

    for (let i = 0; i < p.length; i++) {
      const w = x + p_x * 4;
      const h = y + p_y * 4;
      if (a[h][w] === "O") {
        a[h][w] = p[i];
      }
      x++;
      if (x > 4) {
        x = 0;
        y++;
      }
    }
    p_x++;
    if (p_x > 2) {
      p_x = 0;
      p_y++;
    }
  }
  for (let j = 4; j < 13; j++) {
    a[j][0] = "X";
    a[j][12] = "X";
  }

  return a;
};

export const getMap = () => {
  let enabled = false;
  let newMap = null;

  while (!enabled) {
    newMap = constructMap();

    const { visited } = aStar(newMap, {
      init: { x: 9, y: 3 },
      end: { x: 70, y: 150 },
    });

    const visitedMap = visited.map(({ id }) => id).join("|");

    let cellsNotFound = 0;

    newMap.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell !== "X" && cell !== "U") {
          if (visitedMap.indexOf(`${x}-${y}`) === -1) {
            cellsNotFound++;
          }
        }
      });
    });
    if (cellsNotFound === 0) {
      enabled = true;
    }
  }

  return newMap;
};
