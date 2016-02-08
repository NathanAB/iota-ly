var ContentProvider = require('../../models/content');

function getContentMW(req, res) {
  ContentProvider.findContents(req.user._id, function(err, contents){
    if(err){ return res.status(401).json(err); }
    res.status(200).json({contents: contents}); 
  });
}

module.exports = getContentMW;