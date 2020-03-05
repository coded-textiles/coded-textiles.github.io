let img;

function preload() {
  img = loadImage('../assets/RB2_45.png');
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  img.resize(img.width / 20, img.height / 20);
  createControls();
  angleMode(DEGREES);
  noLoop();
}

function draw() {
  push();
  start();
  pop();
}

function translateAndPlace(dir) {
  // Up, down, left, right
  push();
  switch (dir) {
    case 'up':
      translate(width / 2, height / 2);
      translate(0, -(img.height * 1.41));
      rotate(45);
      image(img, 0, 0);
      break;
    case 'down':
      translate(width / 2, height / 2);
      translate(0, img.height * 1.41);
      rotate(45);
      image(img, 0, 0);
      break;
  }
  image(img, width / 2, height / 2);
  pop();
}

function rotateAndPlace(deg) {
  push();
  translate(width / 2, height / 2);
  rotate(deg);
  image(img, 0, 0);
  pop();
}

function createControls() {
  translate_up = createCheckbox('Translate up', false);
  translate_up.parent('controls-container');
  translate_down = createCheckbox('Translate down', false);
  translate_down.parent('controls-container');
  _rotate = createCheckbox('Rotate', false);
  _rotate.parent('controls-container');

  go_check = createButton('Create with checkboxes');
  go_check.parent('controls-container');
  go_check.mousePressed(generateWithCheckboxes);

  go_rand = createButton('Create random');
  go_rand.parent('controls-container');
  go_rand.mousePressed(generateRandom);
}

function start() {
  push();
  background(0);
  translate(width / 2, height / 2);
  rotate(45);
  image(img, 0, 0);
  pop();
}

function generateWithCheckboxes() {
  push();
  start();
  if (translate_up.checked()) {
    translateAndPlace('up');
  }
  if (translate_down.checked()) {
    translateAndPlace('down');
  }
  if (_rotate.checked()) {
    rotateAndPlace(random(120, 330));
  }
  pop();
}

function generateRandom() {
  push();
  start();
  if (random(1) < 0.5) {
    translateAndPlace('up');
  } else if (random(1) < 0.75) {
    if (random(1) < 0.75) {
      rotateAndPlace(random(140, 310));
    } else {
      rotateAndPlace(random(120, 220));
      rotateAndPlace(random(250, 330));
    }
  }
  if (random(1) < 0.5) {
    translateAndPlace('down');
  }
  pop();
}
