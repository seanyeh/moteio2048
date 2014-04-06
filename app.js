var http = require('http');

function User(socketID) {
    this.socketID = socketID;
    this.name = '';
    this.gameState;
}


function Server(port){
    var fs = require('fs');

    var express = require("express");
    var expressApp = express();

    expressApp.use(express.static('client'));
    this.io = require('socket.io').listen(expressApp.listen(port));
    this.io.set('log level', 1); // reduce logging

    this.users = {}; // {id: User}


    /**
     * Socket events
     */
    var self = this;
    self.io.sockets.on('connection', function(socket){
        console.log("Received connection: " + socket);
        self.users[socket.id] = new User(socket.id);

        socket.on('move', function(data){
            self.io.sockets.emit('move', {id:socket.id, gameState:gameState});
            self.users[socket.id].gameState = data;
            console.log('move',self.users);
        });

        socket.on('start', function(name) {
            self.users[socket.id].name = name;
            self.io.sockets.emit('start', self.users[socket.id]);
            console.log(name + ' started');
        });

        socket.on('getAll', function() {
            socket.emit('allUsers', self.users);
        });


        socket.on('disconnect', function() {
            console.log("Disconnect!");
            self.io.sockets.emit('disconnect', {id:socket.id});
            delete self.users[socket.id];
        });
    });

}



// Main

var port = 9501;
if (process.argv[2]){
    port = process.argv[2];
}
console.log("Running on port: " + port);

var s = new Server(port);


