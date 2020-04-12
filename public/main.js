var socket = io();

// variables:
var openning = ['Look!', "It's pouring outside,"]
var ending = ['walked into the space.', 'heard about the event and came to the show.', ' showed up at the MFA Design and Technology Thesis show.']
var hided = false;

// buttons:
$('#consent_button').click(function () {
    if (hided == false) {
        socket.connect();
        showBook();
        $('.bulletin_board').show();
    } else {
        $('.bulletin_board').show();
        hided = false
    }
});

$('#book_exit').click(function () {
    $('.bulletin_board').hide();
    console.log(socket.connected)
    socket.disconnect();
    console.log(socket.connected)
    $('#messages').empty();
});

$('#book_hide').click(() => {
    $('.bulletin_board').hide();
    hided = true;
})

// after visitor opts in:
function showBook() {
    // TODO: needs to solve how to exit then reconnect
    console.log("opted in")

    // initialize:
    // when connects, emits to the server the random combination 
    socket.emit('join', pickCombo(openning, ending));
    socket.on('join', function (msg) {
        var sen = "on " + msg.time
        $('#messages').append($('<span>').text(msg.open_sen));
        $('#messages').append($('<span style="color:blue">').text(msg.unique_name));
        $('#messages').append($('<span>').text(sen));
        $('#messages').append($('<span>').text(msg.end_sen));
    });


    // count:
    // receive counts:
    socket.on('count', function (msg) {
        var count_msg = `Currently, there are ${msg.connections} people in the exhibition.`
        $('#messages').append($('<span>').text(count_msg));
    });


    // disconnect:
    // receive disconenction message from the server then displays it
    socket.on('disconnect', function (msg) {
        $('#messages').append($('<span>').text(msg));
    });


    // functions:
    function pickCombo(a, b) {
        var a_word = a[Math.floor(Math.random() * a.length)]
        var b_word = b[Math.floor(Math.random() * b.length)]
        return [a_word, b_word]
    }

}