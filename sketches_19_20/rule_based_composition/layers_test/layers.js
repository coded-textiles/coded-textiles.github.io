let rb2;
let stem_objects = [];
let flower_objects = [];
let all_objects = [];

function preload() {
  rb2 = loadImage('../assets/RB2.png'); // stem
  rb2_l = loadImage('../assets/RB2_45L.png'); // branch left
  rb2_r = loadImage('../assets/RB2_45R.png'); // branch right
  rb4 = loadImage('../assets/RB4.png'); // flower
  rb4_l = loadImage('../assets/RB4_45L.png'); // flower left
  rb4_r = loadImage('../assets/RB4_45R.png'); // flower right
}

function setup() {
  // Basics
  createCanvas(window.innerWidth, window.innerHeight);
  const scaler = 0.045;
  angleMode(DEGREES);
  noLoop();

  // Flower stem
  rb2.resize(rb2.width * scaler, rb2.height * scaler);
  rb2_l.resize(rb2_l.width * scaler, rb2_l.height * scaler);
  rb2_r.resize(rb2_r.width * scaler, rb2_r.height * scaler);
  rb4.resize(rb4.width * scaler, rb4.height * scaler);
  rb4_l.resize(rb4_l.width * scaler, rb4_l.height * scaler);
  rb4_r.resize(rb4_r.width * scaler, rb4_r.height * scaler);

  // Main call
  push();
  // translate(0, -rb2.height * 0.3);
  background(0);
  stem_objects = [];
  flower_objects = [];
  pop();
}

function draw() {
  draw_garden();
}

function draw_garden() {
  generateStemObjects();
  drawStemObjects();
}

// Unit class definition ********************************************
class Unit {
  constructor(_image, _x, _y) {
    this.image = _image;
    this.x = _x;
    this.y = _y;
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

function drawStemObjects() {
  all_objects = stem_objects.concat(flower_objects);
  shuf(all_objects);
  for (let i = 0; i < all_objects.length; i++) {
    this_object = all_objects[i];
    image(this_object.image, this_object.x, this_object.y);
  }
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

// Utility functions ************************************************
function shuf(array) {
  array.sort(() => Math.random() - 0.5);
}

// Refresh
const refresh_button = document.getElementById('refresh');
refresh_button.addEventListener('click', function () {
  stem_objects = [];
  flower_objects = [];
  all_objects = [];
  for (let i = 0; i < 1; i++) {
    push();
    // translate(0, -rb2.height * 0.3);
    background(0);
    draw_garden();
    pop();
  }
});
