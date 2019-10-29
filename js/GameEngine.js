/* ---------------------------------
 * SIMPLE NATIVE JAVASCRIPT GAME ENGINE 
 * BY GABRIEL CAROLLO
 * find me at:
 * https://github.com/rimoldi98
 * https://rimoldi98.itch.io
*/

/*---------------------------------
 * FUNCTIONS TO BE USED
 
    function load()
    {
        // used to load objects
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

    function onPauseGame()
    {
        // called once per frame while the game is paused
    }
*/

let objectsLoading = 0;
let gamePaused = false;
let FRAME_COUNT = 0;

window.onload = function()
{
    if (typeof load === "function") { 
		load();
    }

    waitForLoading();
}

async function waitForLoading() 
{
    while(objectsLoading > 0)
    {
        await sleep(1);
    }

    canvas = document.getElementById("game");
    context = canvas.getContext('2d');    

    width = canvas.width;
    height = canvas.height;	
    centerX = width/2;
    centerY = height/2;

    if (typeof setup === "function") { 
		setup();
	}

    let date = new Date();
    gameLoop(date.getTime());


}

function gameLoop(startTime)
{
    let date = new Date();

    let newTime = date.getTime();
    let deltaTime = newTime - startTime;

	if (typeof update === "function") { 
		update(deltaTime/1000);
    }

	if (typeof draw === "function") { 
		draw();
    }

    FRAME_COUNT++;
    
    requestAnimationFrame(function(){
        if(gamePaused)
        {
            gameStop();
        }
        else
        {
            gameLoop(newTime);
        }
    });
}

function gameStop()
{
    if (typeof onPauseGame === "function") { 
		onPauseGame();
    }
    
        requestAnimationFrame(function(){
            if(gamePaused)
            {
                gameStop();
            }
            else
            {
                gameLoop(newTime);
            }
        });
}

function setCanvasSize(w,h)
{
    canvas.width = w;
    width = w;
    centerX = width/2;

    canvas.height = h;
    height = h;
    centerY = height/2;
}

function setCanvasWidth(w)
{
    canvas.width = w;
    width = w;
    centerX = width/2;
}

function setCanvasHeight(h)
{
    canvas.height = h;
    height = h;
    centerY = height/2;
}

// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

