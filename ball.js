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
            y:this.random(.05,.08)
        
        }

        this.velocity = {x:0,y:0}

        this.friction = .98
        this.vx = 0
        this.vy = 0
        this.isDragging = false
    }

    draw(){

        c.beginPath()
        c.fillStyle = this.color
        c.ellipse(this.x , this.y , this.currentsizeX/2 , this.currentsizeY/2 , 0 , 0 , 2 * Math.PI)
        c.fill()
        c.closePath()

    }


    update(){


        this.vx += (this.endsizeX - this.currentsizeX) * this.spring.x
        this.vy += (this.endsizeY - this.currentsizeY) * this.spring.y
    
        this.currentsizeX += (this.vx *= this.friction)
        this.currentsizeY += (this.vy *= this.friction)


    }

    random(min , max){

        return min + Math.random() * (max-min)

    }

    isInside(x , y){

        if(x > this.x - this.currentsizeX/2 && x < this.x + this.currentsizeX/2 && y > this.y - this.currentsizeY/2 && y < this.y + this.currentsizeY/2){

            return true
        }
    }




}