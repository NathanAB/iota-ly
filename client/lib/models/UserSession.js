var Backbone = require('backbone');
var request = require('superagent');
var logger = require('loglevel');

var AUTH_TOKEN_NAME = 'iota-auth-token';
var USER_EMAIL_NAME = 'iota-user-email';
var self;

var UserSession = Backbone.Model.extend({

  initialize: function() {
    self = this;
    this.set('authToken', localStorage.getItem(AUTH_TOKEN_NAME));
    this.set('userEmail', localStorage.getItem(USER_EMAIL_NAME));

    // Check if saving a link
    var path = window.location.pathname.substr(1);
    if(window.location.pathname !== '') {
      this.set('link', path);
    }
  },

  isLoggedIn: function() {
    var token = this.get('authToken');
    return token !== undefined && token !== '' && token !== null;
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
            self.setAuthToken(res.body.token, creds.email);
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
            logger.info('Register success.', res);
            self.setAuthToken(res.body.token, creds.email);
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
    localStorage.removeItem(USER_EMAIL_NAME);
    if(window.location.pathname === '/') {
      window.location.reload();
    } else {
      window.location = window.location.host;
    }
  },

  setAuthToken: function(newToken, userEmail) {
    this.set('authToken', newToken);
    this.set('userEmail', userEmail);
    localStorage.setItem(AUTH_TOKEN_NAME, newToken);
    localStorage.setItem(USER_EMAIL_NAME, userEmail);
  },

  getContent: function() {
    return new Promise(function(resolve, reject) {
      request
        .get('/api/content')
        .set('x-email', self.get('userEmail'))
        .set('x-token', self.get('authToken'))
        .end(function(err, res) {
          if(err) {
            logger.error('Content GET failed.', err);
            return reject(err);
          }

          if(res.status === 200) {
            logger.info('Content GET success.', res);
            return resolve();
          } else {
            logger.error('Content GET failed.', res);
            return reject();
          }
        });
    });
  },
  
  convertContent: function(string){
    
    var iota = {};
    
    iota.type = 'STRING';
    iota.half = false;
    iota.content = decodeURI(string);
    
    return iota;
  },
  
  postContent: function(content) {
    var iota = self.convertContent(content);

    return new Promise(function(resolve, reject) {

      request
        .post('/api/content')
        .set('x-email', self.get('userEmail'))
        .set('x-token', self.get('authToken'))
        .send(iota)
        .end(function(err, res) {
            console.log(res);
            if(err) {
              logger.error('Post Iota errored.', err);
              return reject(err);
            }

            if(res.status === 200) {
              logger.info('Post iota success.');
              self.getContent();
              resolve(res.body);
            } else {
              logger.error('Post iota failed.', res);
              reject(res.body);
            }
        });
    });
  },
  
  editContent: function(content) {
    
  },
  
  deleteContent: function(contentID) {
    return new Promise(function(resolve, reject) {
      request
        .delete('/api/content')
        .send(contentID)
        .set('x-email', self.get('userEmail'))
        .set('x-token', self.get('authToken'))
        .end(function(err, res) {
          if(err) {
            logger.error('Content DELETE failed.', err);
            return reject(err);
          }

          if(res.status === 200) {
            logger.info('Content DELETE success.', res);
            return resolve(res.body);
          } else {
            logger.error('Content DELETE failed.', res);
            return reject(res.body);
          }
        });
    });
  }

});

module.exports = UserSession;