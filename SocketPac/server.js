var express = require("express");

var path = require("path");

var bodyParser = require('body-parser');

var app = require('express')(),
server  = app.listen(8008),
io = require("socket.io")(server),
session = require("express-session")({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true
}),
sharedsession = require("express-socket.io-session");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

io.use(sharedsession(session));

var users = [];

io.on('connection', function (socket) { //2
    

    socket.emit('greeting', { msg: 'Greetings, from server Node, brought to you by Sockets! -Server' }); //3
    socket.on('thankyou', function (data) { //7
        console.log(data.msg); //8 (note: this log will be on your server's terminal)
    });

    socket.on("login", function(userdata) {
        socket.handshake.session.userdata = userdata;
        socket.handshake.session.save();
        console.log(socket.handshake.session.userdata);
        socket.emit('my_name', { name: socket.handshake.session.userdata.name, score: socket.handshake.session.userdata.score, lives: socket.handshake.session.userdata.lives, count: socket.handshake.session.userdata.count });
        socket.broadcast.emit('new_player', { name: socket.handshake.session.userdata.name, score: socket.handshake.session.userdata.score });
        users.push(socket.handshake.session.userdata);
        socket.emit('existing_users', users);
    });

    socket.on('posting_form', function (data) { //4
        console.log(data.name); //5
        socket.emit('posted', { info: data.name }); //6
    });

    socket.on('score_change', function (data) {
        for(var i = 0; i < users.length; i++){
            if(users[i]['name'] == data['name']){
                users[i] = data;
            }
        }
        socket.broadcast.emit('update_scores', users);
    });

    socket.on('game_over', function (data) {
        console.log(data);
        for(var i = 0; i < users.length; i++){
            if(users[i]['name'] == data['name']){
                users[i] = data;
            }
        }
        socket.broadcast.emit('update_scores', users);
    });

    socket.on('logout', function(data){
        console.log("Logging out!")
        console.log(data)
        for(var i = 0; i < users.length; i++){
            if(users[i]['name'] == data['name']){
                users.splice(i, 1);
                console.log("Removed user!", users);
                socket.emit('user_left');
            }
        }
    });
});

app.get('/', function(req, res) {
    // req.session.name="";
    res.render("index", {session: req.session});
});