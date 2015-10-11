var SpotMarker = function(map, spot) {
  var self = this;
  this.spot = spot;
  this.map = map;

  this.buildMarker = function() {
    return new google.maps.Marker({
      map: this.map.instance,
      position: {lat: this.spot.position.latitude, lng: this.spot.position.longitude},
      title: this.spot.name
    });
    marker.addListener('click', this.clicked);
  };

  this.buildWindow = function() {
    var spot = this.spot;
    var infowindowContent = `<h2><a href="geo:${spot.position.latitude},${spot.position.longitude}">${spot.name}</a></h2>
                            <p><strong>Wi-Fi Quality:</strong> ${spot.wiFiQuality}
                            <p><strong>Power Available:</strong> ${spot.powerAvailable ? "Yes" : "No"}`
    //add comments
    if(spot.comments && spot.comments.length > 0) {
      infowindowContent +=  `<p><strong>Comments:</strong></p>
                            <ul>`;
      spot.comments.forEach(function(comment) {
        infowindowContent += `<li>${comment}</li>`;
      });
      infowindowContent += `</ul>`;
    }

    return new google.maps.InfoWindow({
      content: infowindowContent
    });
  };

  this.click = function() {
    console.debug('clicked on spotmarker ', this);
  };

  this.delete = function() {
    this.marker.setMap(null);
  };

  this.toString = function() {
    return `[SpotMarker ${this.spot.name}]`;
  }

  this.window = this.buildWindow();
  this.marker = this.buildMarker();
  this.marker.spotmarker = this;
  this.marker.addListener('click', function() {
    var sm = this.spotmarker;
    FlowRouter.go('/?spot=' + this.spotmarker.spot._id);
  });
}

var spotmarkers = {
  map: null,
  currentSpotMarker: null,
  spotMarkers: [],

  add: function(spot) {
    var spotMarker = new SpotMarker(spotmarkers.map, spot);
    spotMarker.click = function() {
      if (spotmarkers.currentSpotMarker) {
        spotmarkers.currentSpotMarker.window.close();
      }
    }
    spotmarkers.spotMarkers.push(spotMarker);
  },

  addList: function(list) {
    this.spotMarkers = list.map(this.add);
  }
};

Template.map.events({
  'click .googleMapContainer': function(event){
    if(FlowRouter.current().path == '/spots/new'){
      event.preventDefault();
      //go home
      FlowRouter.go('/');
    }
  }
});

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

  getFilters: function() {
    var filters = Session.get('filters');

    if(filters && filters.wifi && filters.power){
      var query = {
        wiFiQuality: {$gte: Number(filters.wifi)}
      };
      if(filters.power && filters.power == "yes"){
        query.powerAvailable = true;
      }
      var spots = Spots.find( query ).fetch();

      showMarkers(globalMap, spots);
    }
  }

});

function showCurrentUser(map) {
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
};

Template.map.onCreated(function() {
  GoogleMaps.load({ v: '3'});

  GoogleMaps.ready('googleMap', function(map) {
    globalMap = map;
    showCurrentUser(map);
    spotmarkers.map = map;
    spotmarkers.addList(Spots.find().fetch());
  });
});
