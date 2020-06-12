function preload() {
  rb4_small = loadImage('../assets/small/RB4.png');
  rb4 = loadImage('../assets/RB4.png');
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  noLoop();

  rb4.resize(rb4.width * 0.045, rb4.height * 0.045);
  background(0);
  image(rb4_small, width / 2, height / 2);
  image(rb4, width / 2 - rb4.width * 1.25, height / 2);
}
