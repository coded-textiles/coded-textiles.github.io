/* Draw using bursts of random (x, y) coordinates and
 * corresponding lines.
 *
 * Anna Garbier
 */

// Canvas
const canvasWidth = 650;
const canvasHeight = canvasWidth;
const backgroundColor = 255;
const lineWeight = .5;
const ellipseDiam = 8;

const hexBlack = "#000000";
const hexBlue = "#41C0DE";
const hexRed = "#EF4550";

let x;
let y;

function setup() {
	var canvas = createCanvas(canvasWidth, canvasHeight);
	canvas.parent('sketch-container');
	background(backgroundColor);
	fill(color(hexRed));
	strokeWeight(lineWeight);
	makeControlPanel();
}

function makeControlPanel() {
	// Make refresh button and sliders
	var button = createButton("Refresh sketch");
	button.parent('start-button-container');
	button.mousePressed(refreshSketch);

	// Frame rate
	var frameRateText = createP("Frames per second (1 to 100)");
	frameRateSlider = createSlider(1, 100, 90); // Default 90 frames / second
	frameRateText.parent('controls-container');
	frameRateSlider.parent('controls-container');
	frameRateSlider.class('slider');

	// Color
	var colorText = createP("Black and white or color");
	colorRadio = createRadio('name');
	colorRadio.option(' B/W  ', 0);
	colorRadio.option(' Color', 1);
	colorText.parent('controls-container');
	colorRadio.parent('controls-container');
	colorRadio._getInputChildrenArray()[0].checked = true; // Defualt b/w
	// colorRadio.class('radio');

	// Angle
	var angleText = createP("Black and white or color");
	angleRadio = createRadio('name');
	angleRadio.option(' 90 deg.  ', 0);
	angleRadio.option(' Random deg.', 1);
	angleText.parent('controls-container');
	angleRadio.parent('controls-container');
	angleRadio._getInputChildrenArray()[1].checked = true; // Defualt random
	// angleRadio.class('radio');
}

function drawLines() {
	if (angleRadio._getInputChildrenArray()[0].checked == true) {
		line(x - canvasWidth, y, x + canvasWidth, y); // Horizontal line
		line(x, y - canvasWidth, x, y + canvasWidth); //  Vertical line
	} else {
		tempRand = random(-canvasWidth, canvasWidth);
		line(x - canvasWidth, y - tempRand, x + canvasWidth, y + tempRand); // Horizontal line
		line(x - tempRand, y - canvasWidth, x + tempRand, y + canvasWidth); //  Vertical line
	}
}

function drawBusrt() {
	x = random(0, canvasWidth);
	y = random(0, canvasHeight);

	if (colorRadio._getInputChildrenArray()[0].checked == true) {
		stroke(color(hexBlack));
		drawLines();
	} else {
		stroke(color(hexBlue));
		drawLines();
		stroke(color(hexRed));
		ellipse(x, y, ellipseDiam, ellipseDiam);
	}
}

function draw() {
	frameRate(frameRateSlider.value());
	drawBusrt();
}

function refreshSketch() {
	background(backgroundColor);
}
