FlowRouter.route('/', {
  action: function(params, queryParams) {
  	console.log(queryParams);
    BlazeLayout.render('list');
  }
});

FlowRouter.route('/spots/new', {
  action: function() {
    BlazeLayout.render('edit');
  }
});
