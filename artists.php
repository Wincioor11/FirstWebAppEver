<?php
	if(isset($_POST['search'])){
		$search= explode(" ",$_POST['search']);
	
		$search_size = sizeOF($search);
		$sql = "SELECT * FROM artists WHERE ";
		
		for($i=0;$i<$search_size;$i++){
			$sql= $sql."id_artist LIKE \"%$search[$i]%\" OR nickname LIKE \"%$search[$i]%\" OR name LIKE \"%$search[$i]%\" OR last_name LIKE \"%$search[$i]%\" OR style LIKE \"%$search[$i]%\" OR nationality LIKE \"%$search[$i]%\" OR birth LIKE \"%$search[$i]%\" ";
			if(++$i>=$search_size)$i--;
			else {$sql= $sql."OR "; $i--;}
		}
	
	}else $sql="SELECT * FROM artists";
	
	require_once "connect.php";
	mysqli_report(MYSQLI_REPORT_STRICT);
	
	try{
		$connection= new mysqli($host,$db_user, $db_password, $db_name);
		if($connection->connect_errno!=0) throw new Exception(mysqli_connect_errno());
		else{
			$artists=$connection->query($sql);
			if(!$artists) throw new Exception($connection->error);
			
			$num_of_artists=$artists->num_rows;
			
			for($i=1; $i<=$num_of_artists;$i++){
				$rows['row'.$i]=$artists->fetch_assoc();
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
	
	<link rel="stylesheet" href="style-artists.css" type="text/css" />
	<link rel="stylesheet" href="css/fontello.css" type="text/css" />	
	
	
</head>

<body>
	 
	<div id="sing_in"><a href="sing_in.php" class="small_link">Sing in</a>
	</div>
	<header>
			<h1>My fav artists </h1>
			<nav>
				<div id="bar">
					<div id="bartext">Możesz wyszukać artystę poprzez słowa kluczowe:
					</div>
					<div id="search">
						<form action="artists.php" method="post" >
							<input type="text"	name="search" />
							<input type="submit" value="Wyszukaj"/>
						</form>
					</div>
				</div>
			</nav>
	</header>
	
	
	<main>
		<div id="container">
			<nav>
				<div id="content">
					<?php 
						if($num_of_artists==0) echo "Nie znaleziono wyników pasujących do twojego zapytania...";
						else{	
							for($i=1; $i<=$num_of_artists;$i++){
								
								echo"<figure><a href="."artist-page.php?id=".$rows['row'.$i]['id_artist']." class="."imglink"."><img src=".			
										$rows['row'.$i]['img']." width=200 height=200/>
									<figcaption>".$rows['row'.$i]['nickname']."</figcaption></a>
									</figure>";	
							}
						}	
						
					?>
				</div>
			</nav>
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