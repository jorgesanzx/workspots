Template.filters.events({
  "change #powerAvailable": function(event) {
    var powerAvailable = $('#powerAvailable').is(':checked') ? "yes" : "no";
    FlowRouter.go('/?power=' + powerAvailable + '&wifi=' + $('#wiFiQuality').val());
  },

  "change #wiFiQuality": function(event) {
    var powerAvailable = $('#powerAvailable').is(':checked') ? "yes" : "no";
    FlowRouter.go('/?power=' + powerAvailable + '&wifi=' + $('#wiFiQuality').val());
  }
});
