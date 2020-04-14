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
    console.log(totalVisitor)

    let handshake = socket.handshake;
    const user = {
        unique_name: "Anonymous " + getsUniqueId(),
        time: handshake.time,
        id: socket.id,
        ip: handshake.headers.host + " " + handshake.address,
        open_sen: '',
        end_sen: '',
        goodbye: goodBye()
    }


    // connect + update users
    socket.on('join', function (data) {
        addUser();
        user.open_sen = data[0]
        user.end_sen = data[1]
        console.log(totalVisitor)
        io.sockets.emit('update', { user: user, connections: totalVisitor });
    });


    // disconenct
    socket.on('disconnect', function () {
        io.sockets.emit('disconnect', `${user.unique_name} left the show, ${user.goodbye}`)
        subUser();
    });

});



// some methods:
function addUser() {
    totalVisitor++;
    console.log(totalVisitor)
}

function subUser() {
    totalVisitor--;
}

function pickRand(li) {
    var picked = li[Math.floor(Math.random() * li.length)]
    return picked
}

// unique name generator
function getsUniqueId() {
    var names = "Alligator, Anteater, Armadillo, Auroch, Axolotl, Badger, Bat, Bear, Beaver, Blobfish, Buffalo, Camel, Chameleon, Cheetah, Chipmunk, Chinchilla, Chupacabra"
    var name_list = names.split(", ")
    return pickRand(name_list)
}

function goodBye() {
    var farewell = ['feeling inspired.', "still thinking about the last piece he saw."]
    return pickRand(farewell)
}



