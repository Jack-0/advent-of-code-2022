import { Solution } from "../types/types";

const moves = {
  R: {
    x: 1,
    y: 0,
  },
  L: {
    x: -1,
    y: 0,
  },
  U: {
    x: 0,
    y: -1,
  },
  D: {
    x: 0,
    y: 1,
  },
};

class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  move(dir: string) {
    const delta = moves[dir];
    this.x += delta.x;
    this.y += delta.y;
  }

  tail(point: Point, lag: number = 2) {
    const distance = Math.max(
      Math.abs(this.x - point.x),
      Math.abs(this.y - point.y)
    );
    if (distance > 1) {
      const directionX = point.x - this.x;
      const directionY = point.y - this.y;
      this.x += Math.abs(directionX) === lag ? directionX / lag : directionX;
      this.y += Math.abs(directionY) === lag ? directionY / lag : directionY;
    }
  }
}

export const day09 = (data: string[]): Solution => {
  function part1() {
    const head = new Point(0, 0);
    const tail = new Point(0, 0);
    const visited = new Set();
    data.forEach((line) => {
      const [direction, moves] = line.split(" ");
      for (let i = 0; i < parseInt(moves); i++) {
        head.move(direction);
        tail.tail(head);
        visited.add(`${tail.x} ${tail.y}`);
      }
    });
    return visited.size;
  }
  function part2() {
    const knots: Point[] = new Array(10).fill(0).map(() => new Point(0, 0));
    const visited = new Set();
    data.forEach((line) => {
      const [direction, moves] = line.split(" ");
      for (let i = 0; i < parseInt(moves); i++) {
        // first move mimics head
        knots[0].move(direction);
        // now we add extra steps to mimic the lag
        for (let j = 1; j < knots.length; j++) {
          knots[j].tail(knots[j - 1]);
        }
        const tail = knots[knots.length - 1];
        visited.add(`${tail.x} ${tail.y}`);
      }
    });
    return visited.size;
  }
  return { part1, part2 };
};
