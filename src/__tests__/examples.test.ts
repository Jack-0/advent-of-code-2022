import {solutions} from "../solutions"

describe("examples", () => {

    it("day01", () => {
      const {part1, part2} = solutions(1, true)
      expect(part1()).toBe(24000);
      expect(part2()).toBe(45000);
    });

    it("day02", () => {
      const {part1, part2} = solutions(2, true)
      expect(part1()).toBe(15);
      expect(part2()).toBe(12);
    });

    it("day03", () => {
      // const {part1, part2} = solutions(3, true)
      // expect(part1()).toBe(0);
      // expect(part2()).toBe(0);
    });
});