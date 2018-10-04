<?php //image rotate code here 
if(isset($_POST['save'])){
  $degrees=90;

  $new_file=$sourceName;
  $filename = $_POST['filnavn'];
  $rotang = $degrees;
  list($width, $height, $type, $attr) = getimagesize($filename);
  $size = getimagesize($filename);
  
  switch($size['mime']){
    case 'image/jpeg':
      $source = imagecreatefromjpeg($filename);
      // Rotate
      $rotate = imagerotate($source, $degrees, 0);
      imagejpeg($rotate, $filename);
      echo 'ok';
      exit;

    case 'image/png':
      $source = imagecreatefrompng($filename);
      $bgColor = imagecolorallocatealpha($source, 255, 255, 255, 127);
      // Rotate
      $rotate = imagerotate($source, $degrees, $bgColor);
      imagesavealpha($rotate, true);
      imagepng($rotate,$filename);
  }

  echo 'fejl';

}

?>