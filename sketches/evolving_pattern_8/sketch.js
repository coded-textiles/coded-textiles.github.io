/* Evolving pattern, still in rough experimental stage.
 * p5.js classes: https://p5js.org/examples/objects-objects.html
 */

// Basic variables (usually don't change from sketch-to-sketch)
const canvasWidth = 800;
const canvasHeight = canvasWidth;

const hexBlue = "#41C0DE";
const hexRed = "#EF4550";

// Sketch-specific variables
const unitWidth = 150;
// let originX = -10;
// let originY = -10;
let currentAnchorIndex;
let nextAnchorIndex;
let corners = [];
let quadrant = 0;
let mutationRateSlider;

function setup() {
	var canvas = createCanvas(canvasWidth, canvasHeight);
	canvas.parent('sketch');
	noFill();

	// Mutation rate
	var mutationRateText = createP("Mutation rate (less -> more)");
	mutationRateSlider = createSlider(10, 200, 130); // min, max, default
	mutationRateText.parent('controls-container');
	mutationRateSlider.parent('controls-container');
	mutationRateSlider.class('slider');

	// Make refresh button and sliders
	var button = createButton("Regenerate parents and child");
	button.parent('start-button-container');
	button.mousePressed(refreshSketch);

	refreshSketch();
}

class Corner {
	constructor() {
		this.allAnchors = [];
		this.chosenAnchors = [];
		this.bezOffsets = [];
		this.origin = {x: 0, y: 0};
	}

	setAllAnchors() {
		// sets coordinate points for all possible anchors and stores
		// them in array called this.allAnchors[].
		for (let i = 0; i <= 4; i++) {
			this.allAnchors[i] = {
				x: this.origin.x + unitWidth - (i/4 * unitWidth),
				y: this.origin.y + 0 + (i/4 * unitWidth)
			};	
		}
	}

	setChosenAnchors() {
		// chooses 2-5 anchor points from this.allAnchors[] to pay attention to
		// for this square in particular, and stores them in array called
		// this.chosenAnchors[].
		currentAnchorIndex = 0;
		let nextAnchorIndex;
		this.chosenAnchors = [this.allAnchors[currentAnchorIndex]];
	
		while (currentAnchorIndex < 4) {
			nextAnchorIndex = currentAnchorIndex + floor(random(1, 5 - currentAnchorIndex));
			currentAnchorIndex = nextAnchorIndex;
			this.chosenAnchors.push(this.allAnchors[nextAnchorIndex]);
		}
	}

	setBezierOffsets() {
		// chooses bezier anchors to connect consecutive points in
		// this.chosenAnchors[], and stores them in this.bezOffsets[].
		for (let i = 0; i < this.chosenAnchors.length - 1; i++) {
			let midX = lerp(this.chosenAnchors[i].x, this.chosenAnchors[i+1].x, .5);
			let midY = lerp(this.chosenAnchors[i].y, this.chosenAnchors[i+1].y, .5);;
			let mid = {x: midX, y: midY};
	
			let bezPolarity;
			if (random(0, 1) < .5) {
				bezPolarity = -1;
			} else {
				bezPolarity = 1;
			}
			
			let bezMagnitude = .2 * dist(
				this.chosenAnchors[i].x, this.chosenAnchors[i].y,
				this.chosenAnchors[i+1].x, this.chosenAnchors[i+1].y);
			let bezOffset = bezPolarity * bezMagnitude;
			let bez = {x: mid.x + bezOffset, y: mid.y + bezOffset};
	
			this.bezOffsets[i] = bez;
		}
	}

	connectAnchors() {
		// connects consecutive this.chosenAnchors[] points with bezier curves,
		// using this.bezOffsets[] as bezier guides.
		for (let i = 0; i < this.chosenAnchors.length - 1; i++) {
			if (quadrant === 0) {
				bezier(
					this.chosenAnchors[i].x, this.chosenAnchors[i].y,
					this.bezOffsets[i].x, this.bezOffsets[i].y,
					this.bezOffsets[i].x, this.bezOffsets[i].y,
					this.chosenAnchors[i + 1].x, this.chosenAnchors[i + 1].y
				);
			} else if (quadrant === 1) {
				bezier(
					unitWidth - this.chosenAnchors[i].x, this.chosenAnchors[i].y,
					unitWidth - this.bezOffsets[i].x, this.bezOffsets[i].y,
					unitWidth - this.bezOffsets[i].x, this.bezOffsets[i].y,
					unitWidth - this.chosenAnchors[i + 1].x, this.chosenAnchors[i + 1].y
				);
			} else if (quadrant === 2) {
				bezier(
					unitWidth - this.chosenAnchors[i].x, unitWidth - this.chosenAnchors[i].y,
					unitWidth - this.bezOffsets[i].x, unitWidth - this.bezOffsets[i].y,
					unitWidth - this.bezOffsets[i].x, unitWidth - this.bezOffsets[i].y,
					unitWidth - this.chosenAnchors[i + 1].x, unitWidth - this.chosenAnchors[i + 1].y
				);
			} else if (quadrant === 3) {
				bezier(
					this.chosenAnchors[i].x, unitWidth - this.chosenAnchors[i].y,
					this.bezOffsets[i].x, unitWidth - this.bezOffsets[i].y,
					this.bezOffsets[i].x, unitWidth - this.bezOffsets[i].y,
					this.chosenAnchors[i + 1].x, unitWidth - this.chosenAnchors[i + 1].y
				);
			}
		}
	}

