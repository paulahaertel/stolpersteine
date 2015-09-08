window.onload = function() {
	/* Test */
	$('#interactive').on('click', function() {
		console.log('hey');
	});

	/* Map */
	
	//instantiate new map object, place it in 'map' element
    var map_object = new L.Map('map', {
      center: [52.505, 13.424], // Berlin
      zoom: 12
    });

    //pull tiles from OSM
    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map_object);
}