import { Solution } from "../types/types";

export const day08 = (data: string[]): Solution => {
  // each tree is a number 0-9 where 9 is tallest
  // tree is visible if all other trees in x and y axis are smaller as we traverse to the edge of grid
  const xLen = data[0].length;
  const yLen = data.length;
  console.log("xLen", xLen, "yLen", yLen);
  let tmpStr = "";
  const xArr = data;
  const yArr: string[] = [];
  for (let i = 0; i < yLen; i++) {
    xArr.forEach((x) => {
      tmpStr += x[i];
    });
    yArr.push(tmpStr);
    tmpStr = "";
  }
  const xArrReverse = reverse(xArr);
  const yArrReverse = reverse(yArr);

  function reverse(target: string[]): string[] {
    const copy = JSON.parse(JSON.stringify(target));
    copy.forEach((str, idx) => {
      const reverseStr = Array.from(str).reverse().join("");
      copy[idx] = reverseStr;
    });
    return copy;
  }

  function findVisible(str: string): number[] {
    const visible: number[] = [];

    let lastHighest = 0;
    // console.log(str, "-----------------------");
    Array.from(str).forEach((x, idx) => {
      const value = parseInt(x);

      if (idx === 0) {
        // first tree always visible
        lastHighest = value;
        visible.push(value);
      } else {
        if (value > lastHighest) {
          lastHighest = value;
          visible.push(value);
        } else {
          visible.push(0);
        }
      }
      // console.log(
      //   "value",
      //   value,
      //   "visible",
      //   visible,
      //   "lastHighest",
      //   lastHighest
      // );
    });

    // for each number
    return visible;
  }

  console.log("x", xArr, xArrReverse);
  console.log("y", yArr, yArrReverse);

  function forEachArray(arrays: any[][], callback: Function): number[][][] {
    let res = [];
    arrays.forEach((arr) => {
      let subRes = [];
      arr.forEach((x) => {
        // do something
        subRes.push(callback(x));
      });
      res.push(subRes);
    });
    return res;
  }

  function part1() {
    // findVisible(xArr[0]);
    let allVisible = forEachArray(
      [xArr, yArr, xArrReverse, yArrReverse],
      findVisible
    );
    console.log(allVisible);

    let temp = 0;
    allVisible.forEach((x) => {
      x.forEach((y) => {
        y.forEach((value) => {
          if (value > 0) {
            temp += 1;
          }
        });
      });
      console.log(temp);
    });
    return temp - 4 * 4;
  }
  function part2() {
    return "";
  }
  return { part1, part2 };
};
