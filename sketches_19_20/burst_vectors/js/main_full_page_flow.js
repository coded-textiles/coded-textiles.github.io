var inc = 0.01;
var scl = 20;
var speed = 0.0008;
var cols, rows;

function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent('sketch-container');
    cols = floor(width / scl);
    rows = floor(height / scl);
    stroke(255);
    strokeWeight(1);
}

function draw() {
    background(30);
    var yoff = 0;
    for (var y = 0; y < rows; y++) {
        var xoff = 0;
        for (var  x = 0; x < cols; x++) {
            var angle = noise(xoff, yoff, millis() * speed) * TWO_PI;
            var v = p5.Vector.fromAngle(angle);
            xoff += inc;
            push();
            translate(x * scl, y * scl);
            rotate(v.heading());
            line(0, 0, scl, 0);
            pop();
        }
        yoff += inc;
    }
}