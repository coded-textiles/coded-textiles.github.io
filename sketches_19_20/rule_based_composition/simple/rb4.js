let img;

function preload() {
  img = loadImage('../assets/RB4.png');
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

function translateAndPlace(dir) {
  // Up, down, left, right
  push();
  switch (dir) {
    case 'up':
      translate(0, -(img.height * 0.78));
      break;
    case 'down':
      translate(0, img.height * 0.78);
      break;
    case 'left':
      translate(-img.width, 0);
      break;
    case 'right':
      translate(img.width, 0);
      break;
    case 'up-right':
      translate(img.width * 0.87, -img.height * 0.4);
      break;
    case 'down-right':
      translate(img.width * 0.87, img.height * 0.39);
      break;
    case 'down-left':
      translate(-img.width * 0.87, img.height * 0.39);
      break;
    case 'up-left':
      translate(-img.width * 0.87, -img.height * 0.4);
      break;
  }
  image(img, width / 2, height / 2);
  pop();
}

function createControls() {
  translate_up = createCheckbox('Translate up', false);
  translate_up.parent('controls-container');
  translate_down = createCheckbox('Translate down', false);
  translate_down.parent('controls-container');
  translate_left = createCheckbox('Translate left', false);
  translate_left.parent('controls-container');
  translate_right = createCheckbox('Translate right', false);
  translate_right.parent('controls-container');

  translate_up_right = createCheckbox('Translate up-right', false);
  translate_up_right.parent('controls-container');
  translate_down_right = createCheckbox('Translate down-right', false);
  translate_down_right.parent('controls-container');
  translate_down_left = createCheckbox('Translate down-left', false);
  translate_down_left.parent('controls-container');
  translate_up_left = createCheckbox('Translate up-left', false);
  translate_up_left.parent('controls-container');

  go_check = createButton('Create with checkboxes');
  go_check.parent('controls-container');
  go_check.mousePressed(generateWithCheckboxes);

  go_rand = createButton('Create random');
  go_rand.parent('controls-container');
  go_rand.mousePressed(generateRandom);
}

function start() {
  translate(0, -img.height / 2);
  background(0);
  image(img, width / 2, height / 2);
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
  if (translate_left.checked()) {
    translateAndPlace('left');
  }
  if (translate_right.checked()) {
    translateAndPlace('right');
  }
  if (translate_up_right.checked()) {
    translateAndPlace('up-right');
  }
  if (translate_down_right.checked()) {
    translateAndPlace('down-right');
  }
  if (translate_up_left.checked()) {
    translateAndPlace('up-left');
  }
  if (translate_down_left.checked()) {
    translateAndPlace('down-left');
  }
  pop();
}

function generateRandom() {
  push();
  start();
  // Up/down
  if (random(1) < 0.5) {
    translateAndPlace('up');
  }
  if (random(1) < 0.5) {
    translateAndPlace('down');
  }
  // Left/right
  if (random(1) < 0.25) {
    translateAndPlace('left');
  } else if (random(1) < 0.75) {
    if (random(1) < 0.75) {
      translateAndPlace('up-left');
    }
    if (random(1) < 0.75) {
      translateAndPlace('down-left');
    }
  }
  if (random(1) < 0.25) {
    translateAndPlace('right');
  } else if (random(1) < 0.75) {
    if (random(1) < 0.75) {
      translateAndPlace('up-right');
    }
    if (random(1) < 0.75) {
      translateAndPlace('down-right');
    }
  }
  pop();
}
