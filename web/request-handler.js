var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
// var http = require('http-request');
var helpers = require('./http-helpers.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var statuscode = 404;
  var responseData = null;

  console.log(req.url);
  console.log(req.method);
  archive.downloadUrls();


  //handle GET requests
  if(req.method === 'GET' && req.url === '/'){
    statuscode = 200;
    fs.readFile(archive.paths.siteAssets + '/index.html', function (err,data) {
      if (err) {
        console.log('error',archive.paths.siteAssets + 'index.html');
        statuscode = 404;
        responseData = JSON.stringify(err);
        return;
      } else{
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      }
    });
  } else if(req.method === 'GET' && req.url === '/styles.css'){
    console.log('asked for style sheet')
    fs.readFile(archive.paths.siteAssets + '/styles.css', function (err,data) {
      if (err) {
        console.log('error',archive.paths.siteAssets + 'index.html');
        statuscode = 404;
        responseData = JSON.stringify(err);
        return;
      } else{
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.end(data);
      }
    });

  } else if(req.method === 'GET' && req.url[0] === '/' && req.url.length > 1){
    var filename = req.url.substring(1);
  } else if(req.method === 'POST' && req.url[0] === '/'){
    console.log('in post');
    var data = '';
    req.on('data',function(chunk){
      data +=chunk;
    });
    req.on('end',function(){
      console.log('data: ', data);
      var filename = data.substring(4);
      if(!archive.isUrlInList(filename) && !archive.isURLArchived(filename)){
        console.log('in the if block');
        statuscode = 302;
        archive.addUrlToList(filename);
      }else if (archive.isURLArchived(filename)){
        res.writeHead(302, {'Content-Type': 'text/html'});
        res.end(archive.getDataFromFile(filename));
      }else{
        fs.readFile(archive.paths.siteAssets + '/loading.html', function (err,data) {
          if (err) {
            console.log('error',archive.paths.siteAssets + 'loading.html');
            statuscode = 404;
            responseData = JSON.stringify(err);
            return;
          } else{
            console.log('getting loading.html',data);
            res.writeHead(302, {'Content-Type': 'text/html'});
            res.end(data);
          }
        });
      }
    });
  }
  console.log(helpers.headers);
  //res.writeHead(statuscode, helpers.headers);
  //res.end(responseData);
  // res.end();
};
