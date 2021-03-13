const GROUND_LEVEL = 600;

let GAME_SPEED = 10;
let GAP = 200;

function setup() {
    // called once
    setCanvasSize(800, 600);

    player = new Player(new Vector(200, centerY), new Vector(50, 50));

    ResetObstacles();
}

function draw() {
    // called once per frame, after update
    fillCanvas(new Color(0, 127, 255, 1));

    obstacleTop.drawSelf();
    obstacleBotton.drawSelf();
    player.drawSelf();
}

function update(deltaTime) {
    // called once per frame
    if (obstacleTop.isOffScreen()) {
        ResetObstacles();
    }
}

function keyPressed(key) {
    // called when a key is pressed
    if (key === keys.SPACE && !gamePaused) {
        player.jump();
    }
}

function ResetObstacles() {
    let topHeight = Math.random() * (height - GAP);
    obstacleTop = new Obstacle(topHeight, 0);
    obstacleBotton = new Obstacle(height - topHeight + GAP, topHeight + GAP);
}