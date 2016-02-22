var Marionette = require('backbone.marionette');

var IotaStageView = Marionette.ItemView.extend({

  template: '#iota-stage-view',
  className: 'iota-stage-view',

  events: {
    'click': '_close'
  },

  _close: function() {
    App.trigger('close:image');
  }

});

module.exports = IotaStageView;