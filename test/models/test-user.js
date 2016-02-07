var chai = require('chai');
var should = chai.should();

var User = require('../../server/models/user');

describe('User Model', function() {
  var schema = User.schema.paths;
  
  describe('Schema', function(){
    it('should have username field', function(){
      schema.username.should.exist;
      schema.username.instance.should.equal('String');
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
});