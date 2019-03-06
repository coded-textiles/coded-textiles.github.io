/* Evolving pattern, still in rough experimental stage.
 * p5.js classes: https://p5js.org/examples/objects-objects.html
 */

// make generations and opacity text input
// create mutation on/of switch
// mutation adjustable slider
// mutation inheritance
// fix the edges

// Basic variables (usually don't change from sketch-to-sketch)
const canvasWidth = 600;
const canvasHeight = 600;

let numGenerations = 14;
let unitWidth;
let unitHeight;

let colors;
let opSlider;
let op = .7;

let numGenSlider;

const parents = [];
let Squares = [];

function setup() {
	if (canvasHeight / numGenerations < 100) {
		unitHeight = canvasHeight / numGenerations;
		unitWidth = unitHeight;
	} else {
		unitWidth = 100;
		unitHeight = 100;
	}

	const canvas = createCanvas(canvasWidth, canvasHeight);
	canvas.parent('sketch');
	noStroke();
	colorMode(HSB);

	colors = [
		[181, 47, 80],
		[238, 59, 26],
		[326, 93, 85],
		[264, 66, 57],
		[41, 73, 100],
		[349, 89, 93],
		[6, 68, 95],
		[350, 83, 70]
	];

	// Num generations
	const numGenText = createP("Number of generations (1-100)");
	numGenSlider = createSlider(0, 100, 14, 1);
	numGenText.parent('controls-container');
	numGenSlider.parent('controls-container');
	numGenSlider.class('slider');

	// Opacity
	const opText = createP("Opacity (transparent to opaque)");
	opSlider = createSlider(.1, 1, .7, .001);
	opText.parent('controls-container');
	opSlider.parent('controls-container');
	opSlider.class('slider');

	// Refresh
	const button = createButton("Refresh");
	button.parent('start-button-container');
	button.mousePressed(refresh);

	refresh();
}

function refresh() {
	push();
	background(255);
	op = opSlider.value();
	numGenerations = numGenSlider.value();
	Squares = [];

	if (canvasHeight / numGenerations < 100) {
		unitHeight = canvasHeight / numGenerations;
		unitWidth = unitHeight;
	} else {
		unitWidth = 100;
		unitHeight = 100;
	}

	drawParent(0);
	drawParent(1);

	for (let i = 0; i < numGenerations - 1; i++) {
		translate(-unitWidth, unitHeight);
		drawChild(i, i + 1);
		translate(unitWidth, 0);
		drawChild(i + 1, i);
	}

	pop();
}

// Details
class Triangle {
	constructor(_x1, _y1, _x2, _y2, _x3, _y3, _r, _c) {
		this.x1 = _x1,
		this.y1 = _y1,
		this.x2 = _x2,
		this.y2 = _y2,
		this.x3 = _x3,
		this.y3 = _y3,
		this.r = _r,
		this.c = _c
	}

	adjustLeft() {
		this.x1 -= unitWidth;
		this.x2 -= unitWidth;
		this.x3 -= unitWidth;
	}

	adjustRight() {
		this.x1 += unitWidth;
		this.x2 += unitWidth;
		this.x3 += unitWidth;
	}

	draw() {
		triangle(
			this.x1, this.y1,
			this.x2, this.y2,
			this.x3, this.y3
		);
	}
}

class Square {
	constructor(_Triangles) {
		this.Triangles = _Triangles;
	}
}

function drawParent(_parentId) {
	const parentId = _parentId;
	let start;
	let colorStartIndex;

	if (parentId === 0) {
		start = {
			x: canvasWidth / 2,
			y: unitHeight
		}
		colorStartIndex = 0;
	} else {
		start = {
			x: canvasWidth / 2 + unitWidth,
			y: unitHeight
		}
		colorStartIndex = 4;
	}

	let thisParent = [];
	
	thisParent[0] = new Triangle(
		start.x, start.y,
		start.x, start.y + unitHeight,
		start.x + unitWidth, start.y + unitHeight,
		0,
		colors[colorStartIndex]
	);

	thisParent[1] = new Triangle(
		start.x + unitWidth, start.y,
		start.x, start.y,
		start.x, start.y + unitHeight,
		0,
		colors[colorStartIndex + 1]
	);

	thisParent[2] = new Triangle(
		start.x + unitWidth, start.y + unitHeight,
		start.x + unitWidth, start.y,
		start.x, start.y,
		0,
		colors[colorStartIndex + 2]
	);

	thisParent[3] = new Triangle(
		start.x, start.y + unitHeight,
		start.x + unitWidth, start.y + unitHeight,
		start.x + unitWidth, start.y,
		0,
		colors[colorStartIndex + 3]
	);

	let randOrder = shuffle([0, 1, 2, 3]);

	for (let i = 0; i < thisParent.length; i++) {
		push();
		fill(
			thisParent[randOrder[i]].c[0],
			thisParent[randOrder[i]].c[1],
			thisParent[randOrder[i]].c[2],
			op
		)
		thisParent[randOrder[i]].draw();
		pop();
	}

	// store as square
	let thisSquare = new Square(
		[
			thisParent[0],
			thisParent[1],
			thisParent[2],
			thisParent[3]
		]
	);

	Squares.push(thisSquare);
}

function drawChild(_P1, _P2) {
	// store as square

	let thisSquare = new Square(
		[
			Squares[_P1].Triangles[0],
			Squares[_P1].Triangles[1],
			Squares[_P2].Triangles[2],
			Squares[_P2].Triangles[3]
		]
	);
	
	// draw
	for (let i = 0; i < thisSquare.Triangles.length; i++) {
		push();
		fill(
			thisSquare.Triangles[i].c[0],
			thisSquare.Triangles[i].c[1],
			thisSquare.Triangles[i].c[2],
			op
		)
		
		if (Squares.length < 4) {
			if (_P1 < _P2) {
				if (i % 4 === 0) {
					thisSquare.Triangles[0].adjustRight();
				} else if (i % 4 === 1) {
					thisSquare.Triangles[1].adjustRight();
				}
			} else if (_P2 < _P1) {
				if (i % 4 === 2) {
					thisSquare.Triangles[2].adjustRight();
				} else if (i % 4 === 3) {
					thisSquare.Triangles[3].adjustRight();
				}
			}
		}
		
		mutateByChance();
		thisSquare.Triangles[i].draw();
		pop();
	}
	Squares.push(thisSquare);
}

function mutateByChance() {
	let rx = random();
	if (rx < .05) {
		translate(-unitWidth / 2, 0);
	} else if (rx < .1) {
		translate(unitWidth / 2, 0);
	} else if (rx < .15) {
		translate(-unitWidth, 0);
	} else if (rx < .2) {
		translate(unitWidth, 0);
	}

	let ry = random();
	if (ry < .05) {
		translate(0, -unitHeight / 2);
	} else if (ry < .1) {
		translate(0, unitHeight / 2);
	} else if (ry < .15) {
		translate(0, -unitWidth);
	} else if (ry < .2) {
		translate(0, unitWidth);
	}
}