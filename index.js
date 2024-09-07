var canvas = document.querySelector("canvas")
var c = canvas.getContext("2d")

canvas.width = innerWidth * devicePixelRatio 
canvas.height = innerHeight * devicePixelRatio

var size = 100
var balls = []
var trails = []

balls.push(new Ball(canvas.width/2 , canvas.height/2 , size , size , "white"))

FadeParticles()

function FadeParticles(){

    balls.forEach(ball => {

        for(var i = 0 ; i < ball.particles.length ; i++){

            if(ball.particles[i].opacity === 0){

                ball.particles.splice(i,1)
            }
        }
    })

    setTimeout(FadeParticles , 100)

}


function renderContent(){

    c.clearRect(0 , 0 , canvas.width , canvas.height)

    balls.forEach(ball => {

        //draw particles
        for(var i = 0 ; i < ball.particles.length ; i++){

            ball.particles[i].render()
        }

        if(Math.abs(ball.endsizeX - ball.currentsizeX) < .01 && Math.abs(ball.endsizeY - ball.currentsizeY) < .01){

            ball.finished = true
            ball.currentsizeX = ball.endsizeX 
            ball.currentsizeY = ball.endsizeY
        }

        ball.draw()

        if(ball.finished){

            ball.movedown()


        }else{

            ball.update()
            
        }

    })

    requestAnimationFrame(renderContent)
      
}

renderContent()

