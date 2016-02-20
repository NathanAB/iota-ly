var Marionette = require('backbone.marionette');

var IOTA_TEMPLATES = {
  image: '#iota-image-view',
  video: '#iota-video-view',
  url: '#iota-url-view',
  string: '#iota-string-view'
};

var Iota = Marionette.ItemView.extend({
  
  getTemplate: function(){
    return IOTA_TEMPLATES[this.model.get('type')] || '#iota-string-view';
  },
  
  className: 'iota',
  
  events: {
    'click .image-screen': '_expandImage',
    'click .iota-video': '_expandVideo'
  },

  onShow: function() {
    this.$el.addClass('iota-' + this.model.get('type'));
  },
  
  _expandImage: function(){
    console.log('expand image');
  },
  
  _expandVideo: function(){
    console.log('expand video');
  },
  
  _closeVideo: function(){
    console.log('close video');
  },
  
  _showIota: function(){
    console.log('show iota');
  },
  
  _editIota: function(){
    console.log('edit iota');
  },
  
  _deleteIota: function(){
    console.log('delete iota');
  }

});

module.exports = Iota;