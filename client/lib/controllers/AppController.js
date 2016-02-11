var $ = require('jquery');

var Marionette = require('backbone.marionette');
var LoadingView = require('../views/LoadingView');
var LoginView = require('../views/LoginView');
var HeaderView = require('../views/HeaderView');
var IotaCollectionView = require('../views/IotaCollectionView');

var IotaCollection = require('../models/IotaCollection');

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
        var tempIota = [];
        tempIota.push({_id: 1, content:'test string 1'});
        tempIota.push({_id: 2, content:'test string 2'});
        tempIota.push({_id: 3, content:'test string 3'});
        tempIota.push({_id: 4, content:'test string 4'});
        
        var iotaCollection = new IotaCollection(tempIota);
        var iotaCollectionView = new IotaCollectionView({collection: iotaCollection});
        App.mainRegion.show(iotaCollectionView);
      })
      .catch(function(err) {
        // Show error and/or go to login
        console.log('err' + err);
      });
  }

});

module.exports = AppController;