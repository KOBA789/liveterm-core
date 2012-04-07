var http = require('http'),
    url = require('url'),
    path = require('path'),
    EventEmitter = require('events').EventEmitter;

var router = new (require('router-line').Router),
    socketio = require('socket.io'),
    fileServer = new(require('node-static').Server)(path.join(__dirname, '/../browser'));

var mterm = new (require('../master_terminal'))(80, 30),
    app,
    io,
    controllers = {};

controllers.top = require('./controllers/top');
controllers.channels = require('./controllers/channels');

// routes
router.GET('/', {
  controller: controllers.top,
  action: 'index'
});
router.GET('/about', {
  controller: controllers.top,
  action: 'about'
});

/*
router.GET('/auth/:provider', {
  controller: controllers.auth,
  action: 'show'
});
router.GET('/auth/:provider/callback', {
  controller: controllers.auth,
  action: 'create'
});
 */

router.GET('/channels', {
  controller: controllers.channels,
  action: 'index'
});
router.POST('/channels', {
  controller: controllers.channels,
  action: 'create'
});
router.GET('/channels/new', {
  controller: controllers.channels,
  action: 'new'
});
router.GET('/channels/:id', {
  controller: controllers.channels,
  action: 'show'
});

app = http.createServer(function (req, res) {
  var reqUrl = url.parse(req.url);
  var target = router.route(req.method.toUpperCase(),
                            reqUrl.pathname);
  if (target === undefined) {
    req.on('end', function () {
      fileServer.serve(req, res);
    });
  } else {
    var Controller = target.value.controller;
    var action = target.value.action;
    var controller = new Controller(req, res, target.params);
    controller[action]();
  }
});

mterm.open();

io = socketio.listen(app);

io.configure(function () {
  io.disable('log');
});

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