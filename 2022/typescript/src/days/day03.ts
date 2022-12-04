import { Solution } from "../types/types";

function splitInHalf(str: string): string[] {
  return [str.slice(0, str.length / 2), str.slice(str.length / 2, str.length)];
}

function compareStrReturnDuplicates(c1: string, c2: string): string[] {
  const arr1 = Array.from(c1);
  const arr2 = Array.from(c2);
  return arr1.filter((x) => {
    return arr2.includes(x);
  });
}

function calcItemsScore(item: string): number {
  const scores = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(
    ""
  );
  return scores.indexOf(item) + 1;
}

export const day03 = (data: string[]): Solution => {
  function part1() {
    let totalScore = 0;
    data.forEach((rucksack) => {
      const [compartment1, compartment2] = splitInHalf(rucksack);
      const matches = compareStrReturnDuplicates(compartment1, compartment2);
      totalScore += calcItemsScore(matches[0]);
    });
    return totalScore;
  }
  function part2() {
    let totalScore = 0;
    for (let index = 0; index < data.length; index += 3) {
      const rucksacks = data.slice(index, index + 3);

      const shared = compareStrReturnDuplicates(
        compareStrReturnDuplicates(
          rucksacks[0].toString(),
          rucksacks[1].toString()
        ).toString(),
        rucksacks[2].toString()
      );
      totalScore += calcItemsScore(shared[0]);
    }
    return totalScore;
  }
  return { part1, part2 };
};
