var hunter, hunterImg;
var tiger, tigerImg;
var bgImg, bg, ground;
var dragon, dragonImg;
var dragonGroup, tigerGroup, bulletImg, bullet, bulletGroup, tigerEnd, EndBg, fireball, fireballImg, fireballGroup,bullet2;
var bulletSound, fireballSound,GameOver, gamestate,gameover,score;

function preload(){
hunterImg = loadAnimation("man1.png", "man2.png", "MAN3.PNG", "MAN4.PNG");
bgImg = loadImage("forest.jpg");
tigerImg = loadAnimation("tiger.png","tiger2.png","tiger3.png","tiger4.png");
dragonImg = loadAnimation("dragon1.png","dragon2.png","dragon3.png");
bulletImg = loadImage("bullet.png");
tigerEnd = loadAnimation("tiger4.png");
fireballImg = loadImage("fireball.png");
bullet2 = loadImage("bullet (2).png");
bulletSound = loadSound("bullet.wav");
fireballSound = loadSound("fireball.wav");
GameOver = loadSound("gameover.wav");
}

function setup(){
createCanvas(1000, 550);

bg = createSprite(600 , 275, 2400, 800);
bg.addImage(bgImg);
bg.velocityX = -2;
bg.scale = 2;

hunter = createSprite(50, 450, 50, 60);
hunter.addAnimation("walking",hunterImg);
hunter.scale = 0.5;

EndBg = createSprite(500,275,1000,550);
EndBg.visible = false;

gamestate = "play";

score = 0;

dragonGroup = new Group();
tigerGroup = new Group();
bulletGroup = new Group();
fireballGroup = new Group();
}

function draw(){


if(gamestate === "play"){

if(bg.x<300){
    bg.x = 600;
}


spawnTigers();
spawnDragon();

if(keyDown("space")&& frameCount%5===0) {
    fill("yellow");
    bullet = createSprite(hunter.x+60, hunter.y+5);
    bullet.depth = hunter.depth-1 ;
    bullet.velocityX = 15;
    bullet.addImage(bulletImg);
    bullet.scale = 0.2;
    bulletGroup.add(bullet);
    bulletSound.play();
}

if(bulletGroup.isTouching(tigerGroup)){
    tigerGroup.destroyEach();
    bulletGroup.destroyEach();
    score+=1;
}

if(bulletGroup.isTouching(fireballGroup)){
    fireballGroup.destroyEach();
    bulletGroup.destroyEach();
    score+=2;
}

if(tigerGroup.isTouching(hunter)||fireballGroup.isTouching(hunter)){
gamestate = "end";
}

if(frameCount%1000===0){
    fireBall();
    console.log("x");
    }

    if(keyDown("up")&& frameCount%5===0) {
        bullet = createSprite(hunter.x+60, hunter.y+5);
        bullet.depth = hunter.depth-1 ;
        bullet.velocityX = 10;
        bullet.velocityY = -6;
        bullet.addImage(bullet2);
        bullet.scale = 0.1;
        bulletGroup.add(bullet);
        bulletSound.play();
    }
}

drawSprites();

fill("red");
stroke("red");
strokeWeight(3);
textSize(20);
text("score: "+score, 900, 100);

if(gamestate==="end"){
    EndBg.visible = true;
      fill(0,0,255);
      strokeWeight(4);
      gameover = text("GAME OVER",450, 250);
      gameover.depth = EndBg.depth+2
  }
}

function spawnTigers(){
    if(frameCount%150===0){
    tiger = createSprite(900, 450, 100, 60);
    tiger.addAnimation("catching",tigerImg);
    tiger.velocityX = -5-(score/2);
    tiger.scale = 0.8;
   
    EndBg.depth = tiger.depth+2;

    tigerGroup.add(tiger);
    }
}

function spawnDragon(){
    if(frameCount%1000===0){
    dragon = createSprite(900, 100, 100, 60);
    dragon.addAnimation("catching",dragonImg);
    dragon.velocityX = -5-(score/2);
    dragon.scale = .8;
    dragonGroup.add(dragon);
    dragonGroup.lifeTime = 180;
    EndBg.depth = dragon.depth+2;
    }
    
}

function fireBall(){
    fireball = createSprite(850,100);
    fireball.addImage(fireballImg);
    fireball.velocityX = -5+(score/2);
    fireball.velocityY = 2+(score/2);
    fireball.scale = 0.2;
    fireballGroup.add(fireball);
    EndBg.depth = fireball.depth+2;
    fireballSound.play();
}