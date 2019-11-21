var inc = 0.01;
var scl = 130;
var speed = 0.0001;
var cols, rows;

function preload() {
    // img = loadImage('images/02.png');
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
    // noFill();
    fill(250, 90);
    // angleMode(DEGREES);
    img.resize(scl * 1.5, scl * 1.5);
    imageMode(CENTER);
}

function draw() {
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
