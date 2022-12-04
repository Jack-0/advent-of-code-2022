import { Solution } from "../types/types";

export const day01 = (data: string[]): Solution => {
  let elves = dataTo2DArray(data);

  function part1() {
    return findHighestSumAndRemove(elves).sum;
  }

  function part2() {
    let top3sum = 0;
    let e = elves;
    for (let index = 0; index < 3; index++) {
      let res = findHighestSumAndRemove(e);
      e = res.data;
      top3sum += res.sum;
    }
    return top3sum;
  }

  return { part1, part2 };
};

function findHighestSumAndRemove(data: number[][]): {
  data: number[][];
  sum: number;
} {
  let highestSum = -1;
  let highestSumIdx = -1;
  data.forEach((x, idx) => {
    let sum = x.reduce((a, b) => a + b, 0);
    if (sum > highestSum) {
      highestSum = sum;
      highestSumIdx = idx;
    }
  });
  return {
    data: data.filter((_, index) => {
      return index !== highestSumIdx;
    }),
    sum: highestSum,
  };
}

function dataTo2DArray(data: string[]): number[][] {
  let arr = [];
  let innerArr = [];
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    if (element !== "") {
      innerArr.push(parseInt(element));
    }
    if (element === "" || index === data.length - 1) {
      arr.push(innerArr);
      innerArr = [];
    }
  }
  return arr;
}
