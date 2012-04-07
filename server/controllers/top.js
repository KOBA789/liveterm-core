var util = require('util'),
    fs = require('fs'),
    path = require('path'),
    hogan = require('hogan.js'),
    BaseController = require('./base'),
    templates = {},
    basepath = function (filename) {
      return path.join(__dirname, '../../browser/', filename);
    };

templates.index = '';
fs.readFile(basepath('index.html'), 'utf-8', function (err, data) {
  templates.index = data;
});

module.exports = (function () {
  function TopController () {
    BaseController.apply(this, arguments);    
  }
  util.inherits(TopController, BaseController);
  
  TopController.prototype.index = function () {
    this.response.end(templates.index);
  };

  TopController.prototype.about = function () {

  };

  return TopController;
})();