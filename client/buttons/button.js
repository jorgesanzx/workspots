Template.button.onCreated(function () {
  Session.set("powerAvailableFilter", false);
  Session.set("wiFiQualityFilter", 0);
});

Template.button.events({
  "click button": function() {
    FlowRouter.go('/spots/new');
  },

  "change #powerAvailable": function(event) {
    var powerAvailable = $('#powerAvailable').is(':checked') ? "yes" : "no";
    FlowRouter.go('/?power=' + powerAvailable + '&wifi=' + $('#wiFiQuality').val());
  },

  "change #wiFiQuality": function(event) {
    var powerAvailable = $('#powerAvailable').is(':checked') ? "yes" : "no";
    FlowRouter.go('/?power=' + powerAvailable + '&wifi=' + $('#wiFiQuality').val());
  },
});

