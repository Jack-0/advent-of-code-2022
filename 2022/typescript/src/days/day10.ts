import { parse } from "path";
import { Solution } from "../types/types";

export const day10 = (data: string[]): Solution => {
  const cycles: number[] = [];
  const pixels: string[] = [];

  let x = 1;

  function handlePixel(x: number, cycle: number) {
    if (cycle > 40) {
      cycle = cycle % 40;
    }

    let inRange = x > cycle - 2 && x < cycle + 2;
    if (inRange) {
      pixels.push("#");
    } else {
      pixels.push(" ");
    }
    console.log("cycle", cycle + 1, "x(", x, ") CRT state", pixels.join(""));
  }

  data.forEach((line, idx) => {
    const [instruction, value] = line.split(" ");

    if (instruction) {
      if (instruction === "noop") {
        console.log("begin executing", instruction, value);
        handlePixel(x, cycles.length);
        cycles.push(x);
      } else {
        console.log("begin executing", instruction, value);
        handlePixel(x, cycles.length);
        cycles.push(x);
        handlePixel(x, cycles.length);
        cycles.push(x);
        x = x + parseInt(value);
        console.log("finish executing", instruction, value);
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
    var size = 40;
    var pixelArrs = [];
    for (var i = 0; i < pixels.length; i += size) {
      pixelArrs.push(pixels.slice(i, i + size));
    }
    console.log("Part 2");
    pixelArrs.forEach((pixelArr) => {
      console.log(pixelArr.join(""));
    });

    return 0;
  }
  return { part1, part2 };
};
