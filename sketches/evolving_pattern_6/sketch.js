/* Evolving pattern, still in rough experimental stage.
 * p5.js classes: https://p5js.org/examples/objects-objects.html
 */

const debuggingOn = false;

// Basic variables (usually don't change from sketch-to-sketch)
const canvasWidth = 600;
const canvasHeight = canvasWidth;

const hexBlue = "#41C0DE";
const hexRed = "#EF4550";

// Sketch-specific variables
const unitWidth = 250;

let originX = 0;
let originY = 0;

let anchors = [];

let currentAnchorIndex;
let nextAnchorIndex;
let chosenAnchors = [];

let bezOffsets;

let corners = [];
let quadrant = 0;


function setup() {
	var canvas = createCanvas(canvasWidth, canvasHeight);
	canvas.parent('sketch-container');

	if (debuggingOn) {
		background(240, 240, 240);
	}
	noFill();

	rectMode(CENTER);

	s0 = new Square();
	s0.updateSelf();
	s0.drawSelf();

	translate(unitWidth + 50, 0);
	s1 = new Square();
	s1.updateSelf();
	s1.drawSelf();

}

// SET ALL POSSIBLE ANCHORS ///////////////////////////////////////
function setAllAnchors() {
	origin = {x: originX, y: originY};

	for (i = 0; i <= 4; i++) {
		anchors[i] = {
			x: origin.x + unitWidth - (i/4 * unitWidth),
			y: origin.y + 0 + (i/4 * unitWidth)
		};	
	}
}

function logAllAnchors() {
	// Log origin and anchor values
	console.log("Origin", origin);
	console.log("All anchors: ", anchors);
	console.log("");
}

function showAllAnchors() {
	noStroke();
	fill(255, 0, 0);

	ellipse(origin.x, origin.y, 5, 5);
	for (i = 0; i <= 4; i++) {
		ellipse(anchors[i].x, anchors[i].y, 5, 5);
	}

	stroke(0);
	noFill();
}


// CHOOSE ANCHORS //////////////////////////////////////////////
function setChosenAnchors() {
	currentAnchorIndex = 0;
	nextAnchorIndex;
	chosenAnchors = [anchors[currentAnchorIndex]];

	while (currentAnchorIndex < 4) {
		nextAnchorIndex = currentAnchorIndex + floor(random(1, 5 - currentAnchorIndex));
		currentAnchorIndex = nextAnchorIndex;
		chosenAnchors.push(anchors[nextAnchorIndex]);
	}
}

function logChosenAnchors() {
	console.log("Origin", origin);
	console.log("Chosen anchors:", chosenAnchors);
}

function showChosenAnchors() {
	noStroke();
	fill(255, 0, 0);
	ellipse(origin.x,origin.y, 10, 10);
	for (i = 0; i < chosenAnchors.length; i++) {
		ellipse(chosenAnchors[i]. x,chosenAnchors[i].y, 10, 10);
	}
	stroke(0);
	noFill();
}


// CALCULTE BEZIER ANCHORS //////////////////////////////////////
function setBezierOffsets() {
	bezOffsets = [];

	for (i = 0; i < chosenAnchors.length - 1; i++) {
		let midX = lerp(chosenAnchors[i].x, chosenAnchors[i+1].x, .5);
		let midY = lerp(chosenAnchors[i].y, chosenAnchors[i+1].y, .5);;
		let mid = {x: midX, y: midY};

		let bezPolarity;
		if (random(0, 1) < .5) {
			bezPolarity = -1;
		} else {
			bezPolarity = 1;
		}
		
		let bezMagnitude = .2 * dist(
			chosenAnchors[i].x, chosenAnchors[i].y,
			chosenAnchors[i+1].x, chosenAnchors[i+1].y);
		let bezOffset = bezPolarity * bezMagnitude;
		let bez = {x: mid.x + bezOffset, y: mid.y + bezOffset};

		bezOffsets[i] = bez;
	}
}

function logBezierOffsets() {
	console.log("Bezier offsets:", bezOffsets);
}


function showBezierOffsets() {
	for (i = 0; i < bezOffsets.length; i++) {
		noStroke();
		fill(0, 0, 255);
		ellipse(bezOffsets[i].x, bezOffsets[i].y, 5, 5);
		noFill();
		stroke(0);
	}
}


// CONNECT CHOSEN ANCHORS //////////////////////////////////////
function connectChosenAnchors() {
	for (i = 0; i < chosenAnchors.length - 1; i++) {
		if (quadrant == 0) {
			bezier(
				chosenAnchors[i].x, chosenAnchors[i].y,
				bezOffsets[i].x, bezOffsets[i].y,
				bezOffsets[i].x, bezOffsets[i].y,
				chosenAnchors[i + 1].x, chosenAnchors[i + 1].y
			);
		} else if (quadrant == 1) {
			bezier(
				unitWidth - chosenAnchors[i].x, chosenAnchors[i].y,
				unitWidth - bezOffsets[i].x, bezOffsets[i].y,
				unitWidth - bezOffsets[i].x, bezOffsets[i].y,
				unitWidth - chosenAnchors[i + 1].x, chosenAnchors[i + 1].y
			);
		} else if (quadrant == 2) {
			bezier(
				unitWidth - chosenAnchors[i].x, unitWidth - chosenAnchors[i].y,
				unitWidth - bezOffsets[i].x, unitWidth - bezOffsets[i].y,
				unitWidth - bezOffsets[i].x, unitWidth - bezOffsets[i].y,
				unitWidth - chosenAnchors[i + 1].x, unitWidth - chosenAnchors[i + 1].y
			);
		} else if (quadrant == 3) {
			bezier(
				chosenAnchors[i].x, unitWidth - chosenAnchors[i].y,
				bezOffsets[i].x, unitWidth - bezOffsets[i].y,
				bezOffsets[i].x, unitWidth - bezOffsets[i].y,
				chosenAnchors[i + 1].x, unitWidth - chosenAnchors[i + 1].y
			);
		}
	}
}

class Corner {
	constructor() {

	}

	updateSelf() { 
		setAllAnchors();
		if (debuggingOn) {
			logAllAnchors();
			showAllAnchors();
		}

		setChosenAnchors();	
		if (debuggingOn) {
			logChosenAnchors();
			showChosenAnchors();
		}

		setBezierOffsets();
		if (debuggingOn) {
			logBezierOffsets();
			showBezierOffsets();
		}
	}

	drawSelf() {
		connectChosenAnchors();
	}
}

class Square {
	constructor() {
		for (let i = 0; i < 4; i++) {
			corners[i] = new Corner();
		}
	}

	updateSelf() {
		
	}

	drawSelf() {
		line(0, 0, unitWidth, 0);
		line(0, unitWidth, unitWidth, unitWidth);
		line(0, unitWidth, 0, 0);
		line(unitWidth, 0, unitWidth, unitWidth);
		// rect(2, 2, 2 * unitWidth, 2 * unitWidth); // cheat
		for (let i = 0; i < 4; i++) {
			quadrant = i;
			corners[i].updateSelf();
			corners[i].drawSelf();
		}
	}
}
