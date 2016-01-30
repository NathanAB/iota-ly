var Marionette = require('backbone.marionette');

var ErrorView = Marionette.ItemView.extend({

  template: '#error-view'

});

module.exports = ErrorView;