// Unit class definition ********************************************
class Unit {
  constructor(_image, _destx, _desty) {
    this.image = _image;
    // Start positions
    this.start = getStartPos();
    // Now positions
    this.now = this.start;
    // Dest positions
    this.destx = _destx;
    this.desty = _desty;
    // End positions
    this.end = getStartPos();
  }
}

// Generate and draw stem objects ************************************
// + Generate and draw flower objects
// + Generate branch objects
function generateStemObjects() {
  let x = random(width);
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
    if (random(1) < 0.5) {
      move('up');
      if (random(1) < 0.1) {
        move('up');
      } else if (random(1) < 0.1) {
        move('up-right');
      } else if (random(1) < 0.1) {
        move('up-left');
      }
      x = startx - rb4.width * 0.33;
      y = starty + rb4.height * 0.05;
    }

    // Left/right
    if (random(1) < 0.1) {
      move('left');
      if (random(1) < 0.05) {
        move('left');
      } else if (random(1) < 0.1) {
        move('up-left');
      } else if (random(1) < 0.15) {
        move('down-left');
      }
      x = startx - rb4.width * 0.33;
      y = starty + rb4.height * 0.05;
    } else if (random(1) < 0.5) {
      if (random(1) < 0.5) {
        move('up-left');
        if (random(1) < 0.05) {
          move('left');
        } else if (random(1) < 0.1) {
          move('up-left');
        } else if (random(1) < 0.15) {
          move('up');
        }
        x = startx - rb4.width * 0.33;
        y = starty + rb4.height * 0.05;
      }

      if (random(1) < 0.75) {
        move('down-left');
        if (random(1) < 0.05) {
          move('left');
        } else if (random(1) < 0.1) {
          move('down-left');
        } else if (random(1) < 0.15) {
          move('down');
          long_branch_l_ok = false;
        }
        x = startx - rb4.width * 0.33;
        y = starty + rb4.height * 0.05;
      }
    }

    if (random(1) < 0.1) {
      move('right');
      if (random(1) < 0.05) {
        // end test
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

    // Stalk branch 1
    if (random() < 0.4) {
      stalk_objects.push(new Unit(rb1, x - rb5.width * 1.6, y));
      // Stalk branch 2 - always
      if (random() < 1) {
        stalk_objects.push(
          new Unit(
            rb1,
            x - rb5.width * 1.6 - rb1.width * 0.95,
            y - rb1.height * 0.95
          )
        );
        // Stalk branch 3
        if (random() < 0.6) {
          stalk_objects.push(
            new Unit(
              rb1,
              x - rb5.width * 1.6 - rb1.width * 1.9,
              y - rb1.height * 1.9
            )
          );
          // Stalk branch end
          if (random() < 1) {
            stalk_objects.push(
              new Unit(
                rb1_rotate_0,
                x - rb5.width * 1.6 - rb1.width * 3.15,
                y - rb1.height * 2.4
              )
            );
          }
          if (random() < 1) {
            stalk_objects.push(
              new Unit(
                rb1_rotate_1,
                x - rb5.width * 1.6 - rb1.width * 2.3,
                y - rb1.height * 3.08
              )
            );
          }
        } else {
          // Stalk branch end
          if (random() < 1) {
            stalk_objects.push(
              new Unit(
                rb1_rotate_0,
                x - rb5.width * 1.6 - rb1.width * 2.18,
                y - rb1.height * 1.45
              )
            );
          }
          if (random() < 1) {
            stalk_objects.push(
              new Unit(
                rb1_rotate_1,
                x - rb5.width * 1.6 - rb1.width * 1.329,
                y - rb1.height * 2.12
              )
            );
          }
        }
      }
    }

    y -= stalk_img.height;
  }

  // optional
  if (random(1) < 1) {
    if (stalk_img == rb5) {
      stalk_img = rb5_reflect;
    } else {
      stalk_img = rb5;
    }

    let y = height - rb5.height;
    for (let i = 0; i < nstalk; i++) {
      // right stalk
      stalk_objects.push(new Unit(stalk_img, x + rb5.width, y));

      if (random(1) < 0.4) {
        stalk_objects.push(new Unit(rb1_reflect, x + rb5.width * 2.1, y));
        // Stalk branch 2 - always
        if (random() < 1) {
          stalk_objects.push(
            new Unit(
              rb1_reflect,
              x + rb5.width * 1.6 + rb1.width * 1.255,
              y - rb1.height * 0.95
            )
          );
          // Stalk branch 3
          if (random() < 0.6) {
            stalk_objects.push(
              new Unit(
                rb1_reflect,
                x + rb5.width * 1.6 + rb1.width * 2.2,
                y - rb1.height * 1.9
              )
            );
            // Stalk branch end
            if (random() < 1) {
              stalk_objects.push(
                new Unit(
                  rb1_reflect_rotate_0,
                  x + rb5.width * 1.6 + rb1.width * 3.16,
                  y - rb1.height * 2.4
                )
              );
            }
            if (random() < 1) {
              stalk_objects.push(
                new Unit(
                  rb1_reflect_rotate_1,
                  x + rb5.width * 1.6 + rb1.width * 2.27,
                  y - rb1.height * 3.08
                )
              );
            }
          } else {
            // Stalk branch end
            if (random() < 1) {
              stalk_objects.push(
                new Unit(
                  rb1_reflect_rotate_0,
                  x + rb5.width * 1.6 + rb1.width * 2.23,
                  y - rb1.height * 1.47
                )
              );
            }
            if (random() < 1) {
              stalk_objects.push(
                new Unit(
                  rb1_reflect_rotate_1,
                  x + rb5.width * 1.6 + rb1.width * 1.329,
                  y - rb1.height * 2.12
                )
              );
            }
          }
        }
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

function compose() {
  // generate new
  push();
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

  return all_objects;
}

// Generate decoy units ***************************************
function generateDecoyObjects() {
  for (let i = 0; i < 10; i++) {
    const r = random(1);
    let img;
    if (r < 0.2) {
      img = rb1;
    } else if (r < 0.5) {
      img = rb2;
    } else if (r < 0.7) {
      img = rb4;
    } else if (r < 0.9) {
      img = rb5;
    } else {
      img = rb7;
    }
    const new_u = new Unit(img, random(width), random(height));
    new_u.end = getStartPos();
    decoys.push(new_u);
  }

  return decoys;
}

// Utility functions ************************************************
function shuf(array) {
  array.sort(() => Math.random() - 0.5);
}
