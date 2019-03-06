/* Evolving pattern, still in rough experimental stage.
 * p5.js classes: https://p5js.org/examples/objects-objects.html
 */

// Basic variables (usually don't change from sketch-to-sketch)
const canvasWidth = 800;
const canvasHeight = canvasWidth;

const hexBlue = "#41C0DE";
const hexRed = "#EF4550";

// Sketch-specific variables
const unitWidth = 70;
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

	// Mutation rate X
	var mutationRateTextX = createP("Horizontal mutation rate");
	mutationRateSliderX = createSlider(10, 200, 130); // min, max, default
	mutationRateTextX.parent('controls-container');
	mutationRateSliderX.parent('controls-container');
	mutationRateSliderX.class('slider');

	// Mutation rate Y
	var mutationRateTextY = createP("Vertical mutation rate");
	mutationRateSliderY = createSlider(10, 200, 130); // min, max, default
	mutationRateTextY.parent('controls-container');
	mutationRateSliderY.parent('controls-container');
	mutationRateSliderY.class('slider');

	// Make refresh button and sliders
	var button = createButton("Regenerate parents and children");
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
		for (let i = 0; i < 4; i++) {
			quadrant = i;
			let translateX;
			let translateY;

			let randMaxX = 210 - mutationRateSliderX.value();
			let randMaxY = 210 - mutationRateSliderY.value();
			// let randMax = 10;

			// decide translateX
			let randX = Math.floor(random(randMaxX));
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
			let randY = Math.floor(random(randMaxY));
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
	translate(3 * unitWidth, 0);
	// ellipse(0, 0, 10, 10); // translation debugging

	// generation 1
	p0 = new Square();
	p0.getRandomFeatures();
	p0.drawSelf();

	translate(unitWidth, 0);
	p1 = new Square();
	p1.getRandomFeatures();
	p1.drawSelf();

	// generation 2
	translate(-unitWidth, unitWidth);
	c0 = new Square();
	c0.getInheritedFeatures(p0, p1);
	c0.drawMutatedSelf();

	translate(unitWidth, 0);
	c1 = new Square();
	c1.getInheritedFeatures(p1, p0);
	c1.drawMutatedSelf();

	// generation 3
	translate(-unitWidth, unitWidth);
	c2 = new Square();
	c2.getInheritedFeatures(c0, c1);
	c2.drawMutatedSelf();

	translate(unitWidth, 0);
	c3 = new Square();
	c3.getInheritedFeatures(c1, c0);
	c3.drawMutatedSelf();

	// generation 4
	translate(-unitWidth, unitWidth);
	c4 = new Square();
	c4.getInheritedFeatures(c2, c3);
	c4.drawMutatedSelf();

	translate(unitWidth, 0);
	c5 = new Square();
	c5.getInheritedFeatures(c3, c2);
	c5.drawMutatedSelf();

	// generation 5
	translate(-unitWidth, unitWidth);
	c6 = new Square();
	c6.getInheritedFeatures(c4, c5);
	c6.drawMutatedSelf();

	translate(unitWidth, 0);
	c7 = new Square();
	c7.getInheritedFeatures(c5, c4);
	c7.drawMutatedSelf();

	// generation 6
	translate(-unitWidth, unitWidth);
	c8 = new Square();
	c8.getInheritedFeatures(c6, c7);
	c8.drawMutatedSelf();

	translate(unitWidth, 0);
	c9 = new Square();
	c9.getInheritedFeatures(c7, c6);
	c9.drawMutatedSelf();

	// generation 7
	translate(-unitWidth, unitWidth);
	c10 = new Square();
	c10.getInheritedFeatures(c8, c9);
	c10.drawMutatedSelf();

	translate(unitWidth, 0);
	c11 = new Square();
	c11.getInheritedFeatures(c9, c8);
	c11.drawMutatedSelf();

	// generation 8
	translate(-unitWidth, unitWidth);
	c12 = new Square();
	c12.getInheritedFeatures(c10, c11);
	c12.drawMutatedSelf();

	translate(unitWidth, 0);
	c13 = new Square();
	c13.getInheritedFeatures(c11, c10);
	c13.drawMutatedSelf();

	// generation 9
	translate(-unitWidth, unitWidth);
	c14 = new Square();
	c14.getInheritedFeatures(c12, c13);
	c14.drawMutatedSelf();

	translate(unitWidth, 0);
	c15 = new Square();
	c15.getInheritedFeatures(c13, c12);
	c15.drawMutatedSelf();

	// generation 10
	translate(-unitWidth, unitWidth);
	c16 = new Square();
	c16.getInheritedFeatures(c14, c15);
	c16.drawMutatedSelf();

	translate(unitWidth, 0);
	c17 = new Square();
	c17.getInheritedFeatures(c15, c14);
	c17.drawMutatedSelf();

	pop();
}