var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var proxyquire = require('proxyquire');
var should = chai.should();

chai.use(sinonChai);

var passportStub = {},
    jwtStub = {
      sign: function(user, secret){
        return 'token'
      }
    },
    configStub = {
      jwtSecret: 'secret'
    }

var loginMW = proxyquire('../../server/routes/login', {
  'passport': passportStub,
  'jsonwebtoken': jwtStub,
  '../config.json': configStub
});

var res = {};
var req = {};

describe('Login Middleware', function() {
  
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
  describe('Server-side Verification', function(){
    it('should 401 on invalid username', function(){
      req.body.email = '';
      loginMW(req,res,null);
      res.status.should.have.been.calledWith(401);
      res.json.should.have.been.calledWith({ reason: "Invalid E-mail or Password" });
    });
    it('should 401 on invalid password', function(){
      req.body.password = '';
      loginMW(req,res,null);
      res.status.should.have.been.calledWith(401);
      res.json.should.have.been.calledWith({ reason: "Invalid E-mail or Password" });
    });
  });
  describe('Passport Authenticate', function() {
    it('should return token on successful login authorization', function(){
      passportStub.authenticate = sinon.stub().callsArgWith(1, null, {email:'username'}, 'INFO').returns(function(){});
      loginMW(req,res,null);
      res.status.should.have.been.calledWith(200);
      res.json.should.have.been.calledWith({ token: 'token' });
    });
    it('should 401 on wrong username/password combination', function(){
      passportStub.authenticate = sinon.stub().callsArgWith(1, null, false).returns(function(){});
      loginMW(req,res,null);
      res.status.should.have.been.calledWith(401);
      res.json.should.have.been.calledWith({ reason: "Invalid E-mail or Password" });
    });
    it('should 500 on error', function(){
      passportStub.authenticate = sinon.stub().callsArgWith(1, { err: 'err' }).returns(function(){});
      loginMW(req,res,null);
      res.status.should.have.been.calledWith(500);
      res.json.should.have.been.calledWith({ reason: "Resources are unavailable at this time" });
    });
  });
});