function setup()
{
	// called once
	setCanvasWidth(800);
	setCanvasHeight(600);

	player = new Block(centerX-100, height-50, 200, 30);
	ball = new Ball(centerX, centerY, 20);

	player.setCollider(new RectCollider(player.position.x, player.position.y, player.w, player.h));
	ball.setCollider(new CircleCollider(ball.position.x, ball.position.y, ball.r));

	score = 0;
}

function draw()
{
	// called once per frame, after update

	// drawing the background
	fillCanvas(colors.BLACK);

	context.font = "100px Arial";
	context.fillText(score.toString(),centerX-25,100);

	context.fillStyle = colors.GRAY.getString();
	context.font = "50px Arial";
	context.fillText(window.name,centerX-10,150);

	// drawing the player
	player.drawSelf();

	// drawing the ball
	ball.drawSelf();
}

function onPauseGame()
{
	// called once per frame while the game is paused
	if(keys.SPACE.pressed)
	{
		location.reload();
	}
}

class Block extends Body
{
	constructor(x,y,w,h)
	{
		super()
		this.affectedByGravity = false;

		this.position = new Vector(x,y);
		this.w = w;
		this.h = h;

		this.speed = 0.5;
	}

	updateSelf(deltaTime)
	{
		super.updateSelf(deltaTime);

		if(keys.RIGHT_ARROW.pressed)
		{
			this.addForce(new Vector(this.speed,0));
		}
		else if(keys.LEFT_ARROW.pressed)
		{
			this.addForce(new Vector(-this.speed,0));
		}

		this.velocity.x *= 0.9;
	}

	drawSelf()
	{
		context.fillStyle = "white";
		fillRectangle(this.position.x,this.position.y,this.w,this.h,drawMode.TOP_LEFT);
	}
}

class Ball extends Body
{
	constructor(x,y,r)
	{
		super();
		this.position = new Vector(x,y);
		this.r = r;

		this.velocity.x = random(-1,1);
	}

	updateSelf(deltaTime)
	{
		super.updateSelf(deltaTime);

		if(this.position.x - this.r <= 0)
		{
			this.position.x = this.r;
			this.velocity.x *= -0.9;
		}
		else if (this.position.x + this.r >= width)
		{
			this.position.x = width-this.r;
			this.velocity.x *= -0.9;
		}

		if(this.position.y - this.r <= 0)
		{
			this.position.y = this.r;
			this.velocity.y = 0;
		}
		else if(this.position.y - 2*this.r >= height)
		{
			loseGame();
		}

		this.velocity.x *= 0.999;
	}

	drawSelf()
	{
		fillCircle(this.position.x,this.position.y,this.r,drawMode.CENTER);
	}

	onCollision(other)
	{
		let side = -(other.position.x + other.w/2 - this.position.x);
		this.velocity.y = 0;
		this.addForce(new Vector(side/20 + random(-0.01,0.01),-6));
		score++;
	}
}

function loseGame() {
	gamePaused = true;

	context.font = "50px Arial";
	context.fillText("press SPACE to retry", 155, centerY);
	
	if (window.name < score)
		window.name = score;
}
