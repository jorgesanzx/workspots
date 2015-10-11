Template.button.onCreated(function () {
  Session.set("powerAvailableFilter", false);
  Session.set("wiFiQualityFilter", 0);
});

Template.button.events({
  "click button": function() {
    FlowRouter.go('/spots/new');
  },

  "change #powerAvailable": function(event) {
    FlowRouter.go('/?power=' + $('#powerAvailable').is(':checked') + '&wifi=' + $('#wiFiQuality').val());
  },

  "change #wiFiQuality": function(event) {
    FlowRouter.go('/?power=' + $('#powerAvailable').is(':checked') + '&wifi=' + $('#wiFiQuality').val());
  },
});

