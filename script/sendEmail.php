<?php
	echo "<h1>Hello World</h1>";
	echo "Name: " . $_POST["senderName"] . "<br>";
	echo "Email: " . $_POST["senderEmail"] . "<br>";
	echo "Subject: " . $_POST["senderSubject"] . "<br>";
	echo "Messsge: " . $_POST["senderMessage"] . "<br>";

	if(mail('darren.yx.fu@gmail.com', $_POST['senderSubject'], $_POST['senderMessage'], 'From : inbox@linguafranc.dreamhosters.com')){
		echo 'MAIL SENT';
	}else{
		echo 'FAILURE TO SEND MAIL';
	}
?>
