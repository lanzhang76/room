var socket = io();

socket.emit('room', window.location.pathname);

socket.on('update', (msg) => {
    $('#messages').append($('<span>').text(msg)); //append text
})

socket.on("contentBroadcast", (msg) => {
    $('#messages').append(msg); //append dom element
});



