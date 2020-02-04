var imageSprites = [];
var imageSpriteIDs = [
    './assets/RB1.png',
    './assets/RB2.png',
    './assets/RB11.png',
    './assets/RB12.png',
];

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < imageSpriteIDs.length; i++) {
        imageSprites[i] = createSprite(random(width), random(height));
        imageSprites[i].addImage(loadImage(imageSpriteIDs[i]));
        imageSprites[i].scale = random(.05, .1);
    }
}
  
function draw() {
    background(10, 10, 10);  
    drawSprites();
}