/* Evolving pattern, still in rough experimental stage.
 */

const colorOn = true;

// Basic variables (usually don't change from sketch-to-sketch)
const canvasWidth = 600;
const canvasHeight = canvasWidth;

const hexBlue = "#41C0DE";
const hexRed = "#EF4550";

// Sketch-specific variables
const unitWidth = 200;
let originX = 0;
let originY = 0;
let currentAnchorIndex;
let nextAnchorIndex;
let corners = [];
let quadrant = 0;


function setup() {
	var canvas = createCanvas(canvasWidth, canvasHeight);
	canvas.parent('sketch-container');
	noFill();
	rectMode(CENTER);

	p0 = new Square();
	p0.getRandomFeatures();
	p0.drawSelf();

	translate(unitWidth + 50, 0);
	p1 = new Square();
	p1.getRandomFeatures();
	p1.drawSelf();

	translate(-(unitWidth / 2 + 25), unitWidth + 50);
	c0 = new Square();
	c0.getInheritedFeatures(p0, p1);
	c0.drawSelf();
}

class Corner {
	constructor() {
		this.allAnchors = [];
		this.chosenAnchors = [];
		this.bezOffsets = [];
	}

	setAllAnchors() {
		origin = {x: originX, y: originY};
		for (let i = 0; i <= 4; i++) {
			this.allAnchors[i] = {
				x: origin.x + unitWidth - (i/4 * unitWidth),
				y: origin.y + 0 + (i/4 * unitWidth)
			};	
		}
	}

	setChosenAnchors() {
		currentAnchorIndex = 0;
		nextAnchorIndex;
		this.chosenAnchors = [this.allAnchors[currentAnchorIndex]];
	
		while (currentAnchorIndex < 4) {
			nextAnchorIndex = currentAnchorIndex + floor(random(1, 5 - currentAnchorIndex));
			currentAnchorIndex = nextAnchorIndex;
			this.chosenAnchors.push(this.allAnchors[nextAnchorIndex]);
		}
	}

	setBezierOffsets() {
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
		for (let i = 0; i < this.chosenAnchors.length - 1; i++) {
			if (quadrant == 0) {
				bezier(
					this.chosenAnchors[i].x, this.chosenAnchors[i].y,
					this.bezOffsets[i].x, this.bezOffsets[i].y,
					this.bezOffsets[i].x, this.bezOffsets[i].y,
					this.chosenAnchors[i + 1].x, this.chosenAnchors[i + 1].y
				);
			} else if (quadrant == 1) {
				bezier(
					unitWidth - this.chosenAnchors[i].x, this.chosenAnchors[i].y,
					unitWidth - this.bezOffsets[i].x, this.bezOffsets[i].y,
					unitWidth - this.bezOffsets[i].x, this.bezOffsets[i].y,
					unitWidth - this.chosenAnchors[i + 1].x, this.chosenAnchors[i + 1].y
				);
			} else if (quadrant == 2) {
				bezier(
					unitWidth - this.chosenAnchors[i].x, unitWidth - this.chosenAnchors[i].y,
					unitWidth - this.bezOffsets[i].x, unitWidth - this.bezOffsets[i].y,
					unitWidth - this.bezOffsets[i].x, unitWidth - this.bezOffsets[i].y,
					unitWidth - this.chosenAnchors[i + 1].x, unitWidth - this.chosenAnchors[i + 1].y
				);
			} else if (quadrant == 3) {
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
			line(originX, originY, this.chosenAnchors[0].x, this.chosenAnchors[0].y);
			line(originX, originY, this.chosenAnchors[maxAnchorIndex].x, this.chosenAnchors[maxAnchorIndex].y);
		} else if (quadrant == 1) {
			line(originX + unitWidth, originY, this.chosenAnchors[0].x - unitWidth, this.chosenAnchors[0].y);
			line(originX + unitWidth, originY, this.chosenAnchors[maxAnchorIndex].x + unitWidth, this.chosenAnchors[maxAnchorIndex].y);
		} else if (quadrant == 2) {
			line(originX + unitWidth, originY + unitWidth, this.chosenAnchors[0].x, this.chosenAnchors[0].y);
			line(originX + unitWidth,  originY + unitWidth, this.chosenAnchors[maxAnchorIndex].x, this.chosenAnchors[maxAnchorIndex].y);
		} else if (quadrant == 3) {
			line(originX, originY + unitWidth, this.chosenAnchors[0].x - unitWidth, this.chosenAnchors[0].y);
			line(originX, originY + unitWidth, this.chosenAnchors[maxAnchorIndex].x + unitWidth, this.chosenAnchors[maxAnchorIndex].y);
		}
	}
}

class Square {
	constructor() {
		this.corners = [];
	}

	getRandomFeatures() {
		for (let i = 0; i < 4; i++) {
			this.corners[i] = new Corner();
			this.corners[i].setAllAnchors();
			this.corners[i].setChosenAnchors();
			this.corners[i].setBezierOffsets();
		}
	}

	getInheritedFeatures(parentSquareA, parentSquareB) {
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
}