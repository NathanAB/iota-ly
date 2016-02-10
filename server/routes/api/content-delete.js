var ContentProvider = require('../../models/content');

function deleteContentMW(req, res) {
  if(req.body.contentid) { 
    ContentProvider.findOneAndRemove({ _id: req.body.contentid }, function(err, deleted){
      if(err){ return res.status(401).send(); }
      if(!deleted){ return res.status(304).send() }
      return res.status(200).send()
    });
  } else { return res.status(304).send() }
}

module.exports = deleteContentMW;