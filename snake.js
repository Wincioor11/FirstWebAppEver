var canvas = document.getElementById('gameWindow');
var context = canvas.getContext('2d');

const CELL_SIZE = 25; // okno 800x600 pixeli ---> 16x12 celi rozmiaru 50x50 pixeli
var score;
var currentX;
var currentY;
var speedX;
var speedY;
var appleX;
var appleY;
var tail;
var gameOverFlag;
var firstGameFlag;
var appleColor;
var dir;
var interval;


function moveHead(){
	if( dir === 3) {
		dir = 3;
		speedY = CELL_SIZE;
		speedX = 0;
	} else if(dir === 2){
		speedX = CELL_SIZE;
		speedY = 0;
	}else if(dir === 1){
		speedY = -CELL_SIZE;
		speedX = 0;
	}else if(dir === 0){
		speedX = -CELL_SIZE;
		speedY = 0;
	}
	currentX += speedX;
	currentY += speedY;
}

function drawTail(){
	for(var i = 0 ;i < score; i++){
		context.fillStyle = 'green';
		context.fillRect(tail[i].x, tail[i].y, CELL_SIZE-1, CELL_SIZE-1);
	}
}

function randomColor(){
	var color = '#'+String(Math.floor(Math.random()*888888)+111111);
	return color;
}

function draw(){
	context.fillStyle = 'black';
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	context.fillStyle = 'green'; 
	context.fillRect(currentX, currentY, CELL_SIZE-1, CELL_SIZE-1);
	drawTail();
	
	context.fillStyle = appleColor;
	context.fillRect(appleX+7.5, appleY+7.5, CELL_SIZE-15, CELL_SIZE-15);
	
	context.fillStyle = 'white';
	context.font = '20px Arial';
	context.fillText('score: '+ (score-1), 350, 25);
}	

function gameLogic(){
	if(score === 0) getPoint();
	tail.unshift({  //unshift() dodaje elemnt do początku tablicy
		x: currentX,
		y: currentY,
	});
	
	while(tail.length > score){
		tail.pop(); //pop() usuwa ostatni element tablicy
	}
	
	moveHead();
	if(currentX === appleX && currentY === appleY){
		getPoint();
	}
	draw();
	if(crashCheck()){
		gameOver();
	}
	
}

function crashCheck(){
	for(var i=0 ; i < tail.length; i++){
		if (currentX > (canvas.width-CELL_SIZE) || currentY > (canvas.height-CELL_SIZE) || currentX < 0 || currentY < 0 || (currentX === tail[i].x && currentY === tail[i].y) ) return true;
	}	
	return false;
}
function gameOver(){
	clearInterval(interval);
	gameOverFlag = true;
	context.fillStyle = 'white';
	context.font = '50px Arial';
	context.fillText('GAME OVER!', 250, 250);
	context.font = '25px Arial';
	context.fillText('Tap to continue', 325, 350);
	
}

function spawnApple(){
	do{	
		appleX = Math.floor(Math.random()*32)*CELL_SIZE;
		appleY = Math.floor(Math.random()*24)*CELL_SIZE;
	}while(appleX === currentX || appleY === currentY );
}

function getPoint(){
	score++;
	appleColor = randomColor();
	spawnApple();
}

function reset(){
	clearInterval(interval);
	currentX = canvas.width/2 - CELL_SIZE;
	currentY = canvas.height/2 - CELL_SIZE;
	speedX = CELL_SIZE;
	speedY = 0;
	dir = 2;
	appleColor = randomColor();
	score = 0;
	tail = [];
	gameOverFlag = false;
	firstGameFlag = true;
	spawnApple();
	
	
}

function snakeGame(){
	reset();
	canvas.addEventListener('mousedown', function(evt){ if(gameOverFlag)location.reload();});
	document.addEventListener('keydown', function(evt){ 
		evt.preventDefault();
		
		if(evt.keyCode === 37 && dir === 0 && !gameOverFlag) 	  dir = 3;
		else if(evt.keyCode === 37 && dir === 1 && !gameOverFlag) dir = 0;
		else if(evt.keyCode === 37 && dir === 2 && !gameOverFlag) dir = 1;
		else if(evt.keyCode === 37 && dir === 3 && !gameOverFlag) dir = 2;
		else if(evt.keyCode === 39 && dir === 0 && !gameOverFlag) dir = 1;
		else if(evt.keyCode === 39 && dir === 1 && !gameOverFlag) dir = 2;
		else if(evt.keyCode === 39 && dir === 2 && !gameOverFlag) dir = 3;
		else if(evt.keyCode === 39 && dir === 3 && !gameOverFlag) dir = 0;
	});
		
	if(firstGameFlag){
		firstGameFlag = false;
		interval = setInterval(gameLogic, 100); //startuje wątek gry 
	}
}