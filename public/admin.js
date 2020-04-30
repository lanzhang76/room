// Detects keydown
var down = { 16: false, 17: false, 68: false, 69: false, 86: false };
// shift + ctl + dev

$(document)
    .keydown(function (e) {
        down[e.keyCode] = true;
    })
    .keyup(function (e) {
        if (down[16] && down[17] && down[68] && down[69] && down[86]) {
            $("#guestbook-admin").show();
        }
        down[e.keyCode] = false;
    })

// Detects push socket info
$('#guestbook-admin').draggable();

$('#admin-button').click((e) => {
    e.preventDefault();
    var msg = $("#admin-msg").val();
    $("#admin-msg").val('');
    socket.emit("admin-msg", msg);
})

$('#admin-exit').click((e) => {
    $("#admin-msg").val('');
    $("#guestbook-admin").hide();
    console.log("hide")
})

// socket.on('mc', function (msg) {
//     $('#messages').append($('<span>').text(` ${msg}`));
// });
