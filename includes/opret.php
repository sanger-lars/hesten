<?php 
   	 
?>

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="../hesten.css">
	
<script type='text/javascript'>
	function preview_image(event) 
	{
	 var reader = new FileReader();
	 reader.onload = function()
	 {
	  var output = document.getElementById('output_image');
	  output.src = reader.result;
	 }
	 reader.readAsDataURL(event.target.files[0]);
	}
</script>
</head>

<section class="main-container">
	<div class="wrapper" style="border: 1px solid black;">
		<h2>Opret en Begivenhed</h2>
		<form method="POST" action="opload.php" enctype="multipart/form-data" accept="image/*" onchange="preview_image(event)">>
 			<input id="opret_file" type="file" name="myimage">
 			<input type="submit" id="opret_submit" name="submit_image" value="Upload">
			<img id="output_image"/>
			
		</form>
		<input type="date" name="date" id="date" placeholder="Dato" style="font-size: 1.3rem; margin-left: 2%;"> 
		<br>
		<input type="text" name="overskrift" id="input_overskrift" placeholder="Overskrift" style="font-size: 1.3rem; width: 95%; margin-left: 2%; margin-right: auto;">
		<br>
		<textarea name="tekst" id="tekst" placeholder="beskrivelse" align="center" rows="5" style="font-size: 1rem;"></textarea>
		<br>
		<button value="Upload File" id="opload" name="submit" style="font-size: 1.5rem; margin-left: 2%; color: green;">Gem</button>
		<button id="fortryd" style="font-size: 1.5rem; margin-left: 10%; color: red;">Fortryd</button>
	</div>
</section>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="opret.js"></script>
<script src="../scripts/upload.js"></script>
<?php
	
 ?>