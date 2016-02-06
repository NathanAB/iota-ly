var app = require('./server/app-factory');
var config = require('./server/config');
var http = require('http').Server(app);

/* Listen */
http.listen((process.env.PORT || config.port), function(){
  console.log('listening on localhost:' + (process.env.PORT || config.port));
});