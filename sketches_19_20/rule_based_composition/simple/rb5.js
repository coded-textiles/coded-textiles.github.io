let img;

function preload() {
  img = loadImage('../assets/RB5.png');
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
      translate(0, -img.height);
      break;
    case 'down':
      translate(0, img.height);
      break;
    case 'left':
      translate(-img.width, 0);
      break;
    case 'right':
      translate(img.width, 0);
      break;
  }
  image(img, width / 2, height / 2);
  pop();
}

function reflectAndPlace(dir) {
  // Left, right
  push();
  translate(width / 2, height / 2);
  rotate(PI);
  if (dir === 'left') {
    translate(0, -img.height);
  } else if (dir === 'right') {
    translate(-img.width * 2, -img.height);
  }
  image(img, 0, 0);
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
  reflect_left = createCheckbox('Reflect left', false);
  reflect_left.parent('controls-container');
  reflect_right = createCheckbox('Reflect right', false);
  reflect_right.parent('controls-container');

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
  if (reflect_left.checked()) {
    reflectAndPlace('left');
  }
  if (reflect_right.checked()) {
    reflectAndPlace('right');
  }
  pop();
}

function generateRandom() {
  push();
  start();
  if (random(1) < 0.1) {
    translateAndPlace('up');
    if (random(1) < 0.2) {
      push();
      translate(0, -img.height);
      reflectAndPlace('right');
      pop();
    } else if (random(1) < 0.2) {
      push();
      translate(0, -img.height);
      reflectAndPlace('right');
      pop();
    }

    if (random(1) < 0.2) {
      push();
      translate(0, -img.height);
      reflectAndPlace('left');
      pop();
    } else if (random(1) < 0.2) {
      push();
      translate(0, -img.height);
      reflectAndPlace('left');
      pop();
    }
  }
  if (random(1) < 0.4) {
    translateAndPlace('down');
    if (random(1) < 0.2) {
      push();
      translate(0, img.height);
      reflectAndPlace('right');
      pop();
    } else if (random(1) < 0.2) {
      push();
      translate(0, img.height);
      reflectAndPlace('right');
      pop();
    }

    if (random(1) < 0.2) {
      push();
      translate(0, img.height);
      reflectAndPlace('left');
      pop();
    } else if (random(1) < 0.2) {
      push();
      translate(0, img.height);
      reflectAndPlace('left');
      pop();
    }
  }

  if (random(1) < 0.25) {
    translateAndPlace('left');
  } else if (random(1) < 0.5) {
    reflectAndPlace('left');
  }
  if (random(1) < 0.5) {
    translateAndPlace('right');
  } else if (random(1) < 0.75) {
    reflectAndPlace('right');
  }

  pop();
}
