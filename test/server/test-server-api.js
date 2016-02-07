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

describe('API', function() {
  
  User.collection.drop();
  Content.collection.drop();
  
  beforeEach(function(done){
    User.register({ username: 'username@test.com' }, 'password', function(err, account) {
      testAccount = account;
      testToken = jwt.sign(account, config.jwtSecret);
      var newContent = {
        userid: account._id,
        type: 'STRING',
        half: false,
        content: 'test string'
      };
      Content.save(newContent, function(err){
        if(err) { console.log('Error saving content'); }
        done();
      });
    });
  });
  afterEach(function(done){
    testAccount = null;
    testToken = null;
    User.collection.drop();
    Content.collection.drop();
    done();
  });
  
  it('should GET ALL of a user\'s content on /api/content GET', function(done){
    chai.request(server)
      .get('/api/content')
      .set('x-username', testAccount.username)
      .set('x-token', testToken)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.object;
        res.body.contents.should.be.a.array;
        res.body.contents.length.should.equal(1);
        res.body.contents[0].should.have.property('userid');
        res.body.contents[0].userid.should.equal(''+testAccount._id);
        res.body.contents[0].should.have.property('type');
        res.body.contents[0].type.should.equal('STRING');
        res.body.contents[0].should.have.property('half');
        res.body.contents[0].half.should.equal(false);
        res.body.contents[0].should.have.property('content');
        res.body.contents[0].content.should.equal('test string');
        done();
      });
  });
  it('should 401 with wrong token on /api/content GET', function(done){
    chai.request(server)
      .get('/api/content')
      .set('x-username', testAccount.username)
      .set('x-token', 'wrongToken')
      .end(function(err, res){
        res.should.have.status(401);
        done();
      });
  });
  it('should 401 with wrong username on /api/content GET', function(done){
    chai.request(server)
      .get('/api/content')
      .set('x-username', 'wrongUsername')
      .set('x-token', testToken)
      .end(function(err, res){
        res.should.have.status(401);
        done();
      });
  });
  it('should POST new text based content on /api/content POST', function(done){
    chai.request(server)
      .post('/api/content')
      .set('x-username', testAccount.username)
      .set('x-token', testToken)
      .send({ text: 'this is a test string' })
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.content.should.be.object;
        res.body.content.should.have.property('userid');
        res.body.content.userid.should.equal(''+testAccount._id);
        res.body.content.should.have.property('type');
        res.body.content.type.should.equal('STRING');
        res.body.content.should.have.property('half');
        res.body.content.half.should.equal(false);
        res.body.content.should.have.property('content');
        res.body.content.content.should.equal('this is a test string');
        done();
      });
  });
  it('should POST new image based content on /api/content POST', function(done){
    chai.request(server)
      .post('/api/content')
      .set('x-username', testAccount.username)
      .set('x-token', testToken)
      .send({ text: 'http://i.imgur.com/8MblPGL.png' })
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.content.should.be.object;
        res.body.content.should.have.property('userid');
        res.body.content.userid.should.equal(''+testAccount._id);
        res.body.content.should.have.property('type');
        res.body.content.type.should.equal('IMAGE');
        res.body.content.should.have.property('half');
        res.body.content.half.should.equal(true);
        res.body.content.should.have.property('content');
        res.body.content.content.should.equal('http://i.imgur.com/8MblPGL.png');
        done();
      });
  });
  it('should 401 with invalid token on /api/content POST', function(done){
    chai.request(server)
      .post('/api/content')
      .set('x-username', testAccount.username)
      .set('x-token', 'wrongToken')
      .end(function(err, res){
        res.should.have.status(401);
        done();
      });
  });
  it('should 401 with wrong username on /api/content POST', function(done){
    chai.request(server)
      .post('/api/content')
      .set('x-username', 'wrongUsername')
      .set('x-token', testToken)
      .end(function(err, res){
        res.should.have.status(401);
        done();
      });
  });
  it('should 304 sending nothing on /api/content POST', function(done){
    chai.request(server)
      .post('/api/content')
      .set('x-username', testAccount.username)
      .set('x-token', testToken)
      .end(function(err, res){
        res.should.have.status(304);
        done();
      });
  });
  it('should 304 sending empty text on /api/content POST', function(done){
    chai.request(server)
      .post('/api/content')
      .set('x-username', testAccount.username)
      .set('x-token', testToken)
      .send({ text: '' })
      .end(function(err, res){
        res.should.have.status(304);
        done();
      });
  });
});