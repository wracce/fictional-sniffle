function factorial(n:number):number{
    if (n <= 1)
        return 1;
    return n * factorial(n-1);
}
// console.log(factorial(5));

function GCD(a:number,b:number):number {
    let max = Math.max(a,b);
    let min = Math.min(a,b)
    let mod = max%min
    
    if(Math.abs(b) < 0.001)
        return min;

    return GCD(mod,min);
}
// let a = 10;
// let b = 3;
// console.log("GCD(%i,%i) = %i",a,b, GCD(a,b));

function arrSumRecursion(arr:number[]):number {
    if (arr.length == 0)
        return 0;
    if (arr.length == 1)
        return arr[0];

    return arr[0] + arrSumRecursion(arr.slice(1));
}
// console.log(arrSumRecursion([1,5,3]));


function arrMaxRecursion(arr:number[]):number {
    if (arr.length == 0)
        return Number.NEGATIVE_INFINITY;
    if (arr.length == 1)
        return arr[0];

    return Math.max(arr[0],arrMaxRecursion(arr.slice(1)));
}
//console.log(arrMaxRecursion([1,5,3]));

function arrCountRecursion(arr:number[]):number {
    if (arr.length == 0)
        return 0;
    if (arr.length == 1)
        return 1;

    return 1 + arrCountRecursion(arr.slice(1));
}
// console.log(arrCountRecursion([1,5,3]));

function bestSet(map:Map<string,{weight: number, cost:number}>):Array<string>|null {
    const eps = 1;
    let arr2d:number[][];
    let arrObjects:string[];
    let arrWeights:number[];
    let stepWeight:number;
    let maxWeight: number

    arrObjects = [...map.keys()];
    
    stepWeight = map.get(arrObjects[0])!.weight;
    arrObjects.forEach(key => stepWeight = GCDFloat(map.get(key)!.weight,stepWeight));

    maxWeight=[...map].reduce((max,obj) => obj[1].weight > max?obj[1].weight:max,-Infinity);
    
    arrWeights=[];
    for (let index = stepWeight; index <= maxWeight+10**-eps; index+=stepWeight) {
        console.log(index);
        
        arrWeights.push(index);
        
    }
    
    arr2d = new Array(arrObjects.length);
    arr2d.fill(new Array(arrWeights.length));

    arr2d.forEach((arrM,idM) => {
        arrM.forEach((val, idN) => {
            let obj:{weight: number, cost:number} = map.get(arrObjects[idM])!;

            if (idM === 0)
                arrM[idN] = obj.weight <= arrWeights[idN]?obj.weight: -Infinity;
            else {
                arrM[idN] = arr2d[idM-1][idN];
                if (idN !== 0)
                    
            }
        })
    })    

    function GCDFloat(a:number, b:number):number
    {
        if (a < b)
            return GCDFloat(b, a);
 
        // base caseCASE
        if (Math.abs(b) < 10**-eps)
            return a;
        else
            return (GCDFloat(b, a - Math.floor(a / b) * b));
    }

    return [];
} 
let shopObjects = new Map();
shopObjects.set("recorder", {weight: 4, cost: 3000});
shopObjects.set("laptop", {weight: 0.6, cost: 2000});
shopObjects.set("guitar", {weight: 0.5, cost: 1500});
console.log(`The best set is ${bestSet(shopObjects)}`);



