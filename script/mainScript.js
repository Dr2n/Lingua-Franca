/*----------------------------------------------------
		   ________          ____        ____           
		  / ____/ /_  ____ _/ __ \____ _/ __ \____ _    
		 / /   / __ \/ __ `/ /_/ / __ `/ / / / __ `/    
		/ /___/ / / / /_/ / ____/ /_/ / /_/ / /_/ /     
		\_______ /_/\__,_/_/_   \__,_/_____/\__,_/      
		   / __ \___  _____(_)___ _____                 
		  / / / / _ \/ ___/ / __ `/ __ \                
		 / /_/ /  __(__  ) / /_/ / / / /                
		/_____/\___/____/_/\__, /_/ /_/                 
		                  /____/         

	  Charlie Hou, Patrick Kim & Darren Fu 2015
----------------------------------------------------*/


window.addEventListener("load", init, false);

function init(){

	/*Variables & Initialisation*/
	window.popupOpen = false;
	window.links = document.getElementsByClassName('linkText');
	
	for (var i = 0 ; i < links.length; i++){
		links[i].addEventListener("mouseover", linkMouseOver, false);
		links[i].addEventListener("mouseout", linkMouseOut, false);
	}

	textInitialise();
	document.getElementById("lessonSelect").value="initial";

	window.contactForms = document.getElementsByClassName('formInput');
	for (var i = 0; i < contactForms.length; i++){
		contactForms[i].addEventListener('focus', formInHandler, false);
		contactForms[i].addEventListener('blur', formOutHandler, false);

		if (contactForms[i].name == "senderName" && contactForms[i].value != 'Name' || contactForms[i].name == 'senderEmail' && contactForms[i].value != 'Email' || contactForms[i].name == "senderSubject" && contactForms[i].value != 'Subject'){
			contactForms[i].style.color = 'white';
		}
	}

	document.getElementById('messageBox').addEventListener('focus', messageBoxIn, false);
	document.getElementById('messageBox').addEventListener('blur', messageBoxOut, false);

	if (document.getElementById('messageBox').value != 'Message'){
		document.getElementById('messageBox').style.color = 'white';
	}

	/*Event Listeners*/
	window.addEventListener("scroll", offsetParallaxBackgrounds, false);
	window.addEventListener("scroll", highlightCurrentSection, false);
	document.getElementById('echantillonSignButton').addEventListener("click", togglePopup, false);
	document.getElementById('FAQbutton').addEventListener("click", togglePopup, false);
	document.getElementById("lessonSelect").addEventListener("change",lessonUpdate,false);

	/*Random Gift Shop Images*/
	var images = [
		["hatGift.png", 'this woman - 100 rupees'], 
		["bracelet.png", 'this woman - 100 rupees'],
		["necklaces.png", 'this woman - 100 rupees'],
		["soapGift.png", 'this woman - 100 rupees'], 
		["pencilCaseGift.png", "this pencil case - 5x + 3 where x = darren's age"], 
	];

	var usedImages = [];

	var imageWrapper = document.getElementById('imageContainer');

	for (var i = 0; i < 3; i++){
		
		var randomNumber = parseInt(Math.random() * images.length);
		
		while(usedImages.indexOf(randomNumber) != -1){
			randomNumber = parseInt(Math.random() * images.length);	
		}

		usedImages.push(randomNumber);

		var pictureHTML = '<a href="http://google.com" class="randomGift" id="hat"><img src="images/giftShop/' + images[randomNumber][0] + '"><span>' + images[randomNumber][1] + '</span></a>';
		imageWrapper.innerHTML += pictureHTML;
		
	}
}

