/*
 * --EXAMPLE PROJECT--

 * Simple singleplayer pong game to show the engine working
 * by Gabriel Carollo.
*/

function load()
{
	// used to load objects
	img_Player = new Texture("img/example 01/nuvem.png");
	img_ball = new Texture("img/example 01/bebe.png");
	img_Background = new Texture("img/example 01/montain.png");
}

function setup()
{
	// called once at the begining of the game
	setCanvasSize(800,600);
	setAntiAliasing(false);
	score = 0;	

	player = new Player(centerX - 100, height - 100, 200, 35);
	ball = new Block(centerX - 17, centerY - 17, 35, 35);
	background_Sprite = new Sprite(img_Background, {x: 0, y: 0}, {x:800, y: 600});
}

function update(deltaTime)
{
	// called once every frame
	if(keys.LEFT_ARROW.pressed)
	{
		player.addForce(Vector.left);
	}
	else if(keys.RIGHT_ARROW.pressed)
	{
		player.addForce(Vector.right);
	}	
}

function draw()
{
	// called once every frame after update
	background_Sprite.drawSelf();

	ball.drawSelf();
	player.drawSelf();
	
	context.font='50px verdana';
	context.fillStyle = colors.WHITE.getString();	
	context.fillText(score.toString(), centerX, 100);

	
}

function onPauseGame()
{
	fillCanvas(colors.BLACK);

	context.font='50px verdana';
	context.fillStyle = colors.WHITE.getString();

	context.fillText(score.toString(), centerX, 100);
	context.fillText("You lost", centerX-100, centerY+10);

	context.font='25px verdana';
	context.fillStyle = colors.GRAY.getString();

	context.fillText("Press SPACE to restart", centerX-140, centerY+50);

	if(keys.SPACE.pressed)
	{
		location.reload();
	}
	
}

class Block extends Body
{
	constructor(x,y,w,h)
	{
		super();

		this.position.x = x;
		this.position.y = y;

		this.scale = new Vector(w,h);

		this.sprite = new Sprite(img_ball,this.position,this.scale);

		this.setCollider(new RectCollider(this.position, this.scale));
	}

	drawSelf()
	{
		this.sprite.drawSelf();
	}

	updateSelf(deltaTime)
	{
		super.updateSelf(deltaTime);

		this.velocity.x *= 0.99;

		this.checkEdges();
	}

	onCollision(other)
	{
		// nothing happens
	}
	
	checkEdges()
	{
		if(this.position.x < 0)
		{
			this.position.x = 0;
			this.velocity.x *= -1;
		}
		else if(this.position.x > width - this.scale.x)
		{
			this.position.x = width - this.scale.x;
			this.velocity.x *= -1;
		}

		if(this.position.y < 0)
		{
			this.position.y = 0;
			this.velocity.y *= -1;
		}
		else if(this.position.y > height + this.scale.y)
		{
			gamePaused = true;
		}

	}
}

class Player extends Block
{
	constructor(x,y,w,h)
	{
		super(x,y,w,h);

		this.sprite = new Sprite(img_Player,this.position,this.scale);

		this.affectedByGravity = false;
		this.isKinematic = true;
	}

	drawSelf()
	{
		this.sprite.drawSelf();
	}

	onCollision(other)
	{
		let side = other.position.x + other.scale.x/2 > this.position.x + this.scale.x /2 ? -1 : 1;

		other.velocity = other.velocity.inverse();
		other.position.addVec(other.velocity);

		other.velocity.x += side * 2;

		other.velocity.x *= 1.7;
		other.velocity.y *= 1.01;

		score++;
	}

	checkEdges()
	{
		if(this.position.x < 0)
		{
			this.position.x = 0;
			this.velocity.x = 0;
		}
		else if(this.position.x > width - this.scale.x)
		{
			this.position.x = width - this.scale.x;
			this.velocity.x = 0;
		}
	}
}