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
    'click .iota-content': '_clickContent'
  },

  onShow: function() {
    this.$el.addClass('iota-' + this.model.get('type'));
  },
  
  _clickContent: function() {
    switch(this.model.get('type')) {
      case 'image':
        this._expandImage();
        break;
      default:
        break;
    }
  },

  _expandImage: function() {
    App.trigger('expand:image', this.model);
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