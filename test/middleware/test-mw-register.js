var chai = require('chai');
var should = chai.should();
var mongoose = require('mongoose');

var User = require('../../server/models/user');
var Content = require('../../server/models/content');

var passport = require('passport');
var jwt = require('jsonwebtoken');

var loginMW = require('../../server/routes/login');

describe('Register Middleware', function() {
  it('should 200 on successful registration');
  it('should 400 on registering a duplicate user');
  it('should 400 on registering an invalid user');
});