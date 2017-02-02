//Router.route('posts', {path: '/'} );
Router.route('show', {path: 'show'});
Router.route('/', function () {
  this.render('posts');
});

/*
Router.route('/show', function () {
  this.render('show');
});*/