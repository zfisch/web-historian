var path = require('path');
var archive = require('../helpers/archive-helpers');
var http = require('http-request');
var helpers = require('./http-helpers.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  //handle GET requests
  if(req.method === 'GET' && req.url === '/'){
    res.writeHead(200, helpers.headers);
    res.end('<input');
  }
  //res.end(archive.paths.list);
};
