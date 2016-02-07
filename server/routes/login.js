var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config.json');

function loginMW(req, res, next) {
  //TODO: Server side authentication
  passport.authenticate('local', { session: false }, function(err, user, info) {
    if (err) { return res.status(500).json({ reason: "Resources are unavailable at this time" }); }
    if (!user) { return res.status(401).json({ reason: "Invalid E-mail or Password" }); }
    var token = jwt.sign(user, config.jwtSecret);
    res.status(200).json({ token: token });
  })(req, res, next);
}

module.exports = loginMW;