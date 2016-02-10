var Backbone = require('backbone');
var request = require('superagent');
var logger = require('loglevel');

var AUTH_TOKEN_NAME = 'iota-auth-token';
var self;

var UserSession = Backbone.Model.extend({

  initialize: function() {
    self = this;
    this.set('authToken', localStorage.getItem(AUTH_TOKEN_NAME));
  },

  isLoggedIn: function() {
    return this.token !== undefined && this.token !== '' && this.token !== null;
  },

  login: function(creds) {
    var promise = new Promise(function(resolve, reject) {

      request
        .post('/login')
        .send(creds)
        .end(function(err, res) {
          if(err) {
            logger.error('Login failed.', err);
            return reject(err);
          }

          if(res.status === 200) {
            logger.info('Login success.');
            self.setAuthToken(res.body.token);
            resolve(res.body);
          } else {
            logger.error('Login failed.', res);
            reject(res.body);
          }
        });

    });

    return promise;
  },
  
  register: function(creds) {
    var promise = new Promise(function(resolve, reject) {

      request
        .post('/register')
        .send(creds)
        .end(function(err, res) {
          if(err) {
            logger.error('Register failed.', err);
            return reject(err);
          }

          if(res.status === 200) {
            logger.info('Register success.');
            self.setAuthToken(res.body.token);
            resolve(res.body);
          } else {
            logger.error('Register failed.', res);
            reject(res.body);
          }
        });

    });

    return promise;
  },

  logout: function() {
    localStorage.removeItem(AUTH_TOKEN_NAME);
    if(window.location.pathname === '/') {
      window.location.reload();
    } else {
      window.location = window.location.host;
    }
  },

  setAuthToken: function(newToken) {
    this.set('authToken', newToken);
    localStorage.setItem(AUTH_TOKEN_NAME, newToken);
  },

  getContent: function() {
    var promise = new Promise(function(resolve, reject) {


    }
  }

});

module.exports = UserSession;