var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var proxyquire = require('proxyquire');
var should = chai.should();

chai.use(sinonChai);

var contentModelStub = {};
var deleteContentMW = proxyquire('../../../server/routes/api/content-delete', {
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
      contentid: 'test'
    };
  });
  
  it('should 200 on content deleted', function(){
    contentModelStub.findOneAndRemove = function(content, cb){
      cb(null, { deleted: 'deleted '});
    }
    deleteContentMW(req, res);
    res.status.should.have.been.calledWith(200);
    res.send.should.have.been.called;
  });
  it('should 401 given invalid user', function(){
    contentModelStub.findOneAndRemove = function(content, cb){
      cb({ err: 'error' });
    }
    deleteContentMW(req, res);
    res.status.should.have.been.calledWith(401);
    res.send.should.have.been.called;
  });
  it('should 304 on no content id given', function(){
    req.body.contentid = '';
    deleteContentMW(req, res);
    res.status.should.have.been.calledWith(304);
    res.send.should.have.been.called;
  });
  it('should 304 if nothing was deleted', function(){
    contentModelStub.findOneAndRemove = function(content, cb){
      cb(null, null);
    }
    deleteContentMW(req, res);
    res.status.should.have.been.calledWith(304);
    res.send.should.have.been.called;
  });
});