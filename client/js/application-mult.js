
/* application.js for index_mult page */

var gameMap = {};
var socket = io.connect("http://162.243.99.214:9501");


function createGM(id){
    return new GameManager(4, null, HTMLActuator, LocalStorageManager, id, null);
}

function addUser(id, name){
    // Add HTML element
    var gamediv = $("<div></div>").attr("id","id_" + id);
    gamediv.append($("<h3></h3>").text("Player: " + name));
    gamediv.append($("#template").html());
    $("#master-container").append($("<li></li>").append(gamediv));
    console.log("add user! id:" + id + " name:" + name);
    console.log("tilecontainer:" + $("#id_" + id + " .tile-container"));


    gameMap[id] = {
        name: name,
        gameManager: createGM(id),
    };

}


function updateUser(id, gameState){
    gameMap[id].gameManager.setup(gameState);
}

socket.emit('getAll',{});

socket.on('allUsers', function(data){
    console.log(JSON.stringify(data));
    for (var id in data){
        addUser(id, data[id].name);
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
    console.log("recv move:" + JSON.stringify(data));
    updateUser(data.id, data.gameState);
});


socket.on('start', function(data){
    console.log("recv start");
    addUser(data.id, data.name);
});


