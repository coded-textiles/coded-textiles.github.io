/* Evolving pattern, still in rough experimental stage.
 */

// Canvas
const canvasWidth = 650;
const canvasHeight = canvasWidth;

const lineWeight = .5;
const ellipseWidth = 8;

// start (x, y)
let x = 0;
let y = 0;

// unit width
const unitWidth = 400;
const stepX = unitWidth / 4;
const stepY = unitWidth;

let origin = [];
let point = [];
let pointComp = []; // x complements
let pointMatch = [];
let pointMatchLen;
let randPointToMatch;
let midpoint = [];
let bezAnchor = [];
const bezOffset = unitWidth / 15;
let anchorPoint;

let currentPoint = 0;

const hexBlack = "#000000";
const hexBlue = "#41C0DE";
const hexRed = "#EF4550";

let posColor = 0;

function setup() {
	var canvas = createCanvas(canvasWidth, canvasHeight);
	canvas.parent('sketch-container');
	background(500);
	strokeWeight(lineWeight);

	// points for line connections
	point[0] = [x, y + stepY];
	point[1] = [x + stepX, y];
	point[2] = [x + (2 * stepX), y];
	point[3] = [x + (2 * stepX), y + stepY];
	point[4] = [x + (3 * stepX), y];
	point[5] = [x + (4 * stepX), y + stepY];

	// complements to points, used as bezier anchors
	pointComp[0] = [point[0][0], point[0][1] - stepY];
	pointComp[1] = [point[1][0], point[1][1] + stepY];
	pointComp[2] = [point[2][0], point[2][1] + stepY];
	pointComp[3] = [point[3][0], point[3][1] - stepY];
	pointComp[4] = [point[4][0], point[4][1] + stepY];
	pointComp[5] = [point[5][0], point[5][1] - stepY];

	// point matches
	pointMatch[0] = [1, 2, 4]; // point 0 can go to point 1, 2, or 4
	pointMatch[1] = [3, 5];
	pointMatch[2] = [5];
	pointMatch[3] = [4];
	pointMatch[4] = [5];

	// Make refresh button and sliders
	// Make refresh button and sliders
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


	var button = createButton("Refresh sketch");
	button.parent('start-button-container');
	button.mousePressed(refreshSketch);
}

function drawBorder() {
	noFill();
	stroke(color(hexRed));
	rect(x, y, unitWidth, unitWidth);
}

function drawPoints() {
	fill(color(hexRed));
	ellipse(point[0][0], point[0][1], ellipseWidth, ellipseWidth);
	ellipse(point[1][0], point[1][1], ellipseWidth, ellipseWidth);
	ellipse(point[2][0], point[2][1], ellipseWidth, ellipseWidth);
	ellipse(point[3][0], point[3][1], ellipseWidth, ellipseWidth);
	ellipse(point[4][0], point[4][1], ellipseWidth, ellipseWidth);
	ellipse(point[5][0], point[5][1], ellipseWidth, ellipseWidth);
	noFill();
}

function drawBezierAnchors() {
	stroke(color(hexBlue));
	ellipse(pointComp[0][0], pointComp[0][1], 10, 10);
	ellipse(pointComp[1][0], pointComp[1][1], 10, 10);
	ellipse(pointComp[2][0], pointComp[2][1], 10, 10);
	ellipse(pointComp[3][0], pointComp[3][1], 10, 10);
	ellipse(pointComp[4][0], pointComp[4][1], 10, 10);
	ellipse(pointComp[5][0], pointComp[5][1], 10, 10);
	noStroke();
}




function drawFill() {
	if (currentPoint !== 5) {
		noStroke();
		// fill(0);
		fill(posColor);
		console.log("current point id: " + currentPoint); // e.g. 0

		// pointMatch[0][random index of possible choices]
		randPointToMatch = pointMatch[currentPoint][int(random(pointMatch[currentPoint].length))]; // e.g. 1
		console.log("point to match id: " + randPointToMatch);
		console.log("");

		// line(
		// 	point[currentPoint][0], point[currentPoint][1],
		// 	point[randPointToMatch][0], point[randPointToMatch][1]
		// );

		// Draw Triangle
		// if new point is on the top line
		if (randPointToMatch == 1 || randPointToMatch == 2 || randPointToMatch == 4) {
			triangle(
				point[currentPoint][0], point[currentPoint][1],
				point[randPointToMatch][0], point[randPointToMatch][1],
				pointComp[randPointToMatch][0], pointComp[randPointToMatch][1]
			);
		} else {
			triangle(
				point[currentPoint][0], point[currentPoint][1],
				point[randPointToMatch][0], point[randPointToMatch][1],
				pointComp[currentPoint][0], pointComp[currentPoint][1]
			);
		}

		// Draw Bezier curve
		noFill();
		noStroke(0);

		if (random(0, 1) < .5) { // randomly choose concave or convex anchor
			anchorPoint = currentPoint;
		} else {
			anchorPoint = randPointToMatch;
		}

		console.log("startY: " + point[currentPoint][1]);
		console.log("anchorY: " + pointComp[anchorPoint][1]);
		console.log("");

		// fill(0);
		// ellipse(pointComp[anchorPoint][0], pointComp[anchorPoint][1], 10, 10);

		if (pointComp[anchorPoint][1] == x) { // convex or concave
			// fill(0);
			fill(posColor);
		} else {
			fill(255);
		}

		bezier(
			point[currentPoint][0], point[currentPoint][1],
			pointComp[anchorPoint][0], pointComp[anchorPoint][1],
			pointComp[anchorPoint][0], pointComp[anchorPoint][1],
			point[randPointToMatch][0], point[randPointToMatch][1]
		);

		noFill();
		currentPoint = randPointToMatch;
	}
}

function draw() {
	// frameRate(3);
	drawFill();
}

function refreshSketch() {
	background(255);
	posColor = color(redSlider.value(), greenSlider.value(), blueSlider.value());
	currentPoint = 0;
}
