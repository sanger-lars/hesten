<?php 
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	if (isset($_POST['date'])) {
		$id = $_POST['date'];
		$img = $_SESSION['filnavn'];
		$overskrift = $_POST['overskrift'];
		$tekst = $_POST['tekst'];


		$deltagere = "0";

		$hej = '<div id="'.$id.'" class="arangement">
			<div class="overskrift"><h2>'.$overskrift.'</h2></div>
			<img src="uploads/'.$img.'">'.$tekst.'
			<div id="deltagere">Deltagere: '.$deltagere.' <a href="#" id ="deltag">Deltag</a> </div>
		</div>';
		$filename = "lars.json";
		$jsondata = file_get_contents($filename, true);
		$data = json_decode($jsondata);
		if ($data == "") {$data = [];}
		array_push($data, $hej);
		$jsondata = json_encode($data);
		file_put_contents($filename, $jsondata);

    	$fil = file_get_contents($filename, true);
    	echo $fil;
	}
}