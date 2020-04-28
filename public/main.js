var uuid = localStorage.getItem('uUID');
if(uuid == null){
    uuid = Math.random().toString(24) + new Date();
    localStorage.setItem('uUID', uuid);
}
var socket = io({ query: { uuid: uuid } });

socket.emit('query-log', 0);
socket.emit('page', window.location.pathname);

socket.on('update', (msg) => {
    $('#messages').append($('<p>').text(msg)); //append text
})

socket.on("contentBroadcast", (msg) => {
    $('#messages').append(msg); //append dom element
});

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


