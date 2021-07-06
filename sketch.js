var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  //spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8
    
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();

    
    //climbersGroup.collide(ghost);
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

} 

function spawnDoors() {
  if(frameCount % 200 === 0){
    
    //creating door sprite
          var door = createSprite(150,-50);
          door.addImage(doorImg)
          door.velocityY=5;
          door.x=Math.round(random (100,300));
          door.lifetime = 600;
          console.log(door.depth);
          console.log(ghost.depth);
          door.depth = ghost.depth;
          ghost.depth = ghost.depth+1;
          
    
    //creating climber sprite
          var climber = createSprite(50,10);
          climber.addImage(climberImg);
          climber.velocityY = 5;
          climber.x=door.x;
          climber.lifetime = 600;
    
    //creating invisibleBlock
          var invisibleBlock = createSprite(50,15,climber.width,10);
          //invisibleBlock.width = climber.width;
          invisibleBlock.velocityY = 5;
          invisibleBlock.x=door.x;
          invisibleBlock.lifetime = 600;
          invisibleBlock.visible=false;
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
  
  
}
