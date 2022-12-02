export type SolutionCallback = () => any;

export type Solution = {
    part1: SolutionCallback | undefined,
    part2: SolutionCallback | undefined,
}