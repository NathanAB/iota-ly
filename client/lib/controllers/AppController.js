var $ = require('jquery');

var Marionette = require('backbone.marionette');
var LoadingView = require('../views/LoadingView');
var LoginView = require('../views/LoginView');
var HeaderView = require('../views/HeaderView');

var AppController = Marionette.Object.extend({

  initialize: function() {

    App.coverRegion.show(new LoadingView());

  },

  start: function() {

    if(App.UserSession.isLoggedIn()) {
      return this.getContent();
    } else {
      App.coverRegion.show(new LoginView());
      App.on('login:success', this.getContent);
    }

  },

  getContent: function() {
    App.headerRegion.show(new HeaderView());
    $('#cover').fadeOut();

    App.UserSession.getContent()
      .then(function(content) {
        // Store and display content
      })
      .catch(function(err) {
        // Show error and/or go to login
      });
  }

});

module.exports = AppController;