var util = require('util'),
    BaseController = require('./base');

module.exports = (function () {
  function TopController () {
    BaseController.call(this);
    
  }
  util.inherits(TopController, BaseController);
  
  TopController.prototype.index = function () {
    
  };

  TopController.prototype.about = function () {
    
  };

})();