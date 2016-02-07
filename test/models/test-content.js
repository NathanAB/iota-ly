var chai = require('chai');
var should = chai.should();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Content = require('../../server/models/content');

describe('Content Model', function() {
  
  var schema = Content.schema.paths;
  var testAccount = {
    _id: '123abc'
  }
  
  describe('Schema', function(){
    it('should have userid field', function(){
      schema.userid.should.exist;
      schema.userid.instance.should.equal('ObjectID');
    });
    it('should have content field', function(){
      schema.content.should.exist;
      schema.content.instance.should.equal('String');
    });
    it('should have original field', function(){
      schema.original.should.exist;
      schema.original.instance.should.equal('String');
    });
    it('should have embed field', function(){
      schema.embed.should.exist;
      schema.embed.instance.should.equal('String');
    });
    it('should have title field', function(){
      schema.title.should.exist;
      schema.title.instance.should.equal('String');
    });
    it('should have img field', function(){
      schema.img.should.exist;
      schema.img.instance.should.equal('String');
    });
    it('should have type field', function(){
      schema.type.should.exist;
      schema.type.instance.should.equal('String');
    });
    it('should have half field', function(){
      schema.half.should.exist;
      schema.half.instance.should.equal('Boolean');
    });
    it('should have postdate field', function(){
      schema.postdate.should.exist;
      schema.postdate.instance.should.equal('Date');
    });
    it('should have lastupdate field', function(){
      schema.lastupdate.should.exist;
      schema.lastupdate.instance.should.equal('Date');
    });
  });
  
  describe('Functions', function(){
    it('should return contents on valid findContents', function(done){
      Content.findContents('123abc', function(err, contents){
        if(err){ throw err }
        contents.type.should.equal('Array');
        done();
      });
    });
    it('should return err on invalid findContents');
    it('should return saved content on valid save');
    it('should return err on invalid save');
    it('should return posted on valid post');
    it('should return err on invalid post');
    /*it('should save and return string content', function(done){
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
    });*/
  });
});