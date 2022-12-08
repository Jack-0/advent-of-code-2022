import { createTypeReferenceDirectiveResolutionCache } from "typescript";
import { Solution } from "../types/types";

export const day07 = (data: string[]): Solution => {
  //console.log(data);
  type Node = {
    name: string;
    dir: boolean;
    size: number;
    children: Node[];
    parent: Node;
  };

  const tree: Node = {
    name: "/",
    dir: true,
    size: 0,
    children: [],
    parent: undefined,
  };

  //data.forEach((line) => {
  let cNode = tree;
  for (const idx in data) {
    // handle current command
    const line = data[idx];
    const isCMD = line.startsWith("$");
    const values = line.split(" ");

    console.log("|", line, "|");

    if (isCMD) {
      if (values[1] === "cd" && values[2] !== "/") {
        //cd
        const cdTarget = values[2];
        if (cdTarget === "..") {
          console.log("use parent");
          cNode = cNode.parent;
        } else {
          console.log("BEFORE (", cNode.name, ")");
          cNode = cNode.children.find((n) => n.dir && n.name === cdTarget);
          console.log("set current to children (", cNode.name, ")");
        }
      }
    } else {
      //ls
      if (values[1] !== "ls") {
        const size = parseInt(values[0]);
        const file = !Number.isNaN(size);
        if (file) {
          console.log(values[1], "file with parent", cNode.name);
          cNode.children.push({
            name: values[1],
            size,
            dir: false,
            children: [],
            parent: cNode,
          });
        } else {
          // is dir
          console.log(values[1], "dir with parent", cNode.name);
          cNode.children.push({
            name: values[1],
            size: 0,
            dir: true,
            children: [],
            parent: cNode,
          });
        }
      }
    }
  }

  //   type sizeCallback = (name: string, size: number) => number;

  function size(n: Node, callback: (name: string, size: number) => {}): number {
    if (!n.dir) {
      console.log("notDir", n.name, n.size);
      return n.size;
    }

    console.log("dir", n.name, n.size);
    const dirSize = n.children
      .map((c) => size(c, callback))
      .reduce((acc, value) => {
        return acc + value;
      }, 0);

    console.log("dirSize", dirSize);

    callback(n.name, dirSize);

    return dirSize;
  }

  //console.log("tree", tree);

  function part1() {
    console.log("PART 1 ===================");
    let res = 0;

    //@ts-ignore
    size(tree, (n, s) => {
      console.log("TEST---", n, s);
      if (s <= 100000) {
        console.log("s=", s);
        res += s;
      }
    });
    return res;
  }
  function part2() {
    const totalAvailable = 70000000;
    const required = 30000000;

    //@ts-ignore
    const used = size(tree, (n, s) => {});
    const free = totalAvailable - used;
    const target = required - free;

    const x = [];
    //@ts-ignore
    size(tree, (n, s) => {
      console.log("TEST---", n, s);
      if (s >= target) {
        x.push(s);
      }
    });

    x.sort((a, b) => a - b);
    return x[0];
  }
  return { part1, part2 };
};
