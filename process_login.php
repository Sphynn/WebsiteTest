<?php

if($_POST && isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['password']) && !empty($_POST['password'])){
	$data['message'] = true;
}
else{
	$data['message'] = false;
}

header('Content-type: application/json');
echo json_encode($data);

?>
