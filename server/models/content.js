var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

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
  if (stringlet.indexOf(".jpg") > -1 || stringlet.indexOf(".jpeg") > -1 || stringlet.indexOf(".gif") > -1 || stringlet.indexOf(".png") > -1)
    return true;
  else
    return false;
}

module.exports = Content