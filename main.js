var canvas = document.querySelector("canvas")
var ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight

document.body.style.overflow = "hidden"

function getRandomRange(min, max) {
    return Math.random() * (max - min) + min;
}


var keys = {
    leftArrow: false,
    rightArrow: false,
    aKey : false,
    dKey : false,
    upArrow: false,
}


document.addEventListener("keydown", function(event) {
    console.log(event.key)

    if (event.key == "ArrowRight" ) {
        keys.rightArrow = true

    }
    if (event.key == "ArrowLeft" ) {
        keys.leftArrow = true

    }
    if (event.key == "ArrowUp" ) {
        keys.upArrow = true
    }
})

document.addEventListener("keyup", function(event){
    if (event.key == "ArrowRight") {
        keys.rightArrow = false
    }
    if (event.key == "ArrowLeft") {
        keys.leftArrow = false
    }
    if (event.key == "ArrowUp" ) {
        keys.upArrow = false
    }

}) 

var ground = {
    x: 0,
    y: canvas.height -100,
    w:canvas.width,
    h:100,

    render: function() {
        ctx.fillStyle = "green" 
        ctx.fillRect(this.x, this.y, this.w, this.y)
    }
}

var player = {
    x: 300,
    y: 300,
    xVelocity: 0,
    yVelocity: 0,

    size: 100,
    health: 100,
    gravity: true,
    onGround: false,
    hunger: 100,

    render: function() {
        ctx.fillStyle = "black"
        ctx.fillRect(this.x, this.y, this.size, this.size )
    },
    move: function(xSpeed, jumpForce) {
        if (keys.rightArrow == true && this.x + this.size < canvas.width) {
            this.x += xSpeed
        }
        if (keys.leftArrow == true && this.x > 0) {
            this.x += -xSpeed
        }
        if (keys.upArrow == true && this.onGround == true) {
            this.yVelocity += -jumpForce
            this.onGround = false
        } 
    },
    gravitate: function(rate) {
        if (!this.onGround) {
            this.y += rate
        }
    } ,
    groundCollision: function() {
        if (this.y + this.size >= ground.y){
            this.onGround = true
        }
    },
    applyPhysics: function() {
        this.x += this.xVelocity
        this.y += this.yVelocity
        if (this.yVelocity <= 0) {
            this.yVelocity *= 0.90
        }
    }
}

// position 
// velocity
// acceleration


function frameLoop () {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

    console.log(player.onGround)
    
    player.gravitate(10)
    player.groundCollision()
    ground.render()
    player.move(10, 30)
    player.render()
    player.applyPhysics()
    requestAnimationFrame(frameLoop) 
}   

frameLoop()