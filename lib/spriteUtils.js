function setAntiAliasing(state)
{
    context.imageSmoothingEnabled = state;
}

class Texture extends Image
{
    constructor(src,width,height)
    {
        super(width, height);  
        this.src = src;

        objectsLoading++;

        this.onload = function()
        {
            objectsLoading--;
        };
    }
}

/*
 * Image that can be drawn on screen

 * src: String        -> source of the image
 * vecPosition: {x,y} -> position on screen
 * vecSize: {x,y}     -> size on screen
*/
class Sprite
{
    constructor(texture, vecPosition, vecSize, onloadCallback)
    {
        this.position = vecPosition;
        this.size = vecSize;

        this.sourceTexture = texture;

        this.clippingX = 0;
        this.clippingY = 0;
        this.clippingW = this.sourceTexture.width;
        this.clippingH = this.sourceTexture.height;
    }

    drawSelf()
    {
        context.drawImage(
            this.sourceTexture,
            this.clippingX,  this.clippingY,
            this.clippingW,  this.clippingH,
            this.position.x, this.position.y,
            this.size.x,    this.size.y);
    }

    setClippingValues(clippingX,clippingY,clippingW,clippingH)
    {
        this.clippingX = clippingX;
        this.clippingY = clippingY;
        this.clippingW = clippingW;
        this.clippingH = clippingH;
    }
}