class Player{
    constructor(gameScreen, width, height, top, left, playerImage){
        this.gameScreen = gameScreen 
        this.left = left - (width/2) 
        this.top = top
        this.width = width
        this.height = height
        this.directionX = 0
        this.directionY = 0
        this.element = document.createElement("img")
        this.element.src = playerImage
        this.element.style.position = "absolute" 
        this.element.style.top = `${this.top}px`
        this.element.style.left = `${this.left}px`
        this.element.style.height = `${this.height}px`
        this.element.style.width = `${this.width}px`
        this.gameScreen.appendChild(this.element)
        this.hissSound = new Audio ("../hiss.mp3")
        this.hissSound.volume = 0.1
        this.meowSound = new Audio ("../meow.mp3")
        this.meowSound.volume = 0.1
        this.superMeowSound = new Audio ("../supermeow.wav")
        this.superMeowSound.volume = 0.02

    }
    
    move(){ 
        this.left += this.directionX 
        this.top += this.directionY 
        this.updatePosition()
    
    }

    updatePosition(){
        this.element.style.top = `${this.top}px`
        this.element.style.left = `${this.left}px`

        if(this.left <= -20){
          this.left = -20
        }
        if (this.left >= 620 - this.width){
          this.left = 620 - this.width
        }

        if(this.top <= 5){
          this.top = 5
        }
        if (this.top >= 835 - this.height){
          this.top = 835 - this.height
        }
    }

    didCollide(obstacle){
        const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      this.element.classList.add("spin");
      setTimeout(() => {
        this.element.classList.remove("spin");
      }, 500);
      this.hissSound.play()
      return true;
    } else {
      return false;
    }
    }

    didHitBonus(bonus){
      const playerRectBonus = this.element.getBoundingClientRect();
      const bonusRect = bonus.element.getBoundingClientRect();
  
      if (
        playerRectBonus.left < bonusRect.right &&
        playerRectBonus.right > bonusRect.left &&
        playerRectBonus.top < bonusRect.bottom &&
        playerRectBonus.bottom > bonusRect.top
      ) {
        this.meowSound.play()
        return true;
      } else {
        return false;
      }
    }

    didHitSuperBonus(superBonus){
      const playerRectSuperBonus = this.element.getBoundingClientRect();
      const superBonusRect = superBonus.element.getBoundingClientRect();
  
      if (
        playerRectSuperBonus.left < superBonusRect.right &&
        playerRectSuperBonus.right > superBonusRect.left &&
        playerRectSuperBonus.top < superBonusRect.bottom &&
        playerRectSuperBonus.bottom > superBonusRect.top
      ) {
        this.superMeowSound.play()
        return true;
      } else {
        return false;
      }
    }
}