class Game {
    constructor(){
        this.startScreen = document.getElementById("game-intro")
        this.gameScreen = document.getElementById("game-screen")
        this.gameEndScreen = document.getElementById("game-end")
        this.gameStats = document.getElementById("game-stats")
        this.gameStatsEnd = document.getElementById("game-stats-end")
        this.player = new Player (
            this.gameScreen, 
            100, 
            100, 
            700, 
            300, 
            "../images/neji-cat.png")
        this.height = 750
        this.width = 600
        this.obstacles = [new Obstacle (this.gameScreen)]
        this.bonus = [new Bonus (this.gameScreen)]
        this.superBonus = []
        this.counter = 0
        this.score = 0
        this.lives = 3
        this.isGameOver = false 
        this.gameIntervalId = null 
        this.gameLoopFrequency = [1000/180] 
        this.themeSound = new Audio ("../themesong.wav")
        this.themeSound.volume = 0.01
        
    }

start(){
    this.gameScreen.style.height = `${this.height}px`
    this.gameScreen.style.width = `${this.width}px`
    this.startScreen.style.display = "none" 
    this.gameScreen.style.display = "block"
    this.gameStats.style.display = "block"
    this.gameStatsEnd.style.display = "none"
    this.gameIntervalId = setInterval(() =>{
        this.gameLoop()
        this.themeSound.play()
    }, this.gameLoopFrequency)

}

gameLoop(){
    this.update()
    if (this.isGameOver){
        clearInterval(this.gameIntervalId) 
        this.gameOver()
    }
    this.counter++
}

update(){
    this.player.move()
   
    const livesElement = document.getElementById("lives")
    const scoreElement = document.getElementById("score")
    const livesEndElement = document.getElementById("lives-end")
    const scoreEndElement = document.getElementById("score-end")
    
    if (this.counter % 2000 === 0){
        this.superBonus.push(new SuperBonus(this.gameScreen))
    }

    this.obstacles.forEach((oneObstacle, oneObstacleIndex)=>{
        oneObstacle.move()
     
       const thereWasACollision = this.player.didCollide(oneObstacle)
       if (thereWasACollision){
            this.obstacles.splice(oneObstacleIndex, 1);
            oneObstacle.element.remove()
            this.obstacles.push(new Obstacle(this.gameScreen))
            this.lives -= 1
                if (this.lives === 0){
                    this.isGameOver = true

            }

       }
     
    if (oneObstacle.top > 800){
        this.obstacles.splice(oneObstacleIndex, 1)
        oneObstacle.element.remove()
        this.score += 1
        this.obstacles.push(new Obstacle(this.gameScreen))
    }
    })

    this.bonus.forEach((oneBonus, oneBonusIndex)=>{
        oneBonus.moveBonus()



        const bonusHit = this.player.didHitBonus(oneBonus)
        if (bonusHit){
            this.bonus.splice(oneBonusIndex, 1);
            oneBonus.element.remove()
            this.score += 3
            this.bonus.push(new Bonus(this.gameScreen))
            if (this.lives === 0){
                this.isGameOver = true
        }
        } else if (oneBonus.top > 800){
            this.bonus.splice(oneBonusIndex, 1)
            oneBonus.element.remove()
            this.bonus.push(new Bonus(this.gameScreen))
        }
        })

    this.superBonus.forEach((oneSuperBonus, oneSuperBonusIndex)=>{
        oneSuperBonus.moveSuperBonus()

    const superBonusHit = this.player.didHitSuperBonus(oneSuperBonus)
    if (superBonusHit){
        this.superBonus.splice(oneSuperBonusIndex, 1);
        oneSuperBonus.element.remove()
        this.score += 10
        this.lives += 2
        this.superBonus.push(new SuperBonus (this.gameScreen))
        if (this.lives === 0){
            this.isGameOver = true
    }
    } else if (oneSuperBonus.left > 600){
        this.superBonus.splice(oneSuperBonusIndex, 1)
        oneSuperBonus.element.remove()
    }

        })
        scoreElement.innerText = this.score
        livesElement.innerText = this.lives
        scoreEndElement.innerText = this.score
        livesEndElement.innerText = this.lives

    }


gameOver(){
    this.gameScreen.style.display = "none"
    this.gameEndScreen.style.display = "block"
    this.gameStats.style.display = "none"
    this.gameStatsEnd.style.display = "block"
}

}
