<?php 

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
				$ok = move_uploaded_file($file_tmp, $file);
				sleep(2);
				if ($ok) {
					$jsondata = json_encode($data);
					file_put_contents("lars.json", $jsondata);
					
				} else {
					echo $file;
				}		
			}
		}

		if ($errors) {
			print_r($errors);
			echo $errors;
		}
    }

    
}
