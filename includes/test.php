
<?php 
require_once('../../sne/Lars.php');

function streng_plus($streng, $plus_tal) {
	$p1 = strpos($streng, "_");
	$tal = substr($streng, $p1+1, 2) +$plus_tal;
	if ($tal < 10) {$tal = "0" . $tal;}
	$nyStreng = substr($streng, 0, $p1+1).$tal.substr($streng, $p1+3);
	return $nyStreng;
}

for ($t=1;$t<=10;$t++) {
    $jsondata = "";
	$jsondata = @file_get_contents("lars.json", true);
	if ($jsondata === false) {
		//error
		echo "<h1> Error get file </h1>";
		
	} else {
		$data = json_decode($jsondata);
		$data[0] = streng_plus($data[0], 1);
		$img_nr = $data[0] . "." . $data[1] . "</br>";
		echo "nr= " . $t . "   " . $img_nr; 
		$jsondata = json_encode($data);
	    file_put_contents("lars.json", $jsondata);
	}
}














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