	drawBorders() {
		let maxAnchorIndex = this.chosenAnchors.length - 1;
		if (quadrant == 0) {
			line(this.origin.x, this.origin.y, this.chosenAnchors[0].x, this.chosenAnchors[0].y);
			line(this.origin.x, this.origin.y, this.chosenAnchors[maxAnchorIndex].x, this.chosenAnchors[maxAnchorIndex].y);
		} else if (quadrant == 1) {
			line(this.origin.x + unitWidth, this.origin.y, this.chosenAnchors[0].x - unitWidth, this.chosenAnchors[0].y);
			line(this.origin.x + unitWidth, this.origin.y, this.chosenAnchors[maxAnchorIndex].x + unitWidth, this.chosenAnchors[maxAnchorIndex].y);
		} else if (quadrant == 2) {
			line(this.origin.x + unitWidth, this.origin.y + unitWidth, this.chosenAnchors[0].x, this.chosenAnchors[0].y);
			line(this.origin.x + unitWidth,  this.origin.y + unitWidth, this.chosenAnchors[maxAnchorIndex].x, this.chosenAnchors[maxAnchorIndex].y);
		} else if (quadrant == 3) {
			line(this.origin.x, this.origin.y + unitWidth, this.chosenAnchors[0].x - unitWidth, this.chosenAnchors[0].y);
			line(this.origin.x, this.origin.y + unitWidth, this.chosenAnchors[maxAnchorIndex].x + unitWidth, this.chosenAnchors[maxAnchorIndex].y);
		}
	}
}

class Square {
	constructor() {
		this.corners = [];
	}

	getRandomFeatures() {
		// sets all features for 4 corners, randomly
		for (let i = 0; i < 4; i++) {
			this.corners[i] = new Corner();
			this.corners[i].setAllAnchors();
			this.corners[i].setChosenAnchors();
			this.corners[i].setBezierOffsets();
		}
	}

	getInheritedFeatures(parentSquareA, parentSquareB) {
		// sets all featurers for 4 corners, from parents
		for (let i = 0; i < 2; i++) {
			this.corners[i] = parentSquareA.corners[i];
		}
		for (let i = 2; i < 4; i++) {
			this.corners[i] = parentSquareB.corners[i];
		}
	}

	drawSelf() {
		for (let i = 0; i < 4; i++) {
			quadrant = i;
			this.corners[i].connectAnchors();
			this.corners[i].drawBorders();
		}
	}

	drawMutatedSelf() {
		let pctMoveRight;
		for (let i = 0; i < 4; i++) {
			quadrant = i;
			let translateX;
			let translateY;

			let randMax = 210 - mutationRateSlider.value();
			// let randMax = 10;

			// decide translateX
			let randX = Math.floor(random(randMax));
			if (randX === 0) {
				translateX = unitWidth; // move full right
			} else if (randX === 1) {
				translateX = unitWidth / 2; // move half right
			} else if (randX === 2) {
				translateX = -(unitWidth); // move full left
			} else if (randX === 3) {
				translateX = -(unitWidth / 2); // move half left
			} else {
				translateX = 0; // don't move horizontally
			}

			// decide translateY
			let randY = Math.floor(random(randMax));
			if (randY === 0) {
				translateY = unitWidth; // move full right
			} else if (randY === 1) {
				translateY = unitWidth / 2; // move half right
			} else if (randY === 2) {
				translateY = -(unitWidth); // move full left
			} else if (randY === 3) {
				translateY = -(unitWidth / 2); // move half left
			} else {
				translateY = 0; // don't move horizontally
			}

			push();
			translate(translateX, translateY);
			this.corners[i].connectAnchors();
			this.corners[i].drawBorders();
			pop();
		}
	}
}

function refreshSketch() {
	background(255);
	push();
	// rect(1, 1, canvasWidth - 2, canvasHeight - 2); // DOM debugging
	translate(unitWidth, 0);
	// ellipse(0, 0, 10, 10); // translation debugging

	// generation 1
	p0 = new Square();
	p0.getRandomFeatures();
	p0.drawSelf();

	translate(unitWidth + 50, 0);
	p1 = new Square();
	p1.getRandomFeatures();
	p1.drawSelf();

	// generation 2
	stroke(0); // black
	strokeWeight(1.5);
	translate(-(unitWidth / 2 + 25), 2 * unitWidth + 25);
	c0 = new Square();
	c0.getInheritedFeatures(p0, p1);
	c0.drawMutatedSelf();

	pop();
}