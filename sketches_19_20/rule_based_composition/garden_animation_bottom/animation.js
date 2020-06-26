let rb2;
let stem_objects = [];
let flower_objects = [];
let stalk_objects = [];
let bee_objects = [];
let all_objects = [];

function preload() {
  rb2 = loadImage('../assets/small/RB2.png'); // stem
  rb2_l = loadImage('../assets/small/RB2_45L.png'); // branch left
  rb2_r = loadImage('../assets/small/RB2_45R.png'); // branch right
  rb4 = loadImage('../assets/small/RB4.png'); // flower
  rb4_l = loadImage('../assets/small/RB4_45L.png'); // flower left
  rb4_r = loadImage('../assets/small/RB4_45R.png'); // flower right

  rb1 = loadImage('../assets/small/RB1.png'); // stalk leaf
  rb1_reflect = loadImage('../assets/small/RB1_reflect.png'); // stalk leaf
  rb5 = loadImage('../assets/small/RB5.png'); // stalk
  rb5_reflect = loadImage('../assets/small/RB5_180L.png'); // stalk reflected

  rb7 = loadImage('../assets/small/RB7.png'); // bee
}

function setup() {
  // Basics
  createCanvas(window.innerWidth, window.innerHeight);
  angleMode(DEGREES);
  frameRate(60);
}

function draw() {
  background(0);
  drawStemObjects();
}

function drawStemObjects() {
  for (let i = 0; i < all_objects.length; i++) {
    this_object = all_objects[i];
    this_object.nowx = lerp(this_object.nowx, this_object.x, 0.02);
    this_object.nowy = lerp(this_object.nowy, this_object.y, 0.02);
    image(this_object.image, this_object.nowx, this_object.nowy);
  }
}

// Unit class definition ********************************************
class Unit {
  constructor(_image, _x, _y) {
    this.image = _image;
    this.x = _x;
    this.y = _y;
    const r = random(1);
    if (r < 0.0) {
      // left
      this.startx = -200;
      this.starty = random(height);
    } else if (r < 0.0) {
      // right
      this.startx = width + 200;
      this.starty = random(height);
    } else if (r < 0.0) {
      // top
      this.startx = random(width);
      this.starty = -200;
    } else if (r < 1) {
      // bottom
      this.startx = random(width);
      this.starty = height + 200;
    }

    this.nowx = this.startx;
    this.nowy = this.starty;
  }
}

// Generate and draw stem objects ************************************
// + Generate and draw flower objects
// + Generate branch objects
function generateStemObjects() {
  let x = width / 2 + random(-width * 0.25, width * 0.25);
  let y = height - rb2.height;
  const nstem = Math.floor(random(2, 5));

  for (let i = 0; i < nstem; i++) {
    stem_objects.push(new Unit(rb2, x, y));
    y -= rb2.height;
    if (random(1) < 0.4) {
      generateBranchObjects('left', x, y);
    }
    if (random(1) < 0.4) {
      generateBranchObjects('right', x, y);
    }
  }

  generateFlowerObjects(x, y);
}

// Generate and draw branch objects *********************************
function generateBranchObjects(dir, startx, starty) {
  x = startx - rb4.width * 0.33;
  y = starty + rb4.height * 0.05;
  let img;

  if (dir == 'right') {
    x += rb2.width * 1.5;
    y += rb2.height * 0.3;
    img = rb2_r;
    stem_objects.push(new Unit(img, x, y));

    const nbranch = Math.floor(random(0, 4));
    for (let i = 0; i < nbranch; i++) {
      x += rb2.height * 0.69;
      y -= rb2.height * 0.69;
      stem_objects.push(new Unit(img, x, y));
    }
    generateBranchFlowerObjects('right', x, y);
  } else if (dir == 'left') {
    x -= rb2.width * 0.65;
    y += rb2.height * 0.3;
    img = rb2_l;
    stem_objects.push(new Unit(img, x, y));

    const nbranch = Math.floor(random(0, 4));
    for (let i = 0; i < nbranch; i++) {
      x -= rb2.height * 0.69;
      y -= rb2.height * 0.69;
      stem_objects.push(new Unit(img, x, y));
    }
    generateBranchFlowerObjects('left', x, y);
  }

  x = startx;
  y = starty;
}

