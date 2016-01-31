var Backbone = require('backbone');
var request = require('superagent');
var logger = require('loglevel');

var STORAGE_TOKEN = 'iota-auth-token';

var UserSession = Backbone.Model.extend({

  initialize: function() {
    this.token = localStorage.getItem(STORAGE_TOKEN);
  },

  isLoggedIn: function() {
    return this.token !== undefined && this.token !== '' && this.token !== null;
  },

  login: function(creds) {
    var promise = new Promise(function(resolve, reject) {

      request
        .post('/login')
        .send(creds)
        .end(function(res) {
          if(res.status === 200) {
            logger.info('Login success.');
            resolve(res.body);
          } else {
            logger.error('Login failed.', res.body);
            reject(res.body);
          }
        })
        .fail(function(err) {
          logger.error('Login failed.', err);
          reject(err);
        });

    });

    return promise;
  }

});

module.exports = UserSession;