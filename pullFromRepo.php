<?php
	$output = `rm -rf *`;
	echo "<br>".$output;
	$output = `git clone https://github.com/Dr2n/Lingua-Franca-Redesign-Repo.git`;
	echo "<br>".$output;
	$output = `mv Lingua-Franca-Redesign-Repo/* .`;
	echo "<br>".$output;
	$output = `rm -rf Lingua-Franca-Redesign-Repo`;
	echo "<br>".$output;
	echo '<h2>Updated with GitHub Repository</h2>';
?>
