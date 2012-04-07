var tty = require('tty'),
    pty = require('pty.js'),
    io = require('socket.io-client');

var url = process.env.DEVELOP ? 'http://localhost:8124' : 'http://pronama14.koba789.com',
    socket = io.connect(url),
    term = pty.spawn(process.env.SHELL, [], {
      name: 'xterm',
      cols: 80,
      rows: 30,
      cwd: process.env.HOME
    });

/*
term.on('data', function(data) {
  console.log(data);
});
*/
process.stdin.resume();
tty.setRawMode(true);

term.pipe(process.stdout);
process.stdin.pipe(term);

term.on('data', function (data) {
  socket.emit('data', data);
});

term.on('exit', function () {
  process.exit();
});