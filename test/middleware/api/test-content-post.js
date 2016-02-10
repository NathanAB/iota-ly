var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var proxyquire = require('proxyquire');
var should = chai.should();

chai.use(sinonChai);

var contentModelStub = {};
var postContentMW = proxyquire('../../../server/routes/api/content-post', {
  '../../models/content': contentModelStub
});

var res = {};
var req = {};

describe('Post Content Middleware', function() {
    
  beforeEach(function(){
    res = {
      status: sinon.spy(function(){ return this }),
      json: sinon.spy(),
      send: sinon.spy()
    };
    req.user = {
      _id: '123abc'
    };
    req.body = {
      text: 'test'
    };
  });
  
  it('should 200 and return posted content given authorized user', function(){
    contentModelStub.post = function(user, text, cb){
      cb(null, { content: 'content' });
    }
    postContentMW(req, res, null);
    res.status.should.have.been.calledWith(200);
    res.json.should.have.been.calledWith({ content: 'content' });
  });
  it('should 401 given unauthorized user', function(){
    contentModelStub.post = function(user, text, cb){
      cb({err: 'error'});
    }
    postContentMW(req, res, null);
    res.status.should.have.been.calledWith(401);
  });
  it('should 304 given empty text', function(){
    req.body = { text: '' };
    postContentMW(req, res, null);
    res.status.should.have.been.calledWith(304);
  });
  it('should 304 given nothing', function(){
    req.body = {};
    postContentMW(req, res, null);
    res.status.should.have.been.calledWith(304);
  });
});