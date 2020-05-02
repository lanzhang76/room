'use strict';

const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    pingInterval: 600000, // server check if it's resting after 10 mins
    pingTimeout: 60000 // server rests after 1 minute of no activity
});

// Databse
// const {
//     Pool
// } = require('pg');
// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/postgres',
//     ssl: process.env.DATABASE_URL ? true : false
// });

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
    res.sendFile(__dirname + '/public/mock_subdomains/publication.html');
}).get('/livestream', function (req, res) {
    res.sendFile(__dirname + '/public/mock_subdomains/livestream.html');
}).get('/fakeproject', function (req, res) {
    res.sendFile(__dirname + '/public/mock_subdomains/fakeproject.html')
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
        insertLog({ sen: `${user.unique_name} enters the show. ${vcount.totalcount(totalVisitor)}` })
    } else {
        users[usercode].connection++;
        clearTimeout(users[usercode].timeout);
        user = users[usercode];
    }

    console.log(`current visitors: ${user.unique_name}`)

    // assign rooms based on path
    socket.on('page', function (msg) {
        if (msg == '/projects') {
            insertLog({ sen: `${user.unique_name} is on projects page.` })
        } else if (msg == '/publication') {
            insertLog({ sen: `${user.unique_name} is on publication page.` })
        } else if (msg == '/livestream') {
            insertLog({ sen: `${user.unique_name} is watching livestream.` })
        } else if (msg == '/') {
            insertLog({ sen: `${user.unique_name} is in the main gallery space browsing.` })
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
        insertLog(contentlog);
    })

    // disconenct
    socket.on('disconnect', function () {
        users[usercode].connection--;
        if (users[usercode].connection == 0) {
            users[usercode].timeout = setTimeout(() => {
                insertLog({ sen: `${user.unique_name} left the show, ${user.goodbye}` });
                delete users[usercode];
            }, 10000, user.unique_name); // 10sec delay for disconnecting client
        }
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

    socket.on('query-log', (offset) => {
        queryLog(10, offset, socket.id);
    })

});

function insertLog(data) {
    // Send log to databse
    // pool.query(
    //     'INSERT into log (time, sen, name, path) VALUES($1, $2, $3, $4) RETURNING sen, name, path',
    //     [new Date(), data.sen, data.name, data.path],
    //     function (err, result) {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             console.log(result.rows[0]);
    //         }
    //     });
    // io.sockets.to(socket).emit('requested', result.rows);
    io.sockets.emit('update', data);
}

// Server listens on:
var port = process.env.PORT || 5000;
http.listen(port, function () {
    console.log('listening on *:5000');
})

function queryLog(num, offset, socket) {
    // Query log from databse
    // pool.query(
    //     `SELECT sen, name, path  FROM log ORDER BY time DESC LIMIT ${num} OFFSET ${offset}`,
    //     function (err, result) {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             console.log(result.rows);
    //             io.sockets.to(socket).emit('requested', result.rows);
    //         }
    //     });
}