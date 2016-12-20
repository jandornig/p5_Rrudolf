var mic;
var fft;
var forest = [];
var lastTime= 0

var snow = [];


function setup() {
    createCanvas(360, 640);
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);
    frameRate(30)
    
    for (var i=0; i<50; i++) {
    snow.push(new Falling());
        
        noStroke()
  }
    
    
     
}

function draw() {
    background(20)
    var updateEvery= random(2000)
    var currentTime = millis()
    
        for (var i=0; i<forest.length; i++) {
            push()
            noStroke()
            fill(255,200)
        forest[i].display();
        forest[i].move();
            pop()
    }
    
     if(currentTime-lastTime>updateEvery && random()<0.3 ){
         update()
         lastTime=currentTime
     }
  
   
   micLevel = mic.getLevel();
    text(micLevel, 20, 20)
    
   myY = (height/2)-(map(micLevel, 0, 1, 0, windowHeight))
   text(myY,20,50)
    
    
    var fat = 25 
    push()
    fill(139,69,19)
    ellipse(width/4,myY , fat, fat);
    ellipse(width/4*2,myY , fat, fat);
    ellipse(width/4*3,myY , fat, fat);
    
    ellipse(width/4+7,myY-10,15,15)
    stroke(139,69,19)
    line(width/4+5,myY-15,width/4,myY-20)
    line(width/4+8,myY-15,width/4+13,myY-20)
    
    line(width/4*2+5,myY-15,width/4*2,myY-20)
    line(width/4*2+8,myY-15,width/4*2+13,myY-20)
    
    line(width/4*3+5,myY-15,width/4*3,myY-20)
    line(width/4*3+8,myY-15,width/4*3+13,myY-20)
    noStroke()
    ellipse(width/4*2+7,myY-10 , 15,15);
    ellipse(width/4*3+7,myY-10,15,15)
    
    ellipse(width/4+15,myY-10,10,10)
    ellipse(width/4*2+15,myY-10 , 10,10);
       
    fill(255,0,0)
    ellipse(width/4*3+15, myY-10, 10,10)
    pop()
    
            for (var i=0; i<snow.length; i++) {
                push()
                noStroke()
                fill(255,random(200))
            snow[i].move();
            snow[i].display();

                pop()
          }
         
    }

function Falling() {
  this.x = random(width);
  this.y = random(height);
  this.diameter = random(1, 10);
  this.speed = 5;

  this.move = function() {
    this.x = this.x + (random(-2))
    this.y = this.y - random(-this.speed);
    
      if(this.y>height){
          this.y = 0
      }
      if(this.x<0){
          this.x = width + 10
      }
  };

  this.display = function() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  };
}


function tree() {
  this.x = width+50;
  this.y = height/2;
  this.size = -random(10, 30);
  this.speed = 1;

  this.move = function() {
    this.x = this.x-this.speed
  };

  this.display = function() {
    rect(this.x, this.y, this.size/2, this.size);
    triangle(this.x - this.size, this.y -10, this.x+this.size/2, this.y + this.size*3, this.x+this.size, this.y -10 )
  };

}

function update(){
    forest.push(new tree());
}
