<?php 

function streng_plus($streng, $plus_tal) {
	$p1 = strpos($streng, "_");
	$tal = substr($streng, $p1+1, 3) +$plus_tal;
	$nul_tal = $tal; 
	if ($tal < 100) {$nul_tal = "0" . $tal;}
	if ($tal < 10) {$nul_tal = "00" . $tal;}
	$nyStreng = substr($streng, 0, $p1+1).$nul_tal.substr($streng, $p1+4);
	return $nyStreng;
}

$upload_image=$_FILES[" myimage "][ "name " ];

$streng = $_FILES["myimage"]["name"];

$p1 = strpos($streng, ".");
$extend = substr($streng, $p1+1, 3);

$jsondata = @file_get_contents("lars.json", true);
if ($jsondata === false) {
	$data = [];
	$data[0] = "img_000";
} else {
	$data = json_decode($jsondata);
}
$nyt_img_nr = streng_plus($data[0], 1);
$data[0] = $nyt_img_nr;
$data[1] = $extend;
$jsondata = json_encode($data);
file_put_contents("lars.json", $jsondata);

$para = json_decode($_POST['pass']);
$nu = (string)$_POST['pass'];
$nr = explode(",", $nu);
$folder="../uploads/";

move_uploaded_file($_FILES["myimage"]["tmp_name"], "$folder" . $nyt_img_nr . "." . $extend);

if (count($nr) > 2) {
	header("Location: ../includes/ret.php?" . $nr[0] . "," . $nyt_img_nr . "." . $extend . "," . $nr[2]);
} else {
	header("Location: ../includes/opret.php?" . $nr[0] . "," . $nyt_img_nr . "." . $extend);
}

exit();