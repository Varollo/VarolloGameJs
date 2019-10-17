/*
 * FUNÇÕES MATEMATICAS
*/
function lerp (start, end, amt){
    amt = clamp(amt);
    return (1-amt)*start+amt*end;
}
function clamp (value, min, max){
    if(value > max) return max;
    else if(value < min) return min;
    else return value;
}
function clamp (value){
    if(value > 1) return 1;
    else if(value < 0) return 0;
    else return value;
}
/*---------------------------------
 * VETOR
 * módulo, direção e sentido
*/
function Vector(x,y){
	this.x = x || 0;
	this.y = y || 0;
}
Vector.prototype.add = function(v){
	this.x += v.x;
	this.y += v.y;
}
Vector.prototype.sub = function(v){
	this.x -= v.x;
	this.y -= v.y;
}
Vector.prototype.mult = function(c){
	this.x *= c;
	this.y *= c;
}
Vector.prototype.div = function(c){
	this.x /= c;
	this.y /= c;
}
Vector.prototype.set = function(x,y){
	this.x = x;
	this.y = y;
}
Vector.prototype.mag = function(){
	return Math.sqrt(this.x*this.x + this.y*this.y);
}
Vector.prototype.normalize = function(){
	this.div(this.mag());
}
Vector.prototype.copy = function(){
	return new Vector(this.x,this.y);
}
Vector.prototype.inverse = function(){
	return new Vector(-this.x,-this.y);
}
/*---------------------------------
 * RETORNA UM NUMERO ALEATORIO
 * min, max
*/
function random(){
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