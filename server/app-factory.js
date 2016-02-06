/* Modules */
var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var TokenStrategy = require('passport-token').Strategy;

var config = require('./config.json');
var UserProvider = require('./models/user.js');

/* Middlewares */
var registerMW = require('./routes/register');
var loginMW = require('./routes/login');

var getContentMW = require('./routes/api/content-get');
var postContentMW = require('./routes/api/content-post');

/* Configuration */
app.use('/static', express.static(__dirname + '/../client'));
//app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
mongoose.connect((process.env.MONGOLAB_URI || config.mongoURI));
passport.use(new LocalStrategy(UserProvider.authenticate()));
passport.use(new TokenStrategy(function (username, token, done) {
  UserProvider.findOne({ username: username }, function (err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    jwt.verify(token, config.jwtSecret, function(err, decoded) {
      if (err) { return done(null, false); }
      return done(null, user);
    });
  });
}));

/* Routes */
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/../client/index.html'));
});

/* Temp Routes */
app.get('/login', function(req, res){
  res.sendFile(path.join(__dirname + '/../client/login.html'));
});

app.get('/register', function(req, res){
  res.sendFile(path.join(__dirname + '/../client/register.html'));
});
/* End Temp Routes */

app.post('/register', registerMW);
app.post('/login', loginMW);

app.use('/api', passport.authenticate('token', { session: false }));
app.get('/api/content', getContentMW);
app.post('/api/content', postContentMW);

module.exports = app;