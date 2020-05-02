var uuid = localStorage.getItem('mfadtuuid');
if (uuid == null) {
    uuid = Math.random().toString(24) + new Date();
    localStorage.setItem('mfadtuuid', uuid);
}
var socket = io({
    query: {
        uuid: uuid
    }
});

contentView();
socket.emit('page', window.location.pathname);
socket.emit('query-log', 0);
var requested = false;

socket.on("requested", (msg) => {
    msg.forEach(element => {
        parseMsgBefore(element);
    });
    $("#bulletin_board").animate({
        scrollTop: $("#bulletin_board").prop('scrollHeight')
    }, 300, 'linear');
    // Start listening to update only after received initial query
    if (!requested) {
        requested = true;
        socket.on('update', (msg) => {
            parseMsgAfter(msg);
            $("#bulletin_board").animate({
                scrollTop: $("#bulletin_board").prop('scrollHeight')
            }, 300, 'linear');
        })
    }
});

var offset = 10;
$('#load').click(() => {
    socket.emit('query-log', offset);
    offset = offset + 10;
})

function contentView() {
    // Push project name, student name, project path to the server
    if (document.querySelectorAll('.hindsight-metadata').length > 0) {
        project = [];
        var projectdiv = document.querySelectorAll('.hindsight-metadata');
        projectdiv.forEach(function (item) {
            project.push(item.getAttribute('data-value'));
        })
        project.push(window.location.pathname);
        socket.emit("contentView", project);
    }
}

function parseMsgBefore(msg) {
    console.log(msg);
    if (msg.name == null) {
        $('#messages').prepend($('<p>').text(msg.sen)); //append text
    } else {
        var url = `${msg.path}`;
        // var url = `${window.location.hostname}${msg.path}`
        console.log(url);
        var sent = `<a href=${url}><span>${msg.name}</span></a>`;
        var output = `<p>${msg.sen.replace(msg.name, sent)}</p>`;
        $('#messages').prepend(output);
    }
}

function parseMsgAfter(msg) {
    console.log(msg);
    if (msg.name == null) {
        $('#messages').append($('<p>').text(msg.sen)); //append text
    } else {
        var url = `${msg.path}`;
        // var url = `${window.location.hostname}:5000${msg.path}`
        console.log(url);
        var sent = `<a href=${url}><span>${msg.name}</span></a>`;
        var output = `<p>${msg.sen.replace(msg.name, sent)}</p>`;
        $('#messages').append(output);
    }
}