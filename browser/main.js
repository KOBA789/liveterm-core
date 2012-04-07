var noop = function () { /* do nothing */ };

window.onload = function () {
  var socket = io.connect();

  var term = new Terminal(80, 30, noop);

  socket.on('connect', function () {
    term.open();
    socket.emit('create');
  });

  var counter = document.getElementById('counter');

  socket.on('counter', function (num) {
    counter.innerText = num;
  });

  socket.on('input', function (data) {
    term.write(data);
  });

  socket.on('snapshot', function (data) {
    for (var prop in data) {
      term[prop] = data[prop];
    }
    term.refresh(0, 29);
  });
};