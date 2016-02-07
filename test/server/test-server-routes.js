var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var config = require('../../server/config.json');
var server = require('../../server/app-factory');
var User = require('../../server/models/user');
var Content = require('../../server/models/content');

chai.use(chaiHttp);

var testAccount;
var testToken;

describe('Routes', function() {
  
  beforeEach(function(done){
    User.collection.drop();
    User.register({ username: 'username@test.com' }, 'password', function(err, account) {
      testAccount = account;
      testToken = jwt.sign(account, config.jwtSecret);
      done();
    });
  });
  afterEach(function(done){
    testAccount = null;
    testToken = null;
    User.collection.drop();
    done();
  });
  
  it('should register a user on /register POST', function(done){
    chai.request(server)
      .post('/register')
      .send({
        email: 'test@test.com',
        password: 'test'
      })
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });
  it('should 400 registering a duplicate user on /register POST', function(done){
    chai.request(server)
      .post('/register')
      .send({
        email: 'username@test.com',
        password: 'password2'
      })
      .end(function(err, res){
        res.should.have.status(400);
        done();
      });
  });
  it('should login a user on /login POST');
  it('should 401 invalid user on /login POST');
});