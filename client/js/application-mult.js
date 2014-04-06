
/* application.js for index_mult page */

var Connection = function() {

	var socket = io.connect("http://127.0.0.1:9501");

	socket.on('start', name);

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
	$('#game-player-container').show();


	window.requestAnimationFrame(function () {
		new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager, 0, connection);
	});
	connection.connect(name);
}


var gameMap = {};



//Wait till the browser is ready to render the game (avoids glitches)
G1 = new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager, 0, connection);
window.requestAnimationFrame(function () {
    G1; 
    // G2;
  new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager, 0, connection);
  
});