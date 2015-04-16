var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

var paths = exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt'),
  'emptyReq' : '/'
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

var readListOfUrls = exports.readListOfUrls = function(){
  //console.log(fs.readFileSync(paths.list,'utf8'));
  return fs.readFileSync(paths.list,'utf8').split("\n");
  // var resultArray = fs.readFileSync(paths.list,'utf8').split('\n');
  // return resultArray;
};

exports.isUrlInList = function(url){
  return _.contains(readListOfUrls(), url);
};

exports.addUrlToList = function(url){
  fs.writeFileSync(paths.list,url+'\n');
};

exports.isURLArchived = function(url){
  var files = fs.readdirSync(paths.archivedSites);
  return _.contains(files, url);
};

exports.downloadUrls = function(){
};

exports.getDataFromFile = function(filename){
  return fs.readFileSync(paths.archivedSites + '/' + filename, 'utf8');
};
