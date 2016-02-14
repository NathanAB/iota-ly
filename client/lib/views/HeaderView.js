var Marionette = require('backbone.marionette');

var HeaderView = Marionette.ItemView.extend({

  template: '#header-view',
  className: 'header',

  events: {
    'click .logout-link': '_logout'
  },

  _logout: function() {
    App.UserSession.logout();
  }

});

module.exports = HeaderView;