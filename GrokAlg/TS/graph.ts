function setCoverProblem(map:Map<string,Set<string>> , values:Array<string>): Array<string>{
    let valuesNeeded = new Set(values);
    let finalSet = new Set<string>();
    
    let bestSet:{key:string|null, set:Array<string>|null};
    while(valuesNeeded.size > 0) {
        bestSet = {key: null, set:[]};
        
        map.forEach((V,K) => {
            let covered = [...V].filter(val=>valuesNeeded.has(val));
            if (covered.length > bestSet.set?.length!){
            [bestSet.key,bestSet.set] = [K,[...V.values()]];
            finalSet.add(bestSet.key!);
            valuesNeeded = new Set([...valuesNeeded.values()].filter(val => !bestSet.set?.includes(val)));
        }
        })
    }

    return [...finalSet.values()];
}
let states_needed = ["mt", "wa", "or", "id", "nv", "ut", "ca", "az"];
let stations = new Map<string,Set<string>>();
stations.set("kone",new Set(["id", "nv", "ut"]));
stations.set("ktwo",new Set(["wa", "id", "mt"]));
stations.set("kthree",new Set(["or", "nv", "ca"]));
stations.set("kfour",new Set(["nv", "ut"]));
stations.set("kfive",new Set(["ca", "az"]));
console.log(`stantions for cover: ${setCoverProblem(stations,states_needed)}`);



