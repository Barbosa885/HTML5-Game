const canvas = document.querySelector(
    'canvas'
)

const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

class Player { 
    constructor() { 
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 20
        }
        this.width = 30
        this.height = 30
    }

    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height,)
    }

    update() {
        this.position.y += this.velocity.y
        this.draw()
    }

}

const player = new Player()
player.update()

function animate() {
    requestAnimationFrame(animate)
}