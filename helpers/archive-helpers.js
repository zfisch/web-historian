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
  var arr = fs.readFileSync(paths.list,'utf8').split('\n');
  return arr;
};

exports.isUrlInList = function(url){
  console.log(readListOfUrls());
  return _.contains(readListOfUrls(), url);
};

exports.addUrlToList = function(){
};

exports.isURLArchived = function(){
};

exports.downloadUrls = function(){
};

exports.getDataFromFile = function(filename){
  return fs.readFileSync(paths.archivedSites + '/' + filename, 'utf8');
};
