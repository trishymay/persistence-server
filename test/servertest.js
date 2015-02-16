'use strict';

require('../server');
var chai = require('chai');
var chaihttp = require('chai-http');
var fs = require('fs');
var mocha = require('mocha');

chai.use(chaihttp);

var expect = chai.expect;
var file1 = '{"idNum":"1"}';
var file10 = '{"idNum":"10"}';
var patch = '{"idNum":"10","love":"tardis"}';


describe('server', function() {

  mocha.beforeEach(function(done) {
    fs.writeFile('./data/1.json', '{"idNum":"1"}');
    done();
  });
   mocha.after(function(done) {
    fs.unlink('./data/10.json');
    done();
  });

  it('should GET - read a file', function(done) {
    chai.request('localhost:3000')
      .get('/daleks/1')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(file1);
        done();
      });
  });

  it('should POST - create a file', function(done) {
    chai.request('localhost:3000')
      .post('/daleks/10')
      .send({"idNum":"10"})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(file10);
        done();
      });
  });

  it('should PUT - replace contents of a file', function(done) {
    chai.request('localhost:3000')
      .put('/daleks/1')
      .send({"idNum":"10"})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(file10);
        done();
      });
  });

  it('should PATCH - update contents of a file', function(done) {
    chai.request('localhost:3000')
      .patch('/daleks/1')
      .send({"idNum":"10","love":"tardis"})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(patch);
        done();
      });
  });

  it('should DELETE - delete a file', function(done) {
    chai.request('localhost:3000')
      .delete('/daleks/1')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('delete successful');
        done();
      }
    );
  });

});