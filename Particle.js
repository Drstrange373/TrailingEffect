class Particle {
    constructor(x, y, color, context) {
        this.context = context
        this.x = x
        this.y = y
        this.color = color
        this.speedX = Math.random() * 3 - 1.5 // Random number between 1.5 and -1.5
        this.speedY = Math.random() * 3 - 1.5
        this.size = Math.random() * 15
    }


    // Private method to update the coordinates and size
    #update() {
        this.x += this.speedX
        this.y += this.speedY
        this.size -= 0.1 // Shrinking the size
    }

    draw() {
        this.context.beginPath()
        this.context.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
        this.context.fillStyle = this.color
        this.context.fill()
        this.#update()
    }
}