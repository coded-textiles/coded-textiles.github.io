// Evolving pattern, still in rough experimental stage.

const canvasWidth = 700;
let randomizeLayOrder = true;
let mutateThreshold = .1;
let numGenerations = 100;
let cornerSize;
let canvasHeight = 5000;
let a = [];
let b = [];
let squares = [];

let mutationRateSlider;
let numGenerationsSlider;
let layOrderRadio;
let inheritMutationRadio;

// Load static png files (i.e. corners)
function preload() {
	for (let i = 0; i < 4; i++) {
		a[i] = loadImage(`./images/A${i + 1}_70.png`);
	}
	for (let i = 0; i < 4; i++) {
		b[i] = loadImage(`./images/B${i + 1}_70.png`);
	}
}

// Set up canvas and drawing modes
function setup() {
	const canvas = createCanvas(canvasWidth, canvasHeight);
	imageMode(CENTER);
	angleMode(DEGREES);
	canvas.parent('sketch');

	// Mutation rate
	const mutationRateText = createP("Mutation rate (none to likely)");
	mutationRateSlider = createSlider(0, .25, .1, .005); // min, max, default
	mutationRateText.parent('controls-container');
	mutationRateSlider.parent('controls-container');
	mutationRateSlider.class('slider');

	// Num generations
	const numGenerationsText = createP("Number of generations (0 - 100)");
	numGenerationsSlider = createSlider(1, 100, 5); // min, max, default
	numGenerationsText.parent('controls-container');
	numGenerationsSlider.parent('controls-container');
	numGenerationsSlider.class('slider');

	// Size of individual
	const cornerSizeText = createP("Individual size (small to large)");
	cornerSizeSlider = createSlider(5, 100, 90); // min, max, default
	cornerSizeText.parent('controls-container');
	cornerSizeSlider.parent('controls-container');
	cornerSizeSlider.class('slider');

	// Lay order
	const layOrderText = createP("Randomize 'DNA' lay order");
	layOrderRadio = createRadio('lay order');
	layOrderRadio.option('true ', 0);
	layOrderRadio.option('false', 1);
	layOrderText.parent('controls-container');
	layOrderRadio.parent('controls-container');
	layOrderRadio._getInputChildrenArray()[0].checked = true;

	// Inherit mutations
	const inheritMutationText = createP("Inherit mutations");
	inheritMutationRadio = createRadio('inherit mutations');
	inheritMutationRadio.option('true ', 0);
	inheritMutationRadio.option('false', 1);
	inheritMutationText.parent('controls-container');
	inheritMutationRadio.parent('controls-container');
	inheritMutationRadio._getInputChildrenArray()[0].checked = true;

	// Make refresh button and sliders
	const button = createButton("Regenerate parents and children");
	button.parent('start-button-container');
	button.mousePressed(refresh);

	refresh();
}

// Display the drawing on the canvas
function refresh() {
	push();
	background(255);
	squares = [];
	cornerSize = cornerSizeSlider.value();
	randomizeLayOrder = layOrderRadio._getInputChildrenArray()[0].checked;
	console.log("test");

	// Starter squares
	squares[0] = new Square(a[0], a[1], a[2], a[3], 0, 0, 0, 0, 0, 0, 0, 0);
	squares[1] = new Square(b[0], b[1], b[2], b[3], 0, 0, 0, 0, 0, 0, 0, 0);

	mutateThreshold = mutationRateSlider.value();

	// Position to begin lineage chain
	translate(width / 2, cornerSize / 2);

	for (let g = 0; g < numGenerationsSlider.value(); g++) {
		drawGeneration(squares[g + 0], squares[g + 1]);
		createNewGeneration(squares[g + 0], squares[g + 1]);
	}
	pop();
}

class Square {
	constructor(
		_c0, _c1, _c2, _c3,
		_x0, _x1, _x2, _x3,
		_y0, _y1, _y2, _y3
	) {
		this.corners = [_c0, _c1, _c2, _c3];
		this.mutation = {
			x: [_x0, _x1, _x2, _x3],
			y: [_y0, _y1, _y2, _y3]
		}
	}

	drawSelf() {
		let randOrder = [0, 1, 2, 3];
		if (randomizeLayOrder) {
			randOrder = shuffle(randOrder);
		}
		
		for (let c = 0; c < this.corners.length; c++) {
			push();
			rotate(90 * c);
			translate(this.mutation.x[randOrder[c]], this.mutation.y[randOrder[c]]);
			image(this.corners[randOrder[c]], 0, 0, cornerSize, cornerSize);
			pop();
		}
	}

	mutateSelf() {
		for (let c = 0; c < 4; c++) {
			// mutateThreshold += .01;
			// TODO: add noise option
			const randX = random();
			if (randX < mutateThreshold) {
					this.mutation.x[c] += cornerSize; // right full
				} else if (randX < mutateThreshold * 2) {
					this.mutation.x[c] -= cornerSize; // left full
				} else if (randX < mutateThreshold * 3) {
					this.mutation.x[c] += cornerSize / 2; // right half
				} else if (randX < mutateThreshold * 4) {
					this.mutation.x[c] -= cornerSize / 2; // left half
			}
			const randY = random();
			if (randY < mutateThreshold) {
					this.mutation.y[c] += cornerSize; // down full
				} else if (randY < mutateThreshold * 2) {
					this.mutation.y[c] -= cornerSize; // up full
				} else if (randY < mutateThreshold * 3) {
					this.mutation.y[c] += cornerSize / 2; // down half
				} else if (randY < mutateThreshold * 4) {
					this.mutation.y[c] -= cornerSize / 2; // up half
			}
		}
	}
}

// Draw generation
function drawGeneration(_s1, _s2) {
	_s1.drawSelf();
	translate(cornerSize, 0); // move right
	_s2.drawSelf();
	translate(-cornerSize, cornerSize); // move to new row
}

// Create new generation
function createNewGeneration(_s1, _s2) {
	// Create children
	let newSquare1, newSquare2;
	if (inheritMutationRadio._getInputChildrenArray()[0].checked) {
		newSquare1 = new Square(
			_s1.corners[0], _s1.corners[1], _s2.corners[2], _s2.corners[3],
			_s1.mutation.x[0], _s1.mutation.x[1], _s2.mutation.x[2], _s2.mutation.x[3],
			_s1.mutation.y[0], _s1.mutation.y[1], _s2.mutation.y[2], _s2.mutation.y[3]
		);
		newSquare2 = new Square(
			_s2.corners[0], _s2.corners[1], _s1.corners[2], _s1.corners[3],
			_s2.mutation.x[0], _s2.mutation.x[1], _s1.mutation.x[2], _s1.mutation.x[3],
			_s2.mutation.y[0], _s2.mutation.y[1], _s1.mutation.y[2], _s1.mutation.y[3]
		);
	} else {
		newSquare1 = new Square(
			_s1.corners[0], _s1.corners[1], _s2.corners[2], _s2.corners[3],
			0, 0, 0, 0,
			0, 0, 0, 0
		);
		newSquare2 = new Square(
			_s2.corners[0], _s2.corners[1], _s1.corners[2], _s1.corners[3],
			0, 0, 0, 0,
			0, 0, 0, 0
		);
	}

	// Add new mutations
	newSquare1.mutateSelf();
	newSquare2.mutateSelf();

	// Push to lineage
	squares.push(newSquare1);
	squares.push(newSquare2);
}
