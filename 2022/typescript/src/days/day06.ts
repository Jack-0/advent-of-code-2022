import { Solution } from "../types/types";

function findIndexOfNthUniqueChar(n:number, str:string) : number{
  const arr = Array.from(str)
  let found:string[] = []
  for (let idx = 0; idx < arr.length; idx++) {
    const c = arr[idx]
    if (!found.includes(c)){
      found.push(c)
    } else {
      found = []
      found.push(c)
    }
    if(found.length === n) {
      // idx + 1 as elves count from 1 not 0
      return idx+1
    }
  }
  return 0
}

export const day06 = (data: string[]): Solution => {
  function part1() {
    return findIndexOfNthUniqueChar(4, data[0])
  }
  function part2() {
    return findIndexOfNthUniqueChar(14, data[0])
  }
  return { part1, part2 };
};
