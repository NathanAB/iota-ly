var ContentProvider = require('../../models/content');

function postContentMW(req, res, next) {
  if(req.body){
    ContentProvider.post(req.user._id, req.body, function(err, content){
    if(err){ return res.status(401).json(err); }
    res.status(200).json(content); 
    });
  } else {
    return res.status(304).send(); 
  } 
}

module.exports = postContentMW;