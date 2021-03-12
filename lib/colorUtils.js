let colorMode = "rgba";

class Color {
    constructor(r = 255, g = 255, b = 255, a = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        if (a === undefined) {
            this.a = 1;
        }
        else {
            this.a = a;
        }
    }

    getString() {
        return colorMode + "(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
    }

    lerpTo(other, amt) {
        if (amt > 1) amt = 1;
        else if (amt < 0) amt = 0;

        this.r = (1 - amt) * this.r + amt * other.r;
        this.g = (1 - amt) * this.g + amt * other.g;
        this.b = (1 - amt) * this.b + amt * other.b;
        this.a = (1 - amt) * this.a + amt * other.a;
    }

    static get WHITE() { return new Color(255, 255, 255, 1); }
    static get BLACK() { return new Color(0, 0, 0, 1); }
    static get GRAY() { return new Color(127, 127, 127, 1); }
    static get RED() { return new Color(255, 0, 0, 1); }
    static get GREEN() { return new Color(0, 255, 0, 1); }
    static get BLUE() { return new Color(0, 0, 255, 1); }
    static get YELLOW() { return new Color(255, 255, 0, 1); }
    static get CYAN() { return new Color(0, 255, 255, 1); }
    static get MAGENTA() { return new Color(255, 0, 255, 1); }
}

function randomColor() {
    let alpha = 1;
    if (colorMode == 'rgba') alpha = Math.random();

    return new Color(
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        alpha
    );
}

function lerpColor(colorA, colorB, amt) {
    if (amt > 1) amt = 1;
    else if (amt < 0) amt = 0;

    const r = (1 - amt) * colorA.r + amt * colorB.r;
    const g = (1 - amt) * colorA.g + amt * colorB.g;
    const b = (1 - amt) * colorA.b + amt * colorB.b;
    const a = (1 - amt) * colorA.a + amt * colorB.a;

    return new Color(r, g, b, a);
}

function colorToString(color) {
    return colorMode + "(" + color.r + "," + color.g + "," + color.b + "," + color.a + ")";
}

function setFillColor(color) {
    context.fillStyle = color.getString();
}

function setStrokeColor(color) {
    context.strokeStyle = color.getString();
}