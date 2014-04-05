// Wait till the browser is ready to render the game (avoids glitches)

G1 = new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager, 0);
// G2 = new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager, 1);
window.requestAnimationFrame(function () {
    G1; 
    // G2;
  // new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
  
});
