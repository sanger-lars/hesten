<?php 
require_once('../../sne/Lars.php');

function lav_cook($key, $vall) {
	$lars = hent_cook($key);
	if ($lars == "") {
		$mysqli = connectToDB();
		$query = "INSERT INTO  `lars_f_dk`.`cook` (`key`,`val`) VALUES ('$key','$vall')";
		$result = mysqli_query($mysqli, $query);
	    $mysqli->close();
	} else {
		$mysqli = connectToDB();
		$query = "UPDATE `cook` SET `key`='$key',`val`='$vall' WHERE 1";
		
		$result = mysqli_query($mysqli, $query);
	    $mysqli->close();
	}
	
}

function hent_cook($key) {
	
	$mysqli = connectToDB();
	$query = "SELECT `val` FROM `lars_f_dk`.`cook` WHERE `key`='$key'";
	$result = mysqli_query($mysqli, $query);
	$resultCheck = mysqli_num_rows($result);
	if ($resultCheck >= 1) {
	    if ($row = mysqli_fetch_assoc($result)) {
	      return $row['val'];
	    }    
	} else {
		return "";
	}
    $mysqli->close();
}


function streng_plus($streng, $plus_tal) {
	$p1 = strpos($streng, "_");
	$tal = substr($streng, $p1+1, 2) +$plus_tal;
	if ($tal < 10) {$tal = "0" . $tal;}
	$nyStreng = substr($streng, 0, $p1+1).$tal.substr($streng, $p1+3);
	return $nyStreng;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['files'])) {
        $errors = [];
        $path = '../uploads/';
		$extensions = ['jpg', 'jpeg', 'png', 'gif'];
		
        $all_files = count($_FILES['files']['tmp_name']);

        for ($i = 0; $i < $all_files; $i++) {  
			$file_name = $_FILES['files']['name'][$i];
			$file_tmp = $_FILES['files']['tmp_name'][$i];
			$file_type = $_FILES['files']['type'][$i];
			$file_size = $_FILES['files']['size'][$i];
			$file_ext = strtolower(end(explode('.', $_FILES['files']['name'][$i])));

			
			if (!in_array($file_ext, $extensions)) {
				$errors[] = 'Extension not allowed: ' . $file_name . ' ' . $file_type;
			}

			if ($file_size > 2097152) {
				$errors[] = 'File size exceeds limit: ' . $file_name . ' ' . $file_type;
			}

			if (empty($errors)) {
				$jsondata = @file_get_contents("lars.json", true);
				if ($jsondata === false) {
					$nyt_img_nr = "img_01";
					$data = [];
				}
				else {
					$data = json_decode($jsondata);
					$nyt_img_nr = streng_plus($data[0], 1);
				}

				$file = $path . $nyt_img_nr . "." . $file_ext;
				$data[0] = $nyt_img_nr;
				$data[1] = $file_ext;
				if (move_uploaded_file($file_tmp, $file)) {
					$jsondata = json_encode($data);
					file_put_contents("lars.json", $jsondata);
				}


				
				
			}
		}

		if ($errors) {
			print_r($errors);
			echo $errors;
		}
    }

    
}
