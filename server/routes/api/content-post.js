var ContentProvider = require('../../models/content');

function postContentMW(req, res, next) {
  if(req.body.text){
    ContentProvider.post(req.user._id, req.body.text, function(err, content){
    if(err){ res.status(401).json(err); }
    res.status(200).json(content); 
    });
  } else {
    res.status(304).send(); 
  } 
}

module.exports = postContentMW;