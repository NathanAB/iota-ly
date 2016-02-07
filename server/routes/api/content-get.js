var ContentProvider = require('../../models/content');

function getContentMW(req, res, next) {
  ContentProvider.findContents(req.user._id, function(err, contents){
    if(err){ 
      //TODO: Check err for status code to return
      res.status(401); 
    }
    res.status(200).json({contents: contents}); 
  });
}

module.exports = getContentMW;