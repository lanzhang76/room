// variables:
var openning = ['Look!', "It's pouring outside,"]
var ending = ['walked into the space.', 'heard about the event and came to the show.', ' showed up at the MFA Design and Technology Thesis show.']



$('#book_hide').click(() => {
    $('.bulletin_board').toggle()
    console.log($('#book_hide').val())
    $('#book_hide').html($("#book_hide").html() === "✕" ? "✐" : "✕")
})

// after visitor opts in:
function showBook() {
    $('.bulletin_board').show();
    // initialize:
    // when connects, emits to the server the random combination 
    socket.emit('join', pickCombo(openning, ending));
    socket.on('update', function (msg) {
        var sen = `at ${msg.user.time_hourminute} on ${msg.user.time}`;
        $('#messages').append($('<span>').text(msg.user.open_sen));
        $('#messages').append($('<span style="color:royalblue">').text(msg.user.unique_name));
        $('#messages').append($('<span>').text(sen + ' '));
        $('#messages').append($('<span>').text(msg.user.birdOrOwl + ' '));
        $('#messages').append($('<span>').text(msg.user.end_sen + ' '));
        $('#messages').append($('<span>').text(msg.countmsg));
    });

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


showBook();