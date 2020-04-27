const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    pingInterval: 600000, // server check if it's resting after 10 mins
    pingTimeout: 60000 // server rests after 1 minute of no activity
});

// Server Components
var getID = require('./components/uniqueID');
var goodbye = require('./components/goodbye');
var content = require('./components/contentMSG');
var gettime = require('./components/gettime');
var vcount = require('./components/visitorcount');

// Static Files & Routing
app.use(express.static('public'))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/projects', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/publications', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});






// Global variables
var totalVisitor = 0
var currentVisitors = []

// reg io connection:
io.of('/').on('connection', function (socket) {
    // console.log('a user connected: ' + socket.id);

    // we could also just use io.sockets.clients().length for totalVisitors

    var addedUser = false;
    let handshake = socket.handshake;
    // console.log(handshake.url);
    var date = new Date();
    const user = {
        unique_name: getID.getsID(),
        time: gettime.getDate(handshake.time),
        time_hourminute: gettime.getHourMinute(),
        url: handshake.url,
        id: socket.id,
        ip: handshake.headers.host + " " + handshake.address,
        open_sen: '',
        end_sen: '',
        goodbye: goodbye.goodbye(),
        birdOrOwl: gettime.birdOrOwl(),
        countmsg: ''
    }

    // connect + update users
    socket.on('join', function (data) {
        if (addedUser) return;

        addUser(); // user count
        addedUser = true;

        user.open_sen = data[0]
        user.end_sen = data[1]
        io.sockets.emit('update', { user: user, countmsg: vcount.totalcount(totalVisitor) });
    });

    // content view
    socket.on('contentView', (data) => {
        // parse the sentence function
        var contentmsg = content.content(user.unique_name, data);
        console.log(contentmsg.consolemsg)
        io.sockets.emit('contentBroadcast', contentmsg);
    })

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




// Some methods:
function addUser() {
    totalVisitor++;
}

function subUser() {
    totalVisitor--;
}







// Server listens on:
var port = process.env.PORT || 5000;
http.listen(port, function () {
    console.log('listening on *:5000');
});