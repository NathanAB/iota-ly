var chai = require('chai');
var sinonChai = require('sinon-chai');
var sinon = require('sinon');
var should = chai.should();
var proxyquire = require('proxyquire');

chai.use(sinonChai);

var res = {},
    req = {};

describe('Login Middleware', function() {
  
  it('should return token on successful login authorization');
  it('should 401 on wrong username/password combination');
  it('should 401 on non-existant user');
});