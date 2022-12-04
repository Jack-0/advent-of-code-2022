import { Solution } from "../types/types";

function pairToNumberArray(values): number[] {
  const [v1, v2] = values.split("-");
  const start = parseInt(v1.toString());
  const end = parseInt(v2.toString());
  return [...Array(end - start + 1).keys()].map((x) => x + start);
}

export const day04 = (data: string[]): Solution => {
  function part1() {
    let pairsThatAreSubsets = 0;
    data.forEach((pair) => {
      const [p1, p2] = pair.split(",");
      const v1 = pairToNumberArray(p1);
      const v2 = pairToNumberArray(p2);
      if (v1.every((x) => v2.includes(x))) {
        pairsThatAreSubsets += 1;
      } else if (v2.every((x) => v1.includes(x))) {
        pairsThatAreSubsets += 1;
      }
    });
    return pairsThatAreSubsets;
  }
  function part2() {
    let overlaps = 0;
    data.forEach((pair) => {
      const [p1, p2] = pair.split(",");
      const v1 = pairToNumberArray(p1);
      const v2 = pairToNumberArray(p2);
      let foundOverlap = false;
      v1.forEach((x) => {
        if (v2.includes(x)) {
          foundOverlap = true;
        }
      });
      if (foundOverlap) overlaps += 1;
    });
    return overlaps;
  }
  return { part1, part2 };
};
