import { Solution } from "../types/types";

// A operator B
type Operation = {
  valueA: string;
  operator: string;
  valueB: string;
};

class Monkey {
  idx: number;
  items: number[];
  testValue: number;
  operation: Operation;
  worryLevel: number;
  trueMonkey: number;
  falseMonkey: number;
  inspectionCount: number;
  worryItems: number[];
  worryMultiplier: number;
  inPlay: boolean;

  constructor(
    idx: number,
    items: number[],
    testValue: number,
    operation: Operation,
    trueMonkey: number,
    falseMonkey: number,
    worryMultiplier: number = 1
  ) {
    this.idx = idx;
    this.items = items;
    this.testValue = testValue;
    this.operation = operation;
    this.trueMonkey = trueMonkey;
    this.falseMonkey = falseMonkey;
    this.worryMultiplier = worryMultiplier;
    this.inspectionCount = 0;
    this.inPlay = true;
  }

  throwItem(monkeys: Monkey[]) {
    if (this.items.length === 0) {
      this.inPlay = false;
      return;
    }

    this.inspectionCount++;

    let worryValue = this.calculateWorry(this.items[0]);

    worryValue = Math.floor(worryValue / this.worryMultiplier);

    let monkeyIdx = 0;
    if (worryValue % this.testValue === 0) {
      monkeyIdx = this.trueMonkey;
    } else {
      monkeyIdx = this.falseMonkey;
    }

    if (monkeyIdx === 2) {
      console.log("monkey", this.idx, "passed to", 2);
    }

    this.items.shift();
    monkeys[monkeyIdx].items.push(worryValue);

    debugger;
    //return monkeyIdx;
  }

  calculateWorry(item): number {
    // const worrySum = this.items.reduce((a, b) => a + b, 0);
    let a =
      this.operation.valueA === "old" ? item : parseInt(this.operation.valueA);
    let b =
      this.operation.valueB === "old" ? item : parseInt(this.operation.valueB);
    let worry = 0;
    switch (this.operation.operator) {
      case "*":
        if (a === 0 || b === 0) {
          worry = 0;
        } else {
          worry = a * b;
        }
        break;
      case "+":
        worry = a + b;
        break;
      default:
        throw new Error("Unknown operation");
    }
    // this.worryLevel = worry;
    return worry;
  }
}

function monkeysFromData(data: string[], worryMultiplier: number): Monkey[] {
  var monkeys: Monkey[] = [];
  const size = 7;
  let monkeyIdx = 0;
  for (var i = 0; i < data.length; i += size) {
    const items = data[i + 1]
      .split(":")[1]
      .split(",")
      .map((item) => {
        return parseInt(item);
      });
    const operationValues = data[i + 2].split("= ")[1].split(" ");
    const operation: Operation = {
      valueA: operationValues[0],
      operator: operationValues[1],
      valueB: operationValues[2],
    };
    const testValue = parseInt(data[i + 3].split("by ")[1]);
    const trueMonkey = parseInt(data[i + 4].split("monkey ")[1]);
    const falseMonkey = parseInt(data[i + 5].split("monkey ")[1]);
    monkeys.push(
      new Monkey(
        monkeyIdx,
        items,
        testValue,
        operation,
        trueMonkey,
        falseMonkey,
        worryMultiplier
      )
    );

    monkeyIdx++;
  }
  return monkeys;
}

export const day11 = (data: string[]): Solution => {
  function part1() {
    const monkeys = monkeysFromData(data, 3);
    // 20 rounds
    for (let i = 0; i < 20; i++) {
      monkeys.forEach((m) => {
        m.inPlay = true;
        while (m.inPlay) {
          m.throwItem(monkeys);
        }
      });
    }
    let res = monkeys
      .sort((a, b) => b.inspectionCount - a.inspectionCount)
      .map((m) => {
        return m.inspectionCount;
      });
    return res[0] * res[1];
  }

  function part2() {
    const monkeys = monkeysFromData(data, 1);
    // 20 rounds
    for (let i = 0; i < 20; i++) {
      monkeys.forEach((m) => {
        m.inPlay = true;
        while (m.inPlay) {
          m.throwItem(monkeys);
        }
      });
    }
    console.log(monkeys);
    let res = monkeys
      .sort((a, b) => b.inspectionCount - a.inspectionCount)
      .map((m) => {
        return m.inspectionCount;
      });
    console.log(res[0], res[1]);
    return res[0] * res[1];
  }
  return { part1, part2 };
};
