var UserProvider = require('../models/user.js');

function registerMW(req, res, next) {
  //TODO: Server side authentication
  UserProvider.register({ email: req.body.email }, req.body.password, function(err, account) {
    if (err) { return res.status(400).json({ reason: err }); } 
    return res.status(200).send();
  });
}

module.exports = registerMW;