/* model.js */

var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var uriString = process.env.MONGOLAB_URI || 'mongodb://localhost/myapp'
var connection = mongoose.createConnection(uriString);

/* Data Model */

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    verified : { type: Boolean, default: false},
    onboard  : { type: Boolean, default: true}
});

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

userSchema.plugin(passportLocalMongoose);
var User = connection.model('User', userSchema);
var Content = connection.model('Content', contentSchema);

/* Users */
var UserProvider = function(){};

/* Content */
var ContentProvider = function(){};

ContentProvider.prototype.findContents = function(userid, callback) {
    console.log('Finding ' + userid);
    Content.find({ 'userid': userid }).sort({postdate: -1}).exec(function(err, contents) {
        callback(err, contents);
    });
};

ContentProvider.prototype.save = function(params, callback) {
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
        console.log(err);
        callback(err);
    });
};

ContentProvider.prototype.remove = function(params, callback) {
    Content.remove({_id : params['_id']}, function(err){
        callback(err);
    });
};

exports.User = User;
exports.UserProvider = UserProvider;
exports.ContentProvider = ContentProvider;