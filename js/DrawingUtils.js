/*---------------------------------
 * LIMPA O CANVAS
*/
function clearCanvas(){
	context.clearRect(0,0,width,height);
}
/*---------------------------------
 * UMA LINHA
 * de start = {x:,y:} a finish = {x:,y:}
*/
function drawLine(start,finish){
	context.beginPath();
	context.moveTo(start.x,start.y);
	context.lineTo(finish.x,finish.y);
	context.stroke();
	context.closePath();
}
/*---------------------------------
 * DESENHA UM CIRCULO
 * de raio r, em x e y
*/
function fillCircle(x,y,r){
	context.beginPath();
	context.arc(x,y,r,0,Math.PI*2);
	context.fill();
	context.closePath();
}
function strokeCircle(x,y,r){
	context.beginPath();
	context.arc(x,y,r,0,Math.PI*2);
	context.stroke();
	context.closePath();
}
/*---------------------------------
 * DESENHA UM POLÍGONO
 * points = Array of {x:,y:}
*/
function fillPolygon(points){
	context.beginPath();

	context.moveTo(points[0].x,points[0].y);
	for(let i = 1; i < points.length; i++){
		context.lineTo(points[i].x,points[i].y);
	}
	context.lineTo(points[0].x,points[0].y);
	context.fill();
	context.closePath();
}
function strokePolygon(points){
	context.beginPath();

	context.moveTo(points[0].x,points[0].y);
	for(let i = 1; i < points.length; i++){
		context.lineTo(points[i].x,points[i].y);
	}
	context.lineTo(points[0].x,points[0].y);
	context.stroke();
	context.closePath();
}