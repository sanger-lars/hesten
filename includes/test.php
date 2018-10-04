
<?php 

?>
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<title>test</title>
	<link rel="stylesheet" href="../hesten.css">
	 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> 
	<!--<script src="https://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>-->
</head>

<body>
	<span><img src="../uploads/img_011.jpg?<?=rand(11111,99999)?>" style="width: 33%; height: auto;"></span>
	<button onclick="rota()">Roter billede</button>
</body>

<script type="text/javascript">
	var site = "copy_hesten";
function rota() {
	var posting = $.post("rotate.php", {
		save: "true",
		filnavn: "../uploads/img_011.jpg"
	}).done(function (data){
		window.location.reload();
	}).fail(function(){
		alert('error');
	})
}
var tal; 

for (var i = 1000 - 1; i >= 0; i--) {
	var tal = Math.floor(Math.random()* 9999 + 11111);
	console.log(tal);
}	
</script>

<?php


?>


