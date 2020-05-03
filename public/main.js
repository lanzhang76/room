// var uuid = localStorage.getItem('mfadtuuid');
// if (uuid == null) {
//     uuid = Math.random().toString(24) + new Date();
//     localStorage.setItem('mfadtuuid', uuid);
// }
// var socket = io({
//     query: {
//         uuid: uuid
//     }
// });
var socket = io();
contentView();
socket.emit('page', window.location.pathname);
// socket.emit('query-log', 0);
// var requested = false;

// socket.on("requested", (msg) => {
//     msg.forEach(element => {
//         parseMsgBefore(element);
//     });
//     $("#bulletin_board").animate({
//         scrollTop: $("#bulletin_board").prop('scrollHeight')
//     }, 300, 'linear');
//     // Start listening to update only after received initial query
//     if (!requested) {
//         requested = true;
//         socket.on('update', (msg) => {
//             parseMsgAfter(msg);
//             $("#bulletin_board").animate({
//                 scrollTop: $("#bulletin_board").prop('scrollHeight')
//             }, 300, 'linear');
//         })
//     }
// });


// var offset = 10;
// $('#load').click(() => {
//     socket.emit('query-log', offset);
//     offset = offset + 10;
// })


socket.on('update', (data) => {
    parseMsgAfter(data);
})


function contentView() {
    // Push project name, student name, project path to the server
    if (document.querySelectorAll('.hindsight-metadata').length > 0) {
        project = [];
        var projectdiv = document.querySelectorAll('.hindsight-metadata');
        projectdiv.forEach(function (item) {
            project.push(item.getAttribute('data-value'));
        })
        // takes the entire url
        project.push(window.location.href);
        console.log(project)
        socket.emit("contentView", project);
    }
}

function parseMsgBefore(msg) {
    if (msg.name == null) {
        $('.messages').prepend($('<p>').text(msg.sen)); //prepend text
    } else {
        var url = `${msg.path}`;
        var sent = `<a href=${url}><span>${msg.name}</span></a>`;
        var output = `<span>${msg.sen.replace(msg.name, sent)}</span>`;
        $('.messages').prepend(output);
    }
}

function parseMsgAfter(msg) {
    if (msg.name == null) {
        $('.messages').append($('<span>').text(msg.sen)); //append text
    } else {
        var url = `${msg.path}`;
        var sent = `<a href=${url}><span>${msg.name}</span></a>`;
        var output = `<span>${msg.sen.replace(msg.name, sent)}</span>`;
        $('.messages').append(output);
    }
}