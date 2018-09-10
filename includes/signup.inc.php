<?php 
require_once('../../sne/Lars.php');
function hent_cook($key) {
	
	$mysqli = connectToDB();
	$query = "SELECT `val` FROM `lars_f_dk`.`cook` WHERE `key`='$key'";
	$result = mysqli_query($mysqli, $query);
	$resultCheck = mysqli_num_rows($result);
	if ($resultCheck >= 1) {
		$data = array();
	    if ($row = mysqli_fetch_assoc($result)) {
	      return $row['val'];
	    }    
	} else {
		return "";
	}
    $mysqli->close();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	if (isset($_POST['date'])) {
		$id = $_POST['date'];
		$overskrift = $_POST['overskrift'];
		$tekst = $_POST['tekst'];
		$billede = $_POST['billede'];

		$deltagere = "0";

		
		$filename = "lars.json";
		$jsondata = file_get_contents($filename, true);
		if (empty($jsondata)) {
			//error
			exit;
		}
		else {
			$data = json_decode($jsondata);
			$img_nr = $data[0]. "." . $data[1];

		
			$html = '<div id="'.$id.'" class="arangement">
			<div class="overskrift"><h2>'.$overskrift.'</h2></div>';
			if ($billede === "true") {
				$html = $html.'<img src="uploads/'.$img_nr.'">';
			}
			$html = $html . $tekst . '<div id="deltagere">Deltagere: '.$deltagere.' <a href="#" id ="deltag">Deltag</a> </div>
			</div>';

			array_push($data, $html);
			$jsondata = json_encode($data);
			file_put_contents($filename, $jsondata);

	    	$fil = file_get_contents($filename, true);
	    	echo $html;
		}
	}
}