var onReady = function() {
	/* Test */
	// $('#interactive').on('click', function() {
	// 	console.log('hey');
	// });

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

    //put the data into a JS object
    var layerSource = {
      user_name: 'simbiotica',
      type: 'cartodb',
      sublayers: [{
        sql: "SELECT * FROM lor_bezirksregionen_berlin_merge",
        cartocss: "#lor_bezirksregionen_berlin_merge{polygon-fill:#EDF8FB;polygon-opacity:.4;line-color:#FFF;line-width:.5;line-opacity:1} #lor_bezirksregionen_berlin_merge [intersect_count<=157]{polygon-fill:#005824} #lor_bezirksregionen_berlin_merge [intersect_count<=92]{polygon-fill:#238B45} #lor_bezirksregionen_berlin_merge [intersect_count<=65]{polygon-fill:#41AE76} #lor_bezirksregionen_berlin_merge [intersect_count<=26]{polygon-fill:#66C2A4} #lor_bezirksregionen_berlin_merge [intersect_count<=16]{polygon-fill:#CCECE6} #lor_bezirksregionen_berlin_merge [intersect_count<=10]{polygon-fill:#D7FAF4} #lor_bezirksregionen_berlin_merge [intersect_count<=5]{polygon-fill:#EDF8FB}"
      },
      {
      	sql: "SELECT * FROM stolpersteine",
        cartocss: "#stolpersteine{marker-fill-opacity:.9;marker-line-color:#FFF;marker-line-width:1;marker-line-opacity:1;marker-placement:point;marker-type:ellipse;marker-width:7.5;marker-fill:#2E5387;marker-allow-overlap:true}"	
      }]
    };

    var sublayers;

    //create layer
	cartodb.createLayer(map_object, layerSource)
	.addTo(map_object)
	.done(function(layer) {
		// sublayers = layer;
  //       for (var i = 0; i < layer.getSubLayerCount(); i++) {
  //           sublayers[i] = layer.getSubLayer(i);
  //           alert("Congrats, you added sublayer #" + i + "!");
  //       }
	})
	.error(function(err) {
		console.log("error: " + err)
	});

};


$(document).on('ready', onReady);