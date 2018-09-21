
<?php 
require_once('../../sne/Lars.php');
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


<script type="text/javascript">

// var promise = new Promise(function(resolve, reject) {}
//let data;

function hent_deltagere(gem, arr_id, deltager_navn, deltager_antal, callback) {
  var posting = $.post("../includes/arr.php", {
    arr_id: arr_id,
    hent_navn: "true"
  })
  .done(function (hdata) {
    if (gem) {
      if (hdata == "fejl") {
          
        deltagere = [];
        deltagere.push(deltager_antal);
      } else {
        deltagere = JSON.parse(hdata);
        deltagere[0] = parseInt(deltagere[0])+parseInt(deltager_antal);
      }
        //if (IsJsonString(svar)) {}
        
      deltagere.push(deltager_navn);
      deltagere.push(deltager_antal);
      gem_deltagere(arr_id, deltagere);  
    } // if gem
    else { // hent
    	callback(hdata);
    }
      
  })
  .fail(function (hdata) {
    alert("failed !!!");
    //data = hdata;
    hdata = "fejl";
    callback(hdata);
  });
} // hent_deltagere


var arr_id = "2018-09-28";

// deltagere liste
hent_deltagere(false,arr_id,"",0, function(data) {
	if (data == "fejl") {
		// ingen deltagere
	} else {
		deltagere = JSON.parse(data);
		var tekst = "<ul>";
		let tekst2;
		var i = 1;
		for (;;) {
			if (deltagere[i+1] > "1") {
				tekst2 = " personer";
			} else tekst2 = " person";
			tekst += "<li>"+deltagere[i]+" = "+deltagere[i+1]+tekst2+"</li>";
			i = i+2;
			debugger;
			if (i > deltagere.length-1) {
				break;
			}
		}
		tekst += "</ul>";  
		debugger;
		console.log(arr_id+"  "+deltagere);		
	}
	
});

</script>

<?php
/*function streng_plus($streng, $plus_tal) {
	$p1 = strpos($streng, "_");
	$tal = substr($streng, $p1+1, 3) +$plus_tal;
	$nul_tal = $tal; 
	if ($tal < 100) {$nul_tal = "0" . $tal;}
	if ($tal < 10) {$nul_tal = "00" . $tal;}
	$nyStreng = substr($streng, 0, $p1+1).$nul_tal.substr($streng, $p1+4);
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
}*/

?>


