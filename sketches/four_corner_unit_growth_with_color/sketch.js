/* Generate a square with internal Bezier curves.
 * Then systemmatically reflect that square to create
 * larger, symmetrical squares of increasing complexity.
 *
 * TODO:
 * 1) This is clumsily written; make it scalable.
 * 2) Show starter unit on side
 *
 * Anna Garbier
 */

const canvasWidth = 725;
const canvasHeight = 725;

let borderStrokeColor = 220;
const backgroundColor = 255;

let squareDiagonal = 175;
let squareWidth;
let squareWidthHalved;
let bezierRandomValue;

let rotateAngle = 45;

let cornerCounter = 0;
let cycleCounter = 0;
// let masterCycleCounter = 0;

let bezierAnchor;

let framesPerSecond = 10;
// const frameRateIncrement = .25;

// Variables for storing coordinates
var endPointA = [];
var endPointB = [];
var endPointC = [];
var endPointD = [];
var randomFloat = [];

function setup() {
	var canvas = createCanvas(canvasWidth, canvasHeight);
	canvas.parent('sketch-container');
	background(backgroundColor);
	noFill();
	frameRate(framesPerSecond);
	angleMode(DEGREES);
	squareWidth = squareDiagonal / sqrt(2);
	squareWidthHalved = squareWidth / 2;

	// Generate some random floats for later
	for (i = 0; i < 5; i++) {
		randomFloat[i] = random(0, .9 * squareWidth);
		console.log(random[i]);
	}

	// Create control sliders
	// Make refresh button and sliders
	var button = createButton("Refresh sketch");
	button.parent('start-button-container');
	button.mousePressed(refreshSketch);

	// Tilt
	// var rotateAngleText = createP("Rotation angle (0 to 45 deg.)");
	// rotateAngleSlider = createSlider(0, 45, 45);
	// rotateAngleText.parent('controls-container');
	// rotateAngleSlider.parent('controls-container');
	// rotateAngleSlider.class('slider');

	// Connector color - red
	var redText = createP("Connector color (red)");
	redSlider = createSlider(0, 255, 0);
	redText.parent('controls-container');
	redSlider.parent('controls-container');
	redSlider.class('slider');

	// Connector color - green
	var greenText = createP("Connector color (green)");
	greenSlider = createSlider(0, 255, 0);
	greenText.parent('controls-container');
	greenSlider.parent('controls-container');
	greenSlider.class('slider');

	// Connector color - blue
	var blueText = createP("Connector color (blue)");
	blueSlider = createSlider(0, 255, 0);
	blueText.parent('controls-container');
	blueSlider.parent('controls-container');
	blueSlider.class('slider');

	// Border color
	var borderColorText = createP("Border color (black to white)");
	squareStrokeColorSlider = createSlider(0, 255, 220);
	borderColorText.parent('controls-container');
	squareStrokeColorSlider.parent('controls-container');
	squareStrokeColorSlider.class('slider');

	// Frame rate
	var frameRateText = createP("Frames per second (1 to 100)");
	frameRateSlider = createSlider(1, 100, 10);
	frameRateText.parent('controls-container');
	frameRateSlider.parent('controls-container');
	frameRateSlider.class('slider');
}

function draw() {
	rotate(rotateAngle);
	translate(squareDiagonal * 1.5, - squareDiagonal * 1.5);
	drawSixteenBlocks();
	console.log("Cycle: " + cycleCounter);
	console.log("Corner: " + cornerCounter);
	// console.log("Frames per Second: " + framesPerSecond);
}

// Custom functions
function drawBorder(startX, startY) {
	stroke(squareStrokeColorSlider.value());
	rect(startX, startY, squareWidth, squareWidth);
}

function drawBezier(startX, startY, endX, endY, bezierAnchorX, bezierAnchorY) {
	frameRate(frameRateSlider.value());
	stroke(color(redSlider.value(), greenSlider.value(), blueSlider.value()));
	// Connect the corner at (startX, startY) to a random
	// point on one of two opposite edges (endX, endY) using a
	// Bezier curve.
	bezier(startX,
		startY,
		bezierAnchorX,
		bezierAnchorY,
		bezierAnchorX,
		bezierAnchorY,
		endX,
		endY);
}

// function increaseFrameRate() {
// 	framesPerSecond = framesPerSecond + frameRateIncrement;
// }

function drawBlock0() {
 	if (cornerCounter == 0) {
		drawBorder(0, 0);
		bezierX = squareWidth / 2;
		bezierY = squareWidth / 2;
		cornerCounter++;
	}
	else if (cornerCounter == 1) {
		startX = 0;
		startY = 0;
		endPointA[0] = squareWidth;
		endPointA[1] = randomFloat[0];
		drawBezier(startX, startY, endPointA[0], endPointA[1], bezierX, bezierY);
		cornerCounter++;
	} else if (cornerCounter == 2) {
		startX = squareWidth;
		startY = 0;
		endPointB[0] = randomFloat[1];
		endPointB[1] = squareWidth;
		drawBezier(startX, startY, endPointB[0], endPointB[1], bezierX, bezierY);
		cornerCounter++;
	} else if (cornerCounter == 3) {
		startX = squareWidth;
		startY = squareWidth;
		endPointC[0] = 0;
		endPointC[1] = randomFloat[2];
		drawBezier(startX, startY, endPointC[0], endPointC[1], bezierX, bezierY);
		cornerCounter++;
	} else if (cornerCounter == 4) {
		startX = 0;
		startY = squareWidth;
		endPointD[0] = randomFloat[3];
		endPointD[1] = 0;
		drawBezier(startX, startY, endPointD[0], endPointD[1], bezierX, bezierY);
		console.log("drawBlock complete");
		cornerCounter++;
	}
 }

