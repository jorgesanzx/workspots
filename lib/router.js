FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render('list');
  }
});

FlowRouter.route('/spots/new', {
  action: function() {
    BlazeLayout.render('edit');
  }
});
