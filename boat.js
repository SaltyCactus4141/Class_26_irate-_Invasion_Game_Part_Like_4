class Boat
{
    constructor(x,y,width,height,boatpos)
    {
        var options = 
        {
            restitution : 0.8,
            friction : 1,
            density : 1
        }
        this.width = width;
        this.height = height;
        this.body = Bodies.rectangle(x,y,width,height,options);
        this.Image = loadImage("assets/boat.png");
        this.boatPosition = boatpos;
        World.add(world,this.body);
    }

    remove(index)
    {
        setTimeout(()=>{
            Matter.World.remove(world,boats[index].body)
            delete boats[index];
        },2000)
    }

    display()
    {
        var pos = this.body.position;
        push();
        translate(pos.x,pos.y);
        imageMode(CENTER);
        image(this.Image,0,this.boatPosition,this.width,this.height);
        pop();
    }
}