/* Evolving pattern, still in rough experimental stage.
 */

// Canvas
const canvasWidth = 650;
const canvasHeight = canvasWidth;

const backgroundColor = 255;
const lineWeight = .5;

const hexBlack = "#000000";
const hexBlue = "#41C0DE";
const hexRed = "#EF4550";

// start (x, y)
let x = 0;
let y = 0;

// unit width
const unitWidth = 400;

let points = [];
let corners = [];
let tempRand;

let mode;

const numCols = 4;
let colCounter = 0;

function setup() {
	var canvas = createCanvas(canvasWidth, canvasHeight);
	canvas.parent('sketch-container');
	background(500);
	strokeWeight(lineWeight);
	// makeControlPanel();

	// set points
	setRandX();
	points[0] = [tempRandX, tempRandX / 3];
	setRandX();
	points[1] = [tempRandX, tempRandX];
	setRandX();
	points[2] = [tempRandX / 3, tempRandX];

	corners[0] = [0, 0];
	corners[1] = [unitWidth, 0];
	corners[2] = [0, unitWidth];

	corners[3] = [unitWidth + 10, unitWidth];
	corners[4] = [unitWidth + 10, 2 * unitWidth];
}

// function makeControlPanel() {
// 	// Make refresh button and sliders
// 	var button = createButton("Refresh sketch");
// 	button.parent('start-button-container');
// 	// button.mousePressed(refreshSketch);
// }

function drawBorder() {
	stroke(color(hexRed));
	rect(x, y, unitWidth, unitWidth);
	// line(x, unitWidth, unitWidth, x);
}

function drawSpokes() {
	stroke(color(hexBlue));
	line(x, y, unitWidth, unitWidth / 3);
	line(x, y, unitWidth, unitWidth);
	line(x, y, unitWidth / 3, unitWidth);
}

function drawPoints() {
	stroke(color(hexBlack));
	ellipse(x, unitWidth, 3, 3);
	ellipse(unitWidth, x, 3, 3);
}

// no points
function drawFillNoPoints() {
	noStroke();
	triangle(
		corners[0][0], corners[0][1],
		corners[1][0], corners[1][1],
		corners[2][0], corners[2][1]
	);

	// setRandBezierSpecs();
	// bezier(
	// 	corners[1][0], corners[1][1],
	// 	tempRand * unitWidth / 2, tempRand * unitWidth / 2,
	// 	tempRand * unitWidth / 2, tempRand * unitWidth / 2,
	// 	corners[2][0], corners[2][1]
	// );
}

// one point
function drawFillOnePoint0() {
	triangle(corners[0][0], corners[0][1], corners[1][0], corners[1][1], points[0][0], points[0][1]);
	triangle(corners[0][0], corners[0][1], corners[2][0], corners[2][1], points[0][0], points[0][1]);

	// setRandBezierSpecs();
	// bezier(
	// 	corners[1][0], corners[1][1],
	// 	tempRand * unitWidth / 2, tempRand * unitWidth / 2,
	// 	tempRand * unitWidth / 2, tempRand * unitWidth / 2,
	// 	points[0][0], points[0][1]
	// );

	// setRandBezierSpecs();
	// bezier(
	// 	points[0][0], points[0][1],
	// 	tempRand * unitWidth / 2, tempRand * unitWidth / 2,
	// 	tempRand * unitWidth / 2, tempRand * unitWidth / 2,
	// 	corners[2][0], corners[2][1]
	// );
}

function drawFillOnePoint1() {
	triangle(corners[0][0], corners[0][1], corners[1][0], corners[1][1], points[1][0], points[1][1]);
	triangle(corners[0][0], corners[0][1], corners[2][0], corners[2][1], points[1][0], points[1][1]);
}

function drawFillOnePoint2() {
	triangle(corners[0][0], corners[0][1], corners[1][0], corners[1][1], points[2][0], points[2][1]);
	triangle(corners[0][0], corners[0][1], corners[2][0], corners[2][1], points[2][0], points[2][1]);
}

// two points
function drawFillTwoPoints01() {
	triangle(corners[0][0], corners[0][1], corners[1][0], corners[1][1], points[0][0], points[0][1]);
	triangle(corners[0][0], corners[0][1], corners[2][0], corners[2][1], points[1][0], points[1][1]);
	triangle(corners[0][0], corners[0][1], points[0][0], points[0][1], points[1][0], points[1][1]);
}

function drawFillTwoPoints02() {
	triangle(corners[0][0], corners[0][1], corners[1][0], corners[1][1], points[0][0], points[0][1]);
	triangle(corners[0][0], corners[0][1], corners[2][0], corners[2][1], points[2][0], points[2][1]);
	triangle(corners[0][0], corners[0][1], points[0][0], points[0][1], points[2][0], points[2][1]);
}

function drawFillTwoPoints12() {
	triangle(corners[0][0], corners[0][1], corners[1][0], corners[1][1], points[1][0], points[1][1]);
	triangle(corners[0][0], corners[0][1], corners[2][0], corners[2][1], points[2][0], points[2][1]);
	triangle(corners[0][0], corners[0][1], points[1][0], points[1][1], points[2][0], points[2][1]);
}


function drawFillA() {
	if (mode === 0) {
		drawFillNoPoints();
	}
	else if (mode === 1) {
		drawFillOnePoint0();
	}
	else if (mode === 2) {
		drawFillOnePoint1();
	}
	else if (mode === 3) {
		drawFillOnePoint2();
	}
	else if (mode === 4) {
		drawFillTwoPoints01();
	}
	else if (mode === 5) {
		drawFillTwoPoints02();
	}
	else if (mode === 6) {
		drawFillTwoPoints12();
	}
}

// function drawConnectorGuidelines() {
// 	line(unitWidth, y, AxAy[0], AxAy[1]);
// 	line(AxAy[0], AxAy[1], BxBy[0], BxBy[1]);
// 	line(BxBy[0], BxBy[1], CxCy[0], CxCy[1]);
// 	line(CxCy[0], CxCy[1], x, unitWidth);

// 	ellipse();
// 	ellipse();
// 	ellipse();
// }

// 	// ellipse(275, 130, 5, 5);
// 	bezier(300, 100, 275 + 12, 130 + 10, 275 + 12, 130 + 10, 250, 160); // convex
// 	// bezier(300, 100, 275 - 12, 130 - 10, 275 - 12, 130 - 10, 250, 160); // concave
	
// 	// line(100, 300, 250, 160);
// 	// ellipse(175, 220, 5, 5);
// 	// ellipse(175 + 28, 220 + 30, 5, 5);
// 	bezier(100, 300, 175 + 28, 220 + 30, 175 + 28, 220 + 30, 250, 160);
// }

function setRandX() {
	tempRandX = random(unitWidth / 3, 2 * unitWidth / 3);
}

function setRandBezierSpecs() {
	tempRand = random(.5, 1.5);
	console.log("tempRand: " + tempRand);
	if (tempRand < 1) {
		fill(255);
	} else fill(0);
}

function draw() {
	// set points
	setRandX();
	points[0] = [tempRandX, tempRandX / 3];
	setRandX();
	points[1] = [tempRandX, tempRandX];
	setRandX();
	points[2] = [tempRandX / 3, tempRandX];

	// mode = 1;
	mode = int(random(0, 6));
	console.log("mode: " + mode);

	frameRate(1.5);
	noStroke();
	background(255);
	// drawBorder();
	// drawSpokes();
	// drawPoints();
	// drawConnectorGuidelines();
	fill(0);
	drawFillA();
	// drawfillB();
	// drawRow();
	fill(255);
	stroke(255);
}
