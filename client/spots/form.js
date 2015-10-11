Template.spotForm.events({
	'submit .spot-form': function(event) {
		event.preventDefault();

    if(!Geolocation.error()) {
      var latLng = Geolocation.latLng();

  		var spot = {
  			name: $('#name').val(),
  			wiFiQuality: $('#wiFiQuality').val(),
  			powerAvailable: $('#powerAvailable').is(':checked'),
  			comments: [$('#comment').val()],
        position: {
          latitude: latLng.lat,
          longitude: latLng.lng
        }
  		}

  		//TODO: validation

  		//insert
  		Spots.insert(spot);

      //go home
      FlowRouter.go('/');      
    }
	},

  'mouseenter .googleMapContainer': function(event){
    event.preventDefault();

    console.log('hola');
    //go home
    FlowRouter.go('/');
  }
});