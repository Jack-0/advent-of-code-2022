import console from "console";
import { Solution } from "../types/types";

type Coord = {
    x: number;
    y: number;
    value?: "S" | "B" | "#";
};

function printMap(map: Coord[]) {
    const ax = -4;
    const bx = 35;
    const ay = -2;
    const by = 25;

    for (let y = ay; y < by; y++) {
        let line = "" + y.toString().padEnd(3, " ");
        for (let x = ax; x < bx; x++) {
            const value = map.find((coord) => coord.x === x && coord.y === y);
            line += value?.value ?? ":";
        }
        console.log(line);
    }
}

export const day15 = (data: string[]): Solution => {
    console.log("data", data);

    // get data, convert to number arrays
    const numbers = data.map(str => {
        // regex to find numbers
        return str.match(/\s*(-?\d+)/g).map(value => parseInt(value));
    })

    function reflect(target: Coord[], point: Coord): Coord[] {
        return target.map((coord) => {
            const dx = point.x - coord.x;
            const dy = point.y - coord.y;
            return { x: point.x + dx, y: point.y + dy, value: "#" };
        });
    }

    function calcKnownEmptyPos(map: Coord[], s: Coord, b: Coord) {
        const xDiff = Math.abs(s.x - b.x)
        const yDiff = Math.abs(s.y - b.y)

        // draw square
        const tl: Coord = { x: s.x - xDiff, y: s.y - yDiff }
        const tr: Coord = { x: s.x + xDiff, y: s.y - yDiff }
        const bl: Coord = { x: s.x - xDiff, y: s.y + yDiff }
        const br: Coord = { x: s.x + xDiff, y: s.y + yDiff }

        const square: Coord[] = []
        for (let y = tl.y; y <= bl.y; y++) {
            for (let x = tl.x; x <= tr.x; x++) {
                // inside square
                if (x >= tl.x && x <= br.x && y <= bl.y && y >= tl.y) {
                    if (s.x !== x || s.y !== y)
                        square.push({ x, y, value: "#" })
                }
            }
        }
        // naive fill

        // draw left tri
        const leftTri: Coord[] = []
        let height = Math.abs(tl.y - bl.y) - 2;
        let refX = tl.x - 1;
        let refY = tl.y + 1;
        while (height >= 0) {
            for (let y = refY; y <= tl.y + height + 1; y++) {
                leftTri.push({ x: refX, y: y, value: "#" })
            }
            refX = refX - 1;
            refY = refY + 1;
            height = height - 1;
        }

        // draw top tri
        const topTri: Coord[] = [];
        refX = tl.x + 1
        refY = tl.y - 1
        let width = Math.abs(tl.x - tr.x) - 2;
        while (width >= 0) {
            for (let x = refX; x <= tl.x + width + 1; x++) {
                topTri.push({ x: x, y: refY, value: "#" })
            }
            refX = refX + 1;
            refY = refY - 1;
            width = width - 1;
        }

        // reflect known, to make other two triangles
        const rightTri = reflect(leftTri, s);
        const bottomTri = reflect(topTri, s);

        map.push(...square)
        map.push(...topTri)
        map.push(...leftTri)
        map.push(...rightTri);
        map.push(...bottomTri);
        //printMap(map);
    }


    const map: Coord[] = [];
    numbers.map(n => {
        console.log(n)
        const sensor: Coord = { x: n[0], y: n[1], value: "S" }
        const beacon: Coord = { x: n[2], y: n[3], value: "B" }
        map.push(sensor)
        map.push(beacon)
        //if (sensor.x === 20 && sensor.y === 14)
        calcKnownEmptyPos(map, sensor, beacon);
    })
    //console.log(map)
    //printMap(map);

    function part1() {
        const noDuplicates = map.filter((item, index, self) => {
            return self.findIndex((x) => x.x === item.x && x.y === item.y ) === index;
        });
        const res = noDuplicates.filter(x => x.y === 10 && (x.value && x.value !== "B"))
        console.log(res.length)


    }
    function part2() {
        return "World";
    }
    return { part1, part2 };
};
