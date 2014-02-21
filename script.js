/*  
 *	scrolling effect of the navigation
 *	from http://alijafarian.com/responsive-page-scrolling-with-jquery-and-bootstrap/
 */

$(document).ready(function() {
	/////////////
	//Make start on content 
	//TESTING ONLY

	// move navbar to left
			$("#static-nav").animate({"left": $("#sidebar").outerWidth()-$("#static-nav").outerWidth() }, 10, 
								function(){ //set sidebar to fixed once finished
									$("#sidebar").css({ "position": "fixed", "right": "auto", "left":"0%"});
									$("#home").addClass("hide");
								});
			$("#content-wrapper").animate({"left": 0}, 10);

	////////////

	$("#portfolio, #about, #contact").css("min-height", $(window).height() );
	$("#nav-container").css("margin-top", - $("#nav-container").height()/2 );

	// navigation click actions	
	$('.scroll-link').on('click', function(event){
		event.preventDefault();
		//set active tab
		$("#sidebar li").removeClass("active");
		$(this).parent().addClass("active");

		var sectionID = "#" + $(this).attr("data-id");
		var offSet = 50;
		var scrollTopVal = ($("#content").scrollTop() + $(sectionID).offset().top) - offSet;
		
		//don't animate if already at section
		if( $("#content").scrollTop() == scrollTopVal ){
			return;
		}

		//check if coming from home or other
		if($("#content-wrapper").css("left") == "0px"){
			// if nav already on left scroll to section
			$('#content').animate({scrollTop:scrollTopVal}, 750);
		}else{
			//move to section without scrolling
			$("#content").scrollTop( scrollTopVal );
			
			// move navbar to left
			$("#static-nav").animate({"left": $("#sidebar").outerWidth()-$("#static-nav").outerWidth() }, 750, 
								function(){ //set sidebar to fixed once finished
									$("#sidebar").css({ "position": "fixed", "right": "auto", "left":"0%"});
									$("#home").addClass("hide");
								});
			$("#content-wrapper").animate({"left": 0}, 750);			
			
		}
	});

	$('.home-link').on('click', function(event){
		$("#sidebar").css({ "position": "absolute", "right": "0%", "left":"auto"});
		//set active tab
		$("#sidebar li").removeClass("active");
		$(this).parent().addClass("active");

		$("#home").removeClass("hide");

		$("#static-nav").animate({"left": "0%" },750);
		$("#content-wrapper").animate({"left": "100%"},750);
	});
	
});

//update css on window resize
$(window).resize(function() {
	$("#portfolio, #about, #contact").css("min-height", $(window).height() );
	$("#nav-container").css("margin-top", - $("#nav-container").height()/2 );
	if($("#content-wrapper").css("left") == "0px"){
		$("#static-nav").css({"left": $("#sidebar").outerWidth() - $("#static-nav").outerWidth() });			
	}

});
