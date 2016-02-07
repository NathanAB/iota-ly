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
  },

  _showRegister: function() {
    this.$el.find('.login-body').fadeOut('fast', function() {
      this.$el.find('.register-body').fadeIn('fast');
    }.bind(this));
  },

  _showLogin: function() {
    this.$el.find('.register-body').fadeOut('fast', function() {
      this.$el.find('.login-body').fadeIn('fast');
    }.bind(this));
  },

  _login: function(e) {
    var self = this;
    e.preventDefault();

    var $form = $(e.target);
    var email = $form.find('.email-input').val();
    var password = $form.find('.password-input').val();

    var creds = {
      username: email,
      password: password
    };

    this.$el.find('.login-body').slideUp('fast');
    self.$el.find('.request-process').slideDown('fast', function() {
      self._sendLoginRequest(creds);
    });

    return false;
  },

  _sendLoginRequest: function(creds) {
    var self = this;
    App.UserSession.login(creds)
      .then(function(token) {
        this.trigger('login:success');
      })
      .catch(function(err) {
        logger.error(err);
        self.$el.find('.request-process').slideUp('fast', function() {
        });
        self.$el.find('.login-body').slideDown('fast');
      });
  },

  _register: function(e) {
    e.preventDefault();

    var $form = $(e.target);
    var email = $form.find('.email-input').val();
    var password = $form.find('.password-input').val();

    var creds = {
      username: email,
      password: password
    };

    App.UserSession.register(creds)
      .then(function(token) {
      })
      .catch(function(err) {
      });

    return false;
  }

});

module.exports = LoginView;