/* Moving in a clockwise direction, connect each corner
 * of a square to a random point on an opposing edge
 * using a Bezier curve.
 *
 * Use three sliders to change the number of columns,
 * rotation angle, and draw speed (i.e. frame rate) for
 * the sketch.
 *  
 * Anna Garbier
 * 2018-10-30
 */


// Basic canvas and program configuration
const canvasWidth = 725;
const canvasHeight = 725;

let numCols = 1;
let rotateAngle = 45;
let framesPerSecond = 50;

let squareStrokeColor = 220;
const connectorStrokeColor = 0;
const backgroundColor = 255;

// Size of square is determined by canvas size
// and the number of columns
let squareDiagonal = canvasWidth / numCols;
let squareWidth;
let squareWidthHalved;
let squareDiagonalHalved;
let bezierRandomValue;

// This will be used to randomly choose
// whether we're using a stright line or a
// Bezier curve as a connector.
let isStraightLine = true;

// Variables used to navigate the space of
// the canvas throughout draw
let rowStartX;
let rowStartY;
let cornerCounter = 0;
let colCounter = 0;
let rowCounter = 0;

function setup() {
	var canvas = createCanvas(canvasWidth, canvasHeight);
	canvas.parent('sketch-container');
	background(backgroundColor);
	noFill();
	angleMode(DEGREES);
	rectMode(CENTER);
	ellipseMode(CENTER);
	frameRate(framesPerSecond);

	squareWidth = squareDiagonal / sqrt(2);
	squareWidthHalved = squareWidth / 2;
	squareDiagonalHalved = squareDiagonal / 2;
	numRows = Math.floor(canvasHeight / squareDiagonal);

	// Make refresh button and sliders
	var button = createButton("Refresh sketch");
	button.parent('start-button-container');
	button.mousePressed(refreshSketch);

	// Control sliders
	// Number of columns
	var numColsText = createP("Number of columns (1 to 20)");
	numColsSlider = createSlider(1, 20, 1);
	numColsText.parent('controls-container');
	numColsSlider.parent('controls-container');
	numColsSlider.class('slider');

	// Number of columns
	var tiltAngleText = createP("Rotation angle (0 to 45 deg.)");
	tiltAngleSlider = createSlider(0, 45, 45);
	tiltAngleText.parent('controls-container');
	tiltAngleSlider.parent('controls-container');
	tiltAngleSlider.class('slider');

	// Bezier curves
	// var bezierRandomText = createP("Bezier range (0 to 80)");
	// bezierRandomSlider = createSlider(0, 40, 0);
	// bezierRandomSlider.parent('controls-container');
	// bezierRandomSlider.parent('controls-container');
	// bezierRandomSlider.class('slider');

	// Frame rate
	var frameRateText = createP("Frames per second (1 to 100)");
	frameRateSlider = createSlider(1, 100, 10);
	frameRateText.parent('controls-container');
	frameRateSlider.parent('controls-container');
	frameRateSlider.class('slider');

	// Border color
	var borderColorText = createP("Border color (black to white)");
	squareStrokeColorSlider = createSlider(0, 255, 220);
	borderColorText.parent('controls-container');
	squareStrokeColorSlider.parent('controls-container');
	squareStrokeColorSlider.class('slider');
}

function draw() {
	if (rowCounter < numRows) {
		drawRow();
	}
}

function drawLine(startX, startY) {
	// Pick a random number, 1 or 0. This is used later
	// to randomly pick one of two sides to "attach to".
	let sideSelector = Math.round(random(0, 1));

	// Pick a random point on one of the two opposed
	// edges from (startX, startY). .95 means we never
	// connect to a point that is super close to a corner
	if (sideSelector == 1) {
		endX = -1 * startX;
		endY = .95 * random(-squareWidthHalved, squareWidthHalved);
	} else {
		endX = .95 * random(-squareWidthHalved, squareWidthHalved);
		endY = -1 * startY;
	}

	// Connect the corner at (startX, startY) to a random
	// point on one of two opposite edges
	line(startX, startY, endX, endY);
}

