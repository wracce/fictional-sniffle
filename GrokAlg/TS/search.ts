function stypidSearch(arr: number[], val: number): number | null {
  let index: number | null = null;
  let i: number;
  for (i = 0; i < arr.length; i++) if (arr[i] == val) index = i;
  console.log("Count: " + index);
  return index;
}
// let setNumbers:number[] = [1,2,5,7,9,5,60,70];
// console.log(simpleSearch(setNumbers, 70) === null? "\nNot found :(": "Found :)")

function binarySearch(arr: number[], val: number): number | null {
  let min: number = 0;
  let max: number = arr.length;

  while (min <= max) {
    let mid: number = Math.floor(max + min) / 2;
    if (arr[mid] == val) return mid;
    else if (arr[mid] > val) max = mid;
    else min = mid;
  }
  return null;
}
// let setNumbers:number[] = [1,2,5,7,9,5,60,70];
// let value = 70;
// let index = binarySearch(setNumbers, value);
// console.log(index === null? "\nNot found :(": "arr[" + index + "] = " + value);

function BFS(
  map: Map<string, Array<string>>,
  source: string,
  destination: string
): boolean {
  let search_queue: Array<string> = [];
  let searched: Array<string> = [];

  if (!map.has(source) || !map.has(destination))
    throw new Error("Source or destination not found");

  search_queue.push(source);

  while (search_queue.length > 0) {
    let node = search_queue.shift();

    if (searched.includes(node!) || !map.has(node!)) continue;

    if (node === destination) return true;

    searched.push(node!);
    search_queue.push(...map.get(node!)!);
  }
  return false;
}
// let map = new Map<string,Array<string>>();
// map.set("a",["b"]);
// map.set("b",["c"]);
// map.set("c",["d","e"]);
// map.set("d",[]);
// map.set("e",[]);
// console.log(BFS(map,"a","d")?"Path found :)":"Path not found :(")

function dijkstra(
  graph: Map<string, Map<string, number>>,
  source: string,
  destination: string
): Array<string> {
  let nodes: Map<
    string,
    { parent: string | null; weight: number; searched: boolean }
  > = new Map();

  if (!graph.has(source) || !graph.has(destination))
    throw new Error("Source or destination not found");

  if (
    [...graph.values()].filter(
      (map) => [...map.values()].filter((map2) => map2 < 0).length > 0
    ).length > 0
  )
    throw new Error("The graph contains negative edges");

  [...graph.keys()]
    .filter((val) => val !== source)
    .forEach((val) =>
      nodes.set(val, { parent: null, weight: Infinity, searched: false })
    );

  let currentNode: { key: string; weight: number } = { key: source, weight: 0 };
  while (true) {
    graph.get(currentNode.key)!.forEach((value, key) => {
      let newWeight = currentNode.weight + value;
      if (newWeight < nodes.get(key)?.weight!) {
        nodes.get(key)!.parent = currentNode.key;
        nodes.get(key)!.weight = newWeight;
      }
    });

    let unsearchedNodes = [...nodes.values()].filter(
      (node) => node.searched === false
    );

    if (unsearchedNodes.length === 0) {
      let resArr: Array<string> = [];
      let tmpNode: string = destination;
      do {
        resArr.unshift(tmpNode);
        tmpNode = nodes.get(tmpNode)?.parent!;
      } while (resArr[0] != source);
      return resArr;
    }

    currentNode.weight = Infinity;
    nodes.forEach((value, key) => {
      if (value.weight < currentNode.weight && value.searched == false) {
        currentNode.key = key;
        currentNode.weight = value.weight;
      }
    });
    nodes.get(currentNode.key)!.searched = true;
  }
}

let graph: Map<string, Map<string, number>> = new Map<
  string,
  Map<string, number>
>();
graph.set("a", new Map());
graph.set("b", new Map());
graph.set("c", new Map());
graph.set("d", new Map());
graph.get("a")?.set("b", 6);
graph.get("a")?.set("c", 2);
graph.get("c")?.set("b", 3);
graph.get("c")?.set("d", 5);
graph.get("b")?.set("d", 1);

console.log(dijkstra(graph, "a", "d"));
