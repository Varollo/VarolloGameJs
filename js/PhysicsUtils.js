/*---------------------------------
    -------------------------------------------------
                   REQUIRES MathUtils.js
    -------------------------------------------------

 * FUNCTIONS TO BE USED

    function fixedUpdate()
    {
        // called once per every 'FIXED_DELTA_TIME' miliseconds (default = 20)
    }
*/

GRAVITY = new Vector(0,1);
FIXED_DELTA_TIME = 20;

bodyStack = [];

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
                            }
                        }
                    }
                });
            }

            body.updateSelf(deltaTime);
        });
    }

    if(typeof fixedUpdate === 'function') {
        fixedUpdate();
    }
}

class Body
{   
    constructor()
    {
        this.position          = Vector.zero;
        this.velocity          = Vector.zero;
        this.acceleration      = Vector.zero;

        this.mass = 1;
        this.bounciness = 1;

        this.isStatic          = false;
        this.isKinematic       = false;
        this.affectedByGravity = true;

        this.collider = undefined;

        bodyStack.push(this);
    }

    updateSelf(deltaTime)
    {
        if(this.collider != undefined)
        {
            this.collider.position = this.position;
        }

        if(this.isStatic) return;

        if(this.affectedByGravity)
        {
            this.velocity.addVec(GRAVITY);
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
}

class Collider
{
    constructor(x,y)
    {
        this.position = new Vector(x,y);        
    }

    collides(other)
    {
        // return true if object colides with the other
    }
}

class RectCollider extends Collider
{
    constructor(x,y,w,h)
    {
        super(x,y);
        this.w = w;
        this.h = h;

        this.colliderType = 1;
    }

    collides(other)
    {
        switch(other.colliderType)
        {
            case 1: // rectangle x rectangle collision
                
                return (pointInRectangle(other.position.x, other.position.y, this.position.x, this.position.y, this.w, this.h)
                     || pointInRectangle(other.position.x + other.w, other.position.y + other.h, this.position.x, this.position.y, this.w, this.h)
                     || pointInRectangle(other.position.x + other.w, other.position.y, this.position.x, this.position.y, this.w, this.h)
                     || pointInRectangle(other.position.x, other.position.y + other.h, this.position.x, this.position.y, this.w, this.h))

            case 2:// rectangle x circle collision
            
            return (pointInRectangle(other.position.x, other.position.y, this.position.x, this.position.y, this.w, this.h)
                 || pointInCircle(this.position.x, this.position.y, other.position.x, other.position.y, other.r)
                 || pointInCircle(this.position.x + this.position.w, this.position.y + this.position.h, other.position.x, other.position.y, other.r)
                 || pointInCircle(this.position.x + this.position.w, this.position.y, other.position.x, other.position.y, other.r)
                 || pointInCircle(this.position.x, this.position.y + this.position.h, other.position.x, other.position.y, other.r))
                
        }
    }
}

class CircleCollider extends Collider
{
    constructor(x,y,r)
    {
        super(x,y);
        this.r = r;

        this.colliderType = 2;
    }

    collides(other)
    {
        switch(other.colliderType)
        {
            case 1: // circle x rectangle collision
            
                return (pointInRectangle(this.position.x, this.position.y, other.position.x, other.position.y, other.w + other.position.x, other.h + other.position.y)
                     || pointInCircle(other.position.x, other.position.y, this.position.x, this.position.y, this.r)
                     || pointInCircle(other.position.x + other.position.w, other.position.y + other.position.h, this.position.x, this.position.y, this.r)
                     || pointInCircle(other.position.x + other.position.w, other.position.y, this.position.x, this.position.y, this.r)
                     || pointInCircle(other.position.x, other.position.y + other.position.h, this.position.x, this.position.y, this.r))
            
            case 2: // circle x circle collision

                let sumR = this.r + other.r;
                let dis = distance(this.position.x,this.position.y,other.position.x,other.position.y);
                return (sumR >= dis);
        }
    }
}