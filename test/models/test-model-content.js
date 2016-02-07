/*
var chai = require('chai');
var should = chai.should();
var mongoose = require('mongoose');

var User = require('../../server/models/user');
var Content = require('../../server/models/content');

describe('Content Model', function() {
  
  var testAccount;
  
  User.collection.drop();
  Content.collection.drop();
  
  beforeEach(function(done){
    User.register({ username: 'username@test.com' }, 'password', function(err, account) {
      testAccount = account;
      done();
    });
  });
  afterEach(function(done){
    testAccount = null;
    User.collection.drop();
    Content.collection.drop();
    done();
  });
  
  it('should save and return string content', function(done){
    Content.post(testAccount._id, 'test string', function(err, content){
        content.should.have.property('type');
        content.type.should.equal('STRING');
        content.should.have.property('half');
        content.half.should.equal(false);
        content.should.have.property('content');
        content.content.should.equal('test string');
      done();
    });
  });
  it('should save and return image content', function(done){
    Content.post(testAccount._id, 'http://i.imgur.com/8MblPGL.png', function(err, content){
        content.should.have.property('type');
        content.type.should.equal('IMAGE');
        content.should.have.property('half');
        content.half.should.equal(true);
        content.should.have.property('content');
        content.content.should.equal('http://i.imgur.com/8MblPGL.png');
      done();
    });
  });
});
*/