var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var proxyquire = require('proxyquire');
var should = chai.should();

chai.use(sinonChai);

var contentModelStub = {};
var getContentMW = proxyquire('../../../server/routes/api/content-get', {
  '../../models/content': contentModelStub
});

var res = {};
var req = {};

describe('Get Content Middleware', function() {
  
  beforeEach(function(){
    res = {
      status: sinon.spy(function(){ return this }),
      json: sinon.spy(),
      send: sinon.spy()
    };
    req.user = {
      _id: '123abc'
    };
  });
  
  it('should 200 and return contents given authorized user', function(){
    contentModelStub.findContents = function(user, cb){
      cb(null, [{content: 'content1'},{content: 'content2'}]);
    }
    getContentMW(req, res);
    res.status.should.have.been.calledWith(200);
    res.json.should.have.been.calledWith({ contents: [{content: 'content1'},{content: 'content2'}] });
  });
  it('should 401 given content.findContents returns err', function(){
    contentModelStub.findContents = function(user, cb){
      cb({err: 'error'});
    }
    getContentMW(req, res);
    res.status.should.have.been.calledWith(401);
  });
});