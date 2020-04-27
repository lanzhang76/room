const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    pingInterval: 600000, // server check if it's resting after 10 mins
    pingTimeout: 60000 // server rests after 1 minute of no activity
});
const cookie = require('cookie');

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
    res.sendFile(__dirname + '/public/mock_subdomains/projects.html');
});

app.get('/publication', function (req, res) {
    res.sendfile(__dirname + '/public/mock_subdomains/publication.html');
});

app.get('/livestream', function (req, res) {
    res.sendfile(__dirname + '/public/mock_subdomains/livestream.html');
});





// Global variables
var totalVisitor = 0
var users = {}

// reg io connection:
io.of('/').on('connection', function (socket) {

    var addedUser = false;
    let handshake = socket.handshake;
    const cookies = cookie.parse(socket.request.headers.cookie || '');
    const usercode = cookies._xsrf;


    const user = {
        unique_name: getID.getsID(),
        time: gettime.getDate(handshake.time),
        time_hourminute: gettime.getHourMinute(),
        goodbye: goodbye.goodbye(),
        birdOrOwl: gettime.birdOrOwl(),
        countmsg: ''
    }

    if (users[usercode] == undefined) {
        // temporarily store cookies to decide if it's the same user
        users[usercode] = user.unique_name;
        console.log(users)
    }


    socket.on('room', function (msg) {
        if (msg == '/projects') {
            socket.join('projects', function () {
                io.sockets.emit('roomAssigned', `${users[usercode]} is on projects page.`)
            })
        } else if (msg == '/publication') {
            socket.join('pub', function () {
                io.sockets.emit('roomAssigned', `${users[usercode]} is on publication page.`)
            })

        } else if (msg == '/livestream') {
            socket.join('pub', function () {
                io.sockets.emit('roomAssigned', `${users[usercode]} is watching livestream.`)
            })

        } else if (msg == '/') {
            socket.join('main', function () {
                var totalVisitor = Object.keys(users).length;
                io.sockets.emit('roomAssigned', `${users[usercode]} enters the show. ${vcount.totalcount(totalVisitor)}`)
            })
        }
    })

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




// clean users object every other ___ time
setInterval(function () {
    console.log("cleaned users{}.")
    users = {}
}, 60000) // every other minute



// Server listens on:
var port = process.env.PORT || 5000;
http.listen(port, function () {
    console.log('listening on *:5000');
});