var canvas = document.querySelector("canvas")
var c = canvas.getContext("2d")

canvas.width = innerWidth * devicePixelRatio 
canvas.height = innerHeight * devicePixelRatio

var size = 100
var balls = []
var numballs = 3
var mouse = {x:undefined,y:undefined}
var dx , dy , draggedball
var springlen = 400
var spring = .03
var friction = .9

CreateBalls()

function CreateBalls(){

    for(var i = 0 ; i < numballs ; i++){

        var x = Math.random() * canvas.width 
        var y = Math.random() * canvas.height
        balls.push(new Ball(x ,y , size , size , "white"))

    }
}

function SpringTo(ballA , ballB){

    var dx = ballB.x - ballA.x
    var dy = ballB.y - ballA.y 
    var angle = Math.atan2(dy,dx)
    
    var tx = ballB.x - springlen * Math.cos(angle)
    var ty = ballB.y - springlen * Math.sin(angle)

    ballA.velocity.x += (tx - ballA.x) * spring
    ballA.velocity.y += (ty - ballA.y) * spring

    ballA.velocity.x *= friction
    ballA.velocity.y *= friction

    ballA.x += ballA.velocity.x 
    ballA.y += ballA.velocity.y
}


function renderContent(){

    c.clearRect(0 , 0 , canvas.width , canvas.height)

    balls.forEach(ball => {

        ball.draw()
        ball.update()

    
    })

    for(var i = 0 ; i < balls.length ; i++){

        if(!balls[i].isDragging){

            for(var j = 0 ; j < balls.length ; j++){

                if(j !== i){

                    SpringTo(balls[i] , balls[j])
                }
            }

           
        }
    }
    
    c.beginPath()
    c.strokeStyle = "white"
    c.moveTo(balls[0].x , balls[0].y)

    for(var i = 0 ; i < balls.length ; i++){

        c.lineTo(balls[i].x, balls[i].y)
    }

    c.lineTo(balls[0].x, balls[0].y)

    c.stroke()
    c.closePath()

    requestAnimationFrame(renderContent)
      
}

$("canvas").on("mousedown" , () => {

    balls.forEach(ball => {

        if(ball.isInside(mouse.x , mouse.y)){

            dx = ball.x - mouse.x 
            dy = ball.y - mouse.y
            draggedball = ball
            ball.isDragging = true
            return
        }
    })

})

$("canvas").on("mousemove" , (e) => {

    mouse.x = e.clientX * devicePixelRatio
    mouse.y = e.clientY * devicePixelRatio

    if(draggedball){

        draggedball.x = mouse.x + dx 
        draggedball.y = mouse.y + dy

        console.log(draggedball)
    }

})

$("canvas").on("mouseup" , (e) => {

    if(draggedball){

        draggedball.isDragging = false
        draggedball = undefined
    }


})

renderContent()

