var socket = io();
$('#book_hide').click(() => {
    $('.bulletin_board').toggle()
    console.log($('#book_hide').val())
    $('#book_hide').html($("#book_hide").html() === "✕" ? "✐" : "✕")
})


//get room based on url
function assignroom() {
    socket.emit('room', window.location.pathname);
    socket.on('roomAssigned', (msg) => {
        $('#messages').append($('<span>').text(msg));
    })
}

// after visitor opts in:
function showBook() {
    $('.bulletin_board').show();

    // disconnect:
    // receive disconenction message from the server then displays it
    socket.on('disconnect', function (msg) {
        $('#messages').append($('<span>').text(msg));
    });

    socket.on('pong', (latency) => {
        $('#messages').append($('<span>').text("The server is falling asleep as no one is watching."));
    });

    // functions:
    function pickCombo(a, b) {
        var a_word = a[Math.floor(Math.random() * a.length)]
        var b_word = b[Math.floor(Math.random() * b.length)]
        return [a_word, b_word]
    }

}


assignroom();
showBook();