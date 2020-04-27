var uuid = localStorage.getItem('uUID');
if(uuid == null){
    uuid = Math.random().toString(24) + new Date();
    localStorage.setItem('uUID', uuid);
}
var socket = io({ query: { uuid: uuid } });

socket.emit('page', window.location.pathname);

socket.on('update', (msg) => {
    $('#messages').append($('<span>').text(msg)); //append text
})

socket.on("contentBroadcast", (msg) => {
    $('#messages').append(msg); //append dom element
});



