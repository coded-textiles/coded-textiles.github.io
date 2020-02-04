var nObjects, nObjects_Text, nObjects_Slider;
var sObjects, sObjects_Text, sObjects_Slider;
var mObjects, mObjects_Text, mObjects_Slider;
var collisionZone, collisionZone_Text, collisionZone_Slider;
var restitution, restitution_Text, restitution_Slider;
var movementNoise, movementNoise_Text, movementNoise_Slider;
var rotateNoise, movementNoise_Text, movementNoise_Slider;
var updateRequested = false;
var isPaused = false;

var circles;
var imageNames = [
  './assets/RB1.png',
  './assets/RB2.png',
  './assets/RB3.png',
  './assets/RB4.png',
  './assets/RB5.png',
  './assets/RB6.png',
  './assets/RB7.png',
  './assets/RB8.png',
  './assets/RB9.png',
  './assets/RB10.png',
  './assets/RB11.png',
  './assets/RB12.png',
];

// SETUP //////////////////////////////////////////////////
function setup() {
    createCanvas(windowWidth, windowHeight);
    circles = new Group();
    toggleUpdate();
    createControls();
}

// CONTROLS ////////////////////////////////////////////////
function createControls() {
    // number of objects
    nObjects_Text = createP('Number');
    nObjects_Slider = createSlider(5, 50, 30, 1);
    connectControlToDOM(nObjects_Text, nObjects_Slider);

    // size of objects
    sObjects_Text = createP('Size');
    sObjects_Slider = createSlider(.01, .2, .08, .001);
    connectControlToDOM(sObjects_Text, sObjects_Slider);

    // mass of object
    mObjects_Text = createP('Mass');
    mObjects_Slider = createSlider(.01, 10, 5, .01);
    connectControlToDOM(mObjects_Text, mObjects_Slider);

    // collision zone
    collision_Text = createP('Spacing');
    collision_Slider = createSlider(500, 1000, 700, 1);
    connectControlToDOM(collision_Text, collision_Slider);

    // restitution
    restitution_Text = createP('Restitution');
    restitution_Slider = createSlider(.1, 1, .1, .001);
    connectControlToDOM(restitution_Text, restitution_Slider);

    // movement noise
    // movement_Text = createP('Movement noise');
    // movement_Slider = createSlider(0, 1, 0, 1);
    // connectControlToDOM(movement_Text, movement_Slider);
    
    // rotation noise
    // rotation_Text = createP('Rotation');
    // rotation_Slider = createSlider(0, 1, 0, 1);
    // connectControlToDOM(rotation_Text, rotation_Slider);

    // restart
    var restart_Button = createButton("Restart animation");
	restart_Button.parent('controls');
    restart_Button.mousePressed(toggleUpdate);
    
    // pause
    var pause_Button = createButton("Pause/play animation");
	pause_Button.parent('controls');
	pause_Button.mousePressed(togglePause);
}

// Controls utility
function connectControlToDOM(name_text, name_slider, is_slider=true) {
    name_text.parent('controls');
    name_slider.parent('controls');
    if (is_slider) {
        name_slider.class('slider');
    }
}

// DRAW ///////////////////////////////////////////////////
function draw() {
    if (!isPaused) {
        // clear background
        background(10, 10, 10);

        // update settings
        if (updateRequested) {
            console.log("START");
            var current_nObjects = nObjects_Slider.value();
            var current_sObjects = sObjects_Slider.value();
            var current_mObjects = mObjects_Slider.value();
            var current_collision = collision_Slider.value();
            var current_restitution = restitution_Slider.value();

            circles.removeSprites();

            // Create sprites
            for (var i = 0; i < current_nObjects; i++) {
                var circle = createSprite(random(0, width), random(0, height));
                circle.addImage(loadImage(imageNames[i % imageNames.length]));
                circle.setCollider('circle', -0, 0, current_collision);
                // start speed
                circle.setSpeed(random(1, 3), random(0, 360));
                // scale affects the size of the collider
                circle.scale = random(current_sObjects, current_sObjects * 1.1);
                // mass determines the force exchange in case of bounce
                circle.mass = circle.scale * current_mObjects;
                // restitution is the dispersion of energy at each bounce
                circle.restitution = current_restitution;
                circles.add(circle);
            }
            toggleUpdate();
        }

        // circles bounce against each other
        circles.bounce(circles);
        // // circles.displace(circles);
        // circles.collide(circles);

        for (var i = 0; i < allSprites.length; i++) {
            var s = allSprites[i];

            if (s.position.x < 0) {
                s.position.x = 1;
                s.velocity.x = abs(s.velocity.x);
            }

            if (s.position.x > width) {
                s.position.x = width - 1;
                s.velocity.x = -abs(s.velocity.x);
            }

            if (s.position.y < 0) {
                s.position.y = 1;
                s.velocity.y = abs(s.velocity.y);
            }

            if (s.position.y > height) {
                s.position.y = height - 1;
                s.velocity.y = -abs(s.velocity.y);
            }
        }

        drawSprites();
    }
}

// DRAW UTILITIES /////////////////////////////////////////
function toggleUpdate() {
    if (updateRequested == true) {
        updateRequested = false;
    } else {
        updateRequested = true;
    }
}

function togglePause() {
    if (isPaused == true) {
        isPaused = false;
    } else {
        isPaused = true;
    }
}