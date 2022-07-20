class CannonBall
{
    constructor(x,y)
    {
        var options =
        {
            isStatic:true
        }
        this.r=20;
        this.body=Bodies.circle(x,y,this.r,options)
        this.image=loadImage("assets/cannonball.png")
        World.add(world,this.body);
    }
    remove(index)
    {
        Matter.Body.setVelocity(this.body,{x:0,y:0});
        setTimeout(()=>{
            Matter.World.remove(world,balls[index].body)
            delete balls[index];
        },2000)
    }
    display()
    {
        var pos = this.body.position;
        push();
        imageMode(CENTER);
        image(this.image,pos.x,pos.y,this.r,this.r)
        pop();
    }
    shoot()
    {
        var newangle = canon.angle-28
        newangle = newangle*(3.14/180)
        var velocity = p5.Vector.fromAngle(newangle)
        velocity.mult(0.5)
        Matter.Body.setStatic(this.body,false);
        Matter.Body.setVelocity(this.body,{
            x:velocity.x*(180/3.14),y:velocity.y*(180/3.14)
        })
    }
}