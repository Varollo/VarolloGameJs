class Obstacle extends Body {
    constructor(height, posY) {
        super();

        this.affectedByGravity = false;

        this.size = new Vector(100, height);

        this.position.x = canvas.width + this.size.x;
        this.position.y = posY;

        this.velocity.x = -GAME_SPEED;

        this.collider = new RectCollider(new Rectangle(this.position.x, this.position.y, this.size.x, this.size.y));
    }

    updateSelf(deltaTime) {
        super.updateSelf(deltaTime);

        this.collider.updateProperties([new Rectangle(this.position.x, this.position.y, this.size.x, this.size.y)]);
    }

    drawSelf() {
        setFillColor(Color.GREEN);
        fillRectangle(this.position.x, this.position.y, this.size.x, this.size.y, drawMode.TOP_LEFT);
    }

    isOffScreen() { return this.position.x + this.size.x < 0 }
}