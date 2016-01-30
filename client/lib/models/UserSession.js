var Backbone = require('backbone');

// var IOTA_URL = 'https://iota-ly.herokuapp.com/';
var STORAGE_TOKEN = 'iota-auth-token';

var UserSession = Backbone.Model.extend({

  initialize: function() {
    this.token = localStorage.getItem(STORAGE_TOKEN);
  },

  isLoggedIn: function() {
    return this.token !== undefined && this.token !== '' && this.token !== null;
  }

});

module.exports = UserSession;