var $ = require('jquery');
var Marionette = require('backbone.marionette');
var logger = require('loglevel');

var LoadingView = require('../views/LoadingView');
var LoginView = require('../views/LoginView');
var HeaderView = require('../views/HeaderView');
var IotaCollectionView = require('../views/IotaCollectionView');
var IotaStageView = require('../views/IotaStageView');

var IotaCollection = require('../models/IotaCollection');

var AppController = Marionette.Object.extend({

  initialize: function() {

    App.coverRegion.show(new LoadingView());
    App.on('expand:image', this.expandImage);
    App.on('close:image', this.closeImage);

  },

  start: function() {

    if (App.UserSession.isLoggedIn()) {
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
        tempIota.push({
          _id: 1,
          title: 'Test string 1',
          content: '',
          type: 'string',
          imageUrl: ''
        });
        tempIota.push({
          _id: 2,
          content: 'http://i.imgur.com/bGVcCYP.png',
          imageUrl: 'http://i.imgur.com/bGVcCYP.png',
          type: 'image',
          title: ''
        });
        tempIota.push({
          _id: 3,
          content: 'http://i.imgur.com/jG8Ccsk.jpg',
          imageUrl: 'http://i.imgur.com/jG8Ccsk.jpg',
          type: 'image',
          title: ''
        });
        tempIota.push({
          _id: 4,
          content: 'http://www.sbnation.com/',
          title: 'Another test URL with a longer title',
          imageUrl: 'http://i.imgur.com/bGVcCYP.png',
          type: 'url'
        });
        tempIota.push({
          _id: 5,
          content: 'http://www.theverge.com/',
          title: 'test url 2',
          imageUrl: 'http://i.imgur.com/bGVcCYP.png',
          type: 'url'
        });
        tempIota.push({
          _id: 6,
          content: 'https://www.youtube.com/watch?v=mMcucOwYCoM',
          title: 'test video 1',
          imageUrl: '',
          type: 'video'
        });

        var iotaCollection = new IotaCollection(tempIota);
        this.iotaCollectionView = new IotaCollectionView({
          collection: iotaCollection
        });
        App.mainRegion.show(this.iotaCollectionView);
      })
      .catch(function(err) {
        // Show error and/or go to login
        logger.error(err);
      });
  },

  expandImage: function(iota) {
    App.stageRegion.show(new IotaStageView({
      model: iota
    }));
    $('#stage').fadeIn('fast');
  },

  closeImage: function() {
    $('#stage').fadeOut('fast');
  }

});

module.exports = AppController;