<?php 

	if(isset($_POST['gem_navn'])) {
		$filename = "../events/" .$_POST['arr_id'] . ".json";
		$jsondata = $_POST['data'];
		$deltagere = json_decode($jsondata);
		$id = $_POST['arr_id'];
		$fil = file_put_contents($filename, $jsondata);
		$filename = "lars.json";
		$jsondata = @file_get_contents("lars.json", true);
		if ($jsondata === false) {
			//error
			echo "<h1> Error get file </h1>";
			
		} else {
			$data = json_decode($jsondata);
			$fundet = false;
			for ($i=2; $i < count($data); $i++) { 
				if (strpos($data[$i], $id) > 0) {
					$fundet = true;
					break;
				}
			}
			$p1 = strpos($data[$i], ">Deltagere:");
			$streng = $data[$i];
			$tal= $deltagere[0];
			if ($tal<10) {
				$tal=" ".$tal;
			}
			$nyStreng = substr($streng, 0, $p1+12) . $tal . substr($streng, $p1+14, 100);
			$data[$i] = $nyStreng;
			$jsondata = json_encode($data);
			$fil = file_put_contents($filename, $jsondata);
			exit();
		}


	  	if ($fil === false) {
	  		echo "fejl";
	  	} else {
			echo $fil;
	  	}
	  	exit();
	}

	if(isset($_POST['hent_navn'])) {
		$filename = "../events/" .$_POST['arr_id'] . ".json";
		$fil = @file_get_contents($filename, true);
		
	  	if ($fil === false) {
	  		echo "fejl";
	  	} else {
			echo $fil;
	  	}
	  	exit();
	}
	
 ?>