import canvasDraw from "./render";

import Game from './tanks'



window.requestAnimationFrame = window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.msRequestAnimationFrame;

function drawLoop() {
	requestAnimationFrame(drawLoop);
	/*
    if(updateCanvas){
    	canvasDraw();
    	updateCanvas = false;
	}*/
	canvasDraw();
}
// main game loop
window.onload = function () {
	drawLoop();
	// TODO: game update logic loop
	const root = document.getElementById('root');
	new Game(root);
};