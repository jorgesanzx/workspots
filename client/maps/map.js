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
  }
});

Template.map.onCreated(function() {
  GoogleMaps.load({ v: '3'});

  GoogleMaps.ready('testMap', function(map) {
    var marker = new google.maps.Marker({
      map: map.instance,
      position: map.options.center
    });

    Spots.find().fetch().forEach(function(spot) {
      marker = new google.maps.Marker({
        map: map.instance,
        position: {lat: spot.position.latitude, lng: spot.position.longitude},
        title: spot.name
      });
    });
  });
});
