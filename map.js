// map.js
// Javascript file for smetz.co.nz to embed a map of New Zealand with a marker on Auckland
// Uses google maps apiS
// Author: Sara Metz
var map;

function initialise(){
	var myOptions = {
						zoom:5,
						center:new google.maps.LatLng(-39.724089,173.778305),
						mapTypeId: google.maps.MapTypeId.ROADMAP
						};

	map = new google.maps.Map(document.getElementById('map_canvas'),myOptions);
	markMap();
	window.console.log("map made");
}

function markMap(){
	var options = {	
					position: new google.maps.LatLng(-36.844461,174.745102)
				  	};
	var marker = new google.maps.Marker(options);
	marker.setMap(map);
	
}
