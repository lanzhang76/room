const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    pingInterval: 600000, // server check if it's resting after 10 mins
    pingTimeout: 60000 // server rests after 1 minute of no activity
});
const cookie = require('cookie');
const path = require('path');


// Server Components
var getID = require('./components/uniqueID');
var goodbye = require('./components/goodbye');
var content = require('./components/contentMSG');
var gettime = require('./components/gettime');
var vcount = require('./components/visitorcount');

// Static Files & Routing
app.use(express.static(__dirname + '/public'));
// app.use("/public", express.static(path.join(__dirname, '/public')));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
}).get('/projects', function (req, res) {
    res.sendFile(__dirname + '/public/mock_subdomains/projects.html');
}).get('/publication', function (req, res) {
    res.sendfile(__dirname + '/public/mock_subdomains/publication.html');
}).get('/livestream', function (req, res) {
    res.sendfile(__dirname + '/public/mock_subdomains/livestream.html');
}).get('/fakeproject', function (req, res) {
    res.sendfile(__dirname + '/public/mock_subdomains/fakeproject.html')
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
        console.log(`current visitors: ${Object.values(users)}`)
        var totalVisitor = Object.keys(users).length;
        insertLog(`${users[usercode]} enters the show. ${vcount.totalcount(totalVisitor)}`)
    }


    // assign rooms based on path
    socket.on('room', function (msg) {
        if (msg == '/projects') {
            insertLog({ sen: `${users[usercode]} is on projects page.` })
        } else if (msg == '/publication') {
            insertLog({ sen: `${users[usercode]} is on publication page.` })
        } else if (msg == '/livestream') {
            insertLog({ sen: `${users[usercode]} is watching livestream.` })
        } else if (msg == '/') {
            insertLog({ sen: `${users[usercode]} is in the main gallery space browsing.` })
        }
    })

    // content view
    socket.on('contentView', (data) => {
        // data[name,student,path]
        console.log(data)
        var contentmsg = content.content(user.unique_name, data);
        var contentlog = {
            sen: contentmsg,
            name: data[0],
            path: data[2]
        }
        io.sockets.emit('update', contentlog);
    })

    // disconenct
    socket.on('disconnect', function () {
        insertLog({ sen: `${user.unique_name} left the show, ${user.goodbye}` });
    });

    // ping timerout
    socket.on('ping', () => {
        console.log("server is sleeping")
        insertLog({ sen: "The server is falling asleep as no one is watching." });
    });

    //admin broadcast
    socket.on('admin-msg', (data) => {
        insertLog({ sen: data });
    })

});


function insertLog(data) {
    // Send log to databse
    // data.sen query
    // ****
    // 
    io.sockets.emit('update', data);

}



// Some methods:
function addUser() {
    totalVisitor++;
}

function subUser() {
    totalVisitor--;
}




// clean users object every other ___ time
setInterval(function () {
    users = {}
    console.log("cleaned users{}.")
}, 60000) // every other minute



// Server listens on:
var port = process.env.PORT || 5000;
http.listen(port, function () {
    console.log('listening on *:5000');
})