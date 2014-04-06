
/* application.js for index_mult page */

var gameMap = {};
var socket = io.connect("http://162.243.99.214:9501");


function createGM(id){
    return new GameManager(4, null, HTMLActuator, LocalStorageManager, id, null);
}

function addUser(id, name){
    console.log("add user! id:" + id + " name:" + name);
    gameMap[id] = {
        name: name,
        gameManager: createGM(id),
    }

    // Add HTML element
    var gamediv = $("<div></div>").attr("id",id);
    gamediv.append($("#template").html());
    $("#master-container").append(gamediv);
}


function updateUser(id, gameState){
    gameMap[id].gameManager.setup(gameState);
}

socket.emit('getAll',{});

socket.on('allUsers', function(data){
    for (var id in data){
        addUser(id, data.name);
        updateUser(id, data[id].gameState);
    }

    //Wait till the browser is ready to render the game (avoids glitches)
    window.requestAnimationFrame(function () {
        for (var id in gameMap){
            gameMap[id].gameManager;
        }
    });
});

socket.on('move', function(data){
    updateUser(data.id, data.gameState);
});


socket.on('start', function(user){
    addUser(user.id);
});


