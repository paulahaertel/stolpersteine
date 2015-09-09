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

    var sublayers = [];

    //create layer
	cartodb.createLayer(map_object, layerSource)
	.addTo(map_object)
	.done(function(layer) {
		// sublayers = layer;
        for (var i = 0; i < layer.getSubLayerCount(); i++) {
            sublayers[i] = layer.getSubLayer(i);
            // alert("Congrats, you added sublayer #" + i + "!");
        }
	})
	.error(function(err) {
		console.log("error: " + err)
	});

  // If a user clicks the DOM element with an id of sublayer0, 
  // CartoDB.js will hide or show sublayers[0] depending on its state 
  var sublayer0Shown = true;
  $("#layer0").on('click', function() {
      if (sublayer0Shown) {
          sublayers[0].hide();
      } else {
          sublayers[0].show();
      }
      sublayer0Shown = !sublayer0Shown; 
  });

  var sublayer1Shown = true;
  $("#layer1").on('click', function() {
      if (sublayer1Shown) {
          sublayers[1].hide();
      } else {
          sublayers[1].show();
      }
      sublayer1Shown = !sublayer1Shown; 
  });

  

  function calcSliderMin() {
    //SELECT MIN(deportationstag) FROM stolpersteine 
    //first 4 positions of String
    //thats the year
  }

  function calcSliderMax() {
    //SELECT MAX(deportationstag) FROM stolpersteine 
    //first 4 positions of String
    //thats the year
  }

  function calcSliderSteps() {
    //getSliderMax-getSliderMin
  }

  d3.select('#slider6').call(d3.slider().axis(true).min(2000).max(2100).step(5));

  function getCorrespondingBlocks(slider) {
    
  }




    
};


$(document).on('ready', onReady);