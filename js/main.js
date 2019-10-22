function setup()
{
	// called once
	setCanvasWidth(800);
	setCanvasHeight(600);

	player = new Block(centerX, height-50, 100, 30);
	ball = new Ball(centerX, centerY, 20);

	//player.setCollider(new RectCollider(player.position.x, player.position.y, player.w, player.h));
	player.setCollider(new CircleCollider(player.x,player.y,player.w));
	//ball.setCollider(new RectCollider(ball.position.x, ball.position.y, ball.r*2, ball.r*2));
	ball.setCollider(new CircleCollider(ball.x,ball.y,ball.r));
	
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
		this.isKinematic = true;

		this.mass = 10;

		this.position = new Vector(x,y);
		this.w = w;
		this.h = h;

		this.speed = 2;
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
		if(keys.UP_ARROW.pressed)
		{
			this.addForce(new Vector(0,-this.speed));
		}
		else if(keys.DOWN_ARROW.pressed)
		{
			this.addForce(new Vector(0,this.speed));
		}

		this.velocity.mult(0.9);
	}

	drawSelf()
	{
		context.fillStyle = "white";
		//sfillRectangle(this.position.x,this.position.y,this.w,this.h,drawMode.TOP_LEFT);
		fillCircle(this.position.x,this.position.y,this.w,drawMode.CENTER);
	}
}

class Ball extends Body
{
	constructor(x,y,r)
	{
		super();
		this.position = new Vector(x,y);
		this.r = r;
		this.friction = 1;

		this.bounciness = 1;

		this.affectedByGravity = false;

		//this.velocity = new Vector(random(-1,1), 1);
		//this.velocity.mult(10);
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
			this.velocity.y *= -0.9;
		}
		else if(this.position.y - 2*this.r >= height)
		{
			loseGame();
		}

		this.velocity.x *= 0.999;
	}

	drawSelf()
	{
		//fillRectangle(this.position.x,this.position.y,this.r*2,this.r*2,drawMode.TOP_LEFT);
		fillCircle(this.position.x,this.position.y,this.r,drawMode.CENTER);
	}
	
	onCollision(other)
	{
		super.onCollision(other);
		
		/*		
		let side = -(other.position.x + other.w/2 - this.position.x);
		this.velocity.y = 0;
		this.addForce(new Vector(side/5 + random(1,1),-25));
		*/

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
