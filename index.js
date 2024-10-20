var canvas = document.querySelector("canvas")
var c = canvas.getContext("2d")

canvas.width = innerWidth * devicePixelRatio 
canvas.height = innerHeight * devicePixelRatio

var particlefield = new Particlefield(40 , true , "rgba(0,0,255,.3")


var mouse = {x:0,y:0}
var mousedown = false

addEventListener("mousemove" , (e) => {

    mouse.x = e.clientX * devicePixelRatio 
    mouse.y = e.clientY * devicePixelRatio

    if(mousedown){

        particlefield.createParticleAt(mouse.x , mouse.y)
 
    }
  
})

addEventListener("mousedown" , (e) => {

    mousedown = true
 
})

addEventListener("mouseup" , (e) => {

    mousedown = false
 
})


function RenderCanvas(){

    c.clearRect(0,0,canvas.width,canvas.height)

    particlefield.ease()
    particlefield.draw()
    //particlefield.fade()
    particlefield.connect(200)


    requestAnimationFrame(RenderCanvas)
}

RenderCanvas()