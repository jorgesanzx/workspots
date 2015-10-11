Meteor.startup(function () {
  var spots = [
    {
      name: 'Google Campus',
      wiFiQuality: 5,
      powerAvailable: true,
      comments: ['Nice venue, Google Campus'],
      position: {
       latitude: 40.4121601,
       longitude: -3.7191547
      }
    },

    {
      name: 'Tetuan Valley',
      wiFiQuality: 3,
      powerAvailable: true,
      comments: ['Nice venue, Tetuan Valley'],
      position: {
        latitude: 40.4126139,
        longitude: -3.7204316,
      }
    },

    {
      name: 'Impact Hub Madrid',
      wiFiQuality: 2,
      powerAvailable: false,
      comments: ['Nice venue, Impact Hub Madrid'],
      position: {
        latitude: 40.4089711,
        longitude: -3.6967683,
      }
    },

    {
      name: 'Loft to work',
      wiFiQuality: 1,
      powerAvailable: true,
      comments: ['Nice venue, Loft to work'],
      position: {
        latitude: 40.4053711,
        longitude: -3.7035515,
      }
    },

    {
      name: 'La Fábrica de cajas',
      wiFiQuality: 4,
      powerAvailable: false,
      comments: ['Nice venue, La Fábrica de cajas'],
      position: {
        latitude: 40.4275136,
        longitude: -3.7013815,
      }
    },
  ];

  Spots.remove({});
  spots.map( function(spot) {
    Spots.insert(spot);
  });
});
