var chai = require('chai');
var should = chai.should();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var User = require('../../server/models/user');
var Content = require('../../server/models/content');
var loginMW = require('../../server/routes/login');

passport.use(new LocalStrategy(User.authenticate()));

describe('Login Middleware', function() {
  it('should 200 on successful login authorization');
  it('should 401 on wrong username/password combination');
  it('should 401 on non-existant user');
});