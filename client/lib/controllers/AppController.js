var $ = require('jquery');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var logger = require('loglevel');

var LoadingView = require('../views/LoadingView');
var LoginView = require('../views/LoginView');
var HeaderView = require('../views/HeaderView');
var IotaCollectionView = require('../views/IotaCollectionView');
var IotaStageView = require('../views/IotaStageView');
var SaveLinkView = require('../views/SaveLinkView');

var IotaCollection = require('../models/IotaCollection');

var AppController = Marionette.Object.extend({

  initialize: function() {

    App.coverRegion.show(new LoadingView());
    App.on('expand:image', this.expandImage);
    App.on('close:image', this.closeImage);

  },

  start: function() {

    if (App.UserSession.isLoggedIn()) {
      // Set up base content
      App.headerRegion.show(new HeaderView());
      $('#cover').fadeOut();

      // Show user content or link submission
      var link = App.UserSession.get('link');
      if(!link) {
        return this.getContent();
      } else {
        App.on('link:cancel', this.getContent);
        App.on('link:save', this.getContent);
        return this.saveLink();
      }
    } else {
      App.coverRegion.show(new LoginView());
      App.on('login:success', this.getContent);
    }

  },

  saveLink: function() {
    this.saveLinkView = new SaveLinkView({
      model: new Backbone.Model({
        link: App.UserSession.get('link')
      })
    });
    App.mainRegion.show(this.saveLinkView);
  },

  getContent: function() {
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
        
        App.headerRegion.show(new HeaderView());
        App.mainRegion.show(this.iotaCollectionView);
        $('#cover').fadeOut();
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