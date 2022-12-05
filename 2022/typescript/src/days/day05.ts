import { reverse } from "dns";
import { Solution } from "../types/types";


function cratesTo2DArray(originalCrates:string[]):string[][]{
  const crates = JSON.parse(JSON.stringify(originalCrates))
  // split last array to get last number
  const crateNumbers = crates[crates.length-1].split(" ").filter(x=> x !== '')
  const numOfCrateTowers = parseInt(crateNumbers[crateNumbers.length-1])
  // generate matrix
  const crateArr = Array(numOfCrateTowers).fill('').map(()=>Array().fill(''))
  crates.pop()
  // fill crates
  for (let heightIdx = crates.length - 1; heightIdx >= 0; heightIdx--) {
    const row = crates[heightIdx];
    let pos = 0;
    for (let rowIdx = 1; rowIdx < row.length; rowIdx+=4)
    {
      if(row[rowIdx] !== ' ')
      crateArr[pos].push(row[rowIdx])
      pos++
    }
  }
  return crateArr;
}

function move(crateArr:string[][], n:number, origin:number, target:number, reverse:boolean=false) : string[][]{
  let toMoveArr = crateArr[origin-1].splice(crateArr[origin-1].length - n, crateArr[origin-1].length);
  if(reverse){
    toMoveArr = toMoveArr.reverse()
  }
  toMoveArr.forEach((x)=>{
    crateArr[target-1].push(x)
  })
  return crateArr
}

type MoveInstructions = {
  amount: number,
  origin: number,
  target: number,
}

function topCrates(crateArr:string[][]) : string {
  let res = ''
  crateArr.forEach(x=>{
    res += x[x.length-1]
  })  
  return res
}

function parseInstructions(instruction:string) : MoveInstructions{
  const splitString = instruction.split(" ")
  const amount = parseInt(splitString[1])
  const origin = parseInt(splitString[3])
  const target = parseInt(splitString[5])
  return {amount, origin, target}
}


export const day05 = (data: string[]): Solution => {
  const splitIndex = data.indexOf('');
  const crates = data.slice(0,splitIndex)
  const moves = data.slice(splitIndex)
  function part1() {
    let crateArr = cratesTo2DArray(crates);
    moves.forEach(x => {
      if(x !== ''){
      const {amount, origin, target} = parseInstructions(x);
      move(crateArr, amount, origin, target, true);
      }
    })
    return topCrates(crateArr);
  }
  function part2() {
    let crateArr = cratesTo2DArray(crates);
    moves.forEach(x => {
      if(x !== ''){
      const {amount, origin, target} = parseInstructions(x);
      move(crateArr, amount, origin, target, false);
      }
    })
    return topCrates(crateArr);
  }
  return { part1, part2 };
};