// Generate and draw flower objects *********************************
function generateFlowerObjects(startx, starty) {
  x = startx - rb4.width * 0.33;
  y = starty + rb4.height * 0.05;

  function move(dir) {
    if (dir == 'right') {
      x = x + rb4.width;
    } else if (dir == 'left') {
      x = x - rb4.width;
    } else if (dir == 'up') {
      y = y - rb4.height * 0.8;
    } else if (dir == 'down') {
      y = y + rb4.height * 0.8;
    } else if (dir == 'up-right') {
      x = x + rb4.width * 0.85;
      y = y - rb4.height * 0.4;
    } else if (dir == 'down-right') {
      x = x + rb4.width * 0.85;
      y = y + rb4.height * 0.4;
    } else if (dir == 'up-left') {
      x = x - rb4.width * 0.85;
      y = y - rb4.height * 0.4;
    } else if (dir == 'down-left') {
      x = x - rb4.width * 0.85;
      y = y + rb4.height * 0.4;
    }
    flower_objects.push(new Unit(rb4, x, y));
  }

  function growFlower() {
    flower_objects.push(new Unit(rb4, x, y));
    // Up/down
    if (random(1) < 0.75) {
      move('up');
      if (random(1) < 0.1) {
        move('up');
      } else if (random(1) < 0.2) {
        move('up-right');
      } else if (random(1) < 0.3) {
        move('up-left');
      }
      x = startx - rb4.width * 0.33;
      y = starty + rb4.height * 0.05;
    }

    // Left/right
    if (random(1) < 0.25) {
      move('left');
      if (random(1) < 0.1) {
        move('left');
      } else if (random(1) < 0.2) {
        move('up-left');
      } else if (random(1) < 0.3) {
        move('down-left');
      }
      x = startx - rb4.width * 0.33;
      y = starty + rb4.height * 0.05;
    } else if (random(1) < 0.75) {
      if (random(1) < 0.75) {
        move('up-left');
        if (random(1) < 0.1) {
          move('left');
        } else if (random(1) < 0.2) {
          move('up-left');
        } else if (random(1) < 0.3) {
          move('up');
        }
        x = startx - rb4.width * 0.33;
        y = starty + rb4.height * 0.05;
      }

      if (random(1) < 0.75) {
        move('down-left');
        if (random(1) < 0.1) {
          move('left');
        } else if (random(1) < 0.2) {
          move('down-left');
        } else if (random(1) < 0.3) {
          move('down');
          long_branch_l_ok = false;
        }
        x = startx - rb4.width * 0.33;
        y = starty + rb4.height * 0.05;
      }
    }

    if (random(1) < 0.25) {
      move('right');
      if (random(1) < 0.1) {
        move('right');
      } else if (random(1) < 0.2) {
        move('up-right');
      } else if (random(1) < 0.3) {
        move('down-right');
      }
      x = startx - rb4.width * 0.33;
      y = starty + rb4.height * 0.05;
    } else if (random(1) < 0.75) {
      if (random(1) < 0.75) {
        move('up-right');
        if (random(1) < 0.1) {
          move('right');
        } else if (random(1) < 0.2) {
          move('up-right');
        } else if (random(1) < 0.3) {
          move('up');
        }
        x = startx - rb4.width * 0.33;
        y = starty + rb4.height * 0.05;
      }

      if (random(1) < 0.75) {
        move('down-right');
        if (random(1) < 0.1) {
          move('right');
        } else if (random(1) < 0.2) {
          move('down-right');
          long_branch_r_ok = false;
        } else if (random(1) < 0.3) {
          move('down');
          long_branch_r_ok = false;
        }
        x = startx - rb4.width * 0.33;
        y = starty + rb4.height * 0.05;
      }
    }

    x = startx - rb4.width * 0.33;
    y = starty + rb4.height * 0.05;
  }

  growFlower();
}

