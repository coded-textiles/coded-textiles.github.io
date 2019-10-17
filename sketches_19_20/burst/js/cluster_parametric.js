function preload() {
    imgs = [];
    for (let i = 0; i <= 5; i++) {
        imgs[i] = loadImage('images/0' + i + '.png');
    }
}

function setup() {
    canvas = createCanvas(innerWidth, innerHeight * .95);
    canvas.parent("sketch-container");
    imageMode(CENTER);
    noLoop();
    makeControlsPanel();

    refresh();
}

function makeControlsPanel() {
    // Num nodes
	let numNodesText = createP("Number of nodes (1 to 50)");
	numNodesSlider = createSlider(1, 50, 2); // min, max, default
	numNodesText.parent('controls-container');
	numNodesSlider.parent('controls-container');
    numNodesSlider.class('slider');

    // Node tightness
	let nodeTightnessText = createP("Node tightness (dispersed to close)");
	nodeTightnessSlider = createSlider(1, 4, 4); // min, max, default
	nodeTightnessText.parent('controls-container');
	nodeTightnessSlider.parent('controls-container');
    nodeTightnessSlider.class('slider');

    // Blooms per node
	let bloomsPerNodeText = createP("Blooms per node (1 to 50)");
	bloomsPerNodeSlider = createSlider(1, 50, 7); // min, max, default
	bloomsPerNodeText.parent('controls-container');
	bloomsPerNodeSlider.parent('controls-container');
    bloomsPerNodeSlider.class('slider');

    // Bloom size
	let bloomSizeText = createP("Bloom size (100 to 300 pixels)");
	bloomSizeSlider = createSlider(100, 300, 300); // min, max, default
	bloomSizeText.parent('controls-container');
	bloomSizeSlider.parent('controls-container');
    bloomSizeSlider.class('slider');
    
    // Which bloom
    let whichBloomText = createP("Which bloom");
    whichBloomText.parent("controls-container");
    whichBloomRadio = createRadio("Which bloom");

    whichBloomRadio.option('(0) Orange', 0);
    whichBloomRadio.option('(1) Orange', 1);
    whichBloomRadio.option('(2) Orange', 2);
    whichBloomRadio.option('(3) Pink', 3);
    whichBloomRadio.option('(4) Pink', 4);
    whichBloomRadio.option('(5) Pink', 5);

    let button = createButton("REFRESH");
	button.parent('refresh-container');
	button.mousePressed(refresh);
}

function refresh() {
    background(250, 250, 250);
    let n_nodes = numNodesSlider.value();
    let n_blooms_per_node = bloomsPerNodeSlider.value();
    let img_w = bloomSizeSlider.value();
    let img_h = bloomSizeSlider.value();
    let node_tightness_min = nodeTightnessSlider.value() * .1;
    let node_tightness_max = 1 - node_tightness_min;

    let which_image = 1;
    if (whichBloomRadio.value()) {
        which_image = whichBloomRadio.value();
        console.log(which_image);
    }

    for (let n = 0; n < n_nodes; n++) {
        for (let i = 0; i < n_blooms_per_node; i++) {
            // set the nodes
            let nodes = [];
            for (let i = 0; i < n_nodes; i++) {
                nodes[i] = {
                    x: random(width * node_tightness_min, width * node_tightness_max),
                    y: random(height * node_tightness_min, height * node_tightness_max)
                };
            }

            // choose the image
            let img = imgs[which_image];

            // set image to requested size
            img.resize(img_w, img_h);

            // display the image
            image(
                img,
                nodes[n].x + random(-(img_w / 2), (img_w / 2)),
                nodes[n].y + random(-(img_h / 2), (img_h / 2))
            );
        }
    }
}