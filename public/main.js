var uuid = localStorage.getItem('mfadtuuid');
if(uuid == null){
    uuid = Math.random().toString(24) + new Date();
    localStorage.setItem('mfadtuuid', uuid);
}
var socket = io({ query: { uuid: uuid } });

socket.emit('query-log', 0);
socket.emit('page', window.location.pathname);
contentView();

socket.on('update', (msg) => {
    if (Object.keys(msg).length == 1) {
        $('#messages').append($('<span>').text(msg.sen)); //append text
    } else {
        console.log(msg)
        var url = `${window.location.hostname}:5000${msg.path}`
        console.log(url);
        var sent = `<a href=${url}><span>${msg.name}</span></a>`
        var output = `<span>${msg.sen.replace(msg.name, sent)}</span>`
        $('#messages').append(output);
    }
})

socket.on("requested", (msg) => {
    msg.forEach(element => {
        $('#messages').prepend($('<p>').text(element.text)); //append dom element
    });
});

var offset = 10;
$('#load').click(()=>{
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
        console.log(window.location.pathname)
        project.push(window.location.pathname);
        socket.emit("contentView", project);
    }
}
