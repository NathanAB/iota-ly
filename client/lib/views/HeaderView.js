var $ = require('jquery');
var Marionette = require('backbone.marionette');

var HeaderView = Marionette.ItemView.extend({

  template: '#header-view',
  className: 'header',

  events: {
    'click .logout-link': '_logout',
    'click .fa-plus': '_post'
  },
  
  _post: function(e) {
    console.log('POST CONTENT:' + $('.post-box').val());
    App.UserSession.postContent($('.post-box').val());
  },

  _logout: function() {
    App.UserSession.logout();
  }

});

module.exports = HeaderView;