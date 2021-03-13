class Particle extends Body {
    constructor(x, y, w, h) {
        super();

        this.position.x = x;
        this.position.y = y;

        this.size = new Vector(w, h);

        this.affectedByGravity = false;

        this.velocity.x = - 10;

        this.sprite = new Sprite(particles_tex);
    }

    updateSelf(deltaTime) {
        this.velocity.x = -10 - gameSpeed;
        super.updateSelf(deltaTime);
        this.position.y += this.size.x / 20;

        if (this.position.x < -this.size.x) {
            this.position.x = width + random(0, this.size.x * 5);
        }

        if (this.position.y > height + this.size.y) {
            this.position.y = random(-height, -this.size.y);
        }
    }

    drawSelf() {
        this.sprite.drawSelf(this.position.x, this.position.y, this.size.x, this.size.y);
    }
}