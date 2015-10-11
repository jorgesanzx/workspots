FlowRouter.route('/', {
  action: function(params, queryParams) {
  	Session.set('filters', queryParams);
    BlazeLayout.render('list');
  }
});

FlowRouter.route('/spots/new', {
  action: function() {
    BlazeLayout.render('edit');
  }
});
