var canvas = document.getElementById('gameWindow');
var context = canvas.getContext('2d');

const SHIP_SIZE = 32; // okno 800x600 pixeli ---> 16x12 celi rozmiaru 50x50 pixeli
var score;
var currentX;
var enemyX;
var enemyY;
const speed = 16;
const bulletSpeed = 5;
var bulletX;
var bulletY;
var gameOverFlag;
var firstGameFlag;
var interval;
var moveInterval;
var color;
var keyDownFlag;
var bullets;
var bulletsIntervals;

class Bullet{ //klasa Bullet
	constructor(x, y, speed){
		const sizeX = 4;
		const sizeY = 16;
		this.x = x;
		this.y = y - this.sizeY;
		this.speed = speed;
		console.log("im here");
	}
	
	
	isAlive(ex, ey){
		return !(this.x === ex && this.y === ey) ;
	};
	
	shoot(){
		this.y-=this.speed;
		
	};
}	

function randomColor(){
	var ccolor = '#'+String(Math.floor(Math.random()*888888)+111111);
	return ccolor;
}

function draw(){
	context.fillStyle = 'black';
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	for(var i=0;i<bullets.length;i++){
		context.fillStyle = 'white';
		context.fillRect(bullets[i].x - bullets[i].sizeX/2, bullets[i].y, bullets[i].sizeX, bullets[i].sizeY);
		console.log("im here too");
	}
	
	//rysowanie trojkatnego ksztalu
	context.fillStyle = 'grey';
	context.beginPath();
    context.moveTo(currentX - SHIP_SIZE/2, 580);
    context.lineTo(currentX + SHIP_SIZE/2, 580);
    context.lineTo(currentX , 580 - SHIP_SIZE);
    context.fill();
	//same here
	context.fillStyle = color;
	context.beginPath();
    context.moveTo(enemyX - SHIP_SIZE/2, enemyY);
    context.lineTo(enemyX + SHIP_SIZE/2, enemyY);
    context.lineTo(enemyX , enemyY + SHIP_SIZE);
    context.fill();
	
	context.fillStyle = 'white';
	context.font = '20px Arial';
	context.fillText('score: '+ (score-1), 350, 25);
}	

function gameLogic(){
	if(score === 0) getPoint();
	
	draw();
	
	
}

function move(dir){
	
	if(currentX > (canvas.width - SHIP_SIZE)){
				//clearInterval(moveInterval);
				currentX = canvas.width - SHIP_SIZE;
	}	
	
	if(currentX < SHIP_SIZE) {
				//clearInterval(moveInterval);
				currentX = SHIP_SIZE;
	}	
	
	if(dir === 1) currentX-= speed;
	if(dir === 2) currentX+= speed;
}

function crashCheck(){
	
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

function spawnEnemy(){
	//do{	
		enemyX = Math.floor(Math.random()*25)*CELL_SIZE;
		enemyY = 50; //Math.floor(Math.random()*24)*CELL_SIZE;
	//}while();
}

function getPoint(){
	score++;
	color = randomColor();
	spawnEnemy();
}

function reset(){
	clearInterval(interval);
	currentX = canvas.width/2 - SHIP_SIZE/2;
	
	color = randomColor();
	score = 0;
	gameOverFlag = false;
	firstGameFlag = true;
	keyDownFlag = false;
	clearInterval(moveInterval);
	bullets = [];
	bulletsIntervals = [];
	spawnEnemy();
	
	
}

function spaceInvadersGame(){
	reset();
	canvas.addEventListener('mousedown', function(evt){ if(gameOverFlag)location.reload();});
	document.addEventListener('keydown', function(evt){ 
		evt.preventDefault();
		
		if(evt.keyCode === 37 && !keyDownFlag && !gameOverFlag){
			keyDownFlag = true;
			if(currentX > SHIP_SIZE ) moveInterval = setInterval(move, 50, 1);
		}else if(evt.keyCode === 39 && !keyDownFlag && !gameOverFlag){
			keyDownFlag = true;
			if(currentX < (canvas.width - SHIP_SIZE)) moveInterval = setInterval(move, 50, 2);
		}else if(evt.keyCode === 32 && !gameOverFlag){
			bullets.unshift(new Bullet(currentX,580 - SHIP_SIZE, bulletSpeed));
			bulletsIntervals.unshift(setInterval(bullets[0].shoot, 50));
		} 
	});
	document.addEventListener('keyup', function(evt){
		if(evt.keyCode === 37 && keyDownFlag){
			keyDownFlag = false;
			clearInterval(moveInterval);
		}else if(evt.keyCode === 39 && keyDownFlag){
			keyDownFlag = false;
			clearInterval(moveInterval);
			
		} 
		
	});
		
	if(firstGameFlag){
		firstGameFlag = false;
		interval = setInterval(gameLogic, 100);
	}
}