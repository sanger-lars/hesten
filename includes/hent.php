<?php 

	require_once('../../sne/Lars.php');
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

function test() {
	$id = "ev201807062";
	$overskrift = "Fredag 6/7 Karaoke på Hesten";
	$img = "karaoke_2018_7.jpg";
	$tekst = "Vi gør det igen! Kom til karaoke aften på Hesten fredag D. 6 juli kl 19! 😁🍺 Tag nogle venner med og syng en duet 💃🕺";

	$deltagere = "0";

	$hej = '<div id="'.$id.'" class="arangement">
		<div class="overskrift"><h2>'.$overskrift.'</h2></div>
		<img src="uploads/'.$img.'">'.$tekst.'
		<div id="deltagere">Deltagere: '.$deltagere.' <a href="#" id ="deltag">Deltag</a> </div>
	</div>';
	$filename = "lars.json";
	if ( file_exists($filename) && ($fp = fopen($filename, "r"))!==false ) {
      	$data = file_get_contents($filename);
      	
      	$data = json_decode($data);
      	
		fclose($fp);
		
      // send success JSON    
    }
    else
    {
    	$data = "";
    	$data = [];
    	
      // send error message if you can  
    }
 
	array_push($data, $hej);
	$json = json_encode($data);
	// $file = fopen('../json/'.$id.'.json','w');
 //    fwrite($file, $json);
 //    fclose($file);
	file_put_contents($filename, $json);

    $fil = file_get_contents($filename, true);
    echo $fil;

} // function test()

/*	$mysqli = connectToDB();
	//mysqli_set_charset($mysqli,"utf8mb4");
	$sql = "INSERT INTO hesten_arr (id, overskrift, img, tekst, deltagere) VALUES ('$id', '$overskrift', '$img', '$tekst', '$deltagere');";
	//echo $sql;
	if ($result = $mysqli->query($sql)) {
		//echo $result;
	}
	//echo $result;

	$sql = "SELECT * FROM  `hesten_arr` WHERE  `id` =  'ev201807062'";
    if ($result = $mysqli->query($sql)) {
        
        /* fetch object array */
/*        $data = array();
        while ($row = mysqli_fetch_assoc($result)) {
          $data[] = $row;
        }
        
        echo json_encode($data);
        /* free result set */
       /* $result->close();
    }

	$mysqli->close();*/
/*	echo json_encode($data);
	exit();
session_start();

if (isset($_POST['submit'])) {

	include_once 'dbh.inc.php';

	$uid = mysqli_real_escape_string($conn, $_POST['uid']);
	$pwd = mysqli_real_escape_string($conn, $_POST['pwd']);

	//Error handlers
	//Check for empty fields
	if (empty($uid) || empty($pwd)){
		header("Location: ../index.php?login=empty");
		exit();
	} else {
		$sql = "SELECT * FROM users WHERE user_uid='$uid' OR user_email=''$uid";
		$result = mysqli_query($conn, $sql);
		$resultCheck = mysqli_num_rows($result);
		if ($resultCheck < 1) {
			header("Location: ../index.php?login=error");
			exit();
		} else {
			if ($row = mysqli_fetch_assoc($result)) {
				//De-hashing the password
				$hashedPwdCheck = password_verify($pwd, $row['user_pwd']);
				if ($hashedPwdCheck == false) {
					header("Location: ../index.php?login=error");
					exit();
				} elseif ($hashedPwdCheck == true) {
					//Log in user here
					$_SESSION['u_id'] = $row['user_id'];
					$_SESSION['u_first'] = $row['user_first'];
					$_SESSION['u_last'] = $row['user_last'];
					$_SESSION['u_email'] = $row['user_email'];
					$_SESSION['u_uid'] = $row['user_uid'];
					header("Location: ../index.php?login=success");
					exit();
					

				}

			}
		}
	}


} else {
	header("Location: ../index.php?login=error");
	exit();
}                            7


*/




 ?>