function findSmallestId(arr: number[]): number {
  let minValueId = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < arr[minValueId]) minValueId = i;
  }
  return minValueId;
}
function selectionSort(arr: number[]): number[] {
  let sortArr: number[] = [];
  let length = arr.length;
  for (let index = 0; index < length; index++) {
    sortArr.push(arr.splice(findSmallestId(arr), 1)[0]);
  }
  return sortArr;
}
// let unsortArr: number[] = [3, 4, 7, 3, 7, 9, 4, 6, 3, 5, 9, 1, 2, 4];
// console.log("unsorted array: " + unsortArr);
// console.log("  sorted array: " + selectionSort(unsortArr));

function quickSort(arr: number[]): number[] {
  if (arr.length < 2) return arr;

  let arrLessMid: number[] = [];
  let mid:number = arr.splice(Math.floor(arr.length / 2),1)[0];
  let arrMoreMid: number[] = [];

  for (const value of arr) {
    let arr1 = (value <= mid)?arrLessMid:arrMoreMid;
    arr1.push(value);
  }

  return new Array(
    ...quickSort(arrLessMid),
    mid,
    ...quickSort(arrMoreMid)
  );
}
let unsortArr: number[] = [3, 4, 7, 3, 7, 9, 4, 6, 3, 5, 9, 1, 2, 4];
console.log("unsorted array: " + unsortArr);
console.log("  sorted array: " + quickSort(unsortArr));
