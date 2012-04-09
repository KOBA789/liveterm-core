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
    viewers = 0;

app = http.createServer(function (req, res) {
  req.on('end', function () {
    fileServer.serve(req, res);
  });
});

mterm.open();

io = socketio.listen(app);

io.configure(function () {
  io.disable('log');
});

io.sockets.on('connection', function (socket) {
  function counter () {
    io.sockets.emit('counter', viewers);
  }

  viewers ++;
  counter();

  socket.on('create', function () {
    socket.emit('snapshot', mterm.snapshot());
  });
  socket.on('data', function (data) {
    mterm.write(data);
    socket.broadcast.emit('input', data);
  });
  socket.on('disconnect', function () {
    viewers --;
    counter();
  });
});

app.listen(process.env.PORT || 80);