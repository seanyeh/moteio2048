
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
    var gamediv = $("div").attr("id",id);
    gamediv.append($("#template").html());
    $("#master-container").append(gamediv);
}

socket.emit('getAll',{});

socket.on('allUsers', function(data){
    for (var id in data){
        gameMap[id] = {
            name: data.name,
            gameManager: createGM(id),
        }
        addUser(id);
    }

    //Wait till the browser is ready to render the game (avoids glitches)
    window.requestAnimationFrame(function () {
        for (var id in gameMap){
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
<<<<<<< HEAD
    gameMap[user.id] = {
        user.name,
        null
    };
=======
    addUser(user.id);
>>>>>>> 386d45ce3fa5c3f18892c85b76b0433745dfaf0d
});


