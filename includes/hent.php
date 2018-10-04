<?php 

	$filename = "lars.json";

	if(isset($_POST['alle'])){
		
		if ($_POST['alle'] == "alle") {
			hent_alle($filename);
		} else {
			$fra = date("Y-m-d");
			
			filter_events();
		} 
	} 
	if (isset($_POST['gem'])) {
		$data = $_POST['data'];
		file_put_contents($filename, $data);

		// slet evt. deltager json 
		$filename = "../events/" .$_POST['id'] . ".json";
		if (file_exists($filename)) {
			unlink($filename);
		}
		// slet evt. billede
		if ($_POST['billed_path'] > "") {
			$filename = "../uploads/".$_POST['billed_path'];
			if (file_exists($filename)) {
				unlink($filename);
			}
		}
		
		echo "ok";
		exit();
	}


	function hent_alle($filename) {
	  	$fil = @file_get_contents($filename, true);
	  	if ($fil === false) {
	  		echo "";
	  	} else {
			echo $fil;
	  	}

	  	exit();    
    	
	}
	
	function filter_events() {
		function array_ok($var) {
		    global $fra;
		    if ($_POST['alle'] == "kommende") {
		    	return ($fra <= substr($var , 9, 10));
		    } else {
		    	return ($fra >= substr($var , 9, 10));
		    }
		}
		
	    $jsondata = @file_get_contents("lars.json", true);
		if ($jsondata === false) {
			echo '<script language="javascript">';
			echo 'alert(" kunne ikke hente lars.json ")';
			echo '</script>';
			echo "fejl";
		}
		else {
			$data = json_decode($jsondata);
			$data2 = array_slice($data, 2);
		    $data3 = array_filter($data2, "array_ok");
		    if (count($data3) === 0) {
		    	echo "";
		    } else {
		    	array_unshift($data3, $data[0], $data[1]);
				$jsondata = json_encode($data3);
			
				echo $jsondata;
		    }
		    
		}
	}





 ?>