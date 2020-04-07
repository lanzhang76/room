var socket = io();
var openning = ['Look! ', "It's pouring outside, "]
var ending = [' walked in to the space.', ' heard about the event and came to the show.', ' showed up at the MFA Design and Technology Thesis show.']

function pickCombo(a, b) {
    var a_word = a[Math.floor(Math.random() * a.length)]
    var b_word = b[Math.floor(Math.random() * b.length)]
    return [a_word, b_word]
}

// when connects, emits to the server the random combination 
// updates on all clients' interface
socket.emit('join', pickCombo(openning, ending));
socket.on('join', function (msg) {
    $('#messages').append($('<span>').text(msg));
});

// receive disconenction message from the server then displays it
socket.on('disconnect', function (msg) {
    $('#messages').append($('<span>').text(msg));
});

socket.on('count', function (msg) {
    var count_msg = `Currently, there are ${msg.connections} people in the exhibition.`
    $('#messages').append($('<span>').text(count_msg));
});


