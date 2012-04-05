var util = require('util');

var Terminal = require('./term.js');

module.exports = (function () {
  function MasterTerminal (cols, rows) {
    Terminal.call(this, cols, rows);
  }
  util.inherits(MasterTerminal, Terminal);

  MasterTerminal.prototype.snapshot = function () {
    return this;
  };

  return MasterTerminal;
})();