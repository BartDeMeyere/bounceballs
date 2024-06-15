class Bubble{

    constructor({x,y,size,color}){

        this.x = x 
        this.y = y 
        this.scale = {

            x:0,
            y:0
        }

        this.acc = {

            x:0,
            y:0
        }

        this.velocity = {

            x:randomNumber(-10,10),
            y:randomNumber(30,40)
        }

        this.size = size
        this.color = color
        this.springX = randomNumber(.01 , .06)
        this.springY = randomNumber(.01 , .06)
        this.gravity = randomNumber(.6 , .9)
        this.remove = false
       
    }

    draw(){

        c.beginPath()
        c.fillStyle = this.color
        c.arc(this.x , this.y , this.size/2 , 0 , 2 * Math.PI)
        c.fill()
        c.closePath()
    }

    render(){

        c.beginPath()
        c.fillStyle = this.color
        c.shadowBlur = this.size/2
        c.shadowColor = this.color
        c.ellipse(this.x , this.y , this.scale.x/2 , this.scale.y/2 , 0 , 0 , 2 * Math.PI)
        c.fill()
        c.closePath()
    }

    spring(){

        this.acc.x += (this.size - this.scale.x) * this.springX
        this.acc.y += (this.size - this.scale.y) * this.springY
        this.scale.x += (this.acc.x *= .95)
        this.scale.y += (this.acc.y *= .95)

    }

    moveDown(){

        if(this.y + this.size/2 + this.velocity.y > canvas.height){

            this.velocity.y *= -1
            this.velocity.y *= .6

            this.velocity.x *= .5
            this.size *= .7

        }else{

            this.velocity.y += this.gravity
            
        }

        //bounce left and right border
        if(this.x + this.size/2 + this.velocity.x > canvas.width){

            this.velocity.x *= -1
        }

        if(this.x - this.size/2 - this.velocity.x < 0){

            this.velocity.x *= -1
        }

        if(this.size < 8){

            this.remove = true
        }

       
        this.y += this.velocity.y
        this.x += this.velocity.x
    }

    sparkle(){

        if(this.y + this.size/2 + this.velocity.y > canvas.height){

            this.velocity.y *= -1
            this.velocity.y *= .6

            this.velocity.x *= .5
            this.size *= .7

        }else{

            this.velocity.y += this.gravity
            
        }

        //bounce left and right border
        if(this.x + this.size/2 + this.velocity.x > canvas.width){

            this.velocity.x *= -1
        }

        if(this.x - this.size/2 - this.velocity.x < 0){

            this.velocity.x *= -1
        }

        this.y += this.velocity.y
        this.x += this.velocity.x
    }

}
