window.addEventListener("load", init, false);

function init(){
	console.log("Page Loaded.");
	window.popupOpen = false;
	document.getElementById('signUpButton').addEventListener("click", togglePopup, false);

	window.addEventListener("scroll", offsetParallaxBackgrounds, false);
	window.links = document.getElementsByClassName('linkText');

	for (var i = 0 ; i < links.length; i++){
		links[i].addEventListener("mouseover", linkMouseOver, false);
		links[i].addEventListener("mouseout", linkMouseOut, false);
	}
}

function linkMouseOver(event){
	highlightCurrentSection();
	event.target.style.color = '#ff000f';
}

function linkMouseOut(event){
	event.target.style.color = 'white';
	highlightCurrentSection();
}

function offsetParallaxBackgrounds(){
	var parallaxDivs = document.getElementsByClassName('parallax');

	for (var i = 0; i < parallaxDivs.length; i++){
		var viewportPos = parallaxDivs[i].getBoundingClientRect().top;
		var neededOffset = -350 * (viewportPos/window.innerHeight);

		parallaxDivs[i].style.backgroundPosition = "0px " + String(neededOffset) + "px";
	}


	highlightCurrentSection();

}

function highlightCurrentSection(){
	window.sections = [];
	window.closestSection = ["", 100000];

	for (var i = 0; i < links.length; i++){
		var sectionID = links[i].getAttribute('href').substring(1);
		sections.push(document.getElementById(sectionID));
	}

	for (var i = 0; i < sections.length; i++){
		if (sections[i].getBoundingClientRect().top < 300 && sections[i].getBoundingClientRect().top < closestSection[1]){
			closestSection = [sections[i].id, Math.abs(sections[i].getBoundingClientRect().top)];
		}
	}

	for (var i = 0; i < links.length; i++){
		links[i].style.color = 'white';
	}

	document.getElementById(closestSection[0] + "Link").style.color = '#ff000f';
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