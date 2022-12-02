import * as fs from "fs";
import { Solution } from "./types/types";
import {day01} from "./days/day01";
import {day02} from "./days/day02";

export function solutions(day:number, example:boolean) : Solution {
    // find data
    let dayFormat = day.toString().padStart(2,'0');
    let dataFilepath = example ? `day${dayFormat}-example.txt` : `day${dayFormat}.txt`;
    dataFilepath = "./data/" + dataFilepath
    let data = fs.readFileSync(dataFilepath).toString().split("\n");
    if (data.length < 1) throw new Error(`No data at filepath ${dataFilepath}`);
    
    // return solutions
    if (day === 1) return day01(data)
    if (day === 2) return day02(data)

    throw new Error(`No solution found for ${day}`);
}

function handleArgs(args:string[]) {
    const dayOptionIndex = args.indexOf('-d')
    const useExample = args.indexOf('-e') !== -1 ? true : false
    const day = parseInt(args[dayOptionIndex + 1])
    
    if(dayOptionIndex === -1) throw new Error("Missing '-d' option... try '-d 1' for day01");
    if(Number.isNaN(day)) throw new Error("Missing day value after '-d' try '-d 1' for day01");

    console.log(`AOC for day ${day} ${useExample ? "(using example input)" : ""}`);

    let {part1, part2} = solutions(day, useExample)
    console.log("part1: ",part1())
    console.log("part2: ",part2())
}

handleArgs(process.argv)