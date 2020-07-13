let units = [];
let next_units = [];
let decoys = [];
let units_assembling = true;
let next_units_assembling = false;
const interval = 1900;
const lerp_speed_assemble = 0.007;
const lerp_speed_disassemble = 0.003;

function draw() {
  background(0);

  // DEV **********************************************
  // units = compose();
  // for (let i = 0; i < units.length; i++) {
  //   const u = units[i];
  //   // Draw
  //   image(u.image, u.destx, u.desty);
  // }
  // **************************************************

  // Interval mechanics
  if (frameCount === 1 || frameCount % interval === 0) {
    units = compose();
    units_assembling = true;
    next_units_assembling = false;
  } else if ((frameCount + interval * 0.5) % interval === 0) {
    units_assembling = false;
    next_units = compose();
    next_units_assembling = true;
    // Toggle for decoy effect
    // decoys = generateDecoyObjects();
  }

  // Draw the current composition, in its current state.
  if (units_assembling) {
    assemble(units);
  } else {
    disassemble(units);
  }

  if (next_units_assembling) {
    assemble(next_units);
  } else {
    disassemble(next_units);
  }

  // Toggle for decoy effect
  // assembleDecoys();
}

function assemble(units) {
  // background(0);
  for (let i = 0; i < units.length; i++) {
    const u = units[i];
    // Draw
    image(u.image, u.now.x, u.now.y);
    // Update
    u.now.x = lerp(u.now.x, u.destx, lerp_speed_assemble);
    u.now.y = lerp(u.now.y, u.desty, lerp_speed_assemble);
  }
}

function disassemble(units) {
  // background(0);
  for (let i = 0; i < units.length; i++) {
    const u = units[i];
    // Draw
    image(u.image, u.now.x, u.now.y);

    // Update
    u.now.x = lerp(u.now.x, u.end.x, lerp_speed_disassemble);
    u.now.y = lerp(u.now.y, u.end.y, lerp_speed_disassemble);
  }
}

// Starting position generator
function getStartPos() {
  const r = random(1);
  let x;
  let y;
  if (r < 0.25) {
    // left
    x = random(-600, -300);
    y = random(height);
  } else if (r < 0.5) {
    // right
    x = width + random(300, 600);
    y = random(height);
  } else if (r < 0.75) {
    // top
    x = random(width);
    y = random(-600, -300);
  } else {
    x = random(width);
    y = height + random(300, 600);
  }

  return { x: x, y: y };
}

function assembleDecoys() {
  // background(0);
  for (let i = 0; i < decoys.length; i++) {
    const u = decoys[i];
    // Draw
    image(u.image, u.now.x, u.now.y);

    // Update
    u.now.x = lerp(u.now.x, u.end.x, 0.01);
    u.now.y = lerp(u.now.y, u.end.y, 0.01);
  }
}
