// "use strict";
arr1 = [1,2,2,3,4,5,6,7,8]

function binarySearch(arr, a) {
    let min = 0;
    let max = arr.length-1;
    let mid;
    do {
        mid = Math.trunc((arr[min]+arr[max])/2);
        if (arr[mid] < a) min=mid;
        else if (arr[mid] > a) max=mid;
    } while (arr[mid]!=a && max>min);
    return mid;
}
console.log(binarySearch(arr1,4));
