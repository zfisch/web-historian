var path = require('path');
var archive = require('../helpers/archive-helpers');
var http = require('http-request');
var helpers = require('./http-helpers.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var statuscode = 404;
  var responseData = null;

  console.log(req.url);
  console.log(req.method);

  //handle GET requests
  if(req.method === 'GET' && req.url === '/'){
    statuscode = 200;
    responseData = '<input';
  } else if(req.method === 'GET' && req.url[0] === '/' && req.url.length > 1){
    var filename = req.url.substring(1);
    if (archive.isURLArchived(filename)){
      statuscode = 200;
      responseData = archive.getDataFromFile(filename);
    }
  } else if(req.method === 'POST' && req.url[0] === '/'){
    var data = '';
    req.on('data',function(chunk){
      data +=chunk;
    });
    req.on('end',function(){
      var filename = data.substring(4);
      if(!archive.isUrlInList(filename) && !archive.isURLArchived(filename)){
        statuscode = 302;
        archive.addUrlToList(filename);
      }
    });
  }
  res.writeHead(statuscode, helpers.headers);
  res.end(responseData);
};