/*Functions*/

	/*Forms Handling*/

	function formInHandler(event){
		if ((event.target.name == "senderName" && event.target.value == "Name") || (event.target.name == "senderEmail" && event.target.value == "Email") || (event.target.name == "senderSubject" && event.target.value == "Subject")){
			event.target.value = '';
		}

		event.target.style.color = "#FFF";
	}

	function formOutHandler(event){

		if (event.target.value != ''){
			return;
		}

		if (event.target.name == 'senderName'){
			event.target.value = 'Name';
			event.target.style.color = '#FF9EA4';
		}
		if (event.target.name == 'senderEmail'){
			event.target.value = 'Email';
			event.target.style.color = '#FF9EA4';
		}
		if (event.target.name == 'senderSubject'){
			event.target.value = 'Subject';
			event.target.style.color = '#FF9EA4';
		}
	}

	function messageBoxIn(event){
		event.target.style.color = '#FFF';
		if (event.target.value == "Message"){
			event.target.value = '';
		}
	}

	function messageBoxOut(event){
		if (event.target.value == ''){
			event.target.value = 'Message';
			event.target.style.color = '#FF9EA4'
		}
	}

	/*Parallax*/

	function offsetParallaxBackgrounds(){
		console.log('focusout');
		var parallaxDivs = document.getElementsByClassName('parallax');

		for (var i = 0; i < parallaxDivs.length; i++){
			var viewportPos = parallaxDivs[i].getBoundingClientRect().top;
			var neededOffset = -350 * (viewportPos/window.innerHeight);

			parallaxDivs[i].style.backgroundPosition = "0px " + String(neededOffset) + "px";
		}

	}


	/*Navbar highlighting*/
	function linkMouseOver(event){
		highlightCurrentSection();
		event.target.style.color = '#ff000f';
	}

	function linkMouseOut(event){
		event.target.style.color = 'white';
		highlightCurrentSection();
	}

	function highlightCurrentSection(event){
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



	/*Popup Box*/
	function togglePopup(event){
		if (popupOpen){
			hidePopup();
			popupOpen = false;
		}else {
			if(event.target.id=="echantillonSignButton"){
				showPopup("echantillon");
				popupOpen = true;
			} else if (event.target.id="FAQbutton"){
				showPopup("delf");
				popupOpen = true;
			}
		}
	}


	function showPopup(type){
		var popup = document.getElementById("popup");
		var screen = document.getElementById("screen");

		if(type=="delf"){
			popup.innerHTML = "<p>Here are some commonly asked questions about the DELF training. If you have a question that is not covered here, please do not hesitate to <a href='#contact'>contact us</a>.</p>\n<h3>How long is the training?</h3>\n<p>You can choose between a 30-week program starting in early February or a 15-week program that kicks off in mid-June.&nbsp;</p>\n<br>\n<h3>What is the difference between the two programs?</h3>\n<p>The 15-week program is suitable for students who already have a good level of French for the DELF level they have chosen. The 15-weeks is therefore ample time to learn about both the exam format and the content and to hone your skills in time for the exam. The 30-week exam is a better choice for people who are newer to French and/or undertaking the test for the first time. It is also the best way to move from one DELF level to another (for example from A1 to A2).</p>\n<br>\n<h3>What is the duration of the lessons?</h3>\n<p>One hour per week.</p>\n<br>\n<h3>Am I expected to do homework?</h3>\n<p>In a word, yes! The DELF training is a commitment and tends to attract motivated students so we find we don\'t need to rap any knuckles in this area. Also, since the classes are so small (max. 4 students), it impacts the rest of the class if you're not prepared.</p>\n<br>\n<h3>How big are the classes?</h3>\n<p>A maximum of 4 students, plus your tutor. We find the small size optimises learning and creates a focused environment.</p>\n<br>\n<h3>I really hate exams. Do I have to sit the actual exam or can I just do the training?</h3>\n<p>Yes, you can. Sitting the exam is optional. Many students find a looming exam date motivating and enjoy receiving the results, but exams are not for everyone. You will see a huge improvement in your French whether you choose to sit the exam or not.&nbsp;</p>\n<br>\n<h3>Where are the classes held?</h3>\n<p>At our office (22 Masters St, Newstead, Brisbane)</p>\n<br>\n<h3>If I am unable to sit the November exam, is there another option?</h3>\n<p>Yes, there is also an exam held in March of each year.</p>\n<br>\n<h3>What is the cost?</h3>\n<p>&nbsp;</p>\n<ul>\n<li><strong>30-week program:</strong> $1950</li>\n<li><strong>15-week program:</strong> $1050</li>\n</ul>\n<br>\n<h3>What is included in the cost?&nbsp;</h3>\n<ul>\n<li>All training (30 or 15 weeks)</li>\n<li>Guaranteed maximum class size of 4 students</li>\n<li>Official training textbook</li>\n<li>Exam registration fee</li>\n<li>Access to past papers</li>\n<li>Mock exams</li>\n<li>Other support material</li>\n<li>Tutor attendance at exam</li>\n</ul>\n<p>If you have any other questions, please <a href='#contact'>contact us</a> here or call Katrina on 0405 381 972.</p>";
		}


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

		popup.innerHTML=""
		
		popup.style.top = '-785px';
		screen.style.backgroundColor = 'rgba(0,0,0,0)'
		screen.style.display = 'none';

		enableScrolling();
	}

	function enableScrolling(){
		window.removeEventListener("DOMMouseScroll", scrollOff, false);
	}

	function disableScrolling(){
		window.addEventListener("DOMMouseScroll", scrollOff, false);

	}

	function scrollOff(event){
		event.preventDefault();
	}


	/*Smooth Link Scrolling*/
		$(document).ready(function(){
			$('a').click(function(){
	    		$('html, body').animate({
			        scrollTop: $( $(this).attr('href') ).offset().top + -60
		    	}, 500);
		    	return false;
			});
		})

	/*Lessons Content Updating*/
	function lessonUpdate(){
		if(document.getElementById("lessonSelect").value=="private"){
			zUpdate(1,0,0);
			opacityUpdate(1,0,0);
			document.getElementById("lessonsContent").style.height=String(document.getElementById("private").offsetHeight+140)+"px";
		} else if(document.getElementById("lessonSelect").value=="group"){
			zUpdate(0,1,0);
			opacityUpdate(0,1,0);
			document.getElementById("lessonsContent").style.height=String(document.getElementById("group").offsetHeight+140)+"px";
		} else if(document.getElementById("lessonSelect").value=="delf"){
			zUpdate(0,0,1);
			opacityUpdate(0,0,1);
			document.getElementById("lessonsContent").style.height=String(document.getElementById("delf").offsetHeight+140)+"px";
		}
	}

	function textInitialise(){
		document.getElementById("private").style.opacity="0";
		document.getElementById("group").style.opacity="0";
		document.getElementById("delf").style.opacity="0";
	}

	function zUpdate(x,y,z){
		document.getElementById("private").style.zIndex=x;
		document.getElementById("group").style.zIndex=y;
		document.getElementById("delf").style.zIndex=z;
	}

	function opacityUpdate(x,y,z){
		document.getElementById("private").style.opacity=x;
		document.getElementById("group").style.opacity=y;
		document.getElementById("delf").style.opacity=z;
	}
