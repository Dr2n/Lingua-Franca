<?php

	$to = 'darrenfu@outlook.com';
	$subject = $_POST['senderSubject'];
	$message = wordwrap($_POST['senderMessage'], 70, '\r\n');

	$headers = "From : inbox@linguafranca.dreamhosters.com" . "\r\n";
	$headers .= "Reply-To:" . $_POST['senderEmail'] . "\r\n";
	if (isset($_POST['CCCheck'])){
		$headers .= 'CC: ' . $_POST['senderEmail'] . "\r\n";
	}


	if(mail($to, $subject, $message, $headers)){
		echo 'MAIL SENT';
		echo $headers;

	}else{
		echo 'FAILURE TO SEND MAIL';
	}
?>
