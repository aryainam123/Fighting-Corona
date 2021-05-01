var girl,girlImg;
var scene,sceneImg;
var start,startImg;
var germ1,germ2,germ3,germ4,germ5,germ6;
var coin1,coin2,coin3;
var heart;
var gameStates = "serve";
var germsGroup,bronzeGroup,goldGroup,silverGroup,heartsGroup;
var gameoverImg,gameover,restart,restartImg;
var score = 0;
var lifetime = 3;
var startbg,startbgImg,instruction,instructionImg;
var diesound,collectsound,heartsound;

function preload(){
  girlImg = loadImage("blue_dress.png");
  sceneImg = loadImage("texture_02_2.png");
  startImg = loadImage("Start.png");
  germ1 = loadImage("germ_blue.png");
  germ2 = loadImage("germ_green.png");
  germ3 = loadImage("germ_pink.png");
  germ4 = loadImage("germ_purpule.png");
  germ5 = loadImage("germ_red.png");
  germ6 = loadImage("germ_yellow.png");
  coin1 = loadImage("coin_gold.png");
  coin2 = loadImage("coin_silver.png");
  coin3 = loadImage("coin_bronze.png");
  heart = loadImage("heart.png");
  gameoverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart1.0-1.png");
  startbgImg = loadImage("background1.png");
  instructionImg = loadImage("text2.0.png");
  diesound = loadSound("364929__jofae__game-die.mp3");
  collectsound = loadSound("345299__scrampunk__okay.wav");
  heartsound = loadSound("499790__robinhood76__08470-music-box-collect-ding.wav")
  
}
function setup(){
  createCanvas(500,500);
  startbg = createSprite(250,250)
  startbg.addImage(startbgImg);
  startbg.scale = 5.5;
  
  instruction = createSprite(250,300);
  instruction.addImage(instructionImg);
  instruction.scale = 3;
  
  scene = createSprite(200,200);
  scene.addImage(sceneImg);
  scene.scale = 0.3;
  scene.visible = false;
  
  girl = createSprite(200,200,30,30);
  girl.addImage(girlImg);
  girl.scale = 0.3;
  girl.visible = false;
  
  start = createSprite(250,100);
  start.scale = 2;
  start.addImage(startImg);  
  germsGroup = createGroup();
  bronzeGroup = createGroup();
  silverGroup = createGroup();
  goldGroup = createGroup();
  heartsGroup = createGroup();
  
  gameover = createSprite(250,250);
  gameover.addImage(gameoverImg);
  restart = createSprite(250,350);
  restart.addImage(restartImg);
  restart.visible = false;
  gameover.visible = false;
  
    
}
function draw(){
  background("gray");
  
  if(mousePressedOver(start)){
    gameStates = "Play";
  }
  if(gameStates === "Play"){
    scene.visible = true;
    girl.visible = true; 
    start.visible = false;
    scene.velocityY = +(4 + 5*score/50);
    if(scene.y>300){
      scene.y = 200;
    }
    if(keyDown("space")){
      girl.velocityY = -7;
    }
    girl.velocityY +=0.8;
    if(keyDown("right_arrow")){
      girl.x += 5;
    }
    if(keyDown("left_arrow")){
      girl.x -= 5; 
    }
    if(bronzeGroup.isTouching(girl)){
      bronzeGroup.destroyEach();
      score = score+10;
      collectsound.play();
     }
    if(silverGroup.isTouching(girl)){
      silverGroup.destroyEach();
      score = score+20;
      collectsound.play();
     }
    if(goldGroup.isTouching(girl)){
       goldGroup.destroyEach();
       score = score+30;
       collectsound.play();
    }
    if(heartsGroup.isTouching(girl)){
      lifetime = lifetime+1;
      heartsGroup.destroyEach();
      heartsound.play();
    }
    if(germsGroup.isTouching(girl)||girl.y>500){
      lifetime = lifetime-1;
      germsGroup.destroyEach();
      girl.y = 150;
      girl.velocityY = 0;
      diesound.play();
    }
    
    if(lifetime === 0){
      gameStates = "End";
    }
  
    spawnGerms();
    spawnBronze();
    spawnSilver();
    spawnGold();
    spawnHearts(); 
  }
  
    if(gameStates === "End"){
    
      scene.velocityY = 0;
      girl.visible = false;
      germsGroup.destroyEach();
      bronzeGroup.destroyEach();
      silverGroup.destroyEach();
      goldGroup.destroyEach();
      restart.visible = true;
      gameover.visible = true;

      if(mousePressedOver(restart)){
        reset();
      }
    }
  
    drawSprites();
    textSize(20);
    fill(255);
    text("Score: "+ score,370,30);

    textSize(20);
    fill(255);
    text("Lifetime: "+ lifetime,30,30);
    console.log(gameStates); 
}

function reset(){
  gameStates = "Play";
  restart.visible = false;
  gameover.visible = false;
  score = 0;
  lifetime = 3;
  germsGroup.destroyEach();
  bronzeGroup.destroyEach();
  silverGroup.destroyEach();
  goldGroup.destroyEach();
  heartsGroup.destroyEach(); 
}
 
function spawnGerms(){
  if(frameCount % 50 === 0){
    var germs = createSprite(200,-50);
    var rand = Math.round(random(1,6));
    germs.x = Math.round(random(120,400))
      switch(rand) {
        case 1: germs.addImage(germ1);
                break;
        case 2: germs.addImage(germ2);
                break;
        case 3: germs.addImage(germ3);
                break;
        case 4: germs.addImage(germ4);
                break;
        case 5: germs.addImage(germ5);
                break;
        case 6: germs.addImage(germ6);
                break;
        default: break;
      }
    germs.scale = 0.2;
    germs.velocityY = +(8 + 5*score/50);
    germs.lifetime = 70;
    girl.depth = germs.depth;
    girl.depth +=1;
    germsGroup.add(germs);
  }
}

function spawnBronze() {
  if (frameCount % 300 === 0) {
  var bronze = createSprite(50,-50);
  bronze.addImage(coin3);
  bronze.scale=0.7;
  bronze.x = Math.round(random(120,400))
  bronze.velocityY = 9;
  bronze.lifetime = 60;
  bronzeGroup.add(bronze);
    girl.depth = bronze.depth;
    girl.depth +=1;
  }
}

function spawnSilver() {
  if (frameCount % 400 === 0) {
  var silver = createSprite(50,-50);
  silver.addImage(coin2);
  silver.scale=0.7;
  silver.x = Math.round(random(120,400))
  silver.velocityY = 9;
  silver.lifetime = 50;
  silverGroup.add(silver);
    girl.depth = silver.depth;
    girl.depth +=1;
  }
}

function spawnGold() {
  if (frameCount % 500 === 0) {
  var gold = createSprite(50,-50);
  gold.addImage(coin1);
  gold.scale=0.7;
  gold.x = Math.round(random(120,400))
  gold.velocityY = 9;
  gold.lifetime = 45;
  goldGroup.add(gold);
    girl.depth = gold.depth;
    girl.depth +=1;
  }
}

function spawnHearts(){
  if(frameCount % 800 === 0&&lifetime<3){
    var hearts = createSprite(200,-50);
    hearts.addImage(heart);
    hearts.scale = 0.1;
    hearts.x = Math.round(random(120,400))
    hearts.velocityY = 15;
    hearts.lifetime = 45;
    heartsGroup.add(hearts);
    girl.depth = hearts.depth;
    girl.depth +=1;
  }
}