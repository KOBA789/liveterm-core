var url = require('url');

function isObject(obj) {
  return typeof obj === 'object' && obj !== null;
}

module.exports = (function () {
  function BaseController(req, res, params) {
    this.request = req;
    this.response = res;
    this.params = params;
    var parsedUrl = url.parse(this.request.url, true);
    if (isObject(parsedUrl) && isObject(parsedUrl.query)) {
      for (var key in parsedUrl.query) {
        this.params[key] = parsedUrl.query[key];
      }
    }
  }

  return BaseController;
})();