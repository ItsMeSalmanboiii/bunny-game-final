const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var engine, world;
var ball, rope, rope_1, rope_2, ground, fruit, fruit_con;
var bgImage, food, rabbit, bunny, button;
var blink,eat;
var bgSound,cutSound,eatingSound,sadSound,airSound;
var blower;




function preload(){
  bgImage=loadImage("assets/images/background.png")
  food=loadImage("assets/images/melon.png")
  rabbit=loadImage("assets/images/Rabbit-01.png")
blink=loadAnimation("assets/images/blink_1.png","assets/images/blink_2.png","assets/images/blink_3.png")
eat=loadAnimation("assets/images/eat_0.png","assets/images/eat_1.png","assets/images/eat_2.png","assets/images/eat_3.png","assets/images/eat_4.png")
sad=loadAnimation("assets/images/sad_1.png","assets/images/sad_2.png","assets/images/sad_3.png")
blink.playing=true
eat.playing=true
eat.looping=false
sad.playing=true
sad.looping=false


bgSound=loadSound("assets/sounds/bgSound.mp3")
cuttingSound=loadSound("assets/sounds/cutingSound2.mp3")
sadSound=loadSound("assets/sounds/sadSound.wav")
eatingSound=loadSound("assets/sounds/eatingSound.mp3")
airSound=loadSound("assets/sounds/airSound.wav")
}

function setup(){
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); 
  if(isMobile){
     canW = displayWidth;
      canH = displayHeight;
       createCanvas(displayWidth+80, displayHeight);
       }
        else { 
          canW = windowWidth;
           canH = windowHeight; 
           createCanvas(windowWidth, windowHeight);
           }
  frameRate(80);
 
  engine = Engine.create();
  world = engine.world;
blink.frameDelay=20
eat.frameDelay=20
bunny=createSprite(250,610,100,100)

bunny.scale=0.2 
bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

button=createImg("assets/images/cut_btn.png")
button.position(20,30)
button.size(50,50)
button.mouseClicked(drop)

button1=createImg("assets/images/cut_btn.png")
button1.position(70,30)
button1.size(60,60)
button1.mouseClicked(drop1)

button2=createImg("assets/images/cut_btn.png")
button2.position(370,70)
button2.size(50,50)
button2.mouseClicked(drop2)

blower= createImg("assets/images/balloon.png")
blower.position(10,250)
blower.size(150,100)
blower.mouseClicked(airblow)

  ground= new Ground(200,690,600,25);
  //ball = new Ball(200, 200, 80, 80);
  rope = new Rope(8,{x:40,y:30});
  rope_1 = new Rope(10,{x:100 ,y:30});
  rope_2 = new Rope(10,{x:400 ,y:60});
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con1 = new Link(rope_1,fruit);
  fruit_con2 = new Link(rope_2,fruit);

rectMode(CENTER)
ellipseMode(RADIUS)

 
}

/*function mouseDragged (){
 Matter.Body.setPosition(ball.body,{x:mouseX,y:mouseY})
}*/

 

function draw(){
  background(51);
  image(bgImage,0,0,displayWidth+80,displayHeight+80);
  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();
  
  ground.show();
  rope.show();
  rope_1.show();
  rope_2.show();
  Engine.update(engine)
 
  drawSprites();
  //ball.display();
  //fruit_con.show();


   if (collide(fruit,bunny)==true){
    bunny.changeAnimation('eating')
    eatingSound.play();
  }
  if (fruit!=null && fruit.position.y>=650){
    bunny.changeAnimation('crying')
    bgSound.stop()
    eatingSound.stop();
    sadSound.play();
    fruit=null;
  } 
 // addImage(food,fruit.position.x,fruit.position.y,60,60)

//ellipse(fruit.position.x,fruit.position.y,15,15)
}
  
  

  function drop(){
    rope.break();
    fruit_con.detach();
    fruit_con = null; 
  }

  function drop1(){
    rope_1.break();
    fruit_con1.detach();
    fruit_con1 = null; 
  }

  function drop2(){
    rope_2.break();
    fruit_con2.detach();
    fruit_con2 = null;
  }

  function collide(body,fruit){
    if(body!=null){
      var d=dist(body.position.x,body.position.y,fruit.position.x,fruit.position.y)
      if(d<=80){
        World.remove(engine.world,fruit)
        fruit=null
        return true
      }
      else{
        return false
      }
    }
  }
  
  function airblow(){
    Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0})
    airSound.play
  }