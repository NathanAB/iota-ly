var Marionette = require('backbone.marionette');
var IotaView = require('./IotaView');

var IotaCollectionView = Marionette.CollectionView.extend({
  childView: IotaView
});

module.exports = IotaCollectionView;