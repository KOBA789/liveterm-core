var http = require('http'),
    url = require('url'),
    path = require('path'),
    EventEmitter = require('events').EventEmitter;

var router = new (require('router-line').Router),
    socketio = require('socket.io'),
    fileServer = new(require('node-static').Server)(path.join(process.cwd(), '/../browser'));

var mterm = new (require('../master_terminal'))(80, 30),
    app,
    io,
    handlers = {};

mterm.open();

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
  var target = router.route(req.method.toUpperCase(),
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
  socket.on('create', function () {
    socket.emit('snapshot', mterm.snapshot());
  });
  socket.on('data', function (data) {
    mterm.write(data);
    socket.broadcast.emit('input', data);
  });
});

app.listen(8124);