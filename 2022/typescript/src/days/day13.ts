import { Solution } from "../types/types";

type Pair = {
  left: number[] | undefined;
  right: number[] | undefined;
  idx: number;
  correct: boolean;
};

export const day13 = (data: string[]): Solution => {
  const f = data.filter((x) => x !== "");
  let idx = 1;
  const pairs: Pair[] = [];
  for (let i = 0; i < f.length; i += 2) {
    let left = JSON.parse(f[i]);
    let right = JSON.parse(f[i + 1]);
    pairs.push({ left, right, idx, correct: false });
    idx++;
  }
  enum Result {
    correct = 1,
    notCorrect = -1,
  }
  function compareLR(left: any, right: any, idx = -1): Result {
    left = JSON.parse(JSON.stringify(left));
    right = JSON.parse(JSON.stringify(right));
    if (Array.isArray(left) && Array.isArray(right)) {
      const maxLen = Math.max(left.length, right.length);
      for (let i = 0; i < maxLen; i++) {
        if (left[i] === undefined) return -1;
        if (right[i] === undefined) return 1;
        const compare = compareLR(left[i], right[i]);
        if (compare) return compare;
      }
      return 0;
    } else if (!Array.isArray(left) && !Array.isArray(right)) {
      //numbers
      return Math.sign(left - right);
    } else {
      // mixed
      if (Array.isArray(left)) {
        return compareLR(left, [right]);
      }
      return compareLR([left], right);
    }
  }
  pairs.forEach((p) => {
    p.correct =
      compareLR(p.left, p.right, p.idx) !== Result.correct ? true : false;
  });
  function part1() {
    pairs.forEach((p) => {
      console.log(p);
    });
    return pairs
      .map((p) => (p.correct === true ? p.idx : 0))
      .reduce((a, b) => {
        return a + b;
      }, 0);
  }
  function part2() {
    // const left = JSON.parse("[[2]]");
    // const right = JSON.parse("[[6]]");
    // pairs.push({ left, right, idx, correct: false });
  }

  return { part1, part2 };
};
