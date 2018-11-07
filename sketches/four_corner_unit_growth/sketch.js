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

const canvasWidth = 500;
const canvasHeight = 500;

let borderStrokeColor = 220;
const bezierStrokeColor = 0;
const backgroundColor = 255;

let squareDiagonal = 110;
let squareWidth;
let squareWidthHalved;
let bezierRandomValue;

let rotateAngle = 45;

let cornerCounter = 0;
let cycleCounter = 0;
// let masterCycleCounter = 0;

let bezierAnchor;

let framesPerSecond = 10;
const frameRateIncrement = .25;

var endPointA = [];
var endPointB = [];
var endPointC = [];
var endPointD = [];
var randomFloat = [];

function setup() {
	var canvas = createCanvas(canvasWidth, canvasHeight);
	canvas.parent('sketch-holder');
	background(backgroundColor);
	noFill();
	angleMode(DEGREES);
	frameRate(framesPerSecond);
	squareWidth = squareDiagonal / sqrt(2);
	squareWidthHalved = squareWidth / 2;

	// Generate some random floats for later
	for (i = 0; i < 5; i++) {
		randomFloat[i] = random(0, .9 * squareWidth);
		console.log(random[i]);
	}
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
	stroke(borderStrokeColor);
	rect(startX, startY, squareWidth, squareWidth);
}

function drawBezier(startX, startY, endX, endY, bezierAnchorX, bezierAnchorY) {
	stroke(bezierStrokeColor);
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

function increaseFrameRate() {
	framesPerSecond = framesPerSecond + frameRateIncrement;
}

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
		increaseFrameRate();
	} else if (cornerCounter == 2) {
		startX = squareWidth;
		startY = 0;
		endPointB[0] = randomFloat[1];
		endPointB[1] = squareWidth;
		drawBezier(startX, startY, endPointB[0], endPointB[1], bezierX, bezierY);
		cornerCounter++;
		increaseFrameRate();
	} else if (cornerCounter == 3) {
		startX = squareWidth;
		startY = squareWidth;
		endPointC[0] = 0;
		endPointC[1] = randomFloat[2];
		drawBezier(startX, startY, endPointC[0], endPointC[1], bezierX, bezierY);
		cornerCounter++;
		increaseFrameRate();
	} else if (cornerCounter == 4) {
		startX = 0;
		startY = squareWidth;
		endPointD[0] = randomFloat[3];
		endPointD[1] = 0;
		drawBezier(startX, startY, endPointD[0], endPointD[1], bezierX, bezierY);
		console.log("drawBlock complete");
		cornerCounter++;
		increaseFrameRate();
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
		increaseFrameRate();
	} else if (cornerCounter == 7) {
		startX = 2 * squareWidth;
		startY = 0;
		drawBezier(startX, startY, endPointA[0], endPointA[1], bezierX, bezierY);
		cornerCounter++;
		increaseFrameRate();
	} else if (cornerCounter == 8) {
		startX = 2 * squareWidth;
		startY = squareWidth;
		endPointD[0] = endPointD[0] + ((squareWidth - endPointD[0]) * 2);
		drawBezier(startX, startY, endPointD[0], endPointD[1], bezierX, bezierY);
		cornerCounter++;
		increaseFrameRate();
	} else if (cornerCounter == 9) {
		startX = squareWidth;
		startY = squareWidth;
		endPointC[0] = endPointC[0] + (2 * squareWidth);
		drawBezier(startX, startY, endPointC[0], endPointC[1], bezierX, bezierY);
		console.log("drawBlock complete");
		cornerCounter++;
		increaseFrameRate();
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
		increaseFrameRate();
	} else if (cornerCounter == 12) {
		startX = 2 * squareWidth;
		startY = squareWidth;
		endPointD[1] = endPointD[1] + (2 * squareWidth);
		drawBezier(startX, startY, endPointD[0], endPointD[1], bezierX, bezierY);
		cornerCounter++;
		increaseFrameRate();
	} else if (cornerCounter == 13) {
		startX = 2 * squareWidth;
		startY = 2 * squareWidth;
		endPointA[1] = (2 * squareWidth) - endPointA[1];
		drawBezier(startX, startY, endPointA[0], endPointA[1], bezierX, bezierY);
		cornerCounter++;
		increaseFrameRate();
	} else if (cornerCounter == 14) {
		startX = squareWidth;
		startY = 2 * squareWidth;
		drawBezier(startX, startY, endPointB[0], endPointB[1], bezierX, bezierY);
		console.log("drawBlock complete");
		cornerCounter++;
		increaseFrameRate();
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
		increaseFrameRate();
	} else if (cornerCounter == 17) {
		startX = squareWidth;
		startY = squareWidth;
		endPointC[0] = 0;
		drawBezier(startX, startY, endPointC[0], endPointC[1], bezierX, bezierY);
		cornerCounter++;
		increaseFrameRate();
	} else if (cornerCounter == 18) {
		startX = squareWidth;
		startY = 2 * squareWidth;
		endPointB[0] = (2 * squareWidth) - endPointB[0];
		drawBezier(startX, startY, endPointB[0], endPointB[1], bezierX, bezierY);
		cornerCounter++;
		increaseFrameRate();
	} else if (cornerCounter == 19) {
		startX = 0;
		startY = 2 * squareWidth;
		drawBezier(startX, startY, endPointA[0], endPointA[1], bezierX, bezierY);
		console.log("drawBlock complete");
		cycleCounter++;
		increaseFrameRate();
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

function keyPressed() {
	if (keyCode == RETURN) {
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
}
