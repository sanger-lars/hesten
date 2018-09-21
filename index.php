<?php 
session_start();
?>
<!DOCTYPE html>

<html>
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<title>Kommende arrangementer på Hesten</title>
	<link rel="stylesheet" href="hesten.css">
	 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> 
	<!--<script src="https://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>-->
</head>
<body>
	
<div class="wrapper">
	<div class="logo">
		<img src="logo_lille.jpg" alt="Den Grønne Hest">	
	</div>
	<span class="tittel"><h1>Kommende arangementer</h1></span>
	<div id="lars">
		<!-- <div id="ev201807061" class="arangement">
			<div class="overskrift"><h2>Fredag 6/7 Karaoke på Hesten</h2></div>
			<img src="uploads/karaoke_2018_7.jpg">Vi gør det igen! Kom til karaoke aften på Hesten fredag D. 6 juli kl 19! 😁🍺 Tag nogle venner med og syng en duet 💃
			<div id="deltagere" style=""><span id="dtekst" style="">Deltagere: 999 </span><a style="" id ="deltag" ">Deltag</a></div>
		</div>

		<div id="evt201809071" class="arangement">
			<div class="overskrift"><h2>Fredag 7/9 Karaoke</h2></div>
			<img src="uploads/karaoke_2018_9.jpg">
			<div id="deltagere">Deltagere: 999 <a href="#" id ="deltag">Deltag</a> </div>
		</div> -->
	</div>
	<button onmousedown="klargor_slet()">Slet</button>
	<button onmousedown="opret()">Opret begivenhed</button>

	
</div>

</body>
<script src="scripts/modal.js"></script>
<script src="scripts/hesten.js"></script>
<script src="scripts/click.js"></script>
</html>