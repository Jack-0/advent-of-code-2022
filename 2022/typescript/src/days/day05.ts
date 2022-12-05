import { reverse } from "dns";
import { Solution } from "../types/types";


function cratesTo2DArray(originalCrates:string[]):string[][]{
  const crates = JSON.parse(JSON.stringify(originalCrates))
  // split last array to get last number
  const crateNumbers = crates[crates.length-1].split(" ").filter(x=> x !== '')
  const numOfCrateTowers = parseInt(crateNumbers[crateNumbers.length-1])


  // generate 2d array
  const crateArr = Array(numOfCrateTowers).fill('').map(()=>Array().fill(''))
  console.log(crateArr)
  crates.pop()
  // fill crates
    for (let heightIdx = crates.length - 1; heightIdx >= 0; heightIdx--) {
        // console.log(crates[heightIdx])
        // console.log(heightIdx)

        const row = crates[heightIdx];
        let pos = 0;
        for (let rowIdx = 1; rowIdx < row.length; rowIdx+=4)
        {
          // console.log(pos, row[rowIdx]);
          if(row[rowIdx] !== ' ')
          crateArr[pos].push(row[rowIdx])
          pos++
        }
    }

    crateArr.forEach(x=>{
      console.log(x)
      console.log(x[x.length - 1])
    })

    console.log(crateArr[1][crateArr[1].length - 1])
    // for (let i = 1; i < row.length; i += 1) {
        // console.log("slice", row.slice(i, i+3))
      // 
    // }
  
  // parse each row





  return crateArr;
}

function move(crateArr:string[][], n:number, origin:number, target:number, reverse:boolean=false) : string[][]{
  
  let toMoveArr = crateArr[origin-1].splice(crateArr[origin-1].length - n, crateArr[origin-1].length);
  if(reverse){
    toMoveArr = toMoveArr.reverse()
  }
  // const toMoveArr = crateArr[origin-1].splice(crateArr[origin-1].length - n, crateArr[origin-1].length).reverse();
  console.log("a",toMoveArr)
  console.log(crateArr)

  toMoveArr.forEach((x)=>{
    crateArr[target-1].push(x)
  })
  console.log("b", crateArr)
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

  console.log("Ins",instruction)
  const splitString = instruction.split(" ")
  console.log(splitString)
  const amount = parseInt(splitString[1])
  const origin = parseInt(splitString[3])
  const target = parseInt(splitString[5])

  return {amount, origin, target}
}


export const day05 = (data: string[]): Solution => {
  console.log(data)

  // looks like a towers of hanoi type problem

  // parse data
  const splitIndex = data.indexOf('');
  const crates = data.slice(0,splitIndex)
  const moves = data.slice(splitIndex)
  console.log("crates",crates)
  
  
  // console.log("moves",moves)


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
