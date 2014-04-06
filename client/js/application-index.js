
/* application.js for index page */

var Connection = function() {

	var socket = io.connect("http://127.0.0.1:9501");

	this.connect = function(name) {
		socket.emit('start', name);
	}

	this.sendMove = function(gameState) {
		socket.emit('move', gameState);
	}

};
var connection = new Connection();


var startGame = function() {
	var name = $('#name-input').val();
	console.log('startGame name', name)
	$('#player-name').html('Player: ' + name);
	$('#game-player-container').show();


	window.requestAnimationFrame(function () {
		new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager, 0, connection);
	});
	connection.connect(name);
}


 