// Generate and draw flower objects *********************************
function generateBranchFlowerObjects(branch_dir, startx, starty) {
  let resetx, resety;
  if (branch_dir == 'left') {
    img = rb4_l;
    resetx = startx - rb4.width * 0.91;
    resety = starty - rb4.height * 0.87;
  } else {
    img = rb4_r;
    resetx = startx + rb4.width * 0.65;
    resety = starty - rb4.height * 0.85;
  }

  x = resetx;
  y = resety;

  function move(dir) {
    if (branch_dir == 'left') {
      if (dir == 'right') {
        x = x + rb4.width * 0.69;
        y = y - rb4.height * 0.67;
      } else if (dir == 'left') {
        x = x - rb4.width * 0.69;
        y = y + rb4.height * 0.67;
      } else if (dir == 'up') {
        x = x - rb4.width * 0.57;
        y = y - rb4.height * 0.54;
      } else if (dir == 'down') {
        x = x + rb4.width * 0.57;
        y = y + rb4.height * 0.54;
      } else if (dir == 'up-right') {
        x = x + rb4.width * 0.3;
        y = y - rb4.height * 0.855;
      } else if (dir == 'down-right') {
        x = x + rb4.width * 0.9;
        y = y - rb4.height * 0.3;
      } else if (dir == 'up-left') {
        x = x - rb4.width * 0.9;
        y = y + rb4.height * 0.3;
      } else if (dir == 'down-left') {
        x = x - rb4.width * 0.3;
        y = y + rb4.height * 0.855;
      }
      flower_objects.push(new Unit(img, x, y));
    } else {
      if (dir == 'right') {
        x = x + rb4.width * 0.71;
        y = y + rb4.height * 0.68;
      } else if (dir == 'left') {
        x = x - rb4.width * 0.71;
        y = y - rb4.height * 0.68;
      } else if (dir == 'up') {
        x = x + rb4.width * 0.57;
        y = y - rb4.height * 0.55;
      } else if (dir == 'down') {
        x = x - rb4.width * 0.57;
        y = y + rb4.height * 0.55;
      } else if (dir == 'up-right') {
        x = x + rb4.width * 0.88;
        y = y + rb4.height * 0.28;
      } else if (dir == 'down-right') {
        x = x + rb4.width * 0.3;
        y = y + rb4.height * 0.85;
      } else if (dir == 'up-left') {
        x = x - rb4.width * 0.3;
        y = y - rb4.height * 0.85;
      } else if (dir == 'down-left') {
        x = x - rb4.width * 0.88;
        y = y - rb4.height * 0.28;
      }
      flower_objects.push(new Unit(img, x, y));
    }
  }

  function growFlower() {
    flower_objects.push(new Unit(img, x, y));
    // Up/down
    if (random(1) < 0.75) {
      move('up');
      if (random(1) < 0.1) {
        move('up');
      } else if (random(1) < 0.2) {
        move('up-right');
      } else if (random(1) < 0.3) {
        move('up-left');
      }
      x = resetx;
      y = resety;
    }

    // Left/right
    if (random(1) < 0.25) {
      move('left');
      if (random(1) < 0.1) {
        move('left');
      } else if (random(1) < 0.2) {
        move('up-left');
      } else if (random(1) < 0.3) {
        move('down-left');
      }
      x = resetx;
      y = resety;
    } else if (random(1) < 0.75) {
      if (random(1) < 0.75) {
        move('up-left');
        if (random(1) < 0.1) {
          move('left');
        } else if (random(1) < 0.2) {
          move('up-left');
        } else if (random(1) < 0.3) {
          move('up');
        }
        x = resetx;
        y = resety;
      }

      if (random(1) < 0.75) {
        move('down-left');
        if (random(1) < 0.1) {
          move('left');
        } else if (random(1) < 0.2) {
          move('down-left');
        } else if (random(1) < 0.3) {
          move('down');
          long_branch_l_ok = false;
        }
        x = resetx;
        y = resety;
      }
    }

    if (random(1) < 0.25) {
      move('right');
      if (random(1) < 0.1) {
        move('right');
      } else if (random(1) < 0.2) {
        move('up-right');
      } else if (random(1) < 0.3) {
        move('down-right');
      }
      x = resetx;
      y = resety;
    } else if (random(1) < 0.75) {
      if (random(1) < 0.75) {
        move('up-right');
        if (random(1) < 0.1) {
          move('right');
        } else if (random(1) < 0.2) {
          move('up-right');
        } else if (random(1) < 0.3) {
          move('up');
        }
        x = resetx;
        y = resety;
      }

      if (random(1) < 0.75) {
        move('down-right');
        if (random(1) < 0.1) {
          move('right');
        } else if (random(1) < 0.2) {
          move('down-right');
          long_branch_r_ok = false;
        } else if (random(1) < 0.3) {
          move('down');
          long_branch_r_ok = false;
        }
        x = resetx;
        y = resety;
      }
    }

    x = resetx;
    y = resety;
  }

  growFlower();
}

