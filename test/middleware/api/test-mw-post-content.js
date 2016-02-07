var chai = require('chai');
var should = chai.should();
var mongoose = require('mongoose');

var User = require('../../../server/models/user');
var Content = require('../../../server/models/content');

var passport = require('passport');
var jwt = require('jsonwebtoken');

var loginMW = require('../../../server/routes/login');

describe('Post Content Middleware', function() {
  it('should 200 and return postsed content given authorized user');
  it('should 401 given unauthorized user (wrong username)');
  it('should 401 given unauthorized user (invalid token)');
  it('should 304 given empty text');
  it('should 304 given nothing');
});