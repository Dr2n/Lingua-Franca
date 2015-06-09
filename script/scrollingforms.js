$(document).ready(function(){
	$('a').click(function(){
		$('html, body').animate({
	        scrollTop: $( $(this).attr('href') ).offset().top + -60
    	}, 500);
    	return false;
	});


	window.emailSent = false;

	$('#emailForm').submit(function(event){
		event.preventDefault();
		if (emailSent){
			return;
		}else if (!allFilled()){
			document.getElementById('formStatus').innerHTML = 'Please fill all required fields';
			return;
		}

		document.getElementById('formImageStatus').style.height = "48px";
		setTimeout(function(){
			document.getElementById('loadGIF').style.opacity = "1";
		}, 100);

		var formData = $(this).serializeArray();
		$.ajax({
			url: 'script/sendEmail.php',
			type: 'POST',
			data: formData,
			success: ajaxDone,
			error: ajaxFailure
		})

		console.log($(this))
	});
});

function ajaxDone(argument){
	console.log(argument);
	emailSent = true;
	document.getElementById('loadGIF').style.opacity = 0;
	setTimeout(function(){
		document.getElementById('formImageStatus').style.height = "0px";
		document.getElementById('formStatus').innerHTML = "Your messsage has been sent!"
	}, 200);
}

function ajaxFailure(){
	console.log("There was an issue submitting the form...");
}