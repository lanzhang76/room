const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    pingInterval: 600000, // server check if it's resting after 10 mins
    pingTimeout: 60000 // server rests after 1 minute of no activity
});
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

// reg io connection:
io.of('/').on('connection', function (socket) {
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

        addUser(); // user count
        addedUser = true;


        user.open_sen = data[0]
        user.end_sen = data[1]
        io.sockets.emit('update', { user: user, connections: totalVisitor });
    });


    // disconenct
    socket.on('disconnect', function () {
        if (addedUser) {
            io.sockets.emit('disconnect', `${user.unique_name} left the show, ${user.goodbye}`)
            subUser(); // user count
        }
    });

    // ping timerout
    socket.on('ping', () => {
        console.log("server is sleeping")
        io.sockets.emit('p', `sleeping!`);
    });

    //admin broadcast
    socket.on('admin-msg', (data) => {
        io.sockets.emit('mc', data);
    })

});





// some methods:
function addUser() {
    totalVisitor++;
}

function subUser() {
    totalVisitor--;
}


