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

  function visibleInAxis(
    treeHeight: number,
    y: number,
    x: number,
    searchY: boolean = false
  ): boolean {
    let leftSafe = true;
    let rightSafe = true;

    if (searchY) {
      for (let i = 0; i < treeMatrix[0].length; i++) {
        const e = treeMatrix[i][x];
        if (e >= treeHeight && i !== y) {
          if (i < y) {
            leftSafe = false;
          } else {
            rightSafe = false;
          }
        }
      }
    } else {
      for (let i = 0; i < treeMatrix[0].length; i++) {
        const e = treeMatrix[y][i];
        if (e >= treeHeight && i !== x) {
          if (i < x) {
            leftSafe = false;
          } else {
            rightSafe = false;
          }
        }
      }
    }

    return leftSafe || rightSafe;
  }

  function isTreeVisible(y, x): boolean {
    // if tree is on edge of matrix it's visible
    if (
      x === treeMatrix[x].length - 1 ||
      x === 0 ||
      y === treeMatrix[y].length - 1 ||
      y === 0
    ) {
      return true;
    } else {
      // x
      if (visibleInAxis(treeMatrix[y][x], y, x, false)) {
        return true;
      }
      // y down
      if (visibleInAxis(treeMatrix[y][x], y, x, true)) {
        return true;
      }
    }

    return false;
  }

  function part1() {
    let res = 0;
    let testArr = [];
    let t = "";
    console.log(treeMatrix);
    treeMatrix.forEach((row, y) => {
      t = "";
      row.forEach((value, x) => {
        if (isTreeVisible(y, x)) {
          res += 1;
        }
        t += `[(Y${y},X${x})=${treeMatrix[y][x]}-${
          isTreeVisible(y, x) ? "Y" : "N"
        }]`;
      });
      testArr.push(t);
    });

    console.log(testArr);
    return res;
  }

  function part2() {
    return 0;
  }

  return { part1, part2 };
};