function drawBezier(startX, startY) {
	// Pick a random number, 1 or 0. This is used later
	// to randomly pick one of two sides to "attach to".
	let sideSelector = Math.round(random(0, 1));

	// Pick a random point on one of the two opposed
	// edges from (startX, startY). .8 means we never
	// connect to a point that is too close to another point
	if (sideSelector == 1) {
		endX = -1 * startX;
		endY = .8 * random(-squareWidthHalved, squareWidthHalved);
	} else {
		endX = .8 * random(-squareWidthHalved, squareWidthHalved);
		endY = -1 * startY;
	}

	// Connect the corner at (startX, startY) to a random
	// point on one of two opposite edges using a Bezier curve
	// with middle points of (0,0) and (0,0).
	bezierRandomValue = 0;

	bezier(startX,
		startY,
		bezierRandomValue,
		bezierRandomValue,
		bezierRandomValue,
		bezierRandomValue,
		endX,
		endY);
}

// Randomly decide if we'll draw a line or a Bezier curve.
function drawConnector(startX, startY) {
	if (Math.round(random(0, 1)) == 0) {
		drawLine(startX, startY);
	} else {
		drawBezier(startX, startY);
	}
}

// Draw a box, with four internal "connectors", each of which
// connects a corner to a random point on an opposing edge
function drawBlock() {
	console.log("Row " + rowCounter +
				", Column " + colCounter +
				", Corner "+ cornerCounter);
	if (cornerCounter == 0) {
		stroke(squareStrokeColor);
		rect(0, 0, squareWidth, squareWidth);
		stroke(connectorStrokeColor);
		cornerCounter++;
	}
	else if (cornerCounter == 1) {
		// Use drawLine() instead for straight lines
		drawConnector(-1 * squareWidthHalved, -1 * squareWidthHalved);
		cornerCounter++;
	} else if (cornerCounter == 2) {
		drawConnector(squareWidthHalved, -1 * squareWidthHalved);
		cornerCounter++;
	} else if (cornerCounter == 3) {
		drawConnector(squareWidthHalved, squareWidthHalved);
		cornerCounter++;
	} else if (cornerCounter == 4) {
		drawConnector(-1 * squareWidthHalved, squareWidthHalved);
		// Move on to the next column
		colCounter++;
		// Add a spacer in console output for readability
		console.log(""); 
		// Reset the corner counter to queue up a new block
		cornerCounter = 0;
	}
}

// Draw a row of blocks
function drawRow() {
	if (colCounter <= numCols) {
		rowStartX = squareDiagonalHalved;
		rowStartY = squareDiagonalHalved +
					(squareDiagonal * rowCounter);

		translateStepX = sqrt(sq(squareWidth) + sq(squareWidth));
		translateStepY = translateStepX / 2;
		x = rowStartX + (translateStepX * colCounter);
		y = rowStartY;
		translate(x, y);
		rotate(rotateAngle);
		drawBlock();
	} else {
		// Move to the next row, and reset the column counter
		rowCounter++;
		colCounter = 0;
	}
}

function refreshSketch() {
	background(backgroundColor);
	frameRate(frameRateSlider.value());
	numCols = numColsSlider.value();
	rotateAngle = tiltAngleSlider.value();
	squareStrokeColor = squareStrokeColorSlider.value();

	squareDiagonal = canvasWidth / numCols;
	squareWidth = squareDiagonal / sqrt(2);
	squareWidthHalved = squareWidth / 2;
	squareDiagonalHalved = squareDiagonal / 2;
	numRows = Math.floor(canvasHeight / squareDiagonal);
	cornerCounter = 0;
	colCounter = 0;
	rowCounter = 0;

	// console.log("bezierRandomSlider: " + bezierRandomSlider.value());
	console.log("frameRateSlider: " + frameRateSlider.value());
	console.log("tiltAngleSlider: " + tiltAngleSlider.value());
	console.log("numColsSlider: " + numColsSlider.value());
	console.log("squareStrokeColorSlider: " + squareStrokeColorSlider.value());
	console.log("---");
}
