import { parse } from "path";
import { Solution } from "../types/types";

export const day10 = (data: string[]): Solution => {
  const cycles: number[] = [];

  let x = 1;
  data.forEach((line, idx) => {
    const [instruction, value] = line.split(" ");
    if (instruction) {
      if (instruction === "noop") {
        cycles.push(x);
      } else {
        cycles.push(x);
        cycles.push(x);
        x = x + parseInt(value);
      }
    }
  });

  function part1() {
    let signalSum = 0;
    signalSum += 20 * cycles[20 - 1];
    signalSum += 60 * cycles[60 - 1];
    signalSum += 100 * cycles[100 - 1];
    signalSum += 140 * cycles[140 - 1];
    signalSum += 180 * cycles[180 - 1];
    signalSum += 220 * cycles[220 - 1];

    return signalSum;
  }
  function part2() {
    console.log(cycles);

    return;
  }
  return { part1, part2 };
};
