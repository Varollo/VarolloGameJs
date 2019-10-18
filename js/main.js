function setup()
{
    player = {x:10, y:height/2, speed: 100};
}

function update(deltaTime)
{
	if(keys.ANY_KEY.pressed)
	{
		player.x += deltaTime * player.speed;
	}
}

function draw()
{
	fillCanvas(new Color(200,128,0));

	fillCircle(player.x,player.y,10,drawMode.CENTER);
}