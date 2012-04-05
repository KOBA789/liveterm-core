var util = require('util');

var Terminal = require('./term.js');

module.exports = (function () {
  function MasterTerminal (cols, rows) {
    Terminal.call(this, cols, rows);
  }
  util.inherits(MasterTerminal, Terminal);

  MasterTerminal.prototype.snapshot = function () {
    var result = {};
    var copyProps = ['cols', 'rows', 'scrollback', 'ybase', 'ydisp', 'x', 'y', 'cursorState', 'cursorHidden', 'convertEol', 'state', 'outputQueue', 'scrollTop', 'scrollBottom', 'applicationKeypad', 'originMode', 'insertMode', 'wraparoundMode', 'tabs', 'charset', 'normal', 'bgColors', 'fgColors', 'defAttr', 'curAttr', 'keyState', 'keyStr', 'params', 'currentParam', 'lines'];
    for (var i = 0; i < copyProps.length; ++ i) {
      result[copyProps[i]] = this[copyProps[i]];
    }
    return result;
  };

  return MasterTerminal;
})();