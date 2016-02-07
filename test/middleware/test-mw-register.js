var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var proxyquire = require('proxyquire');
var should = chai.should();

chai.use(sinonChai);

var userModelStub = {};
var registerMW = proxyquire('../../server/routes/register', {
  '../models/user.js': userModelStub
});

var res = {};
var req = {};

describe('Register Middleware', function() {
  
  beforeEach(function(){
    res = {
      status: sinon.spy(function(){ return this }),
      json: sinon.spy(),
      send: sinon.spy()
    };
    req.body = {
      email: 'test@test.com',
      password: 'password'
    };
  });
  
  it('should 200 on successful registration', function(){
    userModelStub.register = function(user, password, cb){
        cb(null);
      };
    registerMW(req,res,null);
    res.status.should.have.been.calledWith(200);
    res.send.should.have.been.calledOnce;
  });
  it('should 400 on registering a duplicate user', function(){
    userModelStub.register = function(user, password, cb){
      cb({
        name: "UserExistsError",
        message: "A user with the given username is already registered"
      });
    };
    registerMW(req,res,null);
    res.status.should.have.been.calledWith(400);
  });
  it('should 400 on registering an invalid user', function(){
    userModelStub.register = function(user, password, cb){
      cb({
        name: "UserExistsError",
        message: "A user with the given username is already registered"
      });
    };
  });
});