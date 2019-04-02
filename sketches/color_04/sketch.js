// Evolving pattern, still in rough experimental stage.

let squareWidth = 30;
let numgenerations = 20;
let numsquares = numgenerations * 2;

const squares = [];
const colors = [];
const corners = [];

let thisColor;
let movementTracker = {
	x: 0,
	y: 0
}

function preload() {
	for (let i = 0; i < 8; i++) {
		corners[i] = loadImage(`./images/${i}_70.png`);
	}
}

function setup() {
	const canvas = createCanvas(windowWidth, 6000);
	canvas.parent('sketch');
	imageMode(CENTER);
	noFill();
	stroke(255);
	strokeWeight(.5);

	displayControlPanel();
	translate(windowWidth / 4, 0);
	refresh();
}

function displayControlPanel() {
	// Num generations
	const numGenerationsText = createP("Number of generations (0 - 200)");
	numGenerationsSlider = createSlider(1, 150, 20); // min, max, default
	numGenerationsText.parent('controls-container');
	numGenerationsSlider.parent('controls-container');
	numGenerationsSlider.class('slider');

	// Size of individual
	const cornerSizeText = createP("Individual size (small to large)");
	cornerSizeSlider = createSlider(5, 100, 40); // min, max, default
	cornerSizeText.parent('controls-container');
	cornerSizeSlider.parent('controls-container');
	cornerSizeSlider.class('slider');
	
	// Mutation rate
	const mutationRateText = createP("Mutation rate (none to likely)");
	mutationRateSlider = createSlider(0, .25, .1, .005); // min, max, default
	mutationRateText.parent('controls-container');
	mutationRateSlider.parent('controls-container');
	mutationRateSlider.class('slider');

	// Lay order
	const layOrderText = createP("Randomize 'DNA' lay order");
	layOrderRadio = createRadio('lay order');
	layOrderRadio.option('true ', 0);
	layOrderRadio.option('false', 1);
	layOrderText.parent('controls-container');
	layOrderRadio.parent('controls-container');
	layOrderRadio._getInputChildrenArray()[0].checked = true;

	// Make refresh button and sliders
	const button = createButton("Regenerate lineage");
	button.parent('start-button-container');
	button.mousePressed(refresh);
}

function refresh() {
	// Regenerate values
	numgenerations = numGenerationsSlider.value();
	numsquares = numgenerations * 2;
	squareWidth = cornerSizeSlider.value();
	translate(0, squareWidth / 2)

	movementTracker.x = 0;
	movementTracker.y = squareWidth / 2;
	background(255);
	drawLineage();

	translate(- movementTracker.x, - movementTracker.y);
}

function drawLineage() {
	// manual start
	squares[0] = new Square(null, null);
	squares[0].setCorners();
	squares[0].display();
	moveCanvas(0);

	for (let i = 1; i < numsquares; i++) {
		createNewSquare(i);
		moveCanvas(i);
	}
}

class Square {
	constructor(_corners, _offspringOf) {
		this.corners = _corners,
		this.offspringOf = _offspringOf
	}

	setCorners(_i) {
		// If no parents, generate random corners
		if (this.offspringOf === null) {
			this.corners = [
				new Corner(
					corners[Math.floor(random(corners.length))],
					0 * (PI / 2),
					null
				),
				new Corner(
					corners[Math.floor(random(corners.length))],
					1 * (PI / 2),
					null
				),
				new Corner(
					corners[Math.floor(random(corners.length))],
					2 * (PI / 2),
					null
				),
				new Corner(
					corners[Math.floor(random(corners.length))],
					3 * (PI / 2),
					null
				)
			];
		}

		// If parents, flip a coin and inherit color from
		// either or
		else {
			this.corners = [
				squares[_i - oneOrTwo()].corners[0],
				squares[_i - oneOrTwo()].corners[1],
				squares[_i - oneOrTwo()].corners[2],
				squares[_i - oneOrTwo()].corners[3],
			];
		}
	}

	mutateCorners() {
		for (let i = 0; i < this.corners.length; i++) {
			this.corners[i].mutate();
		}
	}

	display() {
		// let randomizeLayOrder = true;
		let randOrder = [0, 1, 2, 3];
		if (layOrderRadio._getInputChildrenArray()[0].checked) {
			randOrder = shuffle(randOrder);
		}

		for (let i = 0; i < randOrder.length; i++) {
			push();
				rotate(this.corners[randOrder[i]].rotate);
				this.corners[randOrder[i]].display();
			pop();
		}
	}
}

class Corner {
	constructor(_img, _rotate, _translate) {
		this.x = 0,
		this.y = 0,
		this.img = _img,
		this.rotate = _rotate
		this.translate = _translate
	}

	mutate() {
		// let threshold = 0;
		let threshold = mutationRateSlider.value();
		let mutation = {
			x: 0,
			y: 0
		}
		let randx = random();
		if (randx < threshold * 0) {
			mutation.x = squareWidth;
		} else if (randx < threshold * 2) {
			mutation.x = - squareWidth;
		} else if (randx < threshold * 3) {
			mutation.x = squareWidth / 2;
		} else if (randx < threshold * 4) {
			mutation.x = - squareWidth / 2;
		}

		let randy = random();
		if (randy < threshold * 0) {
			mutation.y = squareWidth;
		} else if (randy < threshold * 2) {
			mutation.y = - squareWidth;
		} else if (randy < threshold * 3) {
			mutation.y = squareWidth / 2;
		} else if (randy < threshold * 4) {
			mutation.y = - squareWidth / 2;
		}
		this.x += mutation.x;
		this.y += mutation.y;
	}

	display() {
		push();
			if (this.translate != null) {
				translate(this.translate.x, this.translate.y);
			}
			image(this.img, this.x, this.y, squareWidth, squareWidth);
		pop();
	}
}

function createNewSquare(_i) {
	let offspringOf = null;
	if (_i % 2 === 0) {
		offspringOf = [_i - 1, _i - 2];
	}
	squares[_i] = new Square(null, offspringOf);
	squares[_i].setCorners(_i);
	squares[_i].mutateCorners();
	squares[_i].display();
}


// Utilities
function moveCanvas(_i) {
	let x = 0;
	let y = 0;
	if (_i % 8 === 0) {
		x = - squareWidth;
	} else if (_i % 8 === 1) {
		x = squareWidth / 2;
		y = squareWidth;
	} else if  (_i % 8 === 2) {
		y = squareWidth;
	} else if  (_i % 8 === 3) {
		x = squareWidth;
		y = - squareWidth / 2
	} else if  (_i % 8 === 4) {
		x = squareWidth;
	} else if  (_i % 8 === 5) {
		x = - squareWidth / 2;
		y = squareWidth;
	} else if  (_i % 8 === 6) {
		y = squareWidth;
	} else if  (_i % 8 === 7) {
		x = - squareWidth;
		y = - squareWidth / 2;
	}
	translate(x, y);
	movementTracker.x += x;
	movementTracker.y += y;
}

function oneOrTwo() {
	let choice = 1;
	if (random() < .5) {
		choice = 2;
	}
	return choice;
}
