window.addEventListener("load", init, false);

function init(){
	var links = document.getElementsByClassName('linkText');
	for (var i = 0; i < links.length; i++){
		links[i].addEventListener("click", linkClickHandler, false);
	}
}

function linkClickHandler(event){
	scrollIncrement(this.innerHTML.toLowerCase());
}

function scrollIncrement(elementID){
	if (elementID == "about us"){
		elementID = "about";
	}
	
	var scrollAmount = document.getElementById(elementID).getBoundingClientRect().top;

	if (scrollAmount > 200){
		window.scrollBy(0, 200);

		window.setTimeout(function (){
		scrollIncrement(elementID);
	}, 1000/60);
	}else if (scrollAmount < -200){
		window.scrollBy(0, -200);

		window.setTimeout(function (){
		scrollIncrement(elementID);
	}, 1000/60);
	}else{
		window.scrollBy(0, scrollAmount);
	}

	
}