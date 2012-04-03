var http = require('http'),
    url = require('url'),
    EventEmitter = require('events').EventEmitter;

var router = new (require('router-line').Router),
    pty = require('pty.js'),
    socketio = require('socket.io');

var app = http.createServer(function (req, res) {
  
});

var io = socketio.listen(app);

app.listen(8124);