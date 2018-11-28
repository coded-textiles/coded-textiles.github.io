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

// Canvas
const canvasWidth = 650;
const canvasHeight = 650;

// Num columns
let numCols = 8;
let numRows = numCols;
let unitWidth = canvasWidth / numCols;
let squareWidth = unitWidth / 2;

// Colors
let connectorStrokeColor;
let connectorStrokeColorHighlight;
let borderStrokeColor;
let backgroundColor = 255;

// Line weights
let connectorStrokeWeight;
let connectorStrokeWeightHighlight;

// Beziers
let bezierRandomValue;


// let rotateAngle = 45;

let cornerCounter = 0;
let cycleCounter = 0;
// let masterCycleCounter = 0;

let bezierAnchor;

let framesPerSecond = 10;
// const frameRateIncrement = .25;

// Variables for storing corner and edge coordinates
// for a single quadrant. A unit will contain four
// of these.
//  	      AB
// pointA * ------ * pointB
//        |        |
//     DA |        | BC
//        |        |
// pointC * ------ * pointD
//            CD

// var pointA = [0, 0];
// var pointB = [squareWidth, 0];
// var pointC = [squareWidth, squareWidth];
// var pointD = [0, squareWidth];
// var corners = [pointA, pointB, pointC, pointD];

let pointA;
let pointB;
let pointC;
let pointD;
let corners;

let pointOnEdgeAB;
let pointOnEdgeBC;
let pointOnEdgeCD;
let pointOnEdgeDA;
let edges;

let highlightCounter = 0;

var randomFloat = [];

// Variables for storing bezier or line decisions
var randomZeroOrOne = [];

function setup() {
	var canvas = createCanvas(canvasWidth, canvasHeight);
	canvas.parent('sketch-container');
	background(backgroundColor);
	noFill();
	frameRate(framesPerSecond);
	angleMode(DEGREES);
	makeControlPanel();
	strokeWeight(0.5);

	connectorStrokeColor = color("#41C0DE");
	connectorStrokeColorHighlight = color("#EF4550");

	refreshSketch();
}

function makeControlPanel() {
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

	// Num units
	var numColsText = createP("Number of units (16 - 144)");
	numColsSlider = createSlider(2, 12, 8);
	numColsText.parent('controls-container');
	numColsSlider.parent('controls-container');
	numColsSlider.class('slider');

	// Connector stroke weight
	var connectorStrokeWeightText = createP("Basic line weight (0 - 1px)");
	connectorStrokeWeightSlider = createSlider(0, 100, 50);
	connectorStrokeWeightText.parent('controls-container');
	connectorStrokeWeightSlider.parent('controls-container');
	connectorStrokeWeightSlider.class('slider');

	// Connector stroke weight - highlight
	var connectorStrokeWeightHighlightText = createP("Highlight line weight (0 - 1px)");
	connectorStrokeWeightHighlightSlider = createSlider(0, 100, 50);
	connectorStrokeWeightHighlightText.parent('controls-container');
	connectorStrokeWeightHighlightSlider.parent('controls-container');
	connectorStrokeWeightHighlightSlider.class('slider');

	// Border stroke color - Might be helpful for debugging
	// var borderStrokeColorText = createP("Show / hide border lines");
	// borderStrokeColorSlider = createSlider(0, 255, 255);
	// borderStrokeColorText.parent('controls-container');
	// borderStrokeColorSlider.parent('controls-container');
	// borderStrokeColorSlider.class('slider');
}

// This function is mainly used for debugging
function drawQuadBorder() {
	strokeWeight(0.25);
	// stroke(borderStrokeColorSlider.value());
	stroke(100);
	rect(0, 0, squareWidth, squareWidth);
	strokeWeight(connectorStrokeWeightSlider.value() / 100);
	stroke(connectorStrokeColor);
}

function turnHighlightOn() {
	stroke(connectorStrokeColorHighlight);
	strokeWeight(connectorStrokeWeightHighlightSlider.value() / 100);
}

function turnHighlightOff() {
	stroke(connectorStrokeColor);
	strokeWeight(connectorStrokeWeightSlider.value() / 100);
}

function drawQuad0(hasHighlight) {
	// drawQuadBorder();
	line(corners[0][0], corners[0][1], edges[0][0], edges[0][1]); // Line A
	line(corners[1][0], corners[1][1], edges[1][0], edges[1][1]); // Line B
	if (hasHighlight) {
		turnHighlightOn();
	}
	line(corners[2][0], corners[2][1], edges[2][0], edges[2][1]); // Line C
	turnHighlightOff();
	line(corners[3][0], corners[3][1], edges[3][0], edges[3][1]); // Line D
}

function drawQuad1(hasHighlight) {
	// drawQuadBorder();
	line(corners[0][0], corners[0][1], edges[0][1], edges[0][0]); // Line A
	line(corners[1][0], corners[1][1], edges[3][1], edges[3][0]); // Line B
	if (hasHighlight) {
		turnHighlightOn();
	}
	line(corners[2][0], corners[2][1], edges[2][1], edges[2][0]); // Line C
	turnHighlightOff();
	line(corners[3][0], corners[3][1], edges[1][1], edges[1][0]); // Line D
}

function moveBetweenQuads() {
	translate(2 * squareWidth, 0);
	rotate(90);
}

function drawSymmetricalUnit(quad0Hl, quad1Hl, quad2Hl, quad3Hl) {
	drawQuad0(quad0Hl); // upper left quadrant
	moveBetweenQuads();
	drawQuad1(quad1Hl); // upper right quadrant
	moveBetweenQuads();
	drawQuad0(quad2Hl); // lower right quadrant
	moveBetweenQuads();
	drawQuad1(quad3Hl); // lower left quadrant
	moveBetweenQuads(); // reset (0, 0) canvas position
}

function rowReturn() {
	translate(-unitWidth * numCols, unitWidth);
}

function draw() {
	background(backgroundColor);
	stroke(connectorStrokeColor);

	for (row = 0; row < numRows; row++) {
		for (col = 0; col < numCols; col++) {
			if (row % 2 == 0) { // If it's an even row
				if (col % 2 == 0) { // If it's an even column
					drawSymmetricalUnit(true, false, true, false);
				} else { // If it's an odd column
					drawSymmetricalUnit(false, true, false, true);
				}
			} else { // If it's an odd row
				if (col % 2 == 0) { // If it's an even column
					drawSymmetricalUnit(false, true, false, true);
				} else { // If it's an odd column
					drawSymmetricalUnit(true, false, true, false);
			}

			}
			translate(unitWidth, 0);
		}
		rowReturn();
	}
}

function refreshSketch() {
	numCols = numColsSlider.value();
	numRows = numCols;
	unitWidth = canvasWidth / numCols;
	squareWidth = unitWidth / 2;

	pointA = [0, 0];
	pointB = [squareWidth, 0];
	pointC = [squareWidth, squareWidth];
	pointD = [0, squareWidth];
	corners = [pointA, pointB, pointC, pointD];

	pointOnEdgeAB = [random(0, squareWidth), 0];
	pointOnEdgeBC = [squareWidth, random(0, squareWidth)];
	pointOnEdgeCD = [random(0, squareWidth), squareWidth];
	pointOnEdgeDA = [0, random(0, squareWidth)];
	edges = [pointOnEdgeBC, pointOnEdgeCD, pointOnEdgeDA, pointOnEdgeAB];
}
