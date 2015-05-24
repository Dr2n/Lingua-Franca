window.addEventListener("load", init, false);

function init(){
	console.log("Page Loaded.");
	window.popupOpen = false;
	document.getElementById('signUpButton').addEventListener("click", togglePopup, false);

	/*Fixing Browser Compatibility Issues*/
	if (!(window.ActiveXObject) && "ActiveXObject" in window){

		var backgrounds = document.getElementsByClassName('depth2');
    	for (var i = 0; i < backgrounds.length; i++){
    		backgrounds[i].style.transform = 'none';
    	}

    	var midgrounds = document.getElementsByClassName('depth1');
    	for (var i = 0; i < midgrounds.length; i++){
    		midgrounds[i].style.transform = 'none';
    	}
	}
}

function togglePopup(event){
	if (popupOpen){
		hidePopup();
		popupOpen = false;
	}else {
		showPopup();
		popupOpen = true;
	}
}


function showPopup(){
	var popup = document.getElementById("popup");
	var screen = document.getElementById("screen");

	screen.style.display = 'block';

	setTimeout(function(){
		screen.style.backgroundColor = 'rgba(0,0,0,0.75)';
		popup.style.top = '50%';
	}, 50);
	
	disableScrolling();

	screen.addEventListener("click", togglePopup, false);
}

function hidePopup(){
	var popup = document.getElementById("popup");
	var screen = document.getElementById("screen");
	
	popup.style.top = '-785px';
	screen.style.backgroundColor = 'rgba(0,0,0,0)'
	screen.style.display = 'none';

	enableScrolling();
}

function scrollOff(event){
	event.preventDefault();
}

function disableScrolling(){
	window.addEventListener("DOMMouseScroll", scrollOff, false);

}

function enableScrolling(){
	window.removeEventListener("DOMMouseScroll", scrollOff, false);
}