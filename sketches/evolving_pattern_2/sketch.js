/* Evolving pattern, still in rough experimental stage.
 */

// Canvas
const canvasWidth = 650;
const canvasHeight = canvasWidth;

const lineWeight = .01;
const ellipseWidth = 10;

// start (x, y)
let x = 10;
let y = 10;

// unit width
const unitWidth = 400;

let origin = [];
let point = [];
let midpoint = [];
let bezierAnchor = [];
const bezierOffset = unitWidth / 15;

let pointDistance;
let adjustedBezierOffset;

let currentPoint = 0;
let bezPolarity;

function setup() {
	var canvas = createCanvas(canvasWidth, canvasHeight);
	canvas.parent('sketch-container');
	background(500);
	strokeWeight(lineWeight);

	origin = [x, y];
	point[0] = [x + unitWidth, y];
	point[1] = [x + (unitWidth * .75), y + (unitWidth * .25)];
	point[2] = [x + (unitWidth * .5), y + (unitWidth * .5)];
	point[3] = [x + (unitWidth * .25), y + (unitWidth * .75)];
	point[4] = [x, y + unitWidth];

	midpoint[0] = [x + (unitWidth * 1), y + (unitWidth * 0)];
	midpoint[1] = [x + (unitWidth * .875), y + (unitWidth * .125)];
	midpoint[2] = [x + (unitWidth * .75), y + (unitWidth * .25)];
	midpoint[3] = [x + (unitWidth * .625), y + (unitWidth * .375)];
	midpoint[4] = [x + (unitWidth * .5), y + (unitWidth * .5)];
	midpoint[5] = [x + (unitWidth * .375), y + (unitWidth * .625)];
	midpoint[6] = [x + (unitWidth * .25), y + (unitWidth * .75)];
	midpoint[7] = [x + (unitWidth * .125), y + (unitWidth * .875)];
	midpoint[8] = [x + (unitWidth * 0), y + (unitWidth * 1)];

	// Make refresh button and sliders
	var button = createButton("Refresh sketch");
	button.parent('start-button-container');
	button.mousePressed(refreshSketch);

	frameRate(4);
}

function drawBorder() {
	noFill();
	stroke(color(hexRed));
	rect(x, y, unitWidth, unitWidth);
	line(point[0][0], point[0][1], point[4][0], point[4][1]);
}

function drawPoints() {
	stroke(color(hexRed));
	fill(color(hexRed));

	// origin
	ellipse(origin[0], origin[1], ellipseWidth, ellipseWidth);

	// points
	ellipse(point[0][0], point[0][1], ellipseWidth, ellipseWidth);
	ellipse(point[1][0], point[1][1], ellipseWidth, ellipseWidth);
	ellipse(point[2][0], point[2][1], ellipseWidth, ellipseWidth);
	ellipse(point[3][0], point[3][1], ellipseWidth, ellipseWidth);
	ellipse(point[4][0], point[4][1], ellipseWidth, ellipseWidth);

	// fill(255);
}

function drawMidpoints() {
	stroke(color(hexBlue));
	noFill();

	// midpoints
	ellipse(midpoint[0][0], midpoint[0][1], ellipseWidth, ellipseWidth);
	ellipse(midpoint[1][0], midpoint[1][1], ellipseWidth, ellipseWidth);
	ellipse(midpoint[2][0], midpoint[2][1], ellipseWidth, ellipseWidth);
	ellipse(midpoint[3][0], midpoint[3][1], ellipseWidth, ellipseWidth);
	ellipse(midpoint[4][0], midpoint[4][1], ellipseWidth, ellipseWidth);
	ellipse(midpoint[5][0], midpoint[5][1], ellipseWidth, ellipseWidth);
	ellipse(midpoint[6][0], midpoint[6][1], ellipseWidth, ellipseWidth);
	ellipse(midpoint[7][0], midpoint[7][1], ellipseWidth, ellipseWidth);
	ellipse(midpoint[8][0], midpoint[8][1], ellipseWidth, ellipseWidth);

	// fill(255);
}

// function drawConcaveBezierAnchors() {
// 	stroke(color(hexBlue));
// 	fill(color(hexBlue));

// 	ellipse(concaveBezierAnchor[0][0], concaveBezierAnchor[0][1], ellipseWidth, ellipseWidth);
// 	ellipse(concaveBezierAnchor[1][0], concaveBezierAnchor[1][1], ellipseWidth, ellipseWidth);
// 	ellipse(concaveBezierAnchor[2][0], concaveBezierAnchor[2][1], ellipseWidth, ellipseWidth);
// 	ellipse(concaveBezierAnchor[3][0], concaveBezierAnchor[3][1], ellipseWidth, ellipseWidth);

// 	fill(255);
// }

// function drawConvexBezierAnchors() {
// 	stroke(color(hexBlue));
// 	fill(color(hexBlue));

// 	ellipse(convexBezierAnchor[0][0], convexBezierAnchor[0][1], ellipseWidth, ellipseWidth);
// 	ellipse(convexBezierAnchor[1][0], convexBezierAnchor[1][1], ellipseWidth, ellipseWidth);
// 	ellipse(convexBezierAnchor[2][0], convexBezierAnchor[2][1], ellipseWidth, ellipseWidth);
// 	ellipse(convexBezierAnchor[3][0], convexBezierAnchor[3][1], ellipseWidth, ellipseWidth);

