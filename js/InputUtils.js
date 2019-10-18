/* ---------------------------------
 * FUNCTIONS TO BE USED

    function keyPressed(key)
    {
        // called when a key is pressed
    }

    function keyReleased(key)
    {
        // called when a key is released
    }
*/

/* KEYS FOUND HERE:
 * http://gcctech.org/csc/javascript/javascript_keycodes.htm
*/
const keys = 
	{
        ANY_KEY:
        {
            name: undefined,
            code: 0,
            pressed: false
        },

        BACKSPACE:
        {
            name: "BACKSPACE",
            code: 8,
            pressed : false
        },

        TAB:
        {
            name: "TAB",
            code: 9,
            pressed : false
        },

        ENTER:
        {
            name: "ENTER",
            code: 13,
            pressed : false
        },

        SHIFT:
        {
            name: "SHIFT",
            code: 16,
            pressed : false
        },

        CTRL:
        {
            name: "CTRL",
            code: 17,
            pressed : false
        },

        ALT:
        {
            name: "ALT",
            code: 18,
            pressed : false
        },

        PAUSE_BREAK:
        {
            name: "PAUSE_BREAK",
            code: 19,
            pressed : false
        },

        CAPS_LOCK:
        {
            name: "CAPS_LOCK",
            code: 20,
            pressed : false
        },

        ESCAPE:
        {
            name: "ESCAPE",
            code: 27,
            pressed : false
        },

        SPACE:
        {
            name: " ",
            code: 32,
            pressed : false
        },

        PAGE_UP:
        {
            name: "PAGE_UP",
            code: 33,
            pressed : false
        },

        PAGE_DOWN:
        {
            name: "PAGE_DOWN",
            code: 34,
            pressed : false
        },

        END:
        {
            name: "END",
            code: 35,
            pressed : false
        },

        HOME:
        {
            name: "HOME",
            code: 36,
            pressed : false
        },

        LEFT_ARROW:
        {
            name: "LEFT_ARROW",
            code: 37,
            pressed : false
        },

        UP_ARROW:
        {
            name: "UP_ARROW",
            code: 38,
            pressed : false
        },

        RIGHT_ARROW:
        {
            name: "RIGHT_ARROW",
            code: 39,
            pressed : false
        },

        DOWN_ARROW:
        {
            name: "DOWN_ARROW",
            code: 40,
            pressed : false
        },

        PRINT_SCREEN:
        {
            name: "PRINT_SCREEN",
            code: 44,
            pressed : false
        },

        INSERT:
        {
            name: "INSERT",
            code: 45,
            pressed : false
        },

        DELETE:
        {
            name: "DELETE",
            code: 46,
            pressed : false
        },

        DIGIT_0:
        {
            name: "0",
            code: 48,
            pressed : false
        },

        DIGIT_1:
        {
            name: "1",
            code: 49,
            pressed : false
        },

        DIGIT_2:
        {
            name: "2",
            code: 50,
            pressed : false
        },

        DIGIT_3:
        {
            name: "3",
            code: 51,
            pressed : false
        },

        DIGIT_4:
        {
            name: "4",
            code: 52,
            pressed : false
        },

        DIGIT_5:
        {
            name: "5",
            code: 53,
            pressed : false
        },

        DIGIT_6:
        {
            name: "6",
            code: 54,
            pressed : false
        },

        DIGIT_7:
        {
            name: "7",
            code: 55,
            pressed : false
        },

        DIGIT_8:
        {
            name: "8",
            code: 56,
            pressed : false
        },

        DIGIT_9:
        {
            name: "9",
            code: 57,
            pressed : false
        },

		A : 
		{
			name : "A",
			code : 65,
			pressed : false
		},
		
		B : 
		{
			name : "B",
			code : 66,
			pressed : false
		},
		
		C : 
		{
			name : "C",
			code : 67,
			pressed : false
		},
		
		D : 
		{
			name : "D",
			code : 68,
			pressed : false
		},
		
		E : 
		{
			name : "E",
			code : 69,
			pressed : false
		},
		
		F : 
		{
			name : "F",
			code : 70,
			pressed : false
		},
		
		G : 
		{
			name : "G",
			code : 71,
			pressed : false
		},
		
		H : 
		{
			name : "H",
			code : 72,
			pressed : false
		},
		
		I : 
		{
			name : "I",
			code : 73,
			pressed : false
		},
		
		J : 
		{
			name : "J",
			code : 74,
			pressed : false
		},
		
		K : 
		{
			name : "K",
			code : 75,
			pressed : false
		},
		
		L : 
		{
			name : "L",
			code : 76,
			pressed : false
		},
		
		M : 
		{
			name : "M",
			code : 77,
			pressed : false
		},
		
		N : 
		{
			name : "N",
			code : 78,
			pressed : false
		},
		
		O : 
		{
			name : "O",
			code : 79,
			pressed : false
		},
		
		P : 
		{
			name : "P",
			code : 80,
			pressed : false
		},
		
		Q : 
		{
			name : "Q",
			code : 81,
			pressed : false
		},
		
		R : 
		{
			name : "R",
			code : 82,
			pressed : false
		},
		
		S : 
		{
			name : "S",
			code : 83,
			pressed : false
		},
		
		T : 
		{
			name : "T",
			code : 84,
			pressed : false
		},
		
		U : 
		{
			name : "U",
			code : 85,
			pressed : false
		},
		
		V : 
		{
			name : "V",
			code : 86,
			pressed : false
		},
		
		W : 
		{
			name : "W",
			code : 87,
			pressed : false
		},
		
		X : 
		{
			name : "X",
			code : 88,
			pressed : false
		},
		
		Y : 
		{
			name : "Y",
			code : 89,
			pressed : false
		},
		
		Z : 
		{
			name : "Z",
			code : 90,
			pressed : false
		},
    };

addEventListener("keydown", function(e)
{
    let key = Object.keys(keys);
    for(i = 0; i < key.length; i++)
    {
        if (keys[key[i]].code == e.keyCode)
        {
            keys[key[i]].pressed = true;
            keys.ANY_KEY.pressed = true;

            if (typeof keyPressed === "function") { 
                keyPressed(keys[key[i]]);
            }
            
            break;
        }
    }
});

addEventListener("keyup", function(e)
{
    let key = Object.keys(keys);
    for(i = 0; i < key.length; i++)
    {
        if (keys[key[i]].code == e.keyCode)
        {
            keys[key[i]].pressed = false;
            keys.ANY_KEY.pressed = false;

            if (typeof keyReleased === "function") { 
                keyReleased(keys[key[i]]);
            }
            break;
        }
    }
});