let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
let dpr = window.devicePixelRatio;

canvas.width = width * dpr;
canvas.height = height * dpr;

let center_x = Math.random() * width;
let center_y = Math.random() * width;
let r = 3;
const a = 2 * Math.PI / 6;

let center_points = [];
let num_hex = 0;

setInterval(generateHexagon, 550);

// TODO add red to blue color scheme
function generateHexagon() {
  context.clearRect(0, 0, width, height);
  let center_x = Math.random() * width;
  let center_y = Math.random() * height;
  let max_hex = 5 + Math.random() * 30;
  let point = { x: center_x, y: center_y, hex_size: max_hex };

  if (center_points.length >= 20) {
    center_points.shift();
  }

  center_points.push(point);
  drawNewHexagon();
}

function drawNewHexagon() {
  let ii = 0;
  while (ii < center_points.length - 1) {
    let temp_point = center_points[ii];
    let temp_r = r;

    for (let jj = 0; jj < temp_point.hex_size; ++jj) {
      context.beginPath();
      context.lineWidth = 1;
      context.strokeStyle = `rgb(128, 0, ${Math.floor(255 - (128 / temp_point.hex_size) * jj)})`;

      for (let kk = 0; kk < 6; ++kk) {
        context.lineTo(temp_point.x + temp_r * Math.cos(a * kk), temp_point.y + temp_r * Math.sin(a * kk));
      }

      context.closePath();
      context.stroke();
      temp_r += 5;
    }

    ++ii;
  }

  let intervalID = setInterval(function() {
    if (num_hex >= center_points[center_points.length - 1].hex_size) {
      num_hex = 0;
      window.clearInterval(intervalID);
    }

    newHexagonHelper(num_hex);

    ++num_hex;
  }, 500 / center_points[center_points.length - 1].hex_size);
}

function newHexagonHelper(hexagon_index) {
  let center_point = center_points[center_points.length - 1];
  let temp_r = r + 5 * hexagon_index;

  context.beginPath();
  context.lineWidth = 1;
  context.strokeStyle = `rgb(128, 0, ${Math.floor(255 - (128 / center_point.hex_size) * hexagon_index)})`;

  for (let jj = 0; jj < 6; ++jj) {
    context.lineTo(center_point.x + temp_r * Math.cos(a * jj), center_point.y + temp_r * Math.sin(a * jj));
  }

  context.closePath();
  context.stroke();
}
