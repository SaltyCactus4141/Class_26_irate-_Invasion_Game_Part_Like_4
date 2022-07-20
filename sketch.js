const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,ground;
let backgroundImg
let towerImg,tower
let canon,angle
let cannonball
var balls = []
var boats = []

function preload() {
 
backgroundImg = loadImage("assets/background.gif");
towerImg = loadImage("assets/tower.png");

}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
 options={
 isStatic:true
 }
 
 ground= Bodies.rectangle(0,height-1, width*2,1,options);
 World.add(world,ground);
 tower = Bodies.rectangle(160,350,160,310,options);
 World.add(world,tower);
 angleMode(DEGREES);
 angle = 15
 canon = new Canon(180,110,130,100,angle);
 
}

function draw() 
{
  background(189);
  image(backgroundImg,0,0,1200,600);
  push();
  imageMode(CENTER);
  image(towerImg,tower.position.x,tower.position.y,160,310);
  pop();
  Engine.update(engine);
 
 rect(ground.position.x, ground.position.y,width*2,1);
 canon.display()
 showBoats();
for(var i = 0;i<balls.length;i++)
{
showcannonballs(balls[i],i)
boatCollide(i)
}
   
}

function keyReleased()
{
  if(keyCode == 32)
  {
    cannonball = new CannonBall(canon.x,canon.y,);
    balls.push(cannonball)
    balls[balls.length-1].shoot();
  }
}

function showcannonballs(ball,i)
{
  if(ball)
  {
    ball.display();
    if(ball.body.position.x>=width || ball.body.position.y>=height-50)
    {
      ball.remove();
    }
  }
}

function showBoats()
{
  if(boats.length > 0)
  {
    if(boats[boats.length - 1] === undefined || boats[boats.length - 1].body.position.x<width-300)
    {
      var positions = [-40,-60,-70,-20];
      var position = random(positions);
      var boat = new Boat(width,height - 100,170,170,position);
      boats.push(boat);
    }
    for(var i = 0; i<boats.length;i++)
    {
      if(boats[i])
      {
        Matter.Body.setVelocity(boats[i].body,{
          x:-0.9,
          y:0
        })
        boats[i].display();
      }
    }
  }
  else
  {
    boat = new Boat(width,height - 60,170,170,-60);
    boats.push(boat);
  }
}

function boatCollide(index)
{
  for(var i = 0;i<boats.length;i++)
  {
    if(balls[index]!== undefined && boats[i]!== undefined)
    {
      var collision = Matter.SAT.collides(balls[index].body,boats[i].body)
      if(collision.collided)
      {
        boats[i].remove(i);
        Matter.World.remove(world,balls[index].body);
        delete balls[index];
      }
    }
  }
}