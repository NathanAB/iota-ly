var ContentProvider = require('../../models/content');

function getContentMW(req, res) {
  ContentProvider.findContents(req.user._id, function(err, contents){
    if(err){ res.status(401); }
    res.status(200).json({contents: contents}); 
  });
}

module.exports = getContentMW;