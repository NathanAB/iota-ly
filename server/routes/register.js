var UserProvider = require('../models/user.js');
var jwt = require('jsonwebtoken');
var config = require('../config.json');
var minChar = 4;
var maxChar = 20;

function registerMW(req, res, next) {
  validRegister(req.body.email, req.body.password, function(err, email, password){
    if(err){ return res.status(400).json(err); }
    UserProvider.register({ email: email }, password, function(err, user) {
      if (err) { return res.status(400).json({ reason: err }); } 
      var token = jwt.sign(user, config.jwtSecret);
      return res.status(200).json({ token: token });
    });
  });
}

/* Helper Functions */
function validRegister(email, password, cb){
  if(email.length < minChar || email.length > maxChar){
    return cb({reason: "Email must be between " + minChar + " and " + maxChar + " characters"});
  } else if(password.length < minChar || password.length > maxChar) {
    return cb({reason: "Password must be between " + minChar + " and " + maxChar + " characters"});
  } else {
    return cb(null, email, password);
  }
}

module.exports = registerMW;