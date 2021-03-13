class Parallax {
    constructor(layers) {
        this.layers = layers;
    }

    updateSelf() {
        for (let i = 0; i < this.layers.length; i++) {
            this.layers[i].velocity.x = -gameSpeed / (this.layers.length - i);

            this.layers[i].position.add(this.layers[i].velocity);

            if (this.layers[i].position.x < -width) {
                this.layers[i].position.x = 0;
            }
        }
    }

    drawLayers() {
        this.layers.forEach(layer => {

            layer.sprite.drawSelf(layer.position.x, layer.position.y, width, height);

            layer.position.x += width;
            layer.sprite.drawSelf(layer.position.x, layer.position.y, width, height);
            layer.position.x -= width;

        });
    }
}

class ParallaxLayer {
    constructor(sprite, vecVelocity) {
        this.sprite = sprite;
        this.position = Vector.ZERO;
        this.velocity = vecVelocity;
    }
}