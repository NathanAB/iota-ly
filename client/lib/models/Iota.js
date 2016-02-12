var Backbone = require('backbone');

var Iota = Backbone.Model.extend({
  defaults: {
    _id: '',
    content: '',
    type: '',
    title: '',
    img: ''
  }
});

module.exports = Iota;