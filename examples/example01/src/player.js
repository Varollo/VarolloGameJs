// Body = physics object
class Player extends Body {
    constructor(x, y, w, h) {
        super();

        this.sprite = undefined;
        this.animationIndex = 0;

        this.position.x = x;
        this.position.y = y;

        this.size = new Vector(w, h);

        this.jumpForce = 40;

        this.collider = new Rectangle(this.position.x, this.position.y, this.size.x, this.size.y);
    }

    jump() {
        if (this.onGround()) {
            jump_sound.play();
            this.addForce(new Vector(0, -this.jumpForce));
        }
    }

    drawSelf() {
        if (this.sprite === undefined) {
            setFillColor(colors.WHITE);
            fillRectangle(this.position.x, this.position.y, this.size.x, this.size.y, drawMode.TOP_LEFT);
        }
        else if (!this.onGround()) {
            this.sprite[0].drawSelf(this.position.x, this.position.y, this.size.x, this.size.y);
        }
        else {
            this.sprite[this.animationIndex % this.sprite.length].drawSelf(this.position.x, this.position.y, this.size.x, this.size.y);
            if (FRAME_COUNT % Math.floor(30 - gameSpeed) === 0)
                this.animationIndex++;
        }
    }

    updateSelf(deltaTime) {
        super.updateSelf(deltaTime);

        if (this.onGround()) {
            this.velocity.y = 0;
            this.position.y = FLOOR_LEVEL - this.size.y;
        }

        this.collider = new Rectangle(this.position.x, this.position.y, this.size.x, this.size.y);
    }

    onGround() {
        return (this.position.y + this.size.y >= FLOOR_LEVEL)
    }
}