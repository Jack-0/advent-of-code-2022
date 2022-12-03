import {solutions} from "../solutions"

describe("day01", () => {
    it("part1", () => {
      const {part1} = solutions(1, true)
      expect(part1()).toBe(24000);
    });
    it("part2", () => {
      const {part2} = solutions(1, true)
      expect(part2()).toBe(45000);
    });
});

describe("day02", () => {
    it("part1", () => {
      const {part1} = solutions(2, true)
      expect(part1()).toBe(15);
    });
    it("part2", () => {
      const {part2} = solutions(2, true)
      expect(part2()).toBe(12);
    });
});

describe("day03", () => {
    it("part1", () => {
      const {part1} = solutions(3, true)
      expect(part1()).toBe(157);
    });
    it("part2", () => {
      const {part2} = solutions(3, true)
      expect(part2()).toBe(70);
    });
});