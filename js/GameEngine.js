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
	
	function keyPressed(key)
	{
		// called when a key is pressed
	}

	function keyReleased(key)
	{
		called when a key is released
	}

*/

window.onload = function()
{
    load();

    canvas = document.getElementById("game");
    context = canvas.getContext('2d');    

    width = canvas.width;
	height = canvas.height;
	
	keys = 
	{
		A = 
		{
			name = "A",
			code = 65,
			pressed = false
		},
		
		B = 
		{
			name = "B",
			code = 66,
			pressed = false
		},
		
		C = 
		{
			name = "C",
			code = 67,
			pressed = false
		},
		
		D = 
		{
			name = "D",
			code = 68,
			pressed = false
		},
		
		E = 
		{
			name = "E",
			code = 69,
			pressed = false
		},
		
		F = 
		{
			name = "F",
			code = 70,
			pressed = false
		},
		
		G = 
		{
			name = "G",
			code = 71,
			pressed = false
		},
		
		H = 
		{
			name = "H",
			code = 72,
			pressed = false
		},
		
		I = 
		{
			name = "I",
			code = 73,
			pressed = false
		},
		
		J = 
		{
			name = "J",
			code = 74,
			pressed = false
		},
		
		K = 
		{
			name = "K",
			code = 75,
			pressed = false
		},
		
		L = 
		{
			name = "L",
			code = 76,
			pressed = false
		},
		
		M = 
		{
			name = "M",
			code = 77,
			pressed = false
		},
		
		N = 
		{
			name = "N",
			code = 78,
			pressed = false
		},
		
		O = 
		{
			name = "O",
			code = 79,
			pressed = false
		},
		
		P = 
		{
			name = "P",
			code = 80,
			pressed = false
		},
		
		Q = 
		{
			name = "Q",
			code = 81,
			pressed = false
		},
		
		R = 
		{
			name = "R",
			code = 82,
			pressed = false
		},
		
		S = 
		{
			name = "S",
			code = 83,
			pressed = false
		},
		
		T = 
		{
			name = "T",
			code = 84,
			pressed = false
		},
		
		U = 
		{
			name = "U",
			code = 85,
			pressed = false
		},
		
		V = 
		{
			name = "V",
			code = 86,
			pressed = false
		},
		
		W = 
		{
			name = "W",
			code = 87,
			pressed = false
		},
		
		X = 
		{
			name = "X",
			code = 88,
			pressed = false
		},
		
		Y = 
		{
			name = "Y",
			code = 89,
			pressed = false
		},
		
		Z = 
		{
			name = "Z",
			code = 90,
			pressed = false
		},
	};
	
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