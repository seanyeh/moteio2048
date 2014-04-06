var http = require('http');

function User(socketID, name) {
    this.socketID = socketID;
    this.name = name;
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
    self.io.sockets.on('connect', function(socket){
        console.log("Received connection: " + socket);
        socket.emit('auth',{});

        socket.on('connect', function(data){
            self.users[socket.id] = new User(socket.id, data.name);
        });

        socket.on('move', function(data){
            socket.SENDALL('move',data);
        });

        socket.on('start', function(name) {
            console.log(name + ' started');
        });


        socket.on('disconnect', function() {
            console.log("Disconnect!");
            socket.SENDALL('disconnect', {id:socket.id});
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


