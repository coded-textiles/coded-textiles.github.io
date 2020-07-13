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
  rb1_reflect_rotate_0 = loadImage('../assets/small/RB1_reflect_rotate_0.png'); // stalk leaf
  rb1_reflect_rotate_1 = loadImage('../assets/small/RB1_reflect_rotate_1.png'); // stalk leaf
  rb1_rotate_0 = loadImage('../assets/small/RB1_rotate_0.png'); // stalk leaf
  rb1_rotate_1 = loadImage('../assets/small/RB1_rotate_1.png'); // stalk leaf
  rb1_reflect = loadImage('../assets/small/RB1_reflect.png'); // stalk leaf
  rb5 = loadImage('../assets/small/RB5.png'); // stalk
  rb5_reflect = loadImage('../assets/small/RB5_180L.png'); // stalk reflected

  rb7 = loadImage('../assets/small/RB7.png'); // bee
}

function setup() {
  // Basics
  createCanvas(window.innerWidth, window.innerHeight);
  angleMode(DEGREES);
  frameRate(50);
  //   noLoop();
  //   decoys = generateDecoyObjects();
}
