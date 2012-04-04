var http = require('http'),
    url = require('url'),
    EventEmitter = require('events').EventEmitter;

var router = new (require('router-line').Router),
    socketio = require('socket.io'),
    fileServer = new(require('node-static').Server)('../static');

var hub = new (require('../hub')),
    app,
    io,
    handlers = {};

function isObject(obj) {
  return typeof obj === 'object' && obj !== null;
}

/*
 * Routing Table
 */

function Helper(req, res, params) {
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

app = http.createServer(function (req, res) {
  var reqUrl = url.parse(req.url);
  var target = router.router(req.method.toUpperCase(),
                             reqUrl.pathname);
  if (target === undefined) {
    req.on('end', function () {
      fileServer.serve(req, res);
    });
  } else {
    var handler = new Helper(req, res, target.params);
    target.value.call(handler);
  }
});

io = socketio.listen(app);

io.sockets.on('connection', function (socket) {
  socket.emit('snapshot', hub.snapshot());
  socket.on('data', function () {
    socket.emit('data');
  });
});

app.listen(8124);