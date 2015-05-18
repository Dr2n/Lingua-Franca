window.addEventListener("load", init, false);

function init(){
	console.log("Page Loaded.");
	document.getElementById('signUpButton').addEventListener("click", echantillonSignUp, false);
}

function echantillonSignUp(event){
	showPopup();

}

function showPopup(){
	screenOn();
	var popup = document.getElementById("popup");
	popup.style.display = 'block';
	setTimeout(function(){
		popup.style.top = '50%';
	}, 50)
}

function hidePopup(){
	var popup = document.getElementById("popup");
	setTimeout(function(){
		popup.style.top = '-50%';
	}, 50);
	setTimeout(function(){
		popup.style.display = 'none';
	}, 3000);
	screenOff();
}



function screenOn(){
	var screen = document.getElementById("screen");
	screen.style.display = 'block';
	setTimeout(function(){
		screen.style.backgroundColor = 'rgba(0,0,0,0.75)';
	}, 50);
	screen.addEventListener("click", hidePopup, false);
}

function screenOff(){
	var screen = document.getElementById("screen");
	screen.style.backgroundColor = 'rgba(0,0,0,0)'
	setTimeout(function(){
		screen.style.display = 'none';
	}, 500);
}