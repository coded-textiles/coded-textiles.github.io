let img;

function preload() {
  img = loadImage('../assets/RB7.png');
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  img.resize(img.width / 20, img.height / 20);
  createControls();
  noLoop();
}

function draw() {
  push();
  start();
  pop();
}

function rotate180() {
  // Rotate 180
  push();
  translate(width / 2, height / 2);
  rotate(PI);
  translate(-img.width, -img.height);
  image(img, 0, 0);
  pop();
}

function createControls() {
  go_rand = createButton('Create random');
  go_rand.parent('controls-container');
  go_rand.mousePressed(generateRandom);
}

function start() {
  translate(0, -img.height / 2);
  background(0);
  image(img, width / 2, height / 2);
}

function generateRandom() {
  push();
  start();
  if (random(1) < 0.5) {
    background(0);
    rotate180();
  }
  pop();
}
