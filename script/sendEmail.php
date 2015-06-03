<?php

	$to = 'darren.yx.fu@gmail.com';
	$subject = $_POST['senderSubject'];
	$message = wordwrap($_POST['senderMessage'], 70, '\n.');

	$headers = "From : inbox@linguafranca.dreamhosters.com" . '\n.';
	$headers .= "Reply-To:" . $_POST['senderEmail'] . '\n.';
	if (isset($_POST['CCCheck'])){
		$headers .= 'CC: ' . $_POST['senderEmail'] . '\n.';
	}


	if(mail($to, $subject, $message, $headers)){
		echo 'MAIL SENT';
	}else{
		echo 'FAILURE TO SEND MAIL';
	}
?>
