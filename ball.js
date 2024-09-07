class Ball{

    constructor(x , y , endsizeX , endsizeY , color){

        this.x = x;
        this.y = y;
        this.endsizeX = endsizeX;
        this.endsizeY = endsizeY
        this.currentsizeX = 0
        this.currentsizeY = 0
        this.color = color
        this.spring = {
            
            x:this.random(.02,.05),
            y:this.random(.02,.05)
        
        }

        this.velocity = {

            x:this.random(-20,20),
            y:this.random(-15,-30)

        }

        this.friction = .98
        this.vx = 0
        this.vy = 0
        this.finished = false
        this.particles = []
        this.opacity = 1

    }

    draw(){

        c.beginPath()
        c.fillStyle = this.color
        c.ellipse(this.x , this.y , this.currentsizeX/2 , this.currentsizeY/2 , 0 , 0 , 2 * Math.PI)
        c.fill()
        c.closePath()

    }

    render(){

        this.fade()

        c.beginPath()
        c.fillStyle = this.color
        c.globalAlpha = this.opacity
        c.ellipse(this.x , this.y , this.endsizeX/2 , this.endsizeY/2 , 0 , 0 , 2 * Math.PI)
        c.fill()
        c.closePath()

    }
 
    update(){

        if(!this.finished){

            this.vx += (this.endsizeX - this.currentsizeX) * this.spring.x 
            this.vy += (this.endsizeY - this.currentsizeY) * this.spring.y
    
            this.vx *= this.friction 
            this.vy *= this.friction
    
            this.currentsizeX += this.vx
            this.currentsizeY += this.vy

        }

    }

    random(min , max){

        return min + Math.random() * (max-min)

    }

    movedown(){

        //bounce walls
        if(this.x + this.endsizeX/2 + this.velocity.x > canvas.width){

            this.velocity.x *= -1
           
        }

        if(this.x - this.endsizeX/2 < 0){

            this.velocity.x *= -1
           
        }

        //bounce floor
        if(this.y + this.velocity.y + this.endsizeX/2 < canvas.height){

            this.velocity.y += 3

        }else{

            this.velocity.y *= -1 * .9
            this.velocity.x *= .8

        }

        this.x += this.velocity.x

        this.y += this.velocity.y

        this.CreateParticles()

      
    }

    CreateParticles(color){

        if(this.finished){

            this.particles.push(new Ball(this.x , this.y , this.endsizeX/10 , this.endsizeY/10 , this.color))
        }

    }

    fade(){

        if(this.opacity > .01){

            this.opacity -= .01

        }else{

            this.opacity = 0
        }
 
    }


}