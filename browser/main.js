var noop = function () { /* do nothing */ };

var socket = io.connect();

var term = new Terminal(80, 30, noop);

socket.on('connect', function () {
  term.open();
  socket.emit('create');
});

socket.on('input', function (data) {
  term.write(data);
});

socket.on('snapshot', function (data) {
  for (var prop in data) {
    term[prop] = data[prop];
  }
});