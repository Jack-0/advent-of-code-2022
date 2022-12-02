import {Solution} from "../types/types"



// object values
const rockValues = ['A', 'X'];
const paperValues = ['B', 'Y'];
const scissorValues = ['C', 'Z'];
// scoring
const loss = 0
const draw = 3
const win = 6
// objects
const rock = 1
const paper = 2
const scissors = 3

type guideEntry = {
    you: number,
    opponent: number
}



function calcScore(you:number, opponent:number) : number {
    if (you === opponent) {
        return draw + you;
    } else if (you === (opponent - 1)){
        return loss + you
    } else if ( you === scissors && opponent === rock){
        return loss + you
    } else {
        return win + you
    }
}

// return your object plus score
function calcScorePart2(you:number, opponent:number, ) : number {
    const lossResult = 1
    const drawResult = 2
    // const winResult = 3

    if (you === lossResult){
        if (opponent === rock) 
        {
            return scissors
        } else {
            return opponent - 1 
        }
    } else if( you === drawResult){
        return opponent  + draw
    } else {
        if (opponent === scissors)
        {
            return rock + win
        } else {
            return opponent + 1 + win
        }
    }
}

function parseData(data:string[]) : guideEntry[] {
    let arr: guideEntry[] = [];
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if (element === "") break;
        arr.push({opponent:charToObject(element[0]), you:charToObject(element[2])})
    }
    return arr;
}

function charToObject(c:string) : number {
    if (rockValues.includes(c)){
        return 1
    }
    else if (paperValues.includes(c)){
        return 2
    }
    else if (scissorValues.includes(c)){
        return 3
    }
}


// let data = fs.readFileSync("./data/day02.txt").toString().split("\n");
export const day02 = (data: string[]) : Solution => {
    let guide = parseData(data)

    let p1Score = 0;
    let p2Score = 0;
    guide.forEach(e => {
        p1Score += calcScore(e.you, e.opponent);
        p2Score += calcScorePart2(e.you, e.opponent);
    });

    function part1(){
        return p1Score
    }

    function part2(){
        return p2Score
    }
    return {part1, part2}
}