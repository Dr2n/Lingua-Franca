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
google.maps.event.addDomListener(window, 'load', initMap);

function init(){

	/*Variables & Initialisation*/
	window.popupOpen = false;
	window.links = document.getElementsByClassName('linkText');
	
	for (var i = 0 ; i < links.length; i++){
		links[i].addEventListener("mouseover", linkMouseOver, false);
		links[i].addEventListener("mouseout", linkMouseOut, false);
	}

	lessonInitialise();

	if (document.getElementById('messageBox').value != 'Message'){
		document.getElementById('messageBox').style.color = 'white';
	}

	window.nameFilled = false;
	window.emailFilled = false;
	window.subjectFilled = false;
	window.messageFilled = false;
	
	window.contactForms = document.getElementsByClassName('formInput');
	for (var i = 0; i < contactForms.length; i++){
		contactForms[i].addEventListener('focus', formInHandler, false);
		contactForms[i].addEventListener('blur', formOutHandler, false);

		if (contactForms[i].name == "senderName" && contactForms[i].value != 'Name' || contactForms[i].name == 'senderEmail' && contactForms[i].value != 'Email' || contactForms[i].name == "senderSubject" && contactForms[i].value != 'Subject'){
			contactForms[i].style.color = 'white';
		}
	}

	var locationButtons = document.getElementsByClassName('locationButton');
	for (var i = 0; i < locationButtons.length; i++){
		locationButtons[i].addEventListener('click', locationClickHandler, false);
	}

	/*Event Listeners*/
	window.addEventListener("scroll", offsetParallaxBackgrounds, false);
	window.addEventListener("scroll", highlightCurrentSection, false);
	document.getElementById('echantillonSignButton').addEventListener("click", togglePopup, false);
	document.getElementById('FAQbutton').addEventListener("click", togglePopup, false);
	document.getElementById("privateSelect").addEventListener("click",lessonUpdate,false);
	document.getElementById("groupSelect").addEventListener("click",lessonUpdate,false);
	document.getElementById("delfSelect").addEventListener("click",lessonUpdate,false);
	document.getElementById("termSelect").addEventListener("change",tableUpdate,false);
	document.getElementById("locationSelect").addEventListener("change",tableUpdate,false);
	document.getElementById("wtermSelect").addEventListener("change",workUpdate,false);
	document.getElementById("wlocationSelect").addEventListener("change",workUpdate,false);
	document.getElementById('messageBox').addEventListener('focus', messageBoxIn, false);
	document.getElementById('messageBox').addEventListener('blur', messageBoxOut, false);

	/*Random Gift Shop Images*/
	var gifts = [
		["giftShop/", "images/giftShop/raffia.png", "Wide-brimmed Raffia Hat", "Raffia bends, unlike wicker which <br> tends to break easily.", "$116.10"], 
		["giftShop/", "images/giftShop/necklaces.png", "Colourful bead necklaces", "Handmade from citrus beads, various colours.", "$35 x1/$58.50 x2"],
		["giftShop/", "images/giftShop/cloche.png", "Cloche Raffia hat with black band", "Raffia bends, unlike wicker which <br> tends to break easily.", "$116.10"],
	];

	var usedImages = [];

	window.backgroundCards = document.getElementsByClassName('backgroundCard');

	for (var i = 0; i < backgroundCards.length; i++){
		
		var randomNumber = parseInt(Math.random() * backgroundCards.length);
		
		while(usedImages.indexOf(randomNumber) != -1){
			randomNumber = parseInt(Math.random() * backgroundCards.length);
		}

		var giftChosen = gifts[randomNumber];
		var nodes = backgroundCards[i].children;

		usedImages.push(randomNumber);

		backgroundCards[i].children[0].href  = giftChosen[0];
		backgroundCards[i].children[0].children[0].src = giftChosen[1];
		backgroundCards[i].children[1].children[0].innerHTML = giftChosen[2] + "<br><i>" + giftChosen[3] + "</i><br><b>" + giftChosen[4] + "</b>";
		backgroundCards[i].children[1].children[1].href = giftChosen[0];
		
	}
}


