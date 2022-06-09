function partition(arr, low, high) {
  let temp;
  let pivot = arr[high];
  let i = low - 1;
  for (let j = low; j <= high - 1; j++) {
    if (arr[j] <= pivot) {
      i++;
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
  temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;

  return i + 1;
}

function qSort(arr, low, high) {
  if (low < high) {
    let pi = partition(arr, low, high);
    qSort(arr, low, pi - 1);
    qSort(arr, pi + 1, high);
  }
}

let n = 5;
let arr = [4, 2, 6, 9, 2];

qSort(arr, 0, n - 1);
console.log(arr);
