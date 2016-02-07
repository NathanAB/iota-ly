var Iota = require('./Iota');
var Backbone = require('backbone');

var IotaCollection = Backbone.Collection.extend({
  model: Iota
});

module.exports = IotaCollection;