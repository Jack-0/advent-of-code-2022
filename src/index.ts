import { solutions } from "./solutions";

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