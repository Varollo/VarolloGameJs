class Body {
    constructor() {
        this.position = Vector.ZERO;
        this.velocity = Vector.ZERO;
        this.acceleration = Vector.ZERO;

        this.gravityMultiplier = 1;

        this.affectedByGravity = true;

        this.collider = undefined;
    }

    updateSelf(deltaTime) {
        if (this.affectedByGravity) {
            this.velocity.add(Vector.mult(GRAVITY, this.gravityMultiplier));
        }

        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);

        this.acceleration = Vector.ZERO;
    }

    addForce(f) {
        this.acceleration.add(f);
    }
}