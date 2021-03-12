const FLOOR_LEVEL = 400;
let score = 0;
let gameSpeed = 10;

let nParticles = 50;
let particles = [];

let scene = 0;

function load() {
    // used to load objects
    character_tex = new Texture("img/example/character_spritesheet.png");
    obstacles_tex = new Texture("img/example/forest_enemies_spritesheet.png");
    background_tex = new Texture("img/example/forest_background .png");
    vfx_tex = new Texture("img/example/visual_effects.png");
    particles_tex = new Texture("img/example/forest_particles.png");

    hit_sound = new Sound("audio/example/hit.wav");
    jump_sound = new Sound("audio/example/jump.wav");
    music_sound = new Sound("audio/example/music.wav");
}

function setup() {
    // called once
    setCanvasSize(500, 500);
    setAntiAliasing(false);
    GRAVITY = new Vector(0, 3);

    // defining the visual effects layer
    vfx = new Sprite(vfx_tex, Vector.zero, new Vector(width, height));

    // defining the background
    let bg_layer_0 = new Sprite(background_tex, Vector.zero, new Vector(width, height));
    bg_layer_0.setClippingValues(200, 0, 100, 100);

    let bg_layer_1 = new Sprite(background_tex, Vector.zero, new Vector(width, height));
    bg_layer_1.setClippingValues(100, 0, 100, 100);

    let bg_layer_2 = new Sprite(background_tex, Vector.zero, new Vector(width, height));
    bg_layer_2.setClippingValues(0, 0, 100, 100);

    background = new Parallax
        ([
            new ParallaxLayer(bg_layer_0, new Vector(0, 0)),
            new ParallaxLayer(bg_layer_1, new Vector(0, 0)),
            new ParallaxLayer(bg_layer_2, new Vector(0, 0))
        ]);

    // defining the player
    player = new Player(-100, FLOOR_LEVEL - 80, 50, 80);
    player.sprite = new Array(2);

    player.sprite[0] = new Sprite(character_tex, player.position, player.size);
    player.sprite[0].setClippingValues(0, 0, 10, 16);

    player.sprite[1] = new Sprite(character_tex, player.position, player.size);
    player.sprite[1].setClippingValues(15, 0, 10, 16);

    // defining the obstacle
    obstacle = new Obstacle(width, 450, 55, 80);
    obstacle.sprite = new Array(2);

    obstacle.sprite[0] = new Sprite(obstacles_tex, obstacle.position, obstacle.size);
    obstacle.sprite[0].setClippingValues(0, 0, 11, 16);

    obstacle.sprite[1] = new Sprite(obstacles_tex, obstacle.position, obstacle.size);
    obstacle.sprite[1].setClippingValues(16, 0, 11, 16);

    // defining the flying obstacle
    obstacle2 = new Obstacle(width + 1000, FLOOR_LEVEL - 141, 60, 15);
    obstacle2.sprite = new Array(1);

    obstacle2.sprite[0] = new Sprite(obstacles_tex, obstacle2.position, obstacle2.size);
    obstacle2.sprite[0].setClippingValues(32, 0, 12, 3);

    obstacle2.affectedByGravity = false;

    for (let i = 0; i < nParticles; i++) {
        let size = random(10, 30);
        particles[i] = new Particle(random(0, width), random(-height, height), size, size);
    }
}

function fixedUpdate(deltaTime) {
    if (typeof background != "undefined")
        background.updateSelf();

    if (scene === 2) {
        player.updateSelf(deltaTime);
        obstacle.updateSelf(deltaTime);
        obstacle2.updateSelf(deltaTime);
    }
}

function update(deltaTime) {
    switch (scene) {
        case 0:
            player.position.x += 0.5;
            if (player.position.x > 100 || keys.ANY_KEY.pressed) {
                player.position.x = 100;
                scene++;
            }
            break;

        case 2:
            score += gameSpeed * deltaTime * 0.1;

            if (gameSpeed < 30) {
                gameSpeed += deltaTime * 0.5;
            }
            break;
    }


}

function draw() {
    // called once per frame, after update
    background.drawLayers();

    // drawing the player
    if (!gamePaused)
        player.drawSelf();

    // drawing the obstacle
    obstacle.drawSelf();
    obstacle2.drawSelf();

    for (let i = 0; i < nParticles; i++) {
        particles[i].drawSelf();
    }

    vfx.drawSelf();

    switch (scene) {
        case 1:
            drawTitleScreen()
            break;
        case 2:
            drawScore();
            break;
    }

}

function drawTitleScreen() {
    fillCanvas(new Color(0, 0, 0, 0.25));

    context.font = '40px Arial Black';
    setFillColor(Color.WHITE);
    context.fillText("SUPER FOREST RUN", 25, centerY - 75);

    context.font = '30px Arial';
    setFillColor(Color.GRAY);
    context.fillText("PRESS ANY KEY TO START", 50, centerY - 15);
}

let countValue = 0;
function onPauseGame() {
    if (countValue < 7) {
        fillCanvas(new Color(0, 0, 0, 0.1));

        setFillColor(new Color(0, 0, 0, 0.075))
        fillRectangle(0, 200, width, 100);

        context.font = '30px Arial Black';
        setFillColor(Color.RED);
        context.fillText("YOU DIED", 175, centerY - 15);

        context.font = '15px Arial';
        setFillColor(Color.GRAY);
        context.fillText("PRESS [ R ] TO RETRY", 175, centerY + 25);

        countValue++;
    }

    if (keys.R.pressed) {
        location.reload();
    }
}

function keyPressed(key) {
    // called when a key is pressed
    if (key === keys.SPACE && scene === 2 && !gamePaused) {
        player.jump();
    }

    if (scene === 1) {
        playingMusic = true;
        music_sound.volume = 0.5;
        music_sound.play(true);
        scene++;
    }
}

function drawScore() {
    context.font = '25px verdana';
    setFillColor(Color.WHITE);
    context.fillText(score.toFixed(1) + "m", 50, 75);
}

async function playerDied() {
    gamePaused = true;
    hit_sound.play();
    music_sound.stop();

    fillCanvas(Color.WHITE);
    await sleep(50);
    draw();
}