import console from "console";
import { Solution } from "../types/types";

type Coord = {
    x: number;
    y: number;
    value?: "S" | "B" | "#";
};

const yTarget = 2000000;
const calcDistance = (a:Coord, b:Coord) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

export const day15 = (data: string[]): Solution => {
    console.log("data", data);
    // get data, convert to number arrays
    const numbers = data.map(str => {
        // regex to find numbers
        return str.match(/\s*(-?\d+)/g).map(value => parseInt(value));
    })
   
    const sensors: Coord[] = [];
    const beacons: Coord[] = [];
    numbers.map(n => {
        const sensor: Coord = { x: n[0], y: n[1], value: "S" }
        const beacon: Coord = { x: n[2], y: n[3], value: "B" }
        sensors.push(sensor)
        beacons.push(beacon)
    })

    function part1() {
        console.log("p1")
        
        // calc distances
        const distances: number[] = []
        for(let i =0; i < sensors.length; i++){
            distances.push(calcDistance(sensors[i], beacons[i]));
        }

       
        // calc intervals 
        const intervals: number[][] = []
        for(let i =0; i < sensors.length; i++){
            const dx = distances[i] - Math.abs(sensors[i].y - yTarget)
            if(dx > 0) 
            intervals.push([sensors[i].x - dx, sensors[i].x + dx])
        }
 
        // find all valid x's based on our y level...
        const allowedXValues:number[] = [];
        beacons.map((b:Coord)=> {
            if(b.y == yTarget) allowedXValues.push(b.x);
        })
        
        const minX = Math.min(...intervals.map((i) => i[0]));
        const maxX = Math.max(...intervals.map((i) => i[1]));

        let res = 0;
        
        for(let x = minX; x <= maxX; x++){
            const ignore = allowedXValues.includes(x);
            const inside = intervals.find(([left, right]) => left <= x && x <= right)
            if(!ignore && inside) res++;
        }
        console.log("distances", distances);
        console.log("intervals", intervals);
        console.log("allowedX", allowedXValues);
        return res;
    }
    function part2() {
        return "World";
    }
    return { part1, part2 };
};
