import { NodeArray } from "typescript";
import { Solution } from "../types/types";

export const day12 = (data: string[]): Solution => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  type Node = {
    c: string; // character
    x: number;
    y: number;
    height: number;
    distance: number;
    edgeNodes: Node[] | undefined;
    done: boolean;
  };

  let start: Node;
  let end: Node;

  const nodeMap: Node[][] = data.map((row, y): Node[] => {
    return Array.from(row).map((c, x): Node => {
      let height = 0;
      let node = {
        c,
        x,
        y,
        height,
        distance: 0,
        edgeNodes: undefined,
        done: false,
      };
      if (c === "S") {
        node.height = 1;
        start = node;
      } else if (c === "E") {
        node.height = 26;
        end = node;
      } else {
        node.height = alphabet.indexOf(c);
      }
      return node;
    });
  });

  // append edge nodes to each node
  const nodeEdges = [
    [0, -1], // left
    [0, 1], // right
    [-1, 0], // down
    [1, 0], //up
  ];
  nodeMap.forEach((row) => {
    row.forEach((n) => {
      let edgeNodes: Node[] = [];
      for (let edge of nodeEdges) {
        if (!nodeMap[n.y + edge[1]]) continue;
        let x = nodeMap[n.y + edge[1]][n.x + edge[0]];
        x && edgeNodes.push(x);
      }
      n.edgeNodes = edgeNodes;
    });
  });

  //console.log(nodeMap[0][0].edgeNodes.length);
  function bfs(endNode: Node, part2: boolean = false) {
    let queue = [endNode];
    console.log(queue);
    while (queue.length) {
      let node = queue.pop();

      for (const edge of node.edgeNodes) {
        if (!edge.done && node.height - edge.height < 2) {
          let distance = node.distance + 1;
          if (edge.x === start.x && edge.y === start.y) {
            // if the current edge is the start we found the end
            return distance;
          } else if (part2 && edge.c === "a") {
            // part2 is first to a level TODO: would fail if start.x is closer and higher ground
            return distance;
          } else {
            edge.done = true;
            edge.distance = distance;
            // put edge node into the queue
            queue.unshift(edge);
          }
        }
      }
    }
  }

  function part1() {
    return bfs(end);
  }
  function part2() {
    nodeMap.forEach((row) => {
      row.forEach((n) => {
        n.distance = 0;
        n.done = false;
      });
    });
    return bfs(end, true);
  }
  return { part1, part2 };
};
