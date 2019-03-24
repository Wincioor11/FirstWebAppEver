<?php 
	$id = $_GET['id'];
	
	require_once "connect.php";
	mysqli_report(MYSQLI_REPORT_STRICT);
	
	try{
		$connection= new mysqli($host,$db_user, $db_password, $db_name);
		if($connection->connect_errno!=0) throw new Exception(mysqli_connect_errno());
		else{
			$artists=$connection->query("SELECT * FROM artists WHERE id_artist=$id");
			if(!$artists) throw new Exception($connection->error);
			
			$num_of_artists=$artists->num_rows;
			
			if($num_of_artists>0){
				$row=$artists->fetch_assoc();
			}else{
				echo "Error: No such an artist";
			}
				
			
			$connection->close();
		}
		
	}catch(Exception $error){
		echo "Error: ".$error;
	}
	
	
?>

<!DOCTYPE HTML>
<html>
<head lang="pl">
	<meta charset="utf-8" />
	<title>My fav artists</title>
	<meta name="description" content="Strona poświęcona mojej skromnej osobie, moje pasje, zainteresowania, hobby itd"/>
	<meta name="keywords" content="wincioor11, pasja, hobby, zaintersowania, lifestyle, student, coding, it" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	
	<link rel="stylesheet" href="style-artist-page.css" type="text/css" />
	<link rel="stylesheet" href="css/fontello.css" type="text/css" />	

</head>

<body>
	 
	<div id="sing_in"><a href="sing_in.php" class="small_link">Sing in</a>
	</div>
	<header>
			<h1>
				<?php
					echo $row['nickname'];
				?>
			</h1>
			<nav>
				<div id="bar">
					<div id="bartext">Możesz wyszukać artystę poprzez słowa kluczowe:
					</div>
					<div id="search">
						<form action="artists.php" method="post">
							<input type="text"	name="search" />
							<input type="submit" value="Wyszukaj"/>
						</form>
					</div>
				</div>
			</nav>
	</header>
	
	
	<main>
		<div id="container">
			<article>
				<div id="content">
					<img src="<?php echo $row['img']; ?>" height=400 width=400/>
					<div id="info">
						<p><?php echo $row['nickname']; ?></p>
						<p><?php echo $row['name']." ".$row['last_name']; ?></p>
						<p><?php echo "Narodowość :".$row['nationality']; ?></p>
						<p><?php echo "Styl :".$row['style']; ?></p>
					</div>
					<div id="history">
						<?php echo $row['history']; ?>
					</div>
					<nav>
						<div id="arrows">
							
						</div>
					</nav>	
				</div>
			</article>
			<aside>
				<div id="ads"><a href="ads.html"><img src="img/ads.jpg" width=160 height=600/></a>
				</div>
			</aside>
			<div style="clear:both;">
			</div>
		</div>	
	</main>
		
		
	
	
	<footer>
		<div id="footer"><span class="foot">Michał Winciorek , Copyright 2018 &copy;</span>
		</div>
	</footer>


	
</body>
</html>