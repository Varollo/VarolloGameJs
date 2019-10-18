/*---------------------------------
 * Pivot do desenho
*/
drawMode = 
{
	TOP_LEFT: 0,
	CENTER:   1
};
/*---------------------------------
 * LIMPA O CANVAS
*/
function clearCanvas(){
	context.clearRect(0,0,width,height);
}
/*---------------------------------
 * FILL THE CANVAS WITH A COLOR color
*/
function fillCanvas(color)
{
	let save = context.fillStyle;
	
	if(color != undefined)
	{
		context.fillStyle = color.getString();
	}	
	fillRectangle(0,0,width,height);

	context.fillStyle = save;
}
/*---------------------------------
 * UMA LINHA
 * de start = {x:,y:} a finish = {x:,y:}
*/
function drawLine(xA,yA,xB,yB){
	context.beginPath();
	context.moveTo(xA,yA);
	context.lineTo(xB,yB);
	context.stroke();
	context.closePath();
}
/*---------------------------------
 * DESENHA UM RETANGULO
 * de tamanho w por h, em x e y
*/
function fillRectangle(x,y,w,h,rectMode){
	if(rectMode == drawMode.CENTER)
	{
		context.fillRect(x-w/2,y-h/2,w,h);
	}
	else
	{
		context.fillRect(x,y,w,h);
	}
}
function strokeRectangle(x,y,w,h,rectMode){
	if(rectMode == drawMode.CENTER)
	{
		context.strokeRect(x-w/2,y-h/2,w,h);
	}
	else
	{
		context.strokeRect(x,y,w,h);
	}
}
/*---------------------------------
 * DESENHA UM CIRCULO
 * de raio r, em x e y
*/
function fillCircle(x,y,r,circleMode){
	context.beginPath();
	
	if(circleMode == drawMode.TOP_LEFT)
	{
		context.arc(x+r,y+r,r,0,Math.PI*2);
	}
	else
	{
		context.arc(x,y,r,0,Math.PI*2);
	}
	
	context.fill();
	context.closePath();
}
function strokeCircle(x,y,r){
	context.beginPath();
	
	if(circleMode == drawMode.TOP_LEFT)
	{
		context.arc(x+r,y+r,r,0,Math.PI*2);
	}
	else
	{
		context.arc(x,y,r,0,Math.PI*2);
	}
	
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