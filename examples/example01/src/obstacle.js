class Obstacle extends Body {
    constructor(x, y, w, h) {
        super();

        this.autoUpdate = false;

        this.sprite = undefined;
        this.animationIndex = 0;

        this.position.x = x;
        this.position.y = y;

        this.size = new Vector(w, h);

        this.setCollider(new RectCollider(this.position, this.size));
    }

    updateSelf(deltaTime) {
        this.velocity.x = -gameSpeed;

        super.updateSelf(deltaTime);

        if (this.offScreen()) {
            let amt = randomInt(0, 1000);
            this.position.x = width + amt;
        }

        if (this.onGround()) {
            this.velocity.y = 0;
            this.position.y = FLOOR_LEVEL - this.size.y;
        }
    }

    drawSelf() {
        if (this.sprite === undefined) {
            setFillColor(colors.WHITE);
            fillRectangle(this.position.x, this.position.y, this.size.x, this.size.y, drawMode.TOP_LEFT);
        }
        else {
            this.sprite[this.animationIndex % this.sprite.length].drawSelf();

            if (FRAME_COUNT % 15 === 0)
                this.animationIndex++;
        }

    }

    onGround() {
        return (this.position.y + this.size.y >= FLOOR_LEVEL)
    }

    offScreen() {
        return (this.position.x + this.size.x <= 0);
    }
}