var util = require('util'),
    BaseController = require('./base');

module.exports = (function () {
  function ChannelsController () {
    BaseController.apply(this, arguments);
    
  }
  util.inherits(ChannelsController, BaseController);
  
  ChannelsController.prototype.index = function () {
    
  };

  ChannelsController.prototype.create = function () {
    
  };

  ChannelsController.prototype.new = function () {
    
  };

  ChannelsController.prototype.show = function () {
    
  };
  
  return ChannelsController;
})();