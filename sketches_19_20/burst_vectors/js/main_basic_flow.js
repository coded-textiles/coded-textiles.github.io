inc = 0.01;
scl = 20;
var cols, rows;

function setup() {
    canvas = createCanvas(500, 500);
    canvas.parent('sketch-container');
    cols = floor(width / scl);
    rows = floor(height / scl);
}

function draw() {
    background(255);
    randomSeed(10);
    var yoff = 0;
    for (var y = 0; y < rows; y++) {
        var xoff = 0;
        for (var  x = 0; x < cols; x++) {
            // var index = (x + y * width) * 4;
            // var r = noise(xoff, yoff) * 255;
            var angle = noise(xoff, yoff) * TWO_PI;
            var v = p5.Vector.fromAngle(angle);
            xoff += inc;
            stroke(0);
            push();
            translate(x * scl, y * scl);
            rotate(v.heading());
            line(0, 0, scl, 0);
            pop();
        }
        yoff += inc;
    }
}