var chai = require('chai');
var should = chai.should();

var mongoose = require('mongoose');
var config = require('../../server/config.json');

var User = require('../../server/models/user');

describe('User Model', function() {
  
  var schema = User.schema.paths;
  
  before(function(){
    mongoose.disconnect();
    mongoose.connect(config.testURI);
  });
  after(function(){
    mongoose.disconnect();
  });
  
  describe('Schema', function(){
    it('should have email field', function(){
      schema.email.should.exist;
      schema.email.instance.should.equal('String');
    });
    it('should have hash field', function(){
      schema.hash.should.exist;
      schema.hash.instance.should.equal('String');
    });
    it('should have salt field', function(){
      schema.salt.should.exist;
      schema.salt.instance.should.equal('String');
    });
    it('should have verifed field', function(){
      schema.verified.should.exist;
      schema.verified.instance.should.equal('Boolean');
    });
    it('should have onboard field', function(){
      schema.onboard.should.exist;
      schema.onboard.instance.should.equal('Boolean');
    });
  });
  
  describe('Functions', function(){
    
  });
});