import canvasDraw from "./render";

/////////////////////////////////////////////////////////////////////////

// DRAW LOOP
window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;

function drawLoop(){
	requestAnimationFrame(drawLoop);
	/*
    if(updateCanvas){
    	canvasDraw();
    	updateCanvas = false;
	}*/
	canvasDraw();
}


// main game loop

window.onload = function(){
	drawLoop();
};