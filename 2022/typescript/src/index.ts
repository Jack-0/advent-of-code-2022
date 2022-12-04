import { solutions } from "./solutions";
import { PerformanceAndValue } from "./types/types";

function valueAndPerformance(func: Function): PerformanceAndValue {
  let start = performance.now();
  const res = func();
  let end = performance.now();
  return { time: end - start, res };
}

function handleArgs(args: string[]) {
  const dayOptionIndex = args.indexOf("-d");
  const useExample = args.indexOf("-e") !== -1 ? true : false;
  const day = parseInt(args[dayOptionIndex + 1]);

  if (dayOptionIndex === -1)
    throw new Error("Missing '-d' option... try '-d 1' for day01");
  if (Number.isNaN(day))
    throw new Error("Missing day value after '-d' try '-d 1' for day01");

  console.log(
    `AOC for day ${day} ${useExample ? "(using example input)" : ""}`
  );

  let { part1, part2 } = solutions(day, useExample);
  const p1 = valueAndPerformance(part1);
  const p2 = valueAndPerformance(part2);

  console.log(
    `(Time:${p1.time.toFixed(4).padStart(8, " ")}ms) part1: ${p1.res}`
  );
  console.log(
    `(Time:${p2.time.toFixed(4).padStart(8, " ")}ms) part2: ${p2.res}`
  );
}

handleArgs(process.argv);
