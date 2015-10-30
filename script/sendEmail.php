<?php

	$to = 'darren.yx.fu@gmail.com';
	$subject = $_POST['senderSubject'];
	$message = $_POST['senderMessage'];
	date_default_timezone_set("Australia/Brisbane");

	$messageHTML = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'
				. '<html xmlns="http://www.w3.org/1999/xhtml">'
				. '<head>'
				. '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'
				. '<title>Lingua Franca New Email</title>'
				. '<meta name="viewport" content="width=device-width, initial-scale=1.0"/>'
				. '</head>'. "\r\n" 
				. '<body style="padding-left: 0px; padding-right: 0px; padding-top: 0px; padding-bottom: 0px; margin-left: 0px; margin-right: 0px;' 
				. 'margin-top: 0px; margin-bottom: 0px">'. "\r\n" 
				. '<table style="width: 100%; border-spacing: 0px;" border="0">'. "\r\n" 
				. '<tr style="width: 960px; height: 60px; background-color: black;">'. "\r\n" 
				. '<td colspan="3"><img src="http://www.linguafranca.dreamhosters.com/images/linguaFrancaLogo.png" style="padding-left: 40px;" width="122" height="45" alt="Lingua Franca Logo"/></td>'. "\r\n"
				. '</tr>'
				. '<tr>'
				. '<td colspan="3" height="60" style="background-color: beige;"></td>'
				. '</tr>'
				. '<tr style="background-color: beige;">'. "\r\n" 
				. '<td width="100"></td>'. "\r\n" 
				. '<td style="font-family: Lucida Sans; padding-left: 40px; padding-top: 40px; padding-right: 40px; padding-bottom: 100px; color: #FFFFFF;" bgcolor="#CD333C">'. "\r\n" 
				. '<h1 style="font-family: Lucida Sans; color: #FFFFFF">New Message</h1>'. "\r\n" 
				. '<p style="font-size: 16px; font-family: Lucida Sans; color: #FFFFFF"><b>From: </b>' . $_POST['senderName'] . ' (' . $_POST['senderEmail'] . ')'. '</p>'. "\r\n" 
				. '<p style="font-size: 16px; font-family: Lucida Sans; color: #FFFFFF"><b>Time: </b>' . date("H:i D jS M") . '</p>'. "\r\n" 
				. '<p style="font-size: 16px; font-family: Lucida Sans; color: #FFFFFF"><b>Subject:</b> ' . $_POST['senderSubject'] . '</p>'. "\r\n" 
				. '<p style="font-size: 16px; font-family: Lucida Sans; color: #FFFFFF"><b>Message:</b></p>'. "\r\n" 
				. '<p style="font-size: 16px; font-family: Lucida Sans; color: #FFFFFF">' . $message . '</p>'. "\r\n" 
				. '</td>'
				. '<td width="100"></td>'
				. '</tr>'
				. '<tr>'
				. '<td colspan="3" height="60" style="background-color: beige;"></td>'. "\r\n" 
				. '</tr>'
				. '<tr style="height: 60px; background-color: black;">'
				. '<td colspan="3"></td>'
				. '</tr>'
				. '</table>'
				. '</body>'
				. '</html>';

	$headers = "From : <Lingua Franca Site> inbox@linguafranca.dreamhosters.com" . "\r\n";
	$headers .= "Reply-To: " . $_POST['senderName'] . ' <'. $_POST['senderEmail'] . '>' . "\r\n";
	$headers .= "Content-type: text/html" . "\r\n"; 

	if (isset($_POST['CCCheck'])){
		$headers .= 'CC: ' . $_POST['senderEmail'] . "\r\n";
	}


	if(mail($to, $subject, $messageHTML, $headers)){
		echo 'MAIL SENT';
		echo $headers;

	}else{
		echo 'FAILURE TO SEND MAIL';
	}
?>
