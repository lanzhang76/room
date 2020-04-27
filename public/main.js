var socket = io().connect("oursever");

socket.emit('room', window.location.pathname);
socket.on('update', (msg) => {
    $('#messages').append($('<span>').text(msg));
})

socket.on("contentBroadcast", (msg) => {
    $('#messages').append(msg);
});



