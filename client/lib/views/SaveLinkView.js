var Marionette = require('backbone.marionette');

var SaveLinkView = Marionette.ItemView.extend({
  
  template: '#save-link-view',
  
  className: 'container',

  events: {
    'click .save-link': '_saveLink',
    'click .cancel-link': '_cancelLink'
  },

  _saveLink: function() {
    // Trigger save link event
    // Controller calls func to hit endpoint
    // Controller loads content after completion
    this.$el.fadeOut(function() {
      App.trigger('link:save');
    });
  },

  _cancelLink: function() {
    this.$el.fadeOut(function() {
      App.trigger('link:cancel');
    });
  }

});

module.exports = SaveLinkView;