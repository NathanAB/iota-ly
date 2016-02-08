var mongoose = require('mongoose');
var imgur = require('imgur-node-api');
var request = require('request');
var cheerio = require('cheerio');
var q = require('q');
var config = require('../config.json');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
imgur.setClientID(config.imgurClientID);

/* Schema */
var contentSchema = new Schema({
    userid     : ObjectId,
    content    : String,
    original   : String,
    embed      : String,
    title      : String,
    img        : String,
    type       : String,
    half       : Boolean,
    postdate   : { type: Date, default: Date.now },
    lastupdate : { type: Date, default: Date.now }
});

/* Functions */
var Content = mongoose.model('Content', contentSchema);

Content.findContents = function(userid, cb) {
  Content.find({ 'userid': userid }).sort({postdate: -1}).exec(function(err, contents) {
    if(err){ cb(err) }
    cb(err, contents);
  });
};

Content.save = function(params, cb) {
  var content  = new Content({
    userid     : params['userid'],
    content    : params['content'],
    embed      : params['embed'],
    title      : params['title'],
    img        : params['img'],
    type       : params['type'],
    half       : params['half']
  });
  content.save(function(err){
    if(err) { cb(err); }
    cb(null, content);
  });
};

Content.post = function(userid, stringlet, cb) {
  convertStringlet(userid, stringlet, function(err, content) {
    if (err) { cb(err); }
    Content.save(content, function(err, content) {
      if (err) { cb(err); }
      cb(null, content);
    });
  });
};

/* Helper Functions */
//TODO: Push these out to a util file??
function convertStringlet(userid, stringlet, cb){
  var data = {};
  
  if (isImage(stringlet)) {
    data.userid = userid;
    data.type = 'IMAGE';
    data.half = true;
    data.content = stringlet;
  }
  else {
    data.userid = userid;
    data.type = 'STRING';
    data.half = false;
    data.content = decodeURI(stringlet);
  }
  
  cb(null, data);
}

function isImage(stringlet) {
  if (stringlet.indexOf(".jpg") > -1 || stringlet.indexOf(".jpeg") > -1 || 
      stringlet.indexOf(".gif") > -1 || stringlet.indexOf(".png") > -1)
    return true;
  else
    return false;
}

function isVideo(stringlet){
  
}

function isURL(stringlet){
  
}

function toImageContent(userid, stringlet){
  
}

function toVideoContent(userid, stringlet){

}

function toURLContent(userid, stringlet){
  
}

module.exports = Content