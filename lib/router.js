FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render('button');
  }
});

FlowRouter.route('/spots/new', {
  action: function() {
    BlazeLayout.render('spotForm');
  }
});
