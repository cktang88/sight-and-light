///////////////////////////////////////////////////////

// DRAWING
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
function draw(){

	// Clear canvas
	ctx.clearRect(0,0,canvas.width,canvas.height);

	// Draw segments
	ctx.strokeStyle = "#999";
	for(let i=0;i<segments.length;i++){
		let seg = segments[i];
		ctx.beginPath();
		ctx.moveTo(seg.a.x,seg.a.y);
		ctx.lineTo(seg.b.x,seg.b.y);
		ctx.stroke();
	}

	// Sight Polygons
	let fuzzyRadius = 10;
	let polygons = [getSightPolygon(Mouse.x,Mouse.y)];
	for(let angle=0;angle<Math.PI*2;angle+=(Math.PI*2)/10){
		let dx = Math.cos(angle)*fuzzyRadius;
		let dy = Math.sin(angle)*fuzzyRadius;
		polygons.push(getSightPolygon(Mouse.x+dx,Mouse.y+dy));
	};

	// DRAW AS A GIANT POLYGON
	for(let i=1;i<polygons.length;i++){
		drawPolygon(polygons[i],ctx,"rgba(255,255,255,0.2)");
	}
	drawPolygon(polygons[0],ctx,"#fff");

	// Draw red dots
	ctx.fillStyle = "#dd3838";
	ctx.beginPath();
    ctx.arc(Mouse.x, Mouse.y, 2, 0, 2*Math.PI, false);
    ctx.fill();
	for(let angle=0;angle<Math.PI*2;angle+=(Math.PI*2)/10){
		let dx = Math.cos(angle)*fuzzyRadius;
		let dy = Math.sin(angle)*fuzzyRadius;
		ctx.beginPath();
    	ctx.arc(Mouse.x+dx, Mouse.y+dy, 2, 0, 2*Math.PI, false);
    	ctx.fill();
    }

}

function drawPolygon(polygon,ctx,fillStyle){
	ctx.fillStyle = fillStyle;
	ctx.beginPath();
	ctx.moveTo(polygon[0].x,polygon[0].y);
	for(let i=1;i<polygon.length;i++){
		let intersect = polygon[i];
		ctx.lineTo(intersect.x,intersect.y);
	}
	ctx.fill();
}

// DRAW LOOP
window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
let updateCanvas = true;
function drawLoop(){
    requestAnimationFrame(drawLoop);
    if(updateCanvas){
    	draw();
    	updateCanvas = false;
    }
}