/*---------------------------------
 * FUNCTIONS TO BE USED

    function fixedUpdate()
    {
        // called once per every 'FIXED_DELTA_TIME' miliseconds (default = 20)
    }
*/

GRAVITY = new Vector(0,0.05);
FIXED_DELTA_TIME = 2;

bodyStack = [];

setInterval(physicsUpdate,FIXED_DELTA_TIME);
function physicsUpdate(deltaTime)
{
    if(bodyStack != null)
    {
        bodyStack.forEach(body => {
            body.updateSelf(deltaTime);
            
            if(body.collider != undefined)
            {
                bodyStack.forEach(other => {
                    if(other.collider != undefined)
                    {                        
                        if (other != body && body.collider.collides(other.collider))
                        {
                            body.onCollision(other);
                        }
                    }
                });
            }
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
        this.position          = new Vector();
        this.velocity          = new Vector();
        this.acceleration      = new Vector();

        this.isStatic          = false;
        this.affectedByGravity = true;

        this.collider = undefined;

        bodyStack.push(this);
    }

    updateSelf(deltaTime)
    {
        if(this.isStatic) return;

        if(this.affectedByGravity)
        {
            this.addForce(GRAVITY);
        }

        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);

        this.acceleration = new Vector();

        if(this.collider != undefined)
        {
            this.collider.position = this.position;
        }
    }

    addForce(f)
    {
        this.acceleration.add(f);
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

        this.colliderType = 0;
    }

    collides(other)
    {
        switch(other.colliderType)
        {
            case 0: // rectangle x rectangle collision

                return (pointInRectangle(other.position.x, other.position.y, this.position.x, this.position.y, this.w, this.h)
                     && pointInRectangle(other.position.x + other.w, other.position.y + other.h, this.position.x, this.position.y, this.w, this.h)
                     && pointInRectangle(other.position.x + other.w, other.position.y, this.position.x, this.position.y, this.w, this.h)
                     && pointInRectangle(other.position.x, other.position.y + other.h, this.position.x, this.position.y, this.w, this.h))

            case 1:// rectangle x circle collision
            
            return (pointInRectangle(other.position.x, other.position.y, this.position.x, this.position.y, this.w, this.h)
                 && pointInCircle(this.position.x, this.position.y, other.position.x, other.position.y, other.r)
                 && pointInCircle(this.position.x + this.position.w, this.position.y + this.position.h, other.position.x, other.position.y, other.r)
                 && pointInCircle(this.position.x + this.position.w, this.position.y, other.position.x, other.position.y, other.r)
                 && pointInCircle(this.position.x, this.position.y + this.position.h, other.position.x, other.position.y, other.r))
                
        }
    }
}

class CircleCollider extends Collider
{
    constructor(x,y,r)
    {
        super(x,y);
        this.r = r;

        this.colliderType = 1;
    }

    collides(other)
    {
        switch(other.colliderType)
        {
            case 0: // circle x rectangle collision
            
                return (pointInRectangle(this.position.x, this.position.y, other.position.x, other.position.y, other.w + other.position.x, other.h + other.position.y)
                     || pointInCircle(other.position.x, other.position.y, this.position.x, this.position.y, this.r)
                     || pointInCircle(other.position.x + other.position.w, other.position.y + other.position.h, this.position.x, this.position.y, this.r)
                     || pointInCircle(other.position.x + other.position.w, other.position.y, this.position.x, this.position.y, this.r)
                     || pointInCircle(other.position.x, other.position.y + other.position.h, this.position.x, this.position.y, this.r))
            
            case 1: // circle x circle collision

                let sumR = this.r + other.r;
                let dis = distance(this.position.x,this.position.y,other.position.x,other.position.y);

                return (sumR <= dis);
        }
    }
}

function pointInRectangle(pX,pY,rX,rY,rW,rH)
{
    return (pX >= rX && pY >= rY && pX <= rW && pY <= rH);
}

function pointInCircle(pX,pY,cX,cY,cR)
{
    return (distance(pX,pY, cX,cY) <= cR);
}

function distance(xA,yA,xB,yB)
{
	return Math.sqrt((xA - xB) * (xA - xB) + (yA - yB) * (yA - yB));
}