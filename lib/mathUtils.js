/*
 * FUNÇÕES MATEMATICAS
*/
function lerp (start, end, amt){
    amt = clamp(amt);
    return (1-amt)*start+amt*end;
}
function clamp (value, min, max){
	if(min === 0 && max === 0)
	{
		min = 0;
		max = 1;
	}
    if(value > max) return max;
    else if(value < min) return min;
    else return value;
}
function distance(xA,yA,xB,yB)
{
	return Math.sqrt((xA - xB) * (xA - xB) + (yA - yB) * (yA - yB));
}
function pointInRectangle(pX,pY,rX,rY,rW,rH)
{
    return (pX >= rX && pY >= rY && pX <= rX + rW && pY <= rY + rH);
}

function pointInCircle(pX,pY,cX,cY,cR)
{
    return (distance(pX,pY, cX,cY) <= cR);
}
/*---------------------------------
 * VETOR
 * módulo, direção e sentido
*/
class Vector
{
	constructor(x,y)
	{
		this.x = x;
		this.y = y;
	}

	addVec(v)
	{
		this.x += v.x;
		this.y += v.y;
	}

	static sAddVec(v1,v2){
		return new Vector(v1.x + v2.x, v1.y + v2.y);
	}

	/*add(c)
	{
		this.x += c;
		this.y += c;
	}	*/

	static sAdd(v,c){
		return new Vector(v.x + c, v.y + c);
	}

	subVec(v)
	{
		this.x -= v.x;
		this.y -= v.y;
	}

	static sSubVec(v1, v2)
	{
		return new Vector(v1.x - v2.x, v1.y - v2.y);
	}

	sub(c)
	{
		this.x -= c;
		this.y -= c;
	}

	static sSub(v, c)
	{
		return new Vector(v.x - c, v.y - c);
	}	

	cross(v)
	{
		let i = this.x * v.y;
		let j = this.y * v.x;

		return i - j;
	}

	static sCross(v1, v2)
	{
		let i = v1.x * v2.y;
		let j = v1.y * v2.x;

		return i - j;
	}

	dot(v)
	{
		let i = this.x * v.x;
		let j = this.y * v.y;

		return i + j;
	}

	static sDot(v1, v2)
	{
		let i = v1.x * v2.x;
		let j = v1.y * v2.y;

		return i + j;
	}

	mult(c)
	{
		this.x *= c;
		this.y *= c;
	}

	static sMult(v, c)
	{
		return new Vector(v.x * c, v.y * c);
	}

	div(c)
	{
		this.x /= c;
		this.y /= c;
	}

	getAngleRad()
	{
		return Math.atan2(this.y, this.x);
	}

	static sDiv(v, c)
	{
		return new Vector(v.x / c, v.y / c);
	}

	static rotateVector(v, a)
	{
		let x = (v.x * Math.cos(a)) - (v.y * Math.sin(a));
		let y = (v.x * Math.sin(a)) + (v.y * Math.cos(a));
		
		return new Vector(x,y);
	}

	static angleBetween(v1, v2)
	{
		let dot = this.sDot(v1, v2);

		let mag1 = v1.mag();
		let mag2 = v2.mag();

		if(mag1 * mag2 == 0)
		{
			return Math.acos(dot);
		}
		
		return Math.acos(dot / (mag1 * mag2));
	}

	set(x,y){
		this.x = x;
		this.y = y;
	}

	mag(){
		return Math.sqrt(this.x*this.x + this.y*this.y);
	}

	normalize(){
		this.div(this.mag());
	}

	static sNormalized(v)
	{
		return this.sDiv(v,v.mag());
	}

	clone(){
		return new Vector(this.x, this.y);
	}

	inverse(){
		return new Vector(-this.x, -this.y);
	}

	static get zero(){
		return new Vector(0,0);
	}

	static get right(){
		return new Vector(1,0);
	}

	static get left(){
		return new Vector(-1,0);
	}

	static get up(){
		return new Vector(0,1);
	}

	static get down(){
		return new Vector(0,-1);
	}

	static get one(){
		return new Vector(1,1);
	}
}

/*---------------------------------
 * RETORNA UM NUMERO ALEATORIO
 * min, max
*/
function randomValue(){
	return Math.random();
}
function random(min,max){
	return min + Math.random()*(max-min);
}
function randomInt(min,max){
	return Math.floor(min + Math.random()*(max-min));
}
function randomVector(){
	return new Vector(-1 + Math.random()*2,-1 + Math.random()*2);
}