Template.map.events({
  'click .googleMapContainer': function(event){
    if(FlowRouter.current().path == '/spots/new'){
      event.preventDefault();
      //go home
      FlowRouter.go('/');
    }
  }
})

Template.map.helpers({
  geolocationError: function() {
    var error = Geolocation.error();
    return error && error.message;
  },

  mapOptions: function() {
    var latLng = Geolocation.latLng();
    // Initialize the map once we have the latLng.
    if (GoogleMaps.loaded() && latLng) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(latLng.lat, latLng.lng),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
    }
  },      


});

Template.map.onCreated(function() {
  GoogleMaps.load({ v: '3'});

  GoogleMaps.ready('testMap', function(map) {

    var locationIcon = {
      url: '/images/position.png',
      size: new google.maps.Size(22, 22),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(11, 11)
    };

    var userMarker = new google.maps.Marker({
      map: map.instance,
      position: map.options.center,
      icon: locationIcon
    });

    var infowindow;
    var infoWindowOpen = null;
    var marker;
    function showSpot(spot) {
      marker = new google.maps.Marker({
        map: map.instance,
        position: {lat: spot.position.latitude, lng: spot.position.longitude},
        title: spot.name
      });

      marker.addListener('click', function() {
        //if a infowindow is opened -> close
        if (infoWindowOpen) infoWindowOpen.close();

        var infowindowContent = `<h2><a href="geo:${spot.position.latitude},${spot.position.longitude}">${spot.name}</a></h2>
                                <p><strong>Wi-Fi Quality:</strong> ${spot.wiFiQuality}
                                <p><strong>Power Available:</strong> ${spot.powerAvailable}`
        //add comments
        if(spot.comments && spot.comments.length > 0) {
          infowindowContent +=  `<p><strong>Comments:</strong></p>
                                <ul>`;
          spot.comments.forEach( function(comment){
            infowindowContent += `<li>${comment}</li>`;
          });

          infowindowContent += `</ul>`;
        }
        
        infowindow = new google.maps.InfoWindow({
          content: infowindowContent
        });

        infowindow.open(map.instance, this);  
        infoWindowOpen = infowindow;
      });
    };
    
    Spots.find().fetch().forEach(showSpot);
  });
});
