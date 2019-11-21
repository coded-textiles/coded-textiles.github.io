var inc = 0.1;
var scl = 200;
var speed = 0.0001;
var cols, rows;

function preload() {
    // img = loadImage('images/00.png');
    // img = loadImage('images/01.png');
    // img = loadImage('images/02.png');
    // img = loadImage('images/03.png');
    img = loadImage('images/04.png');
    // img = loadImage('images/05.png');
}

function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent('sketch-container');
    cols = floor(width / scl);
    rows = floor(height / scl);
    stroke(255);
    strokeWeight(1);
    var img_size = scl * 3;
    img.resize(img_size, img_size);
    imageMode(CENTER);
    makeControls();
}

function makeControls() {
    // Noise variation
	let incText = createP("Coordination");
	incSlider = createSlider(.0001, .15, .1, .0001); // min, max, default
	incText.parent('controls-container');
	incSlider.parent('controls-container');
    incSlider.class('slider');

    // Density
	let sclText = createP("Density");
	sclSlider = createSlider(200, 400, 200, 1); // min, max, default
	sclText.parent('controls-container');
	sclSlider.parent('controls-container');
    sclSlider.class('slider');

    // Speed
	let speedText = createP("Speed");
	speedSlider = createSlider(0.000001, 0.0002, 0.00005, 0.00001); // min, max, default
	speedText.parent('controls-container');
	speedSlider.parent('controls-container');
    speedSlider.class('slider');
}

function draw() {

    // Read sliders
    inc = incSlider.value();
    scl = sclSlider.value();
    speed = speedSlider.value();

    background(30);
    translate(-scl * 5, -scl * 5);
    
    var yoff = 0;
    var row = 0
    for (var y = 0; y < rows + 10; y++) {
        var xoff = 0;
        for (var  x = 0; x < cols + 10; x++) {
            var n = noise(xoff, yoff, millis() * speed);
            var nx = map(noise(xoff, millis() * speed), 0, 1, -scl * 3, scl * 3);
            var ny = map(noise(yoff, millis() * speed), 0, 1, -scl * 3, scl * 3);
            var angle = n * TWO_PI;
            var v = p5.Vector.fromAngle(angle * 2);
            xoff += inc;
            push();
            if (row % 2 === 0) {
                translate(scl / 2, 0);
            }
            translate(x * scl, y * scl);
            translate(nx, ny);
            rotate(v.heading());
            image(img, 0, 0);
            pop();
        }
        row++;
        yoff += inc;
    }
}
