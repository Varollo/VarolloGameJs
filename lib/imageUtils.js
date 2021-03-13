function setAntiAliasing(state) {
    context.imageSmoothingEnabled = state;
}

/*
 * When a texture is instantiated it adds itself to a list
 * of loading stuff
*/
class Texture extends Image {
    constructor(src = "") {
        super();
        this.src = src;

        objectsLoading++;

        this.onload = function () {
            objectsLoading--;
        };
    }
}

/*
 * Image that can be drawn on screen
*/
class Sprite {
    constructor(texture = new Texture()) {

        this.sourceTexture = texture;

        this.clippingX = 0;
        this.clippingY = 0;
        this.clippingW = this.sourceTexture.width;
        this.clippingH = this.sourceTexture.height;
    }

    drawSelf(x, y, w, h) {
        context.drawImage(
            this.sourceTexture,
            this.clippingX, this.clippingY,
            this.clippingW, this.clippingH,
            x, y,
            w, h);
    }

    setClippingValues(clippingX, clippingY, clippingW, clippingH) {
        this.clippingX = clippingX;
        this.clippingY = clippingY;
        this.clippingW = clippingW;
        this.clippingH = clippingH;
    }
}