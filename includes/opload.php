<?php 

function streng_plus($streng, $plus_tal) {
	$p1 = strpos($streng, "_");
	$tal = substr($streng, $p1+1, 2) +$plus_tal;
	if ($tal < 10) {$tal = "0" . $tal;}
	$nyStreng = substr($streng, 0, $p1+1).$tal.substr($streng, $p1+3);
	return $nyStreng;
}

$upload_image=$_FILES[" myimage "][ "name " ];

$streng = $_FILES["myimage"]["name"];

$p1 = strpos($streng, ".");
$extend = substr($streng, $p1+1, 3);

$jsondata = @file_get_contents("lars.json", true);
if ($jsondata === false) {
	$data = [];
	$data[0] = "img_00";
} else {
	$data = json_decode($jsondata);
}
$nyt_img_nr = streng_plus($data[0], 1);
$data[0] = $nyt_img_nr;
$data[1] = $extend;
$jsondata = json_encode($data);
file_put_contents("lars.json", $jsondata);


$folder="../uploads/";
move_uploaded_file($_FILES["myimage"]["tmp_name"], "$folder" . $nyt_img_nr . "." . $extend);

 
header("Location: ../includes/opret.php?" . $nyt_img_nr . "." . $extend);
exit();