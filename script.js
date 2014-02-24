/*  
 *	
 *	
 */

$(window).load(function() {

	if($(window).width() > 768){
		$("#portfolio, #about").css("height", $(window).height() );
		$("#nav-container").css("margin-top", - $("#nav-container").height()/2 );
		$("#project-grid").css("margin-top", - $("#project-grid").height()/2 );
		$("#about-content").css("margin-top", - $("#about-content").height()/2 );
		$("#intro").css("margin-top", - $("#intro").height()/2 );
			
	}

	$("#project-carousel").css("margin-top", - $("#project-carousel").height()/2 );
	$("#project-carousel").addClass("hidden");
	$("#small-nav, #home-small").css("min-height", $(window).height()/2);
	$("#intro-small").css("margin-top", - $("#intro-small").height()/2 );



	// navigation click actions	
	$('.scroll-link').on('click', function(event){
		event.preventDefault();
		//set active tab
		$("#sidebar li, #small-nav li").removeClass("active");
		$(this).parent().addClass("active");

		var sectionID = "#" + $(this).attr("data-id");
		var offSet = 0;
		var scrollTopVal = ($("#content").scrollTop() + $(sectionID).offset().top) - offSet;
		console.log("scrolltop = " + $("#content").scrollTop() );
		$("*").each(function(index, element){
			console.log( $(this).attr('id') +" = "+ $(this).scrollTop() );
		});

		//check if coming from home or other
		if(!($("#content-wrapper").css("left") == "0px") && $(window).width() > 768){
			//move to section without scrolling
			$("#content").scrollTop( scrollTopVal );
			
			// move navbar to left
			$("#static-nav").animate({"left": $("#sidebar").outerWidth()-$("#static-nav").outerWidth() }, 750, 
								function(){ //set sidebar to fixed once finished
									$("#sidebar").css({ "position": "fixed", "right": "auto", "left":"0%"});
									$("#home").addClass("hidden");
								});
			$("#content-wrapper").animate({"left": 0}, 750);	

		//don't animate if already at section
		}else if( $("#content").scrollTop() == scrollTopVal ){
			return;
		
		}else if($(window).width() > 768){
			// if nav already on left scroll to section
			$('#content').animate({scrollTop:scrollTopVal}, 750);					
		}else{
			$('#wrap').animate({scrollTop:scrollTopVal}, 750);						
		}

	});

	$('.home-link').on('click', function(event){
		$("#sidebar").css({ "position": "absolute", "right": "0%", "left":"auto"});
		//set active tab
		$("#sidebar li").removeClass("active");
		$(this).parent().addClass("active");

		$("#home").removeClass("hidden");

		$("#static-nav").animate({"left": "0%" },750);
		$("#content-wrapper").animate({"left": "100%"},750);
	});
	
	$("#content").on("mousewheel wheel", function(event){
		
		//if on a small screen, allow scroll
		if($(window).width() < 768){
			return true;
		}

		event.preventDefault();
		//don't do anything if animating already
		if($(":animated").length > 0){
			return false;
		}

		if(event.originalEvent.wheelDelta > 0 || event.originalEvent.deltaY < 0) {
	         //scroll up
	        console.log('mouseW Up');
	        var offSet = 0;

			var diffs = [ 	offSet - $("#portfolio").offset().top,
         					offSet - $("#about").offset().top ];

         	// remove negative from array 
         	diffs = diffs.filter(function(element){
         		return element > 0;
         	});

         	//get smallest element
         	var min = Math.min.apply(Math,diffs);
         	$('#content').animate({scrollTop:($("#content").scrollTop() - min)}, { duration:750, queue:false, complete: function(){
         			updateActiveNav();
         		} 
         	});

	     }else {
	        //scroll down
	        console.log('mouseW Down');
	        var offSet = 0;

			var diffs = [ 	offSet - $("#portfolio").offset().top,
         					offSet - $("#about").offset().top ];

         	// remove positive and small negative from array 
         	diffs = diffs.filter(function(element){
         		return element < -1;
         	});

         	if(diffs.length > 0){
	         	//get largest element
	         	var max = Math.max.apply(Math,diffs);
	         	$('#content').animate({scrollTop:($("#content").scrollTop() - max)}, { duration:750, queue:false, complete: function(){
         				updateActiveNav();
         			} 
         		});
         	}
	     }

	     
	     //prevent page fom scrolling
	     return false;
	});

	$(".project-cell").on("click", function(event){
		//move carousel to selected slide
		//show carousel and hide thumbs
		$("#project-carousel").css("margin-top", - $("#project-carousel").height()/2 );
		$("#project-grid").addClass("hidden");
		$("#project-carousel").removeClass("hidden"); 
	});

	$("#all-proj-btn").on("click", function(event){
		//show thumbs and hide carousel
		$("#project-grid").css("margin-top", - $("#project-grid").height()/2 );
		$("#project-grid").removeClass("hidden");
		$("#project-carousel").addClass("hidden"); 
	});

	function updateActiveNav(){
		//don't do anything if animating
		if($(":animated").length > 0){
			return false;
		}
		$("#sidebar li").removeClass("active");
		
		// if home showing 
		if(!$("#home").hasClass("hidden")){
			$("a[data-id=\"home\"]").parent().addClass("active");		
		}else{
			var threshold = 100;
			//get tops
			var pTop = $("#portfolio").offset().top;
			var aTop = $("#about").offset().top;

			if ( pTop < threshold && pTop > -threshold) {
	            $("a[data-id=\"portfolio\"]").parent().addClass("active");

        	}else if( aTop < threshold && aTop > -threshold) {
	            $("a[data-id=\"about\"]").parent().addClass("active");

        	}

		}
		
	}

});

//update css on window resize
$(window).resize(function() {
	if($(window).width() > 768){
		$("#portfolio, #about").css("height", $(window).height() );
		$("#nav-container").css("margin-top", - $("#nav-container").height()/2 );
		$("#about-content").css("margin-top", - $("#about-content").height()/2 );
		if($("#content-wrapper").css("left") == "0px"){
			$("#static-nav").css({"left": $("#sidebar").outerWidth() - $("#static-nav").outerWidth() });			
		}
		$("#project-grid").css("margin-top", - $("#project-grid").height()/2 );

		$("#project-carousel").css("margin-top", - $("#project-carousel").height()/2 );
	}

	$("#small-nav, #home-small").css("min-height", $(window).height()/2);
	$("#intro-small").css("margin-top", - $("#intro-small").height()/2 );
	
});
