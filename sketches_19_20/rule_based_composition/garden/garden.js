let rb4;
let rb2;
let rb2l;
let rb2r;
let paused = false;
let long_branch_l_ok = true;
let long_branch_r_ok = true;

function preload() {
  rb1 = loadImage('../assets/RB1.png');
  rb4 = loadImage('../assets/RB4.png');
  rb2 = loadImage('../assets/RB2.png');
  rb2l = loadImage('../assets/RB2_45L.png');
  rb2r = loadImage('../assets/RB2_45R.png');
  rb5r = loadImage('../assets/RB5.png');
  rb5l = loadImage('../assets/RB5_180L.png');
  // rb5l = loadImage('../assets/RB5.png'); // temp solution for slow load
  rb7 = loadImage('../assets/RB7.png');
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  const scaler = 0.045;
  // Stem
  rb4.resize(rb4.width * scaler, rb4.height * scaler);
  rb2.resize(rb2.width * scaler, rb2.height * scaler);

  // Flower
  rb2r.resize(rb2r.width * scaler, rb2r.height * scaler);
  rb2l.resize(rb2l.width * scaler, rb2l.height * scaler);

  // Trunk
  rb5l.resize(rb5l.width * scaler * 1.25, rb5l.height * scaler * 1.25);
  rb5r.resize(rb5r.width * scaler * 1.25, rb5r.height * scaler * 1.25);

  // Leaf
  rb1.resize(rb1.width * scaler, rb1.height * scaler);

  // Bee
  rb7.resize(rb7.width * scaler, rb7.height * scaler);

  angleMode(DEGREES);
  noLoop();
}

function draw() {
  refresh();
}

/* Refresh ******************************************************/
function refresh() {
  background(0);

  // Bees
  const bee_counter = parseInt(bee_amt.value, 10) + 1;
  for (let i = 1; i < bee_counter; i++) {
    bee();
  }

  // Flowers
  const flower_counter = parseInt(flower_amt.value, 10) + 1;
  push();
  for (let i = 1; i < flower_counter; i++) {
    push();
    translate(random(width * 0.25, width * 0.75), height - rb2.height);
    stem();
    pop();
  }
  pop();

  // Trees
  const tree_counter = parseInt(tree_amt.value, 10) + 1;
  push();
  for (let i = 1; i < tree_counter; i++) {
    push();
    translate(random(width * 0.25, width * 0.75), height - rb5l.height);
    trunk();
    pop();
  }
  pop();
}

/* Trunk *******************************************************/
function trunk() {
  const trunk_len = Math.floor(random(2, 4));
  let trunk_width = random(1);
  for (let i = 0; i < trunk_len; i++) {
    if (random(1) < 0.5) {
      image(rb5r, 0, 0);
    } else {
      image(rb5l, 0, 0);
    }
    if (trunk_width > 0.5) {
      push();
      translate(rb5r.width, 0);
      if (random(1) < 0.5) {
        image(rb5r, 0, 0);
      } else {
        image(rb5l, 0, 0);
      }
      pop();
    }
    push();
    leaves(trunk_width);
    pop();
    translate(0, -rb5l.height);
  }
}

/* Leaves *******************************************************/
function leaves(trunk_width) {
  // Left
  if (random(1) < 0.5) {
    translate(-rb1.width, 0);
    image(rb1, 0, 0);
  }
  // Right
  else {
    translate(rb5l.width + rb1.width, 0);
    if (trunk_width > 0.5) {
      translate(rb5l.width, 0);
    }
    rotate(90);
    image(rb1, 0, 0);
  }
}

/* Bee *******************************************************/
function bee() {
  image(
    rb7,
    random(width * 0.1, width * 0.9),
    random(height * 0.1, height * 0.9)
  );
}

/* Stem ********************************************************/
function stem() {
  const stem_len = Math.floor(random(2, 5));
  for (let i = 0; i < stem_len; i++) {
    image(rb2, 0, 0);
    if (random(0, 1) < 0.5) {
      branch();
    }
    translate(0, -rb2.height);
  }
  flower();
}

/* Branch *****************************************************/
function branch() {
  push();
  const stem_len = Math.floor(random(1, 3));

  const dir = random(0, 1);
  if (dir < 0.5) {
    translate(rb2.height * 0.8, -rb2.height * 0.8);
    rotate(45);
  } else {
    translate(-rb2.height * 0.68, -rb2.height * 0.58);
    rotate(-45);
  }

  for (let i = 0; i < stem_len; i++) {
    image(rb2, 0, 0);
    translate(0, -rb2.height);
  }
  if (random(0, 1) < 0.9) {
    flower();
  }
  pop();
}

/* flower ********************************************************/
function flower() {
  push();
  translate(-rb4.width * 0.33, rb4.height * 0.08);
  image(rb4, 0, 0);
  grow_flower();
  pop();
}

function translateAndPlace(dir, img) {
  // Up, down, left, right
  switch (dir) {
    case 'up':
      translate(0, -img.height * 0.78);
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
  image(img, 0, 0);
}

function grow_flower() {
  push();

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

  pop();
}

/* Controls ****************************************************/
const refresh_button = document.getElementById('refresh');
refresh_button.addEventListener('click', refresh);

const flower_amt = document.getElementById('flower-amt');
const tree_amt = document.getElementById('tree-amt');
const bee_amt = document.getElementById('bee-amt');

flower_amt.value = '2';
tree_amt.value = '0';
bee_amt.value = '0';

console.log(flower_amt.value);
console.log(parseInt(flower_amt.value, 10));
