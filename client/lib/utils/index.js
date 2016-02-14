var $ = require('jquery');

var minChar = 4;
var maxChar = 25;

var utils = {

  alphaNumeric: function(str) {
    return /[^a-zA-Z0-9]/.test(str) ? false : true;
  },

  validPassword: function(str) {
    return /^[a-zA-Z0-9!@#$%&*]+$/.test(str) ? true : false;
  },

  validEmail: function(str) {
    return str.indexOf('@') >= str.indexOf('.') ? false : true;
  },

  validateLogin: function(email, password) {
    if (email.length < minChar || email.length > maxChar || password.length < minChar || password.length > maxChar || !this.validEmail(email) || !this.validPassword(password)) {
      $('#loginError').html('Invalid email or password');
    } else {
      return true;
    }
    $('#loginError').css('visibility', 'visible');
    return false;
  },

  validateRegistration: function(email, password, confirm) {
    if (!this.validEmail(email)) {
      $('#loginError').html('Must supply a valid email');
    } else if (password.length < minChar || password.length > maxChar) {
      $('#loginError').html('Password must be between ' + minChar + ' and ' + maxChar + ' characters');
    } else if (password != confirm) {
      console.log(password + ' ' + confirm);
      $('#loginError').html('Passwords must match');
    } else if (!this.validEmail(email) || !this.validPassword(password)) {
      $('#loginError').html('Email or password contains invalid characters');
    } else {
      return true;
    }
    $('#loginError').css('visibility', 'visible');
    return false;
  }

};

module.exports = utils;