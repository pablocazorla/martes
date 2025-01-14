import { ROW_COUNT, COL_COUNT } from "./constants";

const getNodeDistance = (nodeA, nodeB) => {
  const { x: xA, y: yA } = nodeA;
  const { x: xB, y: yB } = nodeB;
  const dx = Math.abs(xB - xA);
  const dy = Math.abs(yB - yA);
  return dx + dy;
  const rects = Math.abs(dx - dy);
  const diagonals = Math.max(dx, dy) - rects;
  return 10 * rects + 14 * diagonals;
};

const createNode = (
  nodePrevious,
  parentId,
  x,
  y,
  x_prev,
  y_prev,
  f_parent,
  nodeFinal
) => {
  const f_prev = nodePrevious ? nodePrevious.f : 99999999;
  const f_evaluated =
    f_parent + getNodeDistance({ x, y }, { x: x_prev, y: y_prev });
  const f = Math.min(f_prev, f_evaluated);
  const g = getNodeDistance({ x, y }, nodeFinal);
  const h = f + g;
  //
  const parent = f_prev < f_evaluated ? nodePrevious.parent : parentId;

  return {
    id: `${x}-${y}`,
    parent,
    x,
    y,
    f,
    g,
    h,
    visited: false,
  };
};

const getObstaclesFromMap = (map) => {
  const obst = [];
  for (let y = 0; y < ROW_COUNT; y++) {
    for (let x = 0; x < COL_COUNT; x++) {
      const cell = map[y][x];
      if (cell === "X") {
        obst.push({ x, y });
      }
    }
  }
  return obst;
};

const aStar = function (map, options) {
  const ops = {
    init: { x: 9, y: 3 },
    end: { x: 7, y: 15 },
    ...options,
  };

  const obstacles = getObstaclesFromMap(map);

  /////////////////////////////////////////////
  const nodeInitial = {
    id: `${ops.init.x}-${ops.init.y}`,
    ...ops.init,
    parent: null,
    visited: false,
  };
  const nodeFinal = {
    id: `${ops.end.x}-${ops.end.y}`,
    ...ops.end,
    parent: null,
    visited: false,
  };

  nodeInitial.f = 0;
  nodeInitial.g = getNodeDistance(nodeInitial, nodeFinal);
  nodeInitial.h = nodeInitial.g;
  nodeInitial.visited = false;
  nodeFinal.f = nodeInitial.g;
  nodeFinal.g = 0;
  nodeFinal.h = nodeInitial.g;
  /////////////////////////////////////////////
  const nodePool = {};
  let searching = true;
  let isFound = false;
  const obstacleList = obstacles.map((n) => {
    return `${n.x}-${n.y}`;
  });

  ////
  const addNewNodes = (parentNode) => {
    const { x, y, f, id: parentId } = parentNode;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 || j === 0) {
          const xn = x + i;
          const yn = y + j;

          const isCurrentParentNode = i === 0 && j === 0;
          const nodePrevious = nodePool[`${xn}-${yn}`];
          const isVisited = nodePrevious ? nodePrevious.visited : false;
          const isObstacle =
            obstacleList.filter((nId) => {
              return nId === `${xn}-${yn}`;
            }).length > 0;

          if (
            !isCurrentParentNode &&
            !isVisited &&
            !isObstacle &&
            xn >= 0 &&
            yn >= 0 &&
            xn <= COL_COUNT &&
            yn <= ROW_COUNT
          ) {
            const newNode = createNode(
              nodePrevious,
              parentId,
              xn,
              yn,
              x,
              y,
              f,
              nodeFinal
            );
            nodePool[newNode.id] = newNode;
          }
        }
      }
    }
  };
  const evaluateBestNode = () => {
    if (!searching) {
      return;
    }

    let best = { f: 0, g: 999999, h: 999999, id: null };

    const notVisited = Object.values(nodePool).filter((n) => !n.visited);

    if (notVisited.length === 0) {
      searching = false;
      isFound = false;
      return;
    }

    notVisited.forEach((node) => {
      if (node.h < best.h) {
        best = node;
      }
      if (node.h === best.h) {
        if (node.g < best.g) {
          best = node;
        }
        if (node.g === best.g) {
          if (node.f > best.f) {
            best = node;
          }
        }
      }
    });
    if (best.id) {
      nodePool[best.id].visited = true;

      if (best.g === 0) {
        best.isFinal = true;
        searching = false;
        isFound = true;
      } else {
        addNewNodes(best);
      }
    }
  };

  nodePool[nodeInitial.id] = nodeInitial;

  ////

  while (searching) {
    evaluateBestNode();
  }
  const path = [];
  if (isFound) {
    let idNodeResult = nodeFinal.id;
    while (idNodeResult !== nodeInitial.id) {
      path.push(nodePool[idNodeResult]);

      idNodeResult = nodePool[idNodeResult].parent || nodeInitial.id;
    }
    path.push(nodePool[nodeInitial.id]);
  }
  const list = Object.values(nodePool);
  path.reverse();

  return {
    visited: list.filter((n) => n.visited),
    path,
    isFound,
  };
  /////////////////////////////////////////////
};

export default aStar;
