
var socket = io.connect("http://162.243.99.214:9501");

// Wait till the browser is ready to render the game (avoids glitches)
G1 = new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager, 0, socket);
window.requestAnimationFrame(function () {
    G1; 
    // G2;
  // new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
  
});

 
