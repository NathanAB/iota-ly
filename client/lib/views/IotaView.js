var Marionette = require('backbone.marionette');

var Iota = Marionette.ItemView.extend({
  
  getTemplate: function(){
    if (this.model.get('type') == 'IMAGE'){
      return '#iota-image-view';
    } else if(this.model.get('type') == 'URL') {
      return '#iota-url-view';
    } else if(this.model.get('type') == 'VIDEO') {
      return '#iota-video-view';
    } else {
      return '#iota-string-view';
    }
  },
  
  className: 'iota',
  
  events: {
    'click .image-screen': '_expandImage',
    'click .iota-video': '_expandVideo'
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