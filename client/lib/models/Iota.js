var Backbone = require('backbone');

var Iota = Backbone.Model.extend({
  defaults: {
    _id: '',
    content: ''
  }
});

module.exports = Iota;