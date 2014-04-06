
/* application.js for index_mult page */

var gameMap = {};
var socket = io.connect("http://162.243.99.214:9501");

function createGM(id){
    return new GameManager(4, null, HTMLActuator, LocalStorageManager, id);
}

function addUser(id){
    gameMap[id] = {
        name: data.name,
        gameManager: createGM(id);
    }


    // Add HTML element
}

socket.emit('getAll',{});

socket.on('allUsers', function(data){
    for (var id in data){
        addUser(id);
    }

    //Wait till the browser is ready to render the game (avoids glitches)
    window.requestAnimationFrame(function () {
        for (var id: gameMap){
            gameMap[id].gameManager;
        }
    });
});

socket.on('move', function(data){
    var game = gameMap[data.id];

    var gameState = data.gameState;
    game.setup(gameState);
});


socket.on('start', function(user){
    addUser(user.id);
});


