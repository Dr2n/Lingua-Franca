<?php
	echo "<h1>Hello World</h1>";
	echo "Name: " . $_POST["senderName"] . "<br>";
	echo "Email: " . $_POST["senderEmail"] . "<br>";
	echo "Subject: " . $_POST["senderSubject"] . "<br>";
	echo "Messsge: " . $_POST["senderMessage"] . "<br>";

	echo mail('darrenfuoutlook.com', 'Email for testing', 'Record of interview', 'From : ' . $_POST['senderEmail']);
?>