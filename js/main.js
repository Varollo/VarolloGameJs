function load()
{
    // used to load files
}

function setup()
{
    // called once
}

function update(deltaTime)
{
    // called once per frame
}

function draw()
{
    // called once per frame, after update
	fillCircle(width/2,height/2,25,drawMode.CENTER);
	strokeRectangle(width/2,height/2,50,50,drawMode.TOP_LEFT);
	
	context.strokeStyle = "green";
	drawLine(width/2,0,width/2,height);
	drawLine(0,height/2,width,height/2);
}