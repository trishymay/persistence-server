'use strict';

var fs = require('fs');
var path = require('path');
var url = require('url');

module.exports = function(req, res) {
  var urlpieces = req.url.split('/');
  var id = urlpieces[urlpieces.length-1];
  var filename = id + ".json";
  var fullPath = './data/' + filename;
  var file;
  var input;

  if (req.method === 'POST') {
    req.on('data', function(data) {
      input = data.toString('utf-8');
    });

    req.on('end', function() {
      fs.open(fullPath, 'wx', function(err) {
        if(err) {
          console.log('file already exists');
          res.writeHead(404);
          res.end();
        } else {
          fs.writeFile(fullPath, input, function(err) {
            res.writeHead(err ? 404 : 200, {'Content-Type': 'application/json'});
            res.write(input);
            console.log("file created");
            res.end();
          });
        }
      });
    });
  } else if (req.method === 'PUT') {
    req.on('data', function(data) {
      input = data.toString('utf-8');
    });
    req.on('end', function() {
      fs.writeFile(fullPath, input, function(err) {
        res.writeHead(err ? 404 : 200, {'Content-Type': 'application/json'});
        res.write(input);
        res.end();
      });
    });
  } else if (req.method === 'PATCH') {
    req.on('data', function(data) {
      input = data.toString('utf-8');
      input = JSON.parse(input);


    });
    req.on('end', function() {
      fs.open(fullPath, 'r+', function(err) {
        if(err) {
          console.log('file doesn\'t exist');
          res.writeHead(404);
          res.end();
        } else {
          fs.readFile(fullPath, function(err, data) {
            if(err) {
              res.writeHead(404);
              res.end();
            } else {
              console.log("patching file");
              file = data.toString('utf8');
              file = JSON.parse(file);

              for(var key in input) {
                file[key] = input[key];
              }
              file = JSON.stringify(file);
            }
            fs.writeFile(fullPath, file, function(err) {
              res.writeHead(err ? 404 : 200, {'Content-Type': 'application/json'});
              res.write(file);
              res.end();
            });
          });
        }
      });
    });
  } else if (req.method === 'DELETE') {
    fs.unlink(fullPath, function(err) {
      res.writeHead(err ? 404 : 200, {'Content-Type': 'application/json'});
      res.end();
    });
  } else if (req.method === 'GET') {
    fs.readFile(fullPath, function(err, data) {
      if(err) {
        res.writeHead(404);
        res.end();
      } else {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(data);
        res.end();
      }
    });
  }
};