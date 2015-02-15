'use strict';

var http = require('http');
var router = require('./lib/router');

var routes = {};
routes['daleks'] = router;

var server = http.createServer(function(req, res) {
  var pathBits = req.url.split("/");

  if (typeof(routes[pathBits[1]]) === 'function') {
    routes[pathBits[1]](req, res);
  } else {
    res.writeHead(404, {
      'Content-Type': 'application/json'
    });
    console.log(pathBits);
    console.log(pathBits[0]);
    res.write(JSON.stringify({msg: 'page not found'}));
    res.end();
  }
});

server.listen(3000, function() {
  console.log('server listening');
});