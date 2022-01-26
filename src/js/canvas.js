import platform from '../assets/platform.png'
import hills from '../assets/hills.png'
import background from '../assets/background.png'

console.log(platform)
const canvas = document.querySelector(
    'canvas'
)

const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const gravity = 1.5

class Player { 
    constructor() { 
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30
        this.height = 30
    }

    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
        else this.velocity.y = 0
    }
}

class Platform { 
    constructor({x, y, img}) {
        this.position = {
            x,
            y
        }
        this.img = img
        this.width = img.width
        this.height = img.height

    }

    draw() {
        c.drawImage(this.img, this.position.x, this.position.y)
    }
}

class GenericObject { 
    constructor({x, y, img}) {
        this.position = {
            x,
            y
        }
        this.img = img
        this.width = img.width
        this.height = img.height

    }

    draw() {
        c.drawImage(this.img, this.position.x, this.position.y)
    }
}

function createImage(imageSrc) {
    const img = new Image()
    img.src = imageSrc
    return img 
}

const platformImg = createImage(platform)

const genericObjects = [new GenericObject({
    x: -1,
    y: -1,
    img: createImage(background)
})]

const player = new Player()
const platforms = [new Platform({
    x: -1, 
    y: 470, 
    img: platformImg
}), new Platform({x: platformImg.width - 3, y: 470, img: platformImg})]

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
}

let scrollOffSet = 0

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    genericObjects.forEach((genericObject) => {
        genericObject.draw()
    })

    platforms.forEach((platform) => {
        platform.draw()
    })
    player.update()

    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 10
    } else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -10
    } else {
        player.velocity.x = 0
        
        if (keys.right.pressed) { 
            scrollOffSet += 10
            platforms.forEach((platform) => {
                platform.position.x -= 10
            })
            
        } else if (keys.left.pressed) {
            scrollOffSet -= 10
            platforms.forEach((platform) => {
                platform.position.x += 10
            })    
        }
        if (scrollOffSet > 2000) {
            console.log('Parabéns nerdola')
        }
    }

platforms.forEach((platform) => {
    if (player.position.y + player.height <= platform.position.y && 
        player.position.y + player.height + player.velocity.y >= platform.position.y && 
        player.position.x + player.width >= platform.position.x && 
        player.position.x <= platform.position.x + platform.width) {
        player.velocity.y = 0
        } 
    })
} 

animate()

window.addEventListener('keydown', ({keyCode}) => {
    // console.log(keyCode)
    switch(keyCode) { 
        case 65: 
            console.log('left')
            keys.left.pressed = true
            break
        case 83: 
            console.log('down')
            break
        case 68: 
            console.log('right')
            keys.right.pressed = true
            break
        case 32: 
            console.log('up')
            player.velocity.y -= 20
            break
    }
})

window.addEventListener('keyup', ({keyCode}) => {
    // console.log(keyCode)
    switch(keyCode) { 
        case 65: 
            console.log('left')
            keys.left.pressed = false
            break
        case 83: 
            console.log('down')
            break
        case 68: 
            console.log('right')
            keys.right.pressed = false
            break
    }
})