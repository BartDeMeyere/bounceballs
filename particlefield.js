class Particlefield{

    constructor(maxsize , colormode , color){

        this.particles = []
        this.maxsize = maxsize
        this.colormode = colormode
        this.color = color
    }

    createParticleAt(x , y ){

        this.particles.push(

            {
                x: x, 
                y: y,
                color: (this.colormode) ? "hsl(" + Math.random() * 360 + ",50%,50%)" : this.color,
                size:this.random(1,this.maxsize),
                velocity:{x:0,y:0},
                target:{x: x + this.random(-300,300) , y: y + this.random(-300,300)},
                friction: this.random(.9,.93),
                spring:this.random(.01,.06),
                opacity:1,
                easing:this.random(.02,.08)

            }
        )
    }

    draw(){

        this.particles.forEach(particle => {

            c.beginPath()
            c.fillStyle = particle.color 
            c.globalAlpha = particle.opacity
            c.arc(particle.x , particle.y , particle.size , 0 , 2 * Math.PI)
            c.fill()
            c.closePath()

        })
    }

    random(min,max){

        return min + Math.random() * (max - min)
    }
    
    connect(radius){

        for(var i = 0 ; i < this.particles.length - 1 ; i++){
            for(var j = i + 1 ; j < this.particles.length ; j++){

                var dx = this.particles[j].x - this.particles[i].x
                var dy = this.particles[j].y - this.particles[i].y
                var d = Math.sqrt(dx*dx+dy*dy)

                if(d < radius){

                    c.save()
                    c.beginPath()
                    c.strokeStyle = this.particles[i].color
                    c.globalAlpha = this.particles[i].opacity
                    c.moveTo(this.particles[i].x , this.particles[i].y)
                    c.lineTo(this.particles[j].x , this.particles[j].y)
                    c.stroke()
                    c.closePath()
                    c.restore()
                }
            }
        }
    }

    spring(){

            this.particles.forEach(particle => {


                particle.velocity.x += (particle.target.x - particle.x) * particle.spring
                particle.velocity.y += (particle.target.y - particle.y) * particle.spring
                particle.x += (particle.velocity.x *= particle.friction)
                particle.y += (particle.velocity.y *= particle.friction)

                   
            })

    }

    ease(){

        this.particles.forEach(particle => {

            particle.x += (particle.target.x - particle.x ) * particle.easing
            particle.y += (particle.target.y - particle.y ) * particle.easing

        })

    }

    fade(){

        this.particles.forEach((particle , index) => {

            if(particle.opacity > .005){

                particle.opacity -= .005
                
            }else{

                particle.opacity = 0
                this.particles.splice(index , 1)
            }
        })
    }

}