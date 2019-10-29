const FLOOR_LEVEL = 400;
let score = 0;
let gameSpeed = 10;

function load()
{
    // used to load objects
    character_tex = new Texture("img/example 02/character_spritesheet.png");
    obstacles_tex = new Texture("img/example 02/forest_enemies_spritesheet.png");
    background_tex = new Texture("img/example 02/forest_background .png");
}

function setup()
{
    // called once
    setCanvasSize(500, 500);
    setAntiAliasing(false);
    GRAVITY = new Vector(0,3);

    // defining the background
    let bg_layer_0 = new Sprite(background_tex, Vector.zero, new Vector(width, height));
        bg_layer_0.setClippingValues(200,0,100,100);

    let bg_layer_1 = new Sprite(background_tex, Vector.zero, new Vector(width, height));
        bg_layer_1.setClippingValues(100,0,100,100);

    let bg_layer_2 = new Sprite(background_tex, Vector.zero, new Vector(width, height));
        bg_layer_2.setClippingValues(0,0,100,100);
    
    background = new Parallax
    ([
            new ParallaxLayer(bg_layer_0, new Vector(-1,0)),
            new ParallaxLayer(bg_layer_1, new Vector(-3,0)),
            new ParallaxLayer(bg_layer_2, new Vector(-8,0))
    ]);

    // defining the player
    player = new Player(100, 400, 50, 80);
    player.sprite = new Array(2);

    player.sprite[0] = new Sprite(character_tex,player.position,player.size);
    player.sprite[0].setClippingValues(0,0,10,16);

    player.sprite[1] = new Sprite(character_tex,player.position,player.size);
    player.sprite[1].setClippingValues(15,0,10,16);
    
    // defining the obstacle
    obstacle = new Obstacle(width,450, 55, 80);
    obstacle.sprite = new Array(2);

    obstacle.sprite[0] = new Sprite(obstacles_tex,obstacle.position, obstacle.size);
    obstacle.sprite[0].setClippingValues(0,0,11,16);

    obstacle.sprite[1] = new Sprite(obstacles_tex,obstacle.position, obstacle.size);
    obstacle.sprite[1].setClippingValues(16,0,11,16);

    // defining the flying obstacle
    obstacle2 = new Obstacle(width+1000,FLOOR_LEVEL-141,60, 15);
    obstacle2.sprite = new Array(1);

    obstacle2.sprite[0] = new Sprite(obstacles_tex,obstacle2.position, obstacle2.size);
    obstacle2.sprite[0].setClippingValues(32,0,12,3);

    obstacle2.affectedByGravity = false;
}

function update(deltaTime)
{
    score += gameSpeed * deltaTime * 0.1;

    if(gameSpeed < 30)
    {
        gameSpeed+= deltaTime * 0.5;
    }    
}

function draw()
{
    // called once per frame, after update
    background.drawLayers();

    // drawing the player
    player.drawSelf();

    // drawing the obstacle
    obstacle.drawSelf();
    obstacle2.drawSelf();

    drawScore();
}

let countValue = 0;
function onPauseGame()
{
    if(countValue < 7)
    {
        fillCanvas(new Color(0,0,0,0.1));

        setFillColor(new Color(0,0,0,0.075))
        fillRectangle(0,200,width,100);        

        context.font='30px Arial Black';
        setFillColor(colors.RED);
        context.fillText("YOU DIED", 175, centerY-15);

        context.font='15px Arial';
        setFillColor(colors.GRAY);	
        context.fillText("PRESS [SPACE] TO RETRY", 160, centerY+25);

        countValue++;
    }    

    if(keys.SPACE.pressed)
    {
        location.reload();        
    }
}

function keyPressed(key)
{
    // called when a key is pressed
    if(key === keys.SPACE)
    {
        player.jump();
    }
}

function drawScore()
{
    context.font='25px verdana';
	setFillColor(colors.WHITE);	
	context.fillText(score.toFixed(1) + "m", 50, 75);
}

// Body = physics object
class Player extends Body
{
    constructor(x,y,w,h)
    {
        super();

        this.sprite = undefined;
        this.animationIndex = 0;

        this.position.x = x;
        this.position.y = y;

        this.size = new Vector(w,h);

        this.jumpForce = 40;

        this.setCollider(new RectCollider(this.position,this.size));
    }

    jump()
    {
        if(this.onGround())
        {
            this.addForce(new Vector(0,-this.jumpForce));
        }
    }

    drawSelf()
    {
        if(this.sprite === undefined)
        {
            setFillColor(colors.WHITE);
            fillRectangle(this.position.x, this.position.y, this.size.x, this.size.y, drawMode.TOP_LEFT);
        }
        else if(!this.onGround())
        {
            this.sprite[0].drawSelf();
        }
        else
        {
            this.sprite[this.animationIndex % this.sprite.length].drawSelf();
            if(FRAME_COUNT % Math.floor(30 - gameSpeed) === 0)
                this.animationIndex++;
        }
    }

    updateSelf(deltaTime)
    {
        super.updateSelf(deltaTime);

        if(this.onGround())
        {
            this.velocity.y = 0;
            this.position.y = FLOOR_LEVEL - this.size.y;
        }
    }

    onGround()
    {
        return(this.position.y + this.size.y >= FLOOR_LEVEL)
    }

    onCollision(other)
    {
        gamePaused = true;

        
    }
}

class Obstacle extends Body
{
    constructor(x,y,w,h)
    {
        super();

        this.sprite = undefined;
        this.animationIndex = 0;

        this.position.x = x;
        this.position.y = y;

        this.size = new Vector(w,h);

        this.setCollider(new RectCollider(this.position,this.size));
    }

    updateSelf(deltaTime)
    {
        this.velocity.x = -gameSpeed;

        super.updateSelf(deltaTime);

        if(this.offScreen())
        {
            let amt = randomInt(0, 1000);
            this.position.x = width + amt;
        }

        if(this.onGround())
        {
            this.velocity.y = 0;
            this.position.y = FLOOR_LEVEL - this.size.y;
        }
    }

    drawSelf()
    {
        if(this.sprite === undefined)
        {
            setFillColor(colors.WHITE);
            fillRectangle(this.position.x, this.position.y, this.size.x, this.size.y, drawMode.TOP_LEFT);
        }
        else
        {
            this.sprite[this.animationIndex % this.sprite.length].drawSelf();

            if(FRAME_COUNT % 15 === 0)
                this.animationIndex++;
        }
        
    }

    onGround()
    {
        return(this.position.y + this.size.y >= FLOOR_LEVEL)
    }

    offScreen()
    {
        return (this.position.x + this.size.x <= 0);
    }
}

class Parallax
{
    constructor(layers)
    {
        this.layers = layers;
    }

    drawLayers()
    {
        this.layers.forEach(layer => {
            layer.velocity.x -= gameSpeed/1000;

            layer.sprite.drawSelf();
            
            layer.position.x += layer.sprite.size.x;
            layer.sprite.drawSelf();
            layer.position.x -= layer.sprite.size.x;

            layer.position.addVec(layer.velocity);

            if(layer.position.x < -layer.sprite.size.x)
            {
                layer.position.x = 0;
            }
        });
    }
}

class ParallaxLayer
{
    constructor(sprite, vecVelocity)
    {
        this.sprite = sprite;
        this.position = Vector.zero;
        this.velocity = vecVelocity;

        this.sprite.position = this.position;
    }
}