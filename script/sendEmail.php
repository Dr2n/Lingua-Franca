<?php
	echo "<h1>Hello World</h1>";
	echo "Name: " . $_POST["senderName"] . "<br>";
	echo "Email: " . $_POST["senderEmail"] . "<br>";
	echo "Subject: " . $_POST["senderSubject"] . "<br>";
	echo "Messsge: " . $_POST["senderMessage"] . "<br>";

	if(mail('darrenfu@outlook.com', 'Email for testing', 'Record of interview', 'From : Darren <dyxf75@gmail.com>')){
		echo 'MAIL SENT';
	}else{
		echo 'FAILURE TO SEND MAIL';
	}
?>
