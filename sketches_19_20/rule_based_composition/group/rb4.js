let img;
let paused = false;
const pause_play_button = document.getElementById('pause-play');
const chance_p = document.getElementById('chance');

function preload() {
  img = loadImage('../assets/RB4.png');
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  img.resize(img.width / 20, img.height / 20);
  // createControls();
  frameRate(0.5);
}

function draw() {
  if (!paused) {
    generateRandom();
  }
}

// function createControls() {
//   go_rand = createButton('Toggle Pause/Play');
//   go_rand.parent('controls-container');
//   go_rand.mousePressed(togglePause);
// }

function togglePause() {
  if (paused) {
    paused = false;
    pause_play_button.textContent = 'Pause';
  } else {
    paused = true;
    pause_play_button.textContent = 'Play';
  }
}

pause_play_button.addEventListener('click', togglePause);

function translateAndPlace(dir) {
  // Up, down, left, right
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
}

function start() {
  translate(0, -img.height / 2);
  background(0);
  image(img, width / 2, height / 2);
}

function generateRandom() {
  let chances = [];
  push();
  start();
  // Up/down
  if (random(1) < 0.75) {
    chances.push(0.75);
    push();
    translateAndPlace('up');
    if (random(1) < 0.1) {
      chances.push(0.1);
      translateAndPlace('up');
    } else if (random(1) < 0.2) {
      chances.push(0.1);
      translateAndPlace('up-right');
    } else if (random(1) < 0.3) {
      chances.push(0.1);
      translateAndPlace('up-left');
    }
    pop();
  }
  if (random(1) < 0.75) {
    chances.push(0.75);
    push();
    translateAndPlace('down');
    if (random(1) < 0.1) {
      chances.push(0.1);
      translateAndPlace('down');
    } else if (random(1) < 0.2) {
      chances.push(0.1);
      translateAndPlace('down-right');
    } else if (random(1) < 0.3) {
      chances.push(0.1);
      translateAndPlace('down-left');
    }
    pop();
  }
  // Left/right
  if (random(1) < 0.25) {
    chances.push(0.25);
    push();
    translateAndPlace('left');
    if (random(1) < 0.1) {
      chances.push(0.1);
      translateAndPlace('left');
    } else if (random(1) < 0.2) {
      chances.push(0.1);
      translateAndPlace('up-left');
    } else if (random(1) < 0.3) {
      chances.push(0.1);
      translateAndPlace('down-left');
    }
    pop();
  } else if (random(1) < 0.75) {
    chances.push(0.5);
    if (random(1) < 0.75) {
      chances.push(0.75);
      push();
      translateAndPlace('up-left');
      if (random(1) < 0.1) {
        chances.push(0.1);
        translateAndPlace('left');
      } else if (random(1) < 0.2) {
        chances.push(0.1);
        translateAndPlace('up-left');
      } else if (random(1) < 0.3) {
        chances.push(0.1);
        translateAndPlace('up');
      }
      pop();
    }
    if (random(1) < 0.75) {
      chances.push(0.75);
      push();
      translateAndPlace('down-left');
      if (random(1) < 0.1) {
        chances.push(0.1);
        translateAndPlace('left');
      } else if (random(1) < 0.2) {
        chances.push(0.1);
        translateAndPlace('down-left');
      } else if (random(1) < 0.3) {
        chances.push(0.1);
        translateAndPlace('down');
      }
      pop();
    }
  }
  if (random(1) < 0.25) {
    chances.push(0.25);
    push();
    translateAndPlace('right');
    if (random(1) < 0.1) {
      chances.push(0.1);
      translateAndPlace('right');
    } else if (random(1) < 0.2) {
      chances.push(0.1);
      translateAndPlace('up-right');
    } else if (random(1) < 0.3) {
      chances.push(0.1);
      translateAndPlace('down-right');
    }
    pop();
  } else if (random(1) < 0.75) {
    chances.push(0.5);
    if (random(1) < 0.75) {
      chances.push(0.75);
      push();
      translateAndPlace('up-right');
      if (random(1) < 0.1) {
        chances.push(0.1);
        translateAndPlace('right');
      } else if (random(1) < 0.2) {
        chances.push(0.1);
        translateAndPlace('up-right');
      } else if (random(1) < 0.3) {
        chances.push(0.1);
        translateAndPlace('up');
      }
      pop();
    }
    if (random(1) < 0.75) {
      chances.push(0.75);
      push();
      translateAndPlace('down-right');
      if (random(1) < 0.1) {
        chances.push(0.1);
        translateAndPlace('right');
      } else if (random(1) < 0.2) {
        chances.push(0.1);
        translateAndPlace('down-right');
      } else if (random(1) < 0.3) {
        chances.push(0.1);
        translateAndPlace('down');
      }
      pop();
    }
  }
  pop();
  calculateChances(chances);
}

function calculateChances(chances) {
  let chance = 1;
  for (i in chances) {
    chance *= chances[i];
  }
  chance = Math.round(chance * 1000000) / 10000;
  chance_p.textContent = `${chance} %`;
}
