class Parallax {
    constructor(layers) {
        this.layers = layers;
    }

    updateSelf() {
        for (let i = 0; i < this.layers.length; i++) {
            this.layers[i].velocity.x = -gameSpeed / (this.layers.length - i);

            this.layers[i].position.addVec(this.layers[i].velocity);

            if (this.layers[i].position.x < -this.layers[i].sprite.size.x) {
                this.layers[i].position.x = 0;
            }
        }
    }

    drawLayers() {
        this.layers.forEach(layer => {

            layer.sprite.drawSelf();

            layer.position.x += layer.sprite.size.x;
            layer.sprite.drawSelf();
            layer.position.x -= layer.sprite.size.x;

        });
    }
}

class ParallaxLayer {
    constructor(sprite, vecVelocity) {
        this.sprite = sprite;
        this.position = Vector.zero;
        this.velocity = vecVelocity;

        this.sprite.position = this.position;
    }
}