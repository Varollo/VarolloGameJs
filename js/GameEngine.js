/*---------------------------------
 * REQUIRED FUNCTIONS
 
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
    }

*/

window.onload = function()
{
    load();

    canvas = document.getElementById("game");
    context = canvas.getContext('2d');    

    width = canvas.width;
	height = canvas.height;

    setup();
    
    let date = new Date();
    gameLoop(date.getTime());
}

function gameLoop(startTime)
{
    let date = new Date();

    let newTime = date.getTime();
    let deltaTime = newTime - startTime;

    update(deltaTime/1000);
    draw();

    requestAnimationFrame(function(){
        gameLoop(newTime);
    });
}