import { Solution } from "../types/types";

// find start of sequence 

// it's after the 4th uniquie character

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
      console.log(idx,"reset=",found)
    }
    if(found.length === n) {
      console.log("found", idx + 1)
      return idx + 1
    }
  }
  return 0
}

export const day06 = (data: string[]): Solution => {
  console.log(data)
  function part1() {
    return findIndexOfNthUniqueChar(4, data[0])
  }
  function part2() {
    return findIndexOfNthUniqueChar(14, data[0])
  }
  return { part1, part2 };
};
