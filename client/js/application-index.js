
/* application.js for index page */

var Connection = function() {

	var socket = io.connect("http://162.243.99.214:9501");

	this.connect = function(name) {
		socket.emit('start', name);
	};

	this.sendMove = function(gameState) {
		socket.emit('move', gameState);
	};

};
var connection = new Connection();


var startGame = function() {
	var name = $('#name-input').val();
	console.log('startGame name', name)
	$('#player-name').html('Player: ' + name);
	$('#game-player-container').show();

	connection.connect(name);

    G = new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager, 0, connection);
};


$(document).ready(function(){
    $("#startbutton").click(function(){
        startGame();
        $("#name").hide();
    });
});
