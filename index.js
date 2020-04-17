var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
// components:
var getID = require('./components/uniqueID');
var goodbye = require('./components/goodbye');

// static files: css,js
app.use(express.static('public'))

// route to default page
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


// server listens on:
var port = process.env.PORT || 5000;
http.listen(port, function () {
    console.log('listening on *:5000');
});


// Global variables
var totalVisitor = 0
var currentVisitors = []

// io connection:
io.on('connection', function (socket) {
    console.log('a user connected: ' + socket.id);

    // we could also just use io.sockets.clients().length for totalVisitors

    var addedUser = false;

    let handshake = socket.handshake;
    const user = {
        // unique_name: "Anonymous " + getsUniqueId(),
        unique_name: getID.getsID(),
        time: handshake.time,
        id: socket.id,
        ip: handshake.headers.host + " " + handshake.address,
        open_sen: '',
        end_sen: '',
        goodbye: goodbye.goodbye()
    }


    // connect + update users
    socket.on('join', function (data) {
        if (addedUser) return;

        addUser();
        addedUser = true;
        console.log(`visitors: ${totalVisitor}`)
        user.open_sen = data[0]
        user.end_sen = data[1]
        io.sockets.emit('update', { user: user, connections: totalVisitor });
    });


    // disconenct
    socket.on('disconnect', function () {
        if (addedUser) {
            io.sockets.emit('disconnect', `${user.unique_name} left the show, ${user.goodbye}`)
            subUser();
        }
    });

    // ping timerout

});



// some methods:
function addUser() {
    totalVisitor++;
}

function subUser() {
    totalVisitor--;
}


