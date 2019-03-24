<!DOCTYPE HTML>
<html>
<head lang="pl">
	<meta charset="utf-8" />
	<title>Play my games!</title>
	<meta name="description" content="Strona poświęcona mojej skromnej osobie, moje pasje, zainteresowania, hobby itd"/>
	<meta name="keywords" content="wincioor11, pasja, hobby, zaintersowania, lifestyle, student, coding, it" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	
	<link rel="stylesheet" href="games-style.css" type="text/css" />
	<link rel="stylesheet" href="css/fontello.css" type="text/css" />	
	<script src="https://cdnjs.cloudflare.com/ajax/libs/list.js/1.5.0/list.min.js"></script>
	
	

</head>

<body>
	 
	<div id="sing_in"><a href="sing_in.php" class="small_link">Sing in</a>
	</div>
	<header>
			<h1>Play my games and improve your skills</h1>
	</header>
	<main>
		<div id="content">
			<nav>
				<div id="games">
					<ol>
						<li><a href="#content" onclick="snakeGame();">Snake</a></li>
						<li><a href="#content">Flappy Birds</a></li>
						<li><a href="#content">Kurka Wodna</a></li>
						<li><a href="#content">Ping Pong</a></li>
						<li><a href="#content" onclick="spaceInvadersGame();">Space Invaders</a></li>
						<li><a href="#content">Mario Wspinaczka</a></li>
						
					</ol>
				</div>
			</nav>	
			<div id="game-view">
						<canvas id="gameWindow" width="800" height="600"></canvas>
						<script src="snake.js" type="text/javascript" ></script>	
						<script src="spaceinvaders.js" type="text/javascript" ></script>	
					</div>
					<div style="clear:both"></div>
		</div>	
	</main>
	<footer>
		<div id="footer"><span class="foot">Michał Winciorek , Copyright 2018 &copy;</span>
		</div>
	</footer>


	
</body>
</html>