/*Functions*/

	/*Mapping*/
	function initMap(event){
		window.positions = {
			start: new google.maps.LatLng(-27.447165217038364, 153.03745374862672),
			newstead: new google.maps.LatLng(-27.45211, 153.04417),
			bulimba:  new google.maps.LatLng(-27.45109, 153.05620),
			paddington: new google.maps.LatLng(-27.45914, 153.00061)
		}

		var mapOptions = {
			zoom: 13,
			center: positions.start,
			styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]		
		}

		window.map = new google.maps.Map(document.getElementById('contactMapWidget'), mapOptions);

		window.newsteadMarker = new google.maps.Marker({
			position: positions.newstead,
			map: map,
			title: 'Lingua Franca Newstead'
		});

		window.bulimbaMarker = new google.maps.Marker({
			position: positions.bulimba,
			map: map,
			title: 'Lingua Franca Bulimba'
		})

		window.paddingtonMarker = new google.maps.Marker({
			position: positions.paddington,
			map: map,
			title: 'Lingua Franca Paddington'
		});

		window.markers = {
			newstead: newsteadMarker,
			bulimba: bulimbaMarker,
			paddington: paddingtonMarker
		}

		map.setOptions({scrollwheel: false});

		document.getElementById('contactMapWidget').addEventListener('click', enableMapScrolling, false);
		window.addEventListener('scroll', disableMapScrolling, false);

		window.infoWindowLocation = 'newstead';

		window.markerContents = {
			newstead: "<div class='mapInfo'><h1 id='firstHeading' class='firstHeading'>Lingua Franca Newstead</h1><div id='bodyContent'><p>22 Masters St.</p><p>Newstead</p><p>Queensland 4106</p></div></div>",
			bulimba: "<div class='mapInfo'><h1 id='firstHeading' class='firstHeading'>Lingua Franca Bulimba</h1><div id='bodyContent'><p>Side Street Vintage</p><p>Unit 5 85 Riding Rd</p><p>Hawthorne</p><p>Queensland 4171</p></div></div>",
			paddington: "<div class='mapInfo'><h1 id='firstHeading' class='firstHeading'>Lingua Franca Paddington</h1><div id='bodyContent'><p>Francesca's Flowers</p><p>46 Latrobe Terrace</p><p>Paddington</p><p>Queensland 4064</p></div></div>"
		}

		window.infoWindow = new google.maps.InfoWindow({
			content: markerContents[infoWindowLocation]
		});

		infoWindow.open(map, newsteadMarker);
		
		google.maps.event.addListener(newsteadMarker, 'click', markerClickHandler);
		google.maps.event.addListener(bulimbaMarker, 'click', markerClickHandler);
		google.maps.event.addListener(paddingtonMarker, 'click', markerClickHandler);

	}

	function markerClickHandler(clickedPlace){

		if(this.hasOwnProperty('title')){
			var title = this.title.split(" ");
			var clickedPlace = title[title.length-1].toLowerCase();
		}

		map.panTo(positions[clickedPlace]);

		if (clickedPlace != infoWindowLocation){
			console.log(clickedPlace);
			infoWindowLocation = clickedPlace;
			infoWindow.close();
			infoWindow.setContent(markerContents[clickedPlace]);
			infoWindow.open(map, markers[clickedPlace]);
		}
		
	}

	function disableMapScrolling (event){
		if (document.getElementById('contactMapWrapper').getBoundingClientRect().top < 0 || document.getElementById('contactMapWrapper').getBoundingClientRect().top > window.innerHeight){
			window.map.setOptions({scrollwheel: false});
		}
	}

	function enableMapScrolling(event){
		window.map.setOptions({scrollwheel: true});
	}

	function locationClickHandler(event){
		markerClickHandler(event.target.id);
	}

	function restoreMap(){
		map.panTo(positions.start);
		map.setZoom(13);
	}

	/*Forms Handling*/

	function formInHandler(event){
		if ((event.target.name == "senderName" && event.target.value == "Name") || (event.target.name == "senderEmail" && event.target.value == "Email") || (event.target.name == "senderSubject" && event.target.value == "Subject")){
			event.target.value = '';
		}

		event.target.style.color = "#FFF";
	}

	function formOutHandler(event){
		var emailTest = /\S+@\S+\.\S+/;


		if (event.target.value != ''){
			if(event.target.name == 'senderName'){
				document.getElementById('nameError').innerHTML = '';
				nameFilled = true;
			}else if (event.target.name == 'senderSubject'){
				document.getElementById('subjectError').innerHTML = '';
				subjectFilled = true;
			}else if(event.target.name == 'senderEmail'){
				if (emailTest.test(event.target.value)){
					document.getElementById('emailError').innerHTML = '';
					emailFilled = true;
				}else{
					document.getElementById('emailError').innerHTML = 'Invalid Email.';
				}
			}	
		}else{
			if (event.target.name == 'senderName'){
				event.target.value = 'Name';
				event.target.style.color = '#FF9EA4';
				document.getElementById('nameError').innerHTML = 'Enter your name.';
			}else if (event.target.name == 'senderEmail'){
				event.target.value = 'Email';
				event.target.style.color = '#FF9EA4';
				document.getElementById('emailError').innerHTML = 'Enter your email.'
			}else if (event.target.name == 'senderSubject'){
				event.target.value = 'Subject';
				event.target.style.color = '#FF9EA4';
				document.getElementById('subjectError').innerHTML = 'Enter a subject.'
			}
			
		}

		if (nameFilled && emailFilled && subjectFilled && messageFilled){
			document.getElementById('formStatus').innerHTML = '';
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
			event.target.style.color = '#FF9EA4';
			document.getElementById('messageError').innerHTML = 'Enter a message.';
		}else{
			document.getElementById('messageError').innerHTML = '';
			messageFilled = true;
		}

		if (nameFilled && emailFilled && subjectFilled && messageFilled){
			document.getElementById('formStatus').innerHTML = '';
		}

	}

	function allFilled(){
		var form = document.getElementById('emailForm');
		var name = form.senderName.value;
		var email = form.senderEmail.value;
		var subject = form.senderSubject.value;
		var message = form.senderMessage.value;
		var emailTest = /\S+@\S+\.\S+/;

		if (!emailTest.test(email) || email == '' || name == '' || subject == '' || message == ''){
			return false;
		}else{
			return true;
		}

	}

	/*Parallax*/

	function offsetParallaxBackgrounds(){
		var parallaxDivs = document.getElementsByClassName('parallax');

		for (var i = 0; i < parallaxDivs.length; i++){
			var viewportPos = parallaxDivs[i].getBoundingClientRect().top;
			var neededOffset = 400 * (viewportPos/window.innerHeight);
			if(parallaxDivs[i].id =='landingDiv'){
				neededOffset = 600 * (viewportPos/window.innerHeight);
			}

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

		var sectionLink = document.getElementById(closestSection[0] + "Link");
		if (sectionLink) sectionLink.style.color = '#ff000f';
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
			popup.style.top = '5%';
		}, 50);
		
		disableScrolling();

		screen.addEventListener("click", togglePopup, false);
	}

	function hidePopup(){
		var popup = document.getElementById("popup");
		var screen = document.getElementById("screen");

		popup.innerHTML=""
		
		popup.style.top = '-90%';
		screen.style.backgroundColor = 'rgba(0,0,0,0)'
		setTimeout(function(){
			screen.style.display = 'none';	
		}, 400);

		enableScrolling();
	}

	function disableScrolling() {
		document.body.style.overflow = 'hidden';
	}

	function enableScrolling() {
		document.body.style.overflow = 'visible';
	}

	/*jQuery*/
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
			console.log("form subject success");
		}

	/*Lessons Content Updating*/
	function lessonUpdate(event){
		var button = event.target.id;
		console.log(button)
		if (button == "privateSelect"){
			zUpdate(1,0,0);
			opacityUpdate(1,0,0);
			document.getElementById("lessonsContent").style.height=String(document.getElementById("private").offsetHeight+140)+"px";
		} else if (button == "groupSelect"){
			zUpdate(0,1,0);
			opacityUpdate(0,1,0);
			document.getElementById("lessonsContent").style.height=String(document.getElementById("group").offsetHeight+140)+"px";
		} else if (button == "delfSelect"){
			zUpdate(0,0,1);
			opacityUpdate(0,0,1);
			document.getElementById("lessonsContent").style.height=String(document.getElementById("delf").offsetHeight+140)+"px";
		}
	}

	function lessonInitialise(){
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

	/*Timetable Update*/
	function tableUpdate(){
		var term = document.getElementById("termSelect").value;
		var location = document.getElementById("locationSelect").value;
		var set = "";

		if(location=="newstead"){
			if(term=="t1"){
				set = "n1";
			} else if(term=="t2"){
				set = "n2";
			} else if(term=="t3"){
				set = "n3";
			} else if(term=="t4"){
				set = "n4";
			}
		} else if(location=="bulimba"){
			if(term=="t1"){
				set = "b1";
			} else if(term=="t2"){
				set = "b2";
			} else if(term=="t3"){
				set = "b3";
			} else if(term=="t4"){
				set = "b4";
			}
		} else if(location=="paddington"){
			if(term=="t1"){
				set = "p1";
			} else if(term=="t2"){
				set = "p2";
			} else if(term=="t3"){
				set = "p3";
			} else if(term=="t4"){
				set = "p4";
			}
		}

		tcontentUpdate(set);
		document.getElementById("lessonsContent").style.height=String(document.getElementById("group").offsetHeight+140)+"px";
	}

	function tcontentUpdate(set){
		if (set=="n1"){
			document.getElementById("tableArea").innerHTML = "<p>Lorem Ipsum</p>";
		} else if (set=="n2"){
			document.getElementById("tableArea").innerHTML = "<p>*Due to the Queen's Birthday public holiday on Monday 8th June, there will be no classes on this day. Catch up classes are scheduled for Friday 5th June.</p>\n<table>\n<tr>\n<td></td>\n<td colspan=\"2\"><p><strong>key course</strong> (6 weeks) from. 20/04 to 30/05</p></td>\n<td><p><strong>speaking practice</strong> (4 weeks) from 01/06 to 27/06</p></td>\n</tr>\n<tr>\n<td><div>1</div></td>\n<td><p>Thursday 6.15PM</p></td>\n<td><p>from 23/04</p></td>\n<td><p>from 04/06</p></td>\n</tr>\n<tr>\n<td><div>1</div></td>\n<td><p>Saturday 8.45AM</p></td>\n<td><p>from 25/04</p></td>\n<td><p>from 06/06</p></td>\n</tr>\n<tr>\n<td><div>2</div></td>\n<td><p>Tuesday 6.15PM</p></td>\n<td><p>from 21/04</p></td>\n<td><p>from 02/06</p></td>\n</tr>\n<tr>\n<td><div>2</div></td>\n<td><p>Saturday 10AM</p></td>\n<td><p>from 25/04</p></td>\n<td><p>from 06/06</p></td>\n</tr>\n<tr>\n<td><div>3</div></td>\n<td><p>Tuesday 7.30PM</p></td>\n<td><p>from 21/04</p></td>\n<td><p>from 02/06</p></td>\n</tr>\n<tr>\n<td><div>1</div></td>\n<td><p>Tuesday 7.30PM</p></td>\n<td><p>from 21/04</p></td>\n<td><p>from 02/06</p></td>\n</tr>\n<tr>\n<td><div>2</div></td>\n<td><p>Wednesday 6.15PM</p></td>\n<td><p>from 22/04</p></td>\n<td><p>from 03/06</p></td>\n</tr>\n<tr>\n<td><div>1</div></td>\n<td><p>Tuesday 6.15PM</p></td>\n<td><p>from 21/04</p></td>\n<td><p>from 02/06</p></td>\n</tr>\n<tr>\n<td><div>2</div></td>\n<td><p>Thursday 10AM</p></td>\n<td><p>from 23/04</p></td>\n<td><p>from 04/06</p></td>\n</tr>\n<tr>\n<td><div>1</div></td>\n<td><p>Thursday 7.30PM</p></td>\n<td><p>from 21/04</p></td>\n<td><p>from 04/06</p></td>\n</tr>\n<tr>\n<td></td>\n<td colspan=\"2\"><p>Thursday 6.15PM : Conversation</p></td>\n<td><p>from 23/04</p></td>\n</tr>\n<tr>\n<td></td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td></td>\n<td colspan=\"3\"><p><strong>consolidation course</strong> (10 weeks) <br> from 20/04 to 27/06</p></td>\n</tr>\n<tr>\n<td><div>C</div></td>\n<td colspan=\"2\"><p>Monday 7.30PM</p></td>\n<td><p>from 20/04</p></td>\n</tr>\n<tr>\n<td><div>C</div></td>\n<td colspan=\"2\"><p>Monday 7.30PM</p></td>\n<td><p>from 20/04</p></td>\n</tr>\n</table>";
		} else if (set=="n3"){
			document.getElementById("tableArea").innerHTML = "<p>*Due to the EKKA Day public holiday on Wednesday 12th August, there will be no classes on this day. Catch up classes are scheduled for Friday 14th August.</p>\n<table>\n<tr>\n<td></td>\n<td colspan=\"2\"><p><strong>key course</strong> (6 weeks) from. 13/07 to 22/08</p></td>\n<td><p><strong>speaking practice</strong> (4 weeks) from 24/08 to 19/09</p></td>\n</tr>\n<tr>\n<td><div>1</div></td>\n<td><p>Wednesday 7.30PM</p></td>\n<td><p>from 15/07</p></td>\n<td><p>from 26/08</p></td>\n</tr>\n<tr>\n<td><div>1</div></td>\n<td><p>Thursday 6.15PM</p></td>\n<td><p>from 16/07</p></td>\n<td><p>from 27/08</p></td>\n</tr>\n<tr>\n<td><div>1</div></td>\n<td><p>Saturday 10AM</p></td>\n<td><p>from 18/07</p></td>\n<td><p>from 29/08</p></td>\n</tr>\n<tr>\n<td><div>2</div></td>\n<td><p>Saturday 8.45AMPM</p></td>\n<td><p>from 18/07</p></td>\n<td><p>from 29/08</p></td>\n</tr>\n<tr>\n<td><div>3</div></td>\n<td><p>Tuesday 6.15PM</p></td>\n<td><p>from 1r/07</p></td>\n<td><p>from 25/08</p></td>\n</tr>\n<tr>\n<td><div>R</div></td>\n<td><p>Tuesday 7.30PM</p></td>\n<td><p>from 14/07</p></td>\n<td><p>from 25/08</p></td>\n</tr>\n<tr>\n<td><div>2</div></td>\n<td><p>Tuesday 7.30PM</p></td>\n<td><p>from 14/07</p></td>\n<td><p>from 25/08</p></td>\n</tr>\n<tr>\n<td><div>3</div></td>\n<td><p>Wednesday 6.15PM</p></td>\n<td><p>from 15/07</p></td>\n<td><p>from 26/08</p></td>\n</tr>\n<tr>\n<td><div>2</div></td>\n<td><p>Tuesday 6.15PM</p></td>\n<td><p>from 14/07</p></td>\n<td><p>from 25/08</p></td>\n</tr>\n<tr>\n<td><div>3</div></td>\n<td><p>Thursday 10AM</p></td>\n<td><p>from 16/07</p></td>\n<td><p>from 27/08</p></td>\n</tr>\n<tr>\n<td><div>2</div></td>\n<td><p>Thursday 7.30PM</p></td>\n<td><p>from 16/07</p></td>\n<td><p>from 27/08</p></td>\n</tr>\n<tr>\n<td><div></div></td>\n<td colspan=\"2\"><p>Thursday 6.15PM : Conversation</p></td>\n<td><p>from 16/07</p></td>\n</tr>\n<tr>\n<td></td>\n<td colspan=\"3\"><p><strong>consolidation course</strong> (10 weeks) <br> from 13/07 to 19/09</p></td>\n</tr>\n<tr>\n<td><div>C</div></td>\n<td colspan=\"2\"><p>Monday 6.15PM</p></td>\n<td><p>from 13/07</p></td>\n</tr>\n<tr>\n<td><div>C</div></td>\n<td colspan=\"2\"><p>Monday 7.30PM</p></td>\n<td><p>from 13/07</p></td>\n</tr>\n<tr>\n<td><div>C</div></td>\n<td colspan=\"2\"><p>Monday 6.15PM</p></td>\n<td><p>from 13/07</p></td>\n</tr>\n</table>";
		} else if (set=="n4"){
			document.getElementById("tableArea").innerHTML = "<p>*Due to the Labour Day on Monday 5th October, there will be no classes on this day. Catch up classes are scheduled for Friday 9th October.</p>\n<table>\n<tr>\n<td></td>\n<td colspan=\"2\"><p><strong>key course</strong> (6 weeks) from. 05/10 to 14/11</p></td>\n<td><p><strong>speaking practice</strong> (4 weeks) from 16/11 to 12/12</p></td>\n</tr>\n<tr>\n<td><div>1</div></td>\n<td><p>Tuesday 6.15PM</p></td>\n<td><p>from 06/10</p></td>\n<td><p>from 17/11</p></td>\n</tr>\n<tr>\n<td><div>1</div></td>\n<td><p>Thursday 7.30PM</p></td>\n<td><p>from 08/10</p></td>\n<td><p>from 19/11</p></td>\n</tr>\n<tr>\n<td><div>1</div></td>\n<td><p>Saturday 8.45AM</p></td>\n<td><p>from 10/10</p></td>\n<td><p>from 21/11</p></td>\n</tr>\n<tr>\n<td><div>2</div></td>\n<td><p>Tuesday 7.30PM</p></td>\n<td><p>from 06/10</p></td>\n<td><p>from 17/11</p></td>\n</tr>\n<tr>\n<td><div>2</div></td>\n<td><p>Thursday 6.15PM</p></td>\n<td><p>from 08/10</p></td>\n<td><p>from 19/11</p></td>\n</tr>\n<tr>\n<td><div>2</div></td>\n<td><p>Saturday 10AM</p></td>\n<td><p>from 10/10</p></td>\n<td><p>from 21/11</p></td>\n</tr>\n<tr>\n<td><div>3</div></td>\n<td><p>Wednesday 7.30PM</p></td>\n<td><p>from 07/10</p></td>\n<td><p>from 18/11</p></td>\n</tr>\n<tr>\n<td><div>R</div></td>\n<td><p>Tuesday 10AM</p></td>\n<td><p>from 06/10</p></td>\n<td><p>from 17/11</p></td>\n</tr>\n<tr>\n<td><div>R</div></td>\n<td><p>Tuesday 6.15PM</p></td>\n<td><p>from 06/10</p></td>\n<td><p>from 17/11</p></td>\n</tr>\n<tr>\n<td><div>R</div></td>\n<td><p>Wednesday 7.30PM</p></td>\n<td><p>from 07/10</p></td>\n<td><p>from 18/11</p></td>\n</tr>\n<tr>\n<td><div>1</div></td>\n<td><p>Tuesday 7.30PM</p></td>\n<td><p>from 06/10</p></td>\n<td><p>from 17/11</p></td>\n</tr>\n<tr>\n<td><div>2</div></td>\n<td><p>Tuesday 7.30PM</p></td>\n<td><p>from 06/10</p></td>\n<td><p>from 17/11</p></td>\n</tr>\n<tr>\n<td><div>3</div></td>\n<td><p>Thursday 7.30PM</p></td>\n<td><p>from 08/10</p></td>\n<td><p>from 19/11</p></td>\n</tr>\n<tr>\n<td><div>R</div></td>\n<td><p>Wednesday 6.15PM</p></td>\n<td><p>from 07/10</p></td>\n<td><p>from 18/11</p></td>\n</tr>\n<tr>\n<td><div>1</div></td>\n<td><p>Wednesday 7.30PM</p></td>\n<td><p>from 07/10</p></td>\n<td><p>from 18/11</p></td>\n</tr>\n<tr>\n<td><div>3</div></td>\n<td><p>Tuesday 6.15PM</p></td>\n<td><p>from 06/10</p></td>\n<td><p>from 17/11</p></td>\n</tr>\n<tr>\n<td><div>R</div></td>\n<td><p>Thursday 10AM</p></td>\n<td><p>from 08/10</p></td>\n<td><p>from 19/11</p></td>\n</tr>\n<tr>\n<td><div>2</div></td>\n<td><p>Wednesday 6.15PM</p></td>\n<td><p>from 07/10</p></td>\n<td><p>from 18/11</p></td>\n</tr>\n<tr>\n<td><div>3</div></td>\n<td><p>Thursday 7.30PM</p></td>\n<td><p>from 08/10</p></td>\n<td><p>from 19/11</p></td>\n</tr>\n<tr>\n<td><div></div></td>\n<td colspan=\"3\"><p>Thursday 6.15PM : Conversation</p></td>\n</tr>\n<tr>\n<td><div>C</div></td>\n<td colspan=\"2\"><p>Monday 6.15PM*</p></td>\n<td><p>from 05/10*</p></td>\n</tr>\n<tr>\n<td><div>C</div></td>\n<td colspan=\"2\"><p>Monday 7.30PM*</p></td>\n<td><p>from 05/10*</p></td>\n</tr>\n<tr>\n<td><div>C</div></td>\n<td colspan=\"2\"><p>Monday 6.15PM*</p></td>\n<td><p>from 05/10*</p></td>\n</tr>\n</table>";
		} else if (set=="b1"){
			document.getElementById("tableArea").innerHTML ="<p>Lorem Ipsum</p>";
		} else if (set=="b2"){
			document.getElementById("tableArea").innerHTML = "<table>\n<tr>\n<td></td>\n<td colspan=\"2\"><p><strong>key course</strong> (6 weeks) from. 20/04 to 30/05</p></td>\n<td><p><strong>speaking practice</strong> (4 weeks) from 01/06 to 27/06</p></td>\n</tr>\n<tr>\n<td><div>3</div></td>\n<td><p>Thursday 6.15PM</p></td>\n<td><p>from 23/04</p></td>\n<td><p>from 04/06</p></td>\n</tr>\n<tr>\n<td><div>1</div></td>\n<td><p>Thursday 7.30PM</p></td>\n<td><p>from 23/04</p></td>\n<td><p>from 04/06</p></td>\n</tr>\n</table>";
		} else if (set=="b3"){
			document.getElementById("tableArea").innerHTML = "<table>\n<tr>\n<td></td>\n<td colspan=\"2\"><p><strong>key course</strong> (6 weeks) from. 13/07 to 21/08</p></td>\n<td><p><strong>speaking practice</strong> (4 weeks) from 24/08 to 19/09</p></td>\n</tr>\n<tr>\n<td><div>1</div></td>\n<td><p>Thursday 6.15PM</p></td>\n<td><p>from 16/07</p></td>\n<td><p>from 27/08</p></td>\n</tr>\n<tr>\n<td><div>R</div></td>\n<td><p>Thursday 6.15PM</p></td>\n<td><p>from 16/07</p></td>\n<td><p>from 27/08</p></td>\n</tr>\n<tr>\n<td><div>2</div></td>\n<td><p>Thursday 7.30PM</p></td>\n<td><p>from 16/07</p></td>\n<td><p>from 27/08</p></td>\n</tr>\n</table>";
		} else if (set=="b4"){
			document.getElementById("tableArea").innerHTML = "<table>\n<tr>\n<td></td>\n<td colspan=\"2\"><p><strong>key course</strong> (6 weeks) from. 05/10 to 14/11</p></td>\n<td><p><strong>speaking practice</strong> (4 weeks) from 16/11 to 12/12</p></td>\n</tr>\n<tr>\n<td><div>1</div></td>\n<td><p>Thursday 6.15PM</p></td>\n<td><p>from 08/10</p></td>\n<td><p>from 19/11</p></td>\n</tr>\n<tr>\n<td><div>1</div></td>\n<td><p>Thursday 7.30PM</p></td>\n<td><p>from 08/10</p></td>\n<td><p>from 19/11</p></td>\n</tr>\n<tr>\n<td><div>1</div></td>\n<td><p>Thursday 6.15PM</p></td>\n<td><p>from 08/10</p></td>\n<td><p>from 19/11</p></td>\n</tr>\n<tr>\n<td><div>1</div></td>\n<td><p>Thursday 7.30PM</p></td>\n<td><p>from 08/10</p></td>\n<td><p>from 19/11</p></td>\n</tr>\n</table>";
		} else if (set=="p1"){
			document.getElementById("tableArea").innerHTML="<p>Lorem Ipsum</p>";
		} else if (set=="p2"){
			document.getElementById("tableArea").innerHTML = "<table>\n<tr>\n<td></td>\n<td colspan=\"2\"><p><strong>key course</strong> (6 weeks) from. 20/04 to 30/05</p></td>\n<td><p><strong>speaking practice</strong> (4 weeks) from 01/06 to 27/06</p></td>\n</tr>\n<tr>\n<td><div>1</div></td>\n<td><p>Wednesday 6.15PM</p></td>\n<td><p>from 22/04</p></td>\n<td><p>from 03/06</p></td>\n</tr>\n</table>";
		} else if (set=="p3"){
			document.getElementById("tableArea").innerHTML = "<table>\n<tr>\n<td></td>\n<td colspan=\"2\"><p><strong>key course</strong> (6 weeks) from. 13/07 to 21/08</p></td>\n<td><p><strong>speaking practice</strong> (4 weeks) from 24/08 to 19/09</p></td>\n</tr>\n<tr>\n<td><div>2</div></td>\n<td><p>Wednesday 6.15PM</p></td>\n<td><p>from 15/07</p></td>\n<td><p>from 26/08</p></td>\n</tr>\n<tr>\n<td><div>1</div></td>\n<td><p>Wednesday 7.30PM</p></td>\n<td><p>from 15/07</p></td>\n<td><p>from 26/08</p></td>\n</tr>\n</table>";
		} else if (set=="p4"){
			document.getElementById("tableArea").innerHTML = "<p>No lessons.</p>";
		}
	}

	/*Workshop Update*/
	function workUpdate(){
		var term = document.getElementById("wtermSelect").value;
		var location = document.getElementById("wlocationSelect").value;
		var set = "";

		if(location=="newstead"){
			if(term=="jul"){
				set = "nj";
			} else if(term=="sep"){
				set = "ns";
			}
		} else if(location=="bulimba"){
			if(term=="jul"){
				set = "bj";
			} else if(term=="sep"){
				set = "bs";
			}
		}

		wcontentUpdate(set);
		document.getElementById("lessonsContent").style.height=String(document.getElementById("group").offsetHeight+140)+"px";
	}

	function wcontentUpdate(set){
		if (set=="nj"){
			document.getElementById("workArea").innerHTML = "<table>\n<tr>\n<td colspan=\"2\"><strong>workshops</strong> (2 weeks)</td>\n</tr>\n<tr>\n<td>pronunciation</td>\n<td>Tuesday 6.15PM - 8.15PM 30/06 - 07/07</td>\n</tr>\n<tr>\n<td>travel</td>\n<td>Wednesay 6.15PM - 8.15PM 01/07 - 07/07</td>\n</tr>\n</table>";
		} else if (set=="ns"){
			document.getElementById("workArea").innerHTML = "<table>\n<tr>\n<td colspan=\"2\"><strong>workshops</strong> (2 weeks)</td>\n</tr>\n<tr>\n<td>film</td>\n<td>Thursday 6.15PM - 8.15PM 02/06 - 09/07</td>\n</tr>\n</table>";
		} else if (set=="bj"){
			document.getElementById("workArea").innerHTML = "<table>\n<tr>\n<td colspan=\"2\"><strong>workshops</strong> (2 weeks)</td>\n</tr>\n<tr>\n<td>travel</td>\n<td>Tuesday 6.15PM - 8.15PM 22/09 - 29/09</td>\n</tr>\n<tr>\n<td>little words</td>\n<td>Wednesay 6.15PM - 8.15PM 23/09 - 30/09</td>\n</tr>\n</table>";
		} else if (set=="bs"){
			document.getElementById("workArea").innerHTML = "<table>\n<tr>\n<td colspan=\n2\n><strong>workshops</strong> (2 weeks)</td>\n</tr>\n<tr>\n<td>little words</td>\n<td>Thursday 6.15PM - 8.15PM 24/09 - 01/10</td>\n</tr>\n</table>";
		}
	}
