var inc = 0.01;
var scl = 120;
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
    var yoff = 0;
    for (var y = 0; y < rows + 2; y++) {
        var xoff = 0;
        for (var  x = 0; x < cols + 1; x++) {
            var angle = noise(xoff, yoff, millis() * speed) * TWO_PI;
            var v = p5.Vector.fromAngle(angle * 2);
            xoff += inc;
            push();
            translate(x * scl, y * scl);
            rotate(v.heading());
            // line(0, 0, scl, 0);
            // rect(0, 0, scl, scl);
            image(img, 0, 0);
            pop();
        }
        yoff += inc;
    }
}
