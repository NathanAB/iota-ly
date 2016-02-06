var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

/* Schema */
var userSchema = new Schema({
    verified : { type: Boolean, default: false},
    onboard  : { type: Boolean, default: true}
});

/* Functions */
userSchema.plugin(passportLocalMongoose);
var User = mongoose.model('User', userSchema)

module.exports = User;