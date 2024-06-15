
let canvas = document.querySelector("canvas")
let c = canvas.getContext("2d")

let bubbles = []
let minibubbles = []
let timer

canvas.width = innerWidth * devicePixelRatio 
canvas.height = innerHeight * devicePixelRatio


function CreateBubble(){

    bubbles.push(new Bubble({
        
        x: Math.random() * canvas.width,
        y: -100, 
        size: randomNumber(100,200),
        color: "hsl(" + Math.floor(Math.random() * 360) + ", 100%, 50%)"
    
    }))

   timer = setTimeout(CreateBubble,800)
  
}

addEventListener("visibilitychange" , function(){

    if(document.hidden){

        clearTimeout(timer)

    }else{

        CreateBubble()
    }
})


function randomNumber(min , max){

    return min + Math.random() * (max-min)
}

function CreateMiniBubble(bubble , count){

    for(var i = 0 ; i < count ; i++){

        minibubbles.push(new Bubble({x: bubble.x , y: bubble.y , size: randomNumber(bubble.size/20 , bubble.size/10) , color: bubble.color}))
    }
}

function RenderCanvas(){

    c.clearRect(0 , 0 , canvas.width , canvas.height)

    bubbles.forEach((bubble,index) =>{

        if(bubble.remove){

            bubbles.splice(index , 1)

        }else{

            bubble.moveDown()
            bubble.spring()
            bubble.render()  
        }

        if(bubble.y + bubble.size/2 + bubble.velocity.y > canvas.height){

           CreateMiniBubble(bubble , Math.floor(randomNumber(10,50)))
        }

       
    })

    
    //minibubbles animation
    minibubbles.forEach((bubble,index) =>{
 
        if(bubble.size > 1){

            bubble.moveDown()
            bubble.sparkle()
            bubble.draw()

        }else{

            minibubbles.splice(index , 1)
        }
       
    
        
    })


    requestAnimationFrame(RenderCanvas)
}



CreateBubble()
RenderCanvas()