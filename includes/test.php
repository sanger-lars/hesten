
<?php 
require_once('../../sne/Lars.php');




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

$fra = "2018-10-04";
$fra = date("Y-m-d");
$data = filter_events($fra);





function filter_events($fra) {
	function array_ok($var) {
	    global $fra;
		if ($fra <= substr($var , 9, 10)) {
		    echo $fra . "----". substr($var , 9, 10) . "</br>";
			return true;
		} else {
			return false;
		}
	}
	
    $jsondata = @file_get_contents("lars.json", true);
	if ($jsondata === false) {
		return "fejl";
	}
	else {
		$data = json_decode($jsondata);
		$data2 = array_slice($data, 2);
	    $data3 = array_filter($data2, "array_ok");
	    array_unshift($data2, $data[0], $data[1]);
		$jsondata = json_encode($data2);
		
		return $jsondata;
	}
}

?>


