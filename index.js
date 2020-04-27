'use strict';

const express = require('express');
const socketIO = require('socket.io');

// Databse
// const {
//     Pool
// } = require('pg');
// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL, // || 'postgresql://postgres:password@localhost:5432/postgres',
//     ssl: process.env.DATABASE_URL ? true : false
// });

// Server Components
var getID = require('./components/uniqueID');
var goodbye = require('./components/goodbye');
var content = require('./components/contentMSG');
var gettime = require('./components/gettime');
var vcount = require('./components/visitorcount');

// Server Setup
const port = process.env.PORT || 5000;
const app = express()
    .use(express.static('public'))
    .get('/', function (req, res) {
        res.sendFile(__dirname + '/index.html');
    })
    .get('/projects', function (req, res) {
        res.sendFile(__dirname + '/public/mock_subdomains/projects.html');
    })
    .get('/publication', function (req, res) {
        res.sendfile(__dirname + '/public/mock_subdomains/publication.html');
    })
    .get('/livestream', function (req, res) {
        res.sendfile(__dirname + '/public/mock_subdomains/livestream.html');
    })
    .listen(port, function () {
        console.log('listening on *:5000');
    });

// SocketIO Setup
const io = socketIO(app, {
    pingInterval: 600000, // server check if it's resting after 10 mins
    pingTimeout: 60000 // server rests after 1 minute of no activity
});

// Global variables
var totalVisitor = 0
var users = {}

// reg io connection:
io.on('connection', function (socket) {
    const handshake = socket.handshake;
    const usercode = handshake.query.uuid;
    let user;

    if (users[usercode] == undefined) {
        // temporarily store cookies to decide if it's the same user
        user = {
            unique_name: getID.getsID(),
            time: gettime.getDate(handshake.time),
            time_hourminute: gettime.getHourMinute(),
            goodbye: goodbye.goodbye(),
            birdOrOwl: gettime.birdOrOwl(),
            countmsg: '',
            connection: 1,
            timeout: null,
        };
        users[usercode] = user;
        var totalVisitor = Object.keys(users).length;
        insertLog(`${user.unique_name} enters the show. ${vcount.totalcount(totalVisitor)}`)
    } else {
        users[usercode].connection++;
        clearTimeout(users[usercode].timeout);
        user = users[usercode];
    }

    console.log(`current visitors: ${user.unique_name}`)

    // assign rooms based on path
    socket.on('page', function (msg) {
        if (msg == '/projects') {
            insertLog(`${user.unique_name} is on projects page.`)
        } else if (msg == '/publication') {
            insertLog(`${user.unique_name} is on publication page.`)
        } else if (msg == '/livestream') {
            insertLog(`${user.unique_name} is watching livestream.`)
        } else {
            insertLog(`${user.unique_name} is in the main gallery space browsing.`)
        }
    })

    // content view
    socket.on('contentView', (data) => {
        var contentmsg = content.content(user.unique_name, data);
        io.sockets.emit('contentBroadcast', contentmsg);
    })

    // disconenct
    socket.on('disconnect', function () {
        users[usercode].connection--;
        if (users[usercode].connection == 0) {
            users[usercode].timeout = setTimeout(() => {
                insertLog(`${user.unique_name} left the show, ${user.goodbye}`);
                delete users[usercode];
            }, 10000, user.unique_name); // 10sec delay for disconnecting client
        }
    });

    // ping timerout
    socket.on('ping', () => {
        insertLog("The server is falling asleep as no one is watching.");
    });

    //admin broadcast
    socket.on('admin-msg', (data) => {
        insertLog(data)
    })

});

// Some methods:
function addUser() {
    totalVisitor++;
}

function subUser() {
    totalVisitor--;
}

function insertLog(data) {
    // Send log to databse
    // pool.query(
    //     'INSERT into log (time, text) VALUES($1, $2) RETURNING text',
    //     [new Date(), data],
    //     function (err, result) {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             console.log(result.rows[0].text);
    //         }
    //     });
    io.sockets.emit('update', data);
}