// Stalk objects ************************************************
function generateStalkObjects() {
  let x = random(width);
  let y = height - rb5.height;
  const nstalk = Math.floor(random(2, 4));
  let stalk_img = rb5;

  // main
  if (random(1) > 0.5) {
    stalk_img = rb5_reflect;
  }
  for (let i = 0; i < nstalk; i++) {
    stalk_objects.push(new Unit(stalk_img, x, y));
    if (random(1) < 0.2) {
      stalk_objects.push(new Unit(rb1, x - rb5.width * 1.6, y));
    }
    y -= stalk_img.height;
  }

  // optional
  if (random(1) < 0.6) {
    if (stalk_img == rb5) {
      stalk_img = rb5_reflect;
    } else {
      stalk_img = rb5;
    }
    let y = height - rb5.height;
    for (let i = 0; i < nstalk; i++) {
      // right stalk
      stalk_objects.push(new Unit(stalk_img, x + rb5.width, y));
      if (random(1) < 0.25) {
        stalk_objects.push(new Unit(rb1_reflect, x + rb5.width * 2.1, y));
      }
      y -= stalk_img.height;
    }
  }
}

// Bee objects ************************************************
function generateBeeObjects() {
  let x = random(width);
  let y = random(height * 0.4);
  bee_objects.push(new Unit(rb7, x, y));
}

// Utility functions ************************************************
function shuf(array) {
  array.sort(() => Math.random() - 0.5);
}

// Refresh
const break_button = document.getElementById('break');
break_button.addEventListener('click', function () {
  disassemble();
});

const build_button = document.getElementById('build');
build_button.addEventListener('click', function () {
  assemble();
});

function assemble() {
  // // generate new
  push();
  // translate(0, -rb2.height * 0.3);
  background(0);
  stem_objects = [];
  flower_objects = [];
  stalk_objects = [];
  bee_objects = [];
  all_objects = [];
  pop();

  const nstems = Math.floor(random(1, 3));
  const nstalks = Math.floor(random(1, 3));
  const nbees = Math.floor(random(1, 2));

  for (let i = 0; i < nstems; i++) {
    generateStemObjects();
  }

  for (let i = 0; i < nstalks; i++) {
    generateStalkObjects();
  }

  for (let i = 0; i < nbees; i++) {
    generateBeeObjects();
  }

  all_objects = stem_objects
    .concat(flower_objects)
    .concat(stalk_objects)
    .concat(bee_objects);
  shuf(all_objects);
}

function disassemble() {
  // disperse all
  for (let i = 0; i < all_objects.length; i++) {
    this_object = all_objects[i];
    const swapx = this_object.x;
    const swapy = this_object.y;
    const swapstartx = this_object.startx;
    const swapstarty = this_object.starty;

    this_object.x = swapstartx;
    this_object.y = swapstarty;
    this_object.startx = swapx;
    this_object.starty = swapy;
  }
}
