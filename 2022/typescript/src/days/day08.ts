import { Solution } from "../types/types";

export const day08 = (data: string[]): Solution => {
  // each tree is a number 0-9 where 9 is tallest
  // tree is visible if all other trees in x and y axis are smaller as we traverse to the edge of grid
  const treeMatrix: number[][] = [];
  let row: number[] = [];
  data.forEach((strRow) => {
    Array.from(strRow).forEach((char) => {
      row.push(parseInt(char));
    });
    treeMatrix.push(row);
    row = [];
  });

  type Directions = {
    left: number[];
    right: number[];
    up: number[];
    down: number[];
  };

  function matrixToDirections(
    matrix: number[][],
    y: number,
    x: number
  ): Directions {
    let left = [];
    let right = [];
    let up = [];
    let down = [];
    for (let i = 0; i < matrix[0].length; i++) {
      const yElement = matrix[i][x];
      const xElement = matrix[y][i];

      if (i !== y) {
        if (y < i) {
          down.push(yElement);
        } else if (y > i) {
          up.push(yElement);
        }
      }

      if (i !== x) {
        if (x < i) {
          right.push(xElement);
        } else if (x > i) {
          left.push(xElement);
        }
      }
    }

    up.reverse();
    left.reverse();

    return { up, down, left, right };
  }

  function isTreeVisible(y: number, x: number, matrix: number[][]): boolean {
    // if tree is on edge of matrix it's visible
    const directions = matrixToDirections(matrix, y, x);
    const treeValue = matrix[y][x];

    if (
      directions.left.length === 0 ||
      directions.down.length === 0 ||
      directions.up.length === 0 ||
      directions.right.length === 0
    ) {
      return true;
    }

    let visibleFromLeft = true;
    let visibleFromDown = true;
    let visibleFromUp = true;
    let visibleFromRight = true;

    directions.left.forEach((x) => {
      if (x >= treeValue) {
        visibleFromLeft = false;
      }
    });

    directions.down.forEach((x) => {
      if (x >= treeValue) {
        visibleFromDown = false;
      }
    });

    directions.up.forEach((x) => {
      if (x >= treeValue) {
        visibleFromUp = false;
      }
    });

    directions.right.forEach((x) => {
      if (x >= treeValue) {
        visibleFromRight = false;
      }
    });

    return (
      visibleFromLeft || visibleFromDown || visibleFromUp || visibleFromRight
    );
  }

  function scenicScore(y: number, x: number, matrix: number[][]): number {
    const directions = matrixToDirections(matrix, y, x);
    const treeValue = matrix[y][x];

    let leftScore = 0;
    let downScore = 0;
    let upScore = 0;
    let rightScore = 0;

    directions.left.every((x) => {
      leftScore += 1;
      if (x >= treeValue) {
        return false;
      }
      return true;
    });

    directions.down.every((x) => {
      downScore += 1;
      if (x >= treeValue) {
        return false;
      }
      return true;
    });

    directions.up.every((x) => {
      upScore += 1;
      if (x >= treeValue) {
        return false;
      }
      return true;
    });

    directions.right.every((x) => {
      rightScore += 1;
      if (x >= treeValue) {
        return false;
      }
      return true;
    });

    return leftScore * downScore * upScore * rightScore;
  }

  function part1() {
    let res = 0;
    treeMatrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (isTreeVisible(y, x, treeMatrix)) {
          res += 1;
        }
      });
    });
    return res;
  }

  function part2() {
    let res = 0;
    treeMatrix.forEach((row, y) => {
      row.forEach((value, x) => {
        const score = scenicScore(y, x, treeMatrix);
        if (score > res) {
          res = score;
        }
      });
    });
    return res;
  }

  return { part1, part2 };
};
