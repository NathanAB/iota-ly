var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
// var AppController = require('./controllers/AppController');
// var request = require('superagent');
// var $ = require('jquery');
var logger = require('loglevel');
logger.setLevel('info');

// Controllers
var AppController = require('./controllers/AppController');

// Models
var UserSession = require('./models/UserSession');

// Initialize the app and create global var
App = new Backbone.Marionette.Application();

App.on('start', function() {

  logger.info('Starting app');

  App.addRegions({
    mainRegion: '#content',
    coverRegion: '#cover'
  });

  App.AppController = new AppController();
  App.UserSession = new UserSession();

  App.AppController.start();

});

module.exports = App;
module.exports.App = App;