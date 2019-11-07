// Each bloom looks for a closest neighbor of its own kind,
// then moves towards it.

let img;
let n_blooms = 70;
let diam = 200;
let lerp_to;
let resetting = false;
let reset_frameCount_start;
let speed = 0.03;

function preload() {
    img_0 = loadImage('images/01.png');
    img_1 = loadImage('images/04.png');
}

function setup() {
    canvas = createCanvas(innerWidth, innerHeight * .9);
    canvas.parent("sketch-container");
    imageMode(CENTER);

    blooms_0 = [];
    for (let i = 0; i < n_blooms; i++) {
        blooms_0[i] = new Bloom(img_0);
        blooms_0[i].resize();
        blooms_0[i].display();
    }

    blooms_1 = [];
    for (let i = 0; i < n_blooms; i++) {
        blooms_1[i] = new Bloom(img_1);
        blooms_1[i].resize();
        blooms_1[i].display();
    }
}

function draw() {
    background(250, 250, 250);
    moveAllToClosestNeighbor(blooms_0);
    moveAllToClosestNeighbor(blooms_1);
}


// Move  all fxn
function moveAllToClosestNeighbor(group) {
    for (let j = 0; j < n_blooms; j++) {
        let closest_dist = 9000;
        let closest_neighbor_index = (j + 1) % n_blooms;
        let closest_neighbor = group[closest_neighbor_index];

        for (let i = 0; i < n_blooms; i++) {
            let this_bloom = group[j];
            if (i !== j) {
                let test_neighbor_index = (i + 1) % n_blooms;
                let test_neighbor = group[test_neighbor_index];
                let test_dist = dist(
                    this_bloom.x, this_bloom.y,
                    test_neighbor.x, test_neighbor.y
                );
    
            if (test_dist < closest_dist && test_dist !== 0) {
                 closest_dist = test_dist;
                closest_neighbor_index = test_neighbor_index;
                closest_neighbor = group[closest_neighbor_index];
                }
            }
        }

        group[j].move({x: closest_neighbor.x, y: closest_neighbor.y}, speed);
        group[j].display();
    }
}

// Bloom class
class Bloom {
    constructor(_img) {
        this.x = random(width);
        this.y = random(height);
        this.reset_x = this.x;
        this.reset_y = this.y;
        this.img = _img;
    }

    resize() {
        let img = this.img
        img.resize(diam, diam);
    }
    
    move(destination, speed) {
        this.x = lerp(this.x, destination.x, speed);
        this.y = lerp(this.y, destination.y, speed);
    }

    display() {
        image(this.img, this.x, this.y);
    }
  }

