class SuperBonus{
    constructor(gameScreen){
        this.gameScreen = gameScreen
        this.positionsArr = [100, 400]
        this.randomIndex = Math.floor(Math.random() * this.positionsArr.length)
        this.left = 0
        this.top = this.positionsArr[this.randomIndex]
        this.width = 20
        this.height = 60
        this.element = document.createElement("img")
        this.element.src = "./images/catwoman.png"
        this.element.style.position = "absolute" 
        this.element.style.top = `${this.top}px`
        this.element.style.left = `${this.left}px`
        this.element.style.height = `${this.height}px`
        this.element.style.width = `${this.width}px`
        this.gameScreen.appendChild(this.element)
    }

    moveSuperBonus(){ 
        this.left += 1
        this.updatePositionSuperBonus()
    }

    updatePositionSuperBonus(){
        this.element.style.left = `${this.left}px`
    }

    

}