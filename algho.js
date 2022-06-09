let newArray = document.getElementById("newArray");
let sort = document.getElementById("sort");
let ssort = document.getElementById("select_sort");
let insort = document.getElementById("insert_sort");
let clear = document.getElementById("clear");
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var slider = document.getElementById("range");
var timeOut = document.getElementById("time");
var delay = 10;

let array = [];
context.setTransform(1, 0, 0, -1, 0, canvas.height);

function mSortColors(left, right) {
  for (let i = 0; i < left.length; i++) {
    left[i].color = "#F7EF05";
  }
  for (let i = 0; i < right.length; i++) {
    right[i].color = "#0589F7";
  }
}

function resetColors(id_one, id_two) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].value === id_one || array[i].value === id_two) {
      array[i].color = "#EB0D0D";
    } else {
      array[i].color = "#2EB08B";
    }
  }
}
function selectionSortColor(id_one, id_two) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].value === id_one) {
      array[i].color = "#EB0D0D";
    } else if (array[i].value === id_two) {
      array[i].color = "#0589F7";
    } else {
      array[i].color = "#2EB08B";
    }
  }
}

function color(id, clr) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].value === id) {
      array[i].color = clr;
    } else {
      array[i].color = "#2EB08B";
    }
  }
}
function reset() {
  for (let i = 0; i < array.length; i++) {
    array[i].color = "#DA15DC";
  }
}

function drawBars(array, size) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  let spacing = 7;
  for (let i = 0; i < size; i++) {
    context.fillStyle = array[i].color;
    context.fillRect(spacing, 0, 10, array[i].value);
    // context.font = "7px Arial";
    // context.fillStyle = "#FFFFFF";
    // context.fillText(array[i].value, spacing+1, array[i].value+15);
    spacing = spacing + 12;
  }
}

newArray.onclick = function () {
  array = [];
  let set = new Set();
  while (set.size <= 23) {
    set.add((Math.random() * 150) | 0);
  }
  let genarray = [...set];
  for (let i = 0; i < genarray.length; i++) {
    let data = { color: "#2EB08B", value: genarray[i] };
    array.push(data);
  }
  size = array.length;
  drawBars(array, size);
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

sort.onclick = async function () {
  if (array.length <= 0) {
    alert("Generate array first. Thanks");
    return;
  }
  for (let i = 0; i < size - 1; i++) {
    for (let j = 0; j < size - 1; j++) {
      resetColors(array[j].value, array[j + 1].value);
      if (array[j].value > array[j + 1].value) {
        await sleep(delay);
        let temp = array[j].value;
        array[j].value = array[j + 1].value;
        array[j + 1].value = temp;
      }
      drawBars(array, size);
    }
  }
  reset();
  drawBars(array, size);
};

async function selectionSort(array) {
  let size = array.length;

  for (let step = 0; step < size; step++) {
    let min_index = step;
    for (let i = step + 1; i < size; i++) {
      if (array[i].value < array[min_index].value) {
        await sleep(delay);
        selectionSortColor(array[i].value, array[min_index].value);
        min_index = i;
      }
    }

    let temp = array[step].value;
    array[step].value = array[min_index].value;
    array[min_index].value = temp;
    drawBars(array, array.length);
  }
  reset();
  drawBars(array, array.length);
}

ssort.onclick = function () {
  if (array.length <= 0) {
    alert("Generate array first. Thanks");
    return;
  }
  selectionSort(array);
};
async function insertionSort(array) {
  for (let step = 1; step < array.length; step++) {
    let key = array[step].value;
    let j = step - 1;

    while (j >= 0 && key < array[j].value) {
      resetColors(key, array[j].value);
      await sleep(delay);
      array[j + 1].value = array[j].value;
      j--;
    }
    array[j + 1].value = key;
    drawBars(array, array.length);
  }
  reset();
  drawBars(array, array.length);
}
insort.onclick = function () {
  if (array.length <= 0) {
    alert("Generate array first. Thanks");
    return;
  }
  insertionSort(array);
};

clear.onclick = function () {
  if (array.length <= 0) {
    alert("Generate array first. Thanks");
    return;
  }
  window.location.reload();
};

slider.oninput = function () {
  delay = this.value * 10;
  timeOut.innerHTML = "&nbsp;" + this.value * 10 + "ms";
};
