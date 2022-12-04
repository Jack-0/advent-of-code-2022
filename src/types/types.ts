export type SolutionCallback = () => any;

export type Solution = {
  part1: SolutionCallback;
  part2: SolutionCallback;
};

export type PerformanceAndValue = {
  time: number;
  res: any;
};
