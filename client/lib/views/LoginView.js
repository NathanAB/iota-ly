var $ = require('jquery');
var Marionette = require('backbone.marionette');
var logger = require('loglevel');

var LoginView = Marionette.ItemView.extend({

  template: '#login-view',

  events: {
    'click .show-register': '_showRegister',
    'click .show-login': '_showLogin',
    'submit .login-form': '_login',
    'submit .register-form': '_register'
  },

  onBeforeShow: function() {
    this.$el.hide();
  },

  onShow: function() {
    this.$el.fadeIn();
    this.$loginContent = this.$el.find('.login-content');
    this.$registerBody = this.$el.find('.register-body');
    this.$loginBody = this.$el.find('.login-body');
    this.$requestProcess = this.$el.find('.request-process');
    this.$requestResult = this.$el.find('.request-result');
  },

  _showRegister: function() {
    this.$loginBody.fadeOut('fast', function() {
      this._clearRequestResult();
      this.$registerBody.fadeIn('fast');
    }.bind(this));
  },

  _showLogin: function() {
    this.$registerBody.fadeOut('fast', function() {
      this._clearRequestResult();
      this.$loginBody.fadeIn('fast');
    }.bind(this));
  },

  _login: function(e) {
    e.preventDefault();

    var $form = $(e.target);
    this._auth($form, App.UserSession.login);

    return false;
  },


  _register: function(e) {
    e.preventDefault();

    var $form = $(e.target);
    this._auth($form, App.UserSession.register);

    return false;
  },

  _auth: function($form, req) {
    var self = this;
    var email = $form.find('.email-input').val();
    var password = $form.find('.password-input').val();

    var creds = {
      username: email,
      password: password
    };

    this.$loginContent.slideUp('fast');
    self.$requestProcess.slideDown('fast', function() {
      self.$requestResult.hide();
      self._sendAuthRequest(req, creds);
    });
  },

  _sendAuthRequest: function(req, creds) {
    var self = this;

    req(creds)
      .then(function(token) {
        this.trigger('login:success');
      })
      .catch(function(err) {
        self.$requestResult.show();
        if(err.response.body.reason.message) {
          self.$requestResult.text(err.response.body.reason.message);
        } else {
          self.$requestResult.text(err.response.body.reason);
        }
        self.$requestProcess.slideUp('fast', function() {
        });
        self.$loginContent.slideDown('fast');
      });
  },

  _clearRequestResult: function() {
    this.$requestResult.text('');
    this.$requestResult.hide();
  }

});

module.exports = LoginView;