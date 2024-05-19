window.onload = function () {
    const startButton = document.getElementById("start-button");
    const restartButton = document.getElementById("restart-button");
    const myGame = new Game() 
    startButton.addEventListener("click", function () {
      startGame();
    });
  
    restartButton.addEventListener("click", ()=>{
      window.location.reload()
    })
    
    document.addEventListener("keydown", (event)=>{
      console.log("a key was pressed", event)
      if (event.code === "ArrowRight") {
        myGame.player.directionX = 1
      } else if (event.code === "ArrowLeft") {
        myGame.player.directionX = -1
      } else if (event.code === "ArrowUp") {
        myGame.player.directionY = -1
      } else if (event.code === "ArrowDown") {
        myGame.player.directionY = 1
      }
    })
  

    document.addEventListener("keyup", ()=>{
        myGame.player.directionX = 0
        myGame.player.directionY = 0
    })
  
    function startGame() {
      myGame.start() 
    }
  
  
  };