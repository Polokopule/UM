<?php
$fname = $_POST["fname"];
$lname = $_POST["lname"];
$username = $_POST["username"];
$email = $_POST["email"];
$phone = $_POST["phone"];
$profile = $_POST["pp"];
$pass = $_POST["pass"];

$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
$tmp_name = $_FILES["fileToUpload"]["tmp_name"];
// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
  $check = getimagesize($tmp_name);
  if($check !== false) {
    echo "File is an image - " . $check["mime"] . ".";

    $uploadOk = 1;
move_uploaded_file($tmp_name, $target_file);
  } else {
    echo "File is not an image.";
    $uploadOk = 0;
  }
}
?> 