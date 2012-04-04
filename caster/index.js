var tty = require('tty'),
    pty = require('pty.js');

var term = pty.spawn(process.env.SHELL, [], {
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

term.on('exit', function () {
  process.exit();
});