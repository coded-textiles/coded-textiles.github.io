let rb4;
let rb2;
let rb2l;
let rb2r;
let paused = false;
const pause_play_button = document.getElementById('pause-play');
let long_branch_l_ok = true;
let long_branch_r_ok = true;

function preload() {
  rb4 = loadImage('../assets/RB4.png');
  rb2 = loadImage('../assets/RB2.png');
  rb2l = loadImage('../assets/RB2_45L.png');
  rb2r = loadImage('../assets/RB2_45R.png');
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  rb4.resize(rb4.width / 25, rb4.height / 25);
  rb2.resize(rb2.width / 25, rb2.height / 25);
  rb2r.resize(rb2r.width / 25, rb2r.height / 25);
  rb2l.resize(rb2l.width / 25, rb2l.height / 25);
  // createControls();
  frameRate(0.5);
}

function draw() {
  if (!paused) {
    background(0);
    push();
    translate(-width / 4, 0);
    generateRandom();
    pop();

    push();
    translate(width / 6, 0);
    generateRandom();
    pop();
  }
}

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

function translateAndPlace(dir, img) {
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
  translate(0, -rb4.height / 2);
  image(rb4, width / 2, height / 2);
}

function generateRandom() {
  console.log('random');
  push();
  start();

  // Up/down
  if (random(1) < 0.75) {
    push();
    translateAndPlace('up', rb4);
    if (random(1) < 0.1) {
      translateAndPlace('up', rb4);
    } else if (random(1) < 0.2) {
      translateAndPlace('up-right', rb4);
    } else if (random(1) < 0.3) {
      translateAndPlace('up-left', rb4);
    }
    pop();
  }
  // Left/right
  if (random(1) < 0.25) {
    push();
    translateAndPlace('left', rb4);
    if (random(1) < 0.1) {
      translateAndPlace('left', rb4);
    } else if (random(1) < 0.2) {
      translateAndPlace('up-left', rb4);
    } else if (random(1) < 0.3) {
      translateAndPlace('down-left', rb4);
    }
    pop();
  } else if (random(1) < 0.75) {
    if (random(1) < 0.75) {
      push();
      translateAndPlace('up-left', rb4);
      if (random(1) < 0.1) {
        translateAndPlace('left', rb4);
      } else if (random(1) < 0.2) {
        translateAndPlace('up-left', rb4);
      } else if (random(1) < 0.3) {
        translateAndPlace('up', rb4);
      }
      pop();
    }
    if (random(1) < 0.75) {
      push();
      translateAndPlace('down-left', rb4);
      if (random(1) < 0.1) {
        translateAndPlace('left', rb4);
      } else if (random(1) < 0.2) {
        translateAndPlace('down-left', rb4);
      } else if (random(1) < 0.3) {
        translateAndPlace('down', rb4);
        long_branch_l_ok = false;
      }
      pop();
    }
  }
  if (random(1) < 0.25) {
    push();
    translateAndPlace('right', rb4);
    if (random(1) < 0.1) {
      translateAndPlace('right', rb4);
    } else if (random(1) < 0.2) {
      translateAndPlace('up-right', rb4);
    } else if (random(1) < 0.3) {
      translateAndPlace('down-right', rb4);
    }
    pop();
  } else if (random(1) < 0.75) {
    if (random(1) < 0.75) {
      push();
      translateAndPlace('up-right', rb4);
      if (random(1) < 0.1) {
        translateAndPlace('right', rb4);
      } else if (random(1) < 0.2) {
        translateAndPlace('up-right', rb4);
      } else if (random(1) < 0.3) {
        translateAndPlace('up', rb4);
      }
      pop();
    }
    if (random(1) < 0.75) {
      push();
      translateAndPlace('down-right', rb4);
      if (random(1) < 0.1) {
        translateAndPlace('right', rb4);
      } else if (random(1) < 0.2) {
        translateAndPlace('down-right', rb4);
        long_branch_r_ok = false;
      } else if (random(1) < 0.3) {
        translateAndPlace('down', rb4);
        long_branch_r_ok = false;
      }
      pop();
    }
  }
  // stem
  stem_count = 0;
  translate(rb2.width, 0);
  translate(0, rb2.width * 0.42);
  translateAndPlace('down', rb2);
  stem_count++;
  if (random(1) < 1) {
    translate(0, rb2.width * 0.5);
    translateAndPlace('down', rb2);
    stem_count++;

    // branch left
    if (random(1) < 0.5) {
      push();
      translate(rb2.width * 0.3, rb2.width * 1);
      translateAndPlace('left', rb2l);
      if (random(1) < 0.8 && long_branch_l_ok) {
        push();
        translate(-rb2.width * 0.2, -rb2.width * 1.2);
        translateAndPlace('up-left', rb2l);
        pop();
      }
      pop();
    }

    // branch right
    if (random(1) < 0.5) {
      push();
      translate(-rb2.width - rb2.width * 0.3, rb2.width * 1);
      translateAndPlace('right', rb2r);
      if (random(1) < 0.8 && long_branch_r_ok) {
        push();
        translate(rb2.width * 0.2, -rb2.width * 1.2);
        translateAndPlace('up-right', rb2r);
        pop();
      }
      pop();
    }

    if (random(1) < 1) {
      translate(0, rb2.width * 0.5);
      translateAndPlace('down', rb2);
      stem_count++;
    }
  }
  pop();
}
