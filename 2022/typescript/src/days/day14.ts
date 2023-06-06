import { Solution } from "../types/types";

type Coord = {
  x: number;
  y: number;
  value?: "#" | "o"; // # === wall, o === sand
};

function drawWalls(data: string[]): Coord[] {
  const walls: Coord[] = [];

  function parseInfo(info: string): Coord {
    const xy = info.split(",");
    return { x: parseInt(xy[0]), y: parseInt(xy[1]) };
  }

  function findBetweenCoords(a: Coord, b: Coord): Coord[] {
    const betweenCoords: Coord[] = [];
    const xDiff = Math.abs(a.x - b.x);
    const yDiff = Math.abs(a.y - b.y);
    const xStep = a.x > b.x ? -1 : 1;
    const yStep = a.y > b.y ? -1 : 1;
    if (xDiff !== 0) {
      // move x dir
      Array(xDiff)
        .fill(0)
        .map((_, i) => {
          betweenCoords.push({ x: a.x + (i + 1) * xStep, y: a.y, value: "#" });
        });
    } else if (yDiff !== 0) {
      // move y dir
      Array(yDiff)
        .fill(0)
        .map((_, i) => {
          betweenCoords.push({ x: a.x, y: a.y + (i + 1) * yStep, value: "#" });
        });
    }
    return betweenCoords;
  }

  data.map((line) => {
    const info = line.trim().split("->");

    for (let i = 0; i < info.length; i++) {
      if (i + 1 >= info.length) return;

      const current = parseInfo(info[i]);
      const next = parseInfo(info[i + 1]);
      walls.push({ ...current, value: "#" });
      walls.push(...findBetweenCoords(current, next));
    }

    console.log("info", info);
  });
  return walls;
}

function poorFromCoordUntilAbyss(x: number, y: number, cave: Coord[]): number {
  // sand pours into the 'cave' from 500, 0 (x,y)
  // sand goes down until rock or sand hit, then it goes diagonally down left, else down right, else assume it's trapped.
  let count = 0;

  let finished = false;
  const limit = Math.max(...cave.map((coord) => coord.y));
  while (!finished) {
    recursivelyMove(x, y, cave, limit) === 1 ? (count += 1) : (finished = true);
    // printHelpMap(cave, count);
  }

  return count;
}

function printHelpMap(cave: Coord[], iter: number) {
  console.log(iter ? `\n${iter}:` : "");
  for (let y = 0; y < 10; y++) {
    let line = "";
    for (let x = 494; x < 504; x++) {
      const value = cave.find((coord) => coord.x === x && coord.y === y);
      line += value?.value ?? ".";
      debugger;
    }
    console.log(line);
  }
}

function recursivelyMove(
  x: number,
  y: number,
  cave: Coord[],
  limit: number
): number {
  if (y > limit) return 0;
  const below = cave.find((coord) => coord.x === x && coord.y === y + 1);
  const diagonalDownLeft = cave.find(
    (coord) => coord.x === x - 1 && coord.y === y + 1
  );
  const diagonalDownRight = cave.find(
    (coord) => coord.x === x + 1 && coord.y === y + 1
  );

  if (!below?.value) return recursivelyMove(x, y + 1, cave, limit);

  if (below?.value) {
    // console.log("below is o");
    // if two diagonal downs are blocked place
    //   *      *
    //  ooo OR ###
    if (diagonalDownLeft?.value && diagonalDownRight?.value) {
      cave.push({ x, y, value: "o" });
      return 1;
    } else if (!diagonalDownLeft?.value) {
      // move diagonal left
      return recursivelyMove(x - 1, y + 1, cave, limit);
    } else if (!diagonalDownRight) {
      // move diagonal right
      return recursivelyMove(x + 1, y + 1, cave, limit);
    }
  } else {
    // nothing below move down
    return recursivelyMove(x, y + 1, cave, limit);
  }

  throw new Error(":)");
}

export const day14 = (data: string[]): Solution => {
  const cave = drawWalls(data);

  function part1() {
    return poorFromCoordUntilAbyss(500, 0, cave);
  }
  function part2() {
    return "todo";
  }
  return { part1, part2 };
};
