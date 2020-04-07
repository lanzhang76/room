var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

// static files: css,js
app.use(express.static('public'))

// route to default page
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

// variabls
var totalVisitor = 0

// io connection:
io.on('connection', function (socket) {
    let handshake = socket.handshake;
    var str = handshake.headers.host + handshake.address + " on " + handshake.time;

    // disconenct
    socket.on('disconnect', function () {
        var farewell = ['feeling inspired.', "still thinking about the last piece he saw."]
        io.emit('disconnect', `${handshake.headers.host} left the show, ${pickRand(farewell)}`)
        subUser();
    });

    // connect
    socket.on('join', function (msg) {
        console.log(msg)
        io.emit('join', msg[0] + str + msg[1]);
    });

    //calculate user
    addUser();
    socket.emit('count', { connections: totalVisitor });
});

// some methods:
function addUser() {
    totalVisitor++;
}

function subUser() {
    totalVisitor--;
}

function pickRand(li) {
    var picked = li[Math.floor(Math.random() * li.length)]
    return picked
}





// server listens on:
http.listen(3000, function () {
    console.log('listening on *:3000');
});