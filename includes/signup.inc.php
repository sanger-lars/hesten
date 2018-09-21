<?php 
// require_once('../../sne/Lars.php');		

function sorter_events() {
	$jsondata = @file_get_contents("lars.json", true);
	if ($jsondata === false) {
		return "fejl";
	}
	else {
		$data = json_decode($jsondata);
		$data2 = array_slice($data, 2);
		sort($data2);
		array_unshift($data2, $data[0], $data[1]);
		$jsondata = json_encode($data2);
		file_put_contents("lars.json", $jsondata);
		return $jsondata;
	}
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	if (isset($_POST['date'])) {
		$id = $_POST['date'];
		$overskrift = $_POST['overskrift'];
		$tekst = $_POST['tekst'];
		$billede = $_POST['billede'];

		$deltagere = "0";

		
		$filename = "lars.json";
		$jsondata = @file_get_contents("lars.json", true);
		if ($jsondata === false) {
			//error
			echo "<h1> Error get file </h1>";
			
		} else {
			$data = json_decode($jsondata);
			$img_nr = $data[0]. "." . $data[1];
			$tekst = nl2br($tekst);
			$date=date_create($id);
			$date = date_format($date,"d-m-Y");
			// check om datoen findes
			$fundet = false;
			for ($i=2; $i < count($data); $i++) { 
				if (strpos($data[$i], $id) > 0) {
					$fundet = true;
					break;
				}
			}
			if ($fundet) {
				$id = $id . "-2";
			}
			$html = '<div id="'.$id.'" class="arangement">
			<div><h2>Dato: '.$date.'</h2></div>
			<div class="overskrift"><h2>'.$overskrift.'</h2></div>';
			if ($billede === "true") {
				$html = $html.'<img src="uploads/'.$img_nr.'">';
			}
			$html = $html . $tekst . '<div id="deltagere"><span id="dtekst">Deltagere: '.$deltagere.' </span> <a id ="deltag">Deltag</a> </div>
			</div>';
			   
			/* <script type="text/javascript">
    			alert("Der er allerede en begivenhed på <?php echo $id; ?> vil du erstatte den ? ");
 
  			</script>
			$fundet = false;
			for ($i=2; $i < count($data); $i++) { 
				if (strpos($data[$i], $id) > 0) {
					$fundet = true;
					break;
				}
			}*/
			array_push($data, $html);
			$jsondata = json_encode($data);
			$saved_file = file_put_contents($filename, $jsondata);
			$jsondata = sorter_events();
		}
	}
}