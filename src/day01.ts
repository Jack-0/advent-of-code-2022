import * as fs from "fs";

let data = fs.readFileSync("./data/day01.txt").toString().split("\n");
let elves = dataTo2DArray(data)
console.log("part 1", findHighestSumAndRemove(elves).sum)

let top3sum = 0
let e = elves
for (let index = 0; index < 3; index++) {
    let res = findHighestSumAndRemove(e)
    e = res.data;
    top3sum += res.sum;
}
console.log("part 2", top3sum)


function findHighestSumAndRemove(data:number[][]) : {data:number[][], sum:number} {
    let highestSum = -1
    let highestSumIdx = -1
    data.forEach((x, idx) => {
        let sum = x.reduce((a, b) => a + b, 0)
        if(sum > highestSum){
            highestSum = sum
            highestSumIdx = idx
        }
    })
    return {
        data:data.filter((_, index)=>{
            return index !== highestSumIdx
        }),
        sum:highestSum
    }
}


// deprecated code for part 1
// function findHighestSum(data:number[][]) : number {
//     let highestSum = 0
//     data.forEach(x => {
//         let sum = x.reduce((a, b) => a + b, 0)
//         if(sum > highestSum){
//             highestSum = sum
//         }
//     })
//     return highestSum;
// }

function dataTo2DArray(data:string[]) : number[][] {
    let arr = [];
    let innerArr = [];
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if(element !== ''){
            innerArr.push(parseInt(element));
        }
        if (element === '' || index === data.length - 1) {
            arr.push(innerArr);
            innerArr = [];
        } 
    }
    return arr;
}