// 	fill(255);
// }

// function drawBezierAnchorLines() {
// 	stroke(color(hexBlue));

// 	line(concaveBezierAnchor[0][0], concaveBezierAnchor[0][1], convexBezierAnchor[0][0], convexBezierAnchor[0][1]);
// 	line(concaveBezierAnchor[1][0], concaveBezierAnchor[1][1], convexBezierAnchor[1][0], convexBezierAnchor[1][1]);
// 	line(concaveBezierAnchor[2][0], concaveBezierAnchor[2][1], convexBezierAnchor[2][0], convexBezierAnchor[2][1]);
// 	line(concaveBezierAnchor[3][0], concaveBezierAnchor[3][1], convexBezierAnchor[3][0], convexBezierAnchor[3][1]);
// }

function drawSpokes() {
	stroke(color(hexRed));
	line(origin[0], origin[1], point[1][0], point[1][1]);
	line(origin[0], origin[1], point[2][0], point[2][1]);
	line(origin[0], origin[1], point[3][0], point[3][1]);
}

// function mainFill() {
// 	fill(0);
// 	stroke(255);
// 	triangle(
// 		origin[0], origin[1],
// 		point[0][0], point[0][1],
// 		point[4][0], point[4][1]
// 	);
// 	// noFill(0);
// }

function bezChooser() { // 1 for convex, -1 for concave
	if (random(-1, 1) > 0) {
		fill(0);
		bezPolarity = 1;
	} else {
		fill(255);
		bezPolarity = -1;
	}
}

function drawTriangle(startId, endId) {
	// fill(0);
	// if (bezPolarity == 1) { // convex - black border
	// 	stroke(0);
	// } else {
	// 	stroke(255); // concave - white border
	// }

	noStroke();
	fill(0);
	triangle(
		origin[0], origin[1],
		point[startId][0], point[startId][1],
		point[endId][0], point[endId][1]
	);

	noStroke();
	noFill();
}

function drawBezierCurve(startId, endId) {

	drawTriangle(startId, endId);

	noStroke();
	bezChooser();

	// stroke(color(hexBlack));
	// noFill();

	pointDistance = endId - startId;
	adjustedBezierOffset = (pointDistance * bezierOffset) * bezPolarity;
	adjustedMidpointId = startId + endId;

	bezierAnchor[0] = [midpoint[0][0] + adjustedBezierOffset, midpoint[0][1] + adjustedBezierOffset];
	bezierAnchor[1] = [midpoint[1][0] + adjustedBezierOffset, midpoint[1][1] + adjustedBezierOffset];
	bezierAnchor[2] = [midpoint[2][0] + adjustedBezierOffset, midpoint[2][1] + adjustedBezierOffset];
	bezierAnchor[3] = [midpoint[3][0] + adjustedBezierOffset, midpoint[3][1] + adjustedBezierOffset];
	bezierAnchor[4] = [midpoint[4][0] + adjustedBezierOffset, midpoint[4][1] + adjustedBezierOffset];
	bezierAnchor[5] = [midpoint[5][0] + adjustedBezierOffset, midpoint[5][1] + adjustedBezierOffset];
	bezierAnchor[6] = [midpoint[6][0] + adjustedBezierOffset, midpoint[6][1] + adjustedBezierOffset];
	bezierAnchor[7] = [midpoint[7][0] + adjustedBezierOffset, midpoint[7][1] + adjustedBezierOffset];
	bezierAnchor[8] = [midpoint[8][0] + adjustedBezierOffset, midpoint[8][1] + adjustedBezierOffset];

	bezier(
		point[startId][0], point[startId][1],
		bezierAnchor[adjustedMidpointId][0], bezierAnchor[adjustedMidpointId][1],
		bezierAnchor[adjustedMidpointId][0], bezierAnchor[adjustedMidpointId][1],
		point[endId][0], point[endId][1]
	);
}

function drawBezierCurves() {
	// All curves
	// drawConcaveBezierCurve(0, 1);
	// drawConcaveBezierCurve(0, 2);
	// drawConcaveBezierCurve(0, 3);
	// drawConcaveBezierCurve(0, 4);
	// drawConcaveBezierCurve(1, 2);
	// drawConcaveBezierCurve(1, 3);
	// drawConcaveBezierCurve(1, 4);
	// drawConcaveBezierCurve(2, 3);
	// drawConcaveBezierCurve(2, 4);
	// drawConcaveBezierCurve(3, 4);

	// Random curves
	// drawConcaveBezierCurve(int(random(0, 5)), int(random(0, 5)));

	if (currentPoint !== 4) { // if we're not yet at the last point
		// Pick a random next point
		nextPoint = int(random(currentPoint + 1, 5));
		// Draw curve between current and next point
		drawBezierCurve(currentPoint, nextPoint);
		// Move to next point
		currentPoint = nextPoint;
	}
}

function draw() {
	// frameRate(10);
	// drawBorder();
	// drawPoints();
	// mainFill();
	// drawMidpoints();
	// drawSpokes();
	drawBezierCurves();
}

function refreshSketch() {
	background(255);
	currentPoint = 0;
}