function drawBlock1() {
 	if (cornerCounter == 5) {
		drawBorder(squareWidth, 0);
		bezierX = (squareWidth / 2) * 3;
		bezierY = squareWidth / 2;
		cornerCounter++;
	}
	else if (cornerCounter == 6) {
		startX = squareWidth;
		startY = 0;
		endPointB[0] = (2 * squareWidth) - endPointB[0];
		drawBezier(startX, startY, endPointB[0], endPointB[1], bezierX, bezierY);
		cornerCounter++;
	} else if (cornerCounter == 7) {
		startX = 2 * squareWidth;
		startY = 0;
		drawBezier(startX, startY, endPointA[0], endPointA[1], bezierX, bezierY);
		cornerCounter++;
	} else if (cornerCounter == 8) {
		startX = 2 * squareWidth;
		startY = squareWidth;
		endPointD[0] = endPointD[0] + ((squareWidth - endPointD[0]) * 2);
		drawBezier(startX, startY, endPointD[0], endPointD[1], bezierX, bezierY);
		cornerCounter++;
	} else if (cornerCounter == 9) {
		startX = squareWidth;
		startY = squareWidth;
		endPointC[0] = endPointC[0] + (2 * squareWidth);
		drawBezier(startX, startY, endPointC[0], endPointC[1], bezierX, bezierY);
		console.log("drawBlock complete");
		cornerCounter++;
	}
 }

function drawBlock2() {
 	if (cornerCounter == 10) {
		drawBorder(squareWidth, squareWidth);
		bezierY = (squareWidth / 2) * 3;		
		cornerCounter++;
	}
	else if (cornerCounter == 11) {
		startX = squareWidth;
		startY = squareWidth;
		endPointC[1] = (2 * squareWidth) - endPointC[1];
		drawBezier(startX, startY, endPointC[0], endPointC[1], bezierX, bezierY);
		cornerCounter++;
	} else if (cornerCounter == 12) {
		startX = 2 * squareWidth;
		startY = squareWidth;
		endPointD[1] = endPointD[1] + (2 * squareWidth);
		drawBezier(startX, startY, endPointD[0], endPointD[1], bezierX, bezierY);
		cornerCounter++;
	} else if (cornerCounter == 13) {
		startX = 2 * squareWidth;
		startY = 2 * squareWidth;
		endPointA[1] = (2 * squareWidth) - endPointA[1];
		drawBezier(startX, startY, endPointA[0], endPointA[1], bezierX, bezierY);
		cornerCounter++;
	} else if (cornerCounter == 14) {
		startX = squareWidth;
		startY = 2 * squareWidth;
		drawBezier(startX, startY, endPointB[0], endPointB[1], bezierX, bezierY);
		console.log("drawBlock complete");
		cornerCounter++;
	}
 }

function drawBlock3() {
 	if (cornerCounter == 15) {
		drawBorder(0, squareWidth);
		bezierX = squareWidth / 2;		
		cornerCounter++;
	}
	else if (cornerCounter == 16) {
		startX = 0;
		startY = squareWidth;
		endPointD[0] = (2 * squareWidth) - endPointD[0];
		drawBezier(startX, startY, endPointD[0], endPointD[1], bezierX, bezierY);
		cornerCounter++;
	} else if (cornerCounter == 17) {
		startX = squareWidth;
		startY = squareWidth;
		endPointC[0] = 0;
		drawBezier(startX, startY, endPointC[0], endPointC[1], bezierX, bezierY);
		cornerCounter++;
	} else if (cornerCounter == 18) {
		startX = squareWidth;
		startY = 2 * squareWidth;
		endPointB[0] = (2 * squareWidth) - endPointB[0];
		drawBezier(startX, startY, endPointB[0], endPointB[1], bezierX, bezierY);
		cornerCounter++;
	} else if (cornerCounter == 19) {
		startX = 0;
		startY = 2 * squareWidth;
		drawBezier(startX, startY, endPointA[0], endPointA[1], bezierX, bezierY);
		console.log("drawBlock complete");
		cycleCounter++;
		cornerCounter = 0;
	}
}

 function drawFourBlocks(translateX, translateY) {
 	translate(translateX, translateY);
 	drawBlock0();
	drawBlock1();
	drawBlock2();
	drawBlock3();
}

function drawSixteenBlocks() {
	if (cycleCounter == 0) {
		drawFourBlocks(0, 0);
	} else if (cycleCounter == 1) {
		drawFourBlocks(2 * squareWidth, 0);
	} else if (cycleCounter == 2) {
		drawFourBlocks(2 * squareWidth, 2 * squareWidth);
	} else if (cycleCounter == 3) {
		drawFourBlocks(0, 2 * squareWidth);
	}
}

function refreshSketch() {
	background(255);
	cornerCounter = 0;
	cycleCounter = 0;
	// Renerate randomness
	for (i = 0; i < 5; i++) {
		randomFloat[i] = random(0, .9 * squareWidth);
		console.log(random[i]);
	}
	delay.delayTime(100);
	drawSixteenBlocks();
}
