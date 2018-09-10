<?php 

	require_once('../../sne/Lars.php');
	
	$filename = "lars.json";

	if(isset($_POST['alle'])){
		// $filename = "lars.json";
	    hent_alle($filename, $_POST['alle']);
	}

	function hent_alle($filename, $fra) {
	  	$fil = @file_get_contents($filename, true);
	  	if ($fil === false) {
	  		echo "";
	  	} else {
			echo $fil;
	  	}

	  	exit();    
    	
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