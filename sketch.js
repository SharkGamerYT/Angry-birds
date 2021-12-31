const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint

var engine, world;
var box1, pig1;
var backgroundImg;
var gameState = "onSling";
var chain;
var slingshot;
var pig2, pig3;
var pig4;
var bg = "sprites/bg.png";
var score = 0;
function preload() {
    //backgroundImg = loadImage("sprites/bg.png");
    getBackgroundImage()
    
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    platform = new Ground(150,305,300,170);
    ground = new Ground(600,height,1200,20);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    pig2 = new Pig(510, 250);
    pig4 = new Pig(510, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);
    pig2 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);
    
    slingshot = new Slingshot(bird.body,{x:200,y:50})

    


}

function draw(){
    if(backgroundImg)


    background(backgroundImg);
    
    textSize(24);
    textFont("Comic");
    fill("blue");
    text("Score  " + score,width-300,50);
   
    Engine.update(engine);

    console.log(box2.body.position.x);
    console.log(box2.body.position.y);
    console.log(box2.body.angle);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();
    pig2.display();
    pig2.score();
    pig4.display();
    pig4.score();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    
    platform.display();
    slingshot.display();
}
function mouseDragged(){
    if(gameState !== "launched"){
        Matter.Body.setPosition(bird.body,{x:mouseX,y:mouseY})
    }
  
}
function mouseReleased(){
    slingshot.fly();
    gameState = "launched"
}
function keyPressed(){
    if(keyCode==32){ 
        bird.trajectory = [];
        Matter.Body.setPosition(bird.body,{x:200,y:50});
slingshot.attach(bird.body);
gameState = "onSling"
    }
}
async function getBackgroundImage(){
    var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Jerusalem");
    var responseJSON = await response.json();
    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    if(hour>=6&&hour<=17){
bg = "Sprites/bg.png";
    
    }
    else if (hour>17&&hour<=19){
        bg = "Sprites/bg3.png";
    }
    else {
        bg = "Sprites/bg2.jpg"
    }
    backgroundImg = loadImage(bg)
}
