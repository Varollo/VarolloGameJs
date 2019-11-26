/*---------------------------------
    -------------------------------------------------
                   REQUIRES MathUtils.js
    -------------------------------------------------

 * FUNCTIONS TO BE USED

    function fixedUpdate(deltaTime)
    {
        // called once per every 'FIXED_DELTA_TIME' miliseconds (default = 20)
    }
*/

GRAVITY = new Vector(0,1);
FIXED_DELTA_TIME = 20;

bodyStack = [];

function DestroyBody(body)
{
    for(let i = 0; i < bodyStack.length; i++)
    {
        if(bodyStack[i] == body)
        {
            bodyStack[i].onDestroy();
            bodyStack.splice(i,1);
            break;
        }
    }
}

setInterval(physicsUpdate,FIXED_DELTA_TIME);
function physicsUpdate(deltaTime)
{
    if(gamePaused) return;

    if(bodyStack != null)
    {
        let collisionPairs = [];

        bodyStack.forEach(body => {            
            
            
            if(body.collider != undefined)
            {
                bodyStack.forEach(other => {
                    if(other.collider != undefined)
                    {       
                        let checkCollision = true;

                        for(i = 0; i < collisionPairs.length; i++)
                        {
                            let pair = collisionPairs[i];

                            if((pair[0] === body && pair[1] === other)
                            || (pair[1] === body && pair[0] == other))
                            {
                                checkCollision = false;
                                break;
                            }
                        }

                        if(checkCollision)
                        {
                            collisionPairs.push([body,other]);    
                                         
                            if (other != body && body.collider.collides(other.collider))
                            {          
                                body.onCollision(other);
                                other.onCollision(body);
                            }
                        }
                    }
                });
            }
            if(body.autoUpdate)
                body.updateSelf(deltaTime);
        });
    }

    if(typeof fixedUpdate === 'function') {
        fixedUpdate(FIXED_DELTA_TIME);
    }
}

class Body
{   
    constructor(tag)
    {
        this.position          = Vector.zero;
        this.velocity          = Vector.zero;
        this.acceleration      = Vector.zero;

        if(tag == undefined) this.tag = "body";
        else this.tag = tag;

        this.autoUpdate = true;

        this.mass = 1;
        this.bounciness = 1;
		this.gravityMultiplier = 1;

        this.isStatic          = false;
        this.isKinematic       = false;
        this.affectedByGravity = true;

        this.collider = undefined;

        bodyStack.push(this);
    }

    updateSelf(deltaTime)
    {
        if(this.isStatic) return;

        if(this.affectedByGravity)
        {
            this.velocity.addVec(Vector.sMult(GRAVITY,this.gravityMultiplier));
        }

        this.velocity.addVec(this.acceleration);
        this.position.addVec(this.velocity);

        this.acceleration = Vector.zero;
    }

    addForce(f)
    {
        this.acceleration.addVec(f);
    }

    setCollider(collider)
    {
        this.collider = collider;
    }

    onCollision(other)
    {
        // called when colliding with something
        // (if it has a collider) 
    }

    onDestroy()
    {
        // called when the object is removed from the bodyStack
    }
}

class Collider
{
    constructor(vecPosition)
    {
        this.position = vecPosition;        
    }

    collides(other)
    {
        // return true if object colides with the other
    }
}

class RectCollider extends Collider
{
    constructor(vecPosition,vecSize)
    {
        super(vecPosition);
        this.size = vecSize;

        this.colliderType = 1;
    }

    collides(other)
    {
        switch(other.colliderType)
        {
            case 1: // rectangle x rectangle collision
                
                return (pointInRectangle(other.position.x, other.position.y, this.position.x, this.position.y, this.size.x, this.size.y)
                     || pointInRectangle(other.position.x + other.size.x, other.position.y + other.size.y, this.position.x, this.position.y, this.size.x, this.size.y)
                     || pointInRectangle(other.position.x + other.size.x, other.position.y, this.position.x, this.position.y, this.size.x, this.size.y)
                     || pointInRectangle(other.position.x, other.position.y + other.size.y, this.position.x, this.position.y, this.size.x, this.size.y))

            case 2:// rectangle x circle collision
            
            return (pointInRectangle(other.position.x, other.position.y, this.position.x, this.position.y, this.size.x, this.size.y)
                 || pointInCircle(this.position.x, this.position.y, other.position.x, other.position.y, other.r)
                 || pointInCircle(this.position.x + this.size.w, this.position.y + this.size.h, other.position.x, other.position.y, other.r)
                 || pointInCircle(this.position.x + this.size.w, this.position.y, other.position.x, other.position.y, other.r)
                 || pointInCircle(this.position.x, this.position.y + this.size.h, other.position.x, other.position.y, other.r))
                
        }
    }
}

class CircleCollider extends Collider
{
    constructor(vecPosition,objR)
    {
        super(vecPosition);
        this.r = objR;

        this.colliderType = 2;
    }

    collides(other)
    {
        switch(other.colliderType)
        {
            case 1: // circle x rectangle collision
            
                return (pointInRectangle(this.position.x, this.position.y, other.position.x, other.position.y, other.size.x + other.position.x, other.size.y + other.position.y)
                     || pointInCircle(other.position.x, other.position.y, this.position.x, this.position.y, this.r.value)
                     || pointInCircle(other.position.x + other.size.w, other.position.y + other.size.h, this.position.x, this.position.y, this.r.value)
                     || pointInCircle(other.position.x + other.size.w, other.position.y, this.position.x, this.position.y, this.r.value)
                     || pointInCircle(other.position.x, other.position.y + other.size.h, this.position.x, this.position.y, this.r.value))
            
            case 2: // circle x circle collision

                let sumR = this.r.value + other.r.value;
                let dis = distance(this.position.x,this.position.y,other.position.x,other.position.y);
                return (sumR >= dis);
        }
    }
}