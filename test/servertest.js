'use strict';

require('../server');
var chai = require('chai');
var chaihttp = require('chai-http');
var fs = require('fs');

chai.use(chaihttp);

var expect = chai.expect;
var file1 = '{"idNum":"1"}';

describe('server', function() {

  beforeEach(function() {
    fs.writeFile('./data/1.json', '{"idNum":"1"}');
  });
   after(function() {
    fs.unlink('./data/10.json');
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
      .send({"idNum":"1"})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(file1);
        done();
      });
  });

  it('should read a file', function(done) {
    chai.request('localhost:3000')
      .get('/daleks/1')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(file1);
        done();
      });
  });

  it('should read a file', function(done) {
    chai.request('localhost:3000')
      .get('/daleks/1')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(file1);
        done();
      });
  });

  it('should read a file', function(done) {
    chai.request('localhost:3000')
      .get('/daleks/1')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(file1);
        done();
      });
  });

  it('should read a file', function(done) {
    chai.request('localhost:3000')
      .get('/daleks/1')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(file1);
        done();
      });
  });

});