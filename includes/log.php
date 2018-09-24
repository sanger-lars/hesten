<?php 

	if(isset($_POST['check'])) {
		$id = $_POST['test'];
		if ($id !== "trisse2018") {
			echo $id; // fejl
		} else {
			$html = '<ul id="Menu">
			<li><button onmousedown="opret()">Opret begivenhed</button></li>
			<li><button onmousedown="klargor_slet()">Slet begivenhed</button></li>
		</ul>';
		echo json_encode($html);
		}
	}

	
 ?>