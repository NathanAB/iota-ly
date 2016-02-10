var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config.json');
var minChar = 4;
var maxChar = 20;

function loginMW(req, res, next) {
  if(req.body.email.length < minChar || req.body.email.length > maxChar){
    return res.status(401).json({ reason: "Invalid E-mail or Password" });
  } else if(req.body.password.length < minChar || req.body.password.length > maxChar) {
    return res.status(401).json({ reason: "Invalid E-mail or Password" });
  }
  
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.status(500).json({ reason: "Resources are unavailable at this time" }); }
    if (!user) { return res.status(401).json({ reason: "Invalid E-mail or Password" }); }
    var token = jwt.sign(user, config.jwtSecret);
    return res.status(200).json({ token: token });
  })(req, res, next);
}

module.exports = loginMW;