import { toArray } from "./utils";

const CELL_COL_COUNT = 6;
const CELL_ROW_COUNT = 8;

export const ROW_COUNT = 17;
export const COL_COUNT = 13;
export const MAP_WIDTH = 500;
//
export const CELL_WIDTH = MAP_WIDTH / CELL_COL_COUNT;
export const MAP_HEIGHT = CELL_WIDTH * CELL_ROW_COUNT;

/*
CELLOTYPES
----------
O - Outside
O - empty
X - wall
P - print
C - coffee
P - plant
W - water
R - red
Y - yellow
B - blue
E - exit
*/

export const PIECES_FIXED_TOP = [
  toArray(`
    UUXXX
    UUXEX
    UUXOX
    UUXOO
    XXXOX
  `),
  toArray(`
    XXXXX 
    XWXOO 
    XOXOO
    OOOOO
    XOXXX
    `),
  toArray(`
      XXXUU
      OLXUU
      OOXUU
      OOXUU
      XXXXX
      `),
];
export const PIECES_FIXED_BOTTOM = [
  toArray(`
    XXXXX
    UUUUX
    UUUUX
    UUUUX
    UUUUX
    `),
  toArray(`
    XOXOX
    XOOOX
    XOXOX
    XWXOX
    XXXXX
    `),
  toArray(`
      XXXXX
      XUUUU
      XUUUU
      XUUUU
      XUUUU
      `),
];

export const PIECES = [
  toArray(`
    XOXOX
    OBXOO
    XOXOX
    OOOOO
    XOXOX
    `),
  toArray(`
    XOXOX
    OPOOO
    XXXOX
    OOOOO
    XOXOX
    `),
  toArray(`
    XOXOX
    OYXOO
    XOXOX
    OOOLO
    XOXOX
    `),
  toArray(`
    XOXOX
    OOOCO
    XOXXX
    OOOPO
    XOXOX
    `),
  toArray(`
    XOXOX
    OCXRO
    XXXOX
    OOOOO
    XOXOX
    `),
  toArray(`
    XOXOX
    OOOLO
    XOXXX
    OOOPX
    XOXXX
    `),
];
