var $ = require('jquery');

var Marionette = require('backbone.marionette');
var LoadingView = require('../views/LoadingView');
var LoginView = require('../views/LoginView');

var AppController = Marionette.Object.extend({

  initialize: function() {

    App.coverRegion.show(new LoadingView());

  },

  start: function() {

    if(App.UserSession.isLoggedIn()) {
      return this.showMainContent();
    } else {
      App.coverRegion.show(new LoginView());
      App.on('login:success', this.showMainContent);
    }

  },

  showMainContent: function() {
    $('#cover').fadeOut();
  }

});

module.exports = AppController;