var UserProvider = require('../models/user.js');
var minChar = 4;
var maxChar = 20;

function registerMW(req, res, next) {
  validRegister(req.body.email, req.body.password, function(err, email, password){
    if(err){ return res.status(400).json(err); }
    UserProvider.register({ email: email }, password, function(err, account) {
      if (err) { return res.status(400).json({ reason: err }); } 
      return res.status(200).send();
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