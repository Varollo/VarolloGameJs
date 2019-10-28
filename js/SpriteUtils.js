function SetAntiAliasing(state)
{
    context.imageSmoothingEnabled = state;
}

/*
 * Image that can be drawn on screen

 * src: String        -> source of the image
 * vecPosition: {x,y} -> position on screen
 * vecSize: {x,y}     -> size on screen
*/
class Sprite
{
    constructor(src, vecPosition, vecSize)
    {
        this.position = vecPosition;
        this.size = vecSize;

        this.image = new Image();
        this.image.src = src;
        
        this.clippingX = 0;
        this.clippingY = 0;
        this.clippingW = this.image.width;
        this.clippingH = this.image.height;
    }

    drawSelf()
    {
        context.drawImage(
            this.image,
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