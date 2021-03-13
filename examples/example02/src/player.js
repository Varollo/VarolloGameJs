class Player extends Body {
    constructor(position = Vector.ZERO, size = Vector.ONE) {
        super();

        this.position = position;
        this.size = size;
        this.jumpForce = 15;

        this.collider = new RectCollider(new Rectangle(this.position.x, this.position.y, this.size.x, this.size.y));
    }

    jump() {
        //jump_sound.play();
        this.velocity.y = 0;
        this.addForce(new Vector(0, -this.jumpForce));
    }

    drawSelf() {
        setFillColor(Color.YELLOW);
        fillRectangle(this.position.x, this.position.y, this.size.x, this.size.y, drawMode.TOP_LEFT);
    }

    updateSelf(deltaTime) {
        super.updateSelf(deltaTime);

        if (this.onGround()) {
            this.velocity.y = 0;
            this.position.y = GROUND_LEVEL - this.size.y;
        }

        this.collider.updateProperties([new Rectangle(this.position.x, this.position.y, this.size.x, this.size.y)]);
    }

    onCollision(other) {
        // called when colliding with something
        // (if it has a collider) 
        location.reload();
    }

    onGround() { return (this.position.y + this.size.y >= GROUND_LEVEL) }
}