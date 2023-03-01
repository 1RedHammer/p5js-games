//variables-too many
var coinPassage = 0;
var money = 0;
var passage = 3;
var coins = [];
var coinsY = [];
var trains = [];
var trainsY = [];
var trainsLength = [];
var safeTrains = [];
var safeTrainsY = [];
var safeTrainsLength = [];
var blocks = [];
var blocksY = [];
var air = false;
var timer = 0;
var circles = 1;
var circlesX = [];
var circlesY = [];
var circlesTimer=[];
var mainPage = true;
var score = 0;
var onTop = false;
var oldPassage = 3;
var trainSpawn = 200;
var safeTrainSpawn = 200;
var blockSpawn = 175;
var boostSpawn = 2000;
var coinSpawn = 75;
var normalSpeed = 1;
var linesY = [];
var boosts = [];
var boostsY = [];
var boostsType = [];
var rocket = false;
var scoreRate = 1;
var invincible = false;
var rocketTimer = 0;
var pause = false;
var fireX = [];
var fireY = [];
var fireFill = [];
var fire = false;
var doubleScore = false;
var sparksX = [];
var sparksY = [];
var sparksSpeed = [];
var doubleTimer = 0;
var rocksX = [];
var rocksY = [];
frameRate(0);
//reset
for(var i = 0;i<40;i++){
    for(var j = 0;j<5;j++){
        rocksX.push(i%5);
        rocksY.push(j*10);
    }
}
for(var i = 0;i<40;i++){
    for(var j = 0;j<5;j++){
        rocksX.push(i%5+350);
        rocksY.push(j*10);
    }
}
var reset = function(){
    normalSpeed = 1;
    rectMode(CENTER);
    score = 0;
    mainPage = true;
    passage = 3;
    trains = [];
    trainsY = [];
    trainsLength=[];
    blocks = [];
    safeTrains = [];
    safeTrainsY = [];
    safeTrainsLength = [];
    blocksY = [];
    boosts = [];
    boostsY = [];
    boostsType = [];
    air = false;
    setup();
};
frameRate(0);
//making lines
for(var i = 0;i<8;i++){
    linesY.push(i*50);
}
//setting up
var setup = function(){
    rectMode(CENTER);
    fill(95,77,39);
    for(var i = 0;i<5;i++){
        rect(100+i*50,200,50,400);
    }
};
//trains
var train = function(passage,y,length){
    fill(255,0,0);
    rect(passage*50+50,y,40,length);
};
//ramped trains
var safeTrain = function(passage,y,length){
    fill(255,255,0);
    rect(passage*50+50,y,40,length);
    triangle(passage*50+50-20,y+length/2,passage*50+50+20,y+length/2,passage*50+50,y+length/2+50);
    
};
//walls
var obstacle = function(passage,y){
    fill(0,0,255);
    rect(passage*50+50,y,40,20);
};
//doing the boost
var boostIt = function(type){
    if(type === 1){
        rocket = true;
        fire = true;
    }
    if(type === 2){
        doubleScore = true;
        doubleTimer = 500;
    }  
};
//boosts
var boost = function(passage,y,type){
    pushMatrix(); 
    translate(passage*50+50,y);
    if(type === 1){
        noStroke();
        //rocket
        fill(255, 0, 0);
        ellipse(0,0,15,15);
        fill(255,255,200);
        rect(0,25,20,50);
        stroke(0,0,0);
        beginShape();
        fill(0,0,0);
        vertex(-10,10);
        vertex(-20,30);
        vertex(-10,40);
        endShape();
        beginShape();
        fill(0,0,0);
        vertex(10,10);
        vertex(20,30);
        vertex(10,40);
        endShape();
    }
    if(type === 2){
        imageMode(CENTER);
        image(getImage("space/star"),0,0);
    }
    popMatrix();
};
//you
var you = function(passage){
    fill(0,255,0);
    if(rocket){
        ellipse(passage*50+50,350,60,60);
        pushMatrix(); 
        translate(passage*50+50,300);
        noStroke();
        fill(255, 0, 0);
        ellipse(0,0,15,15);
        fill(255,255,200);
        rect(0,25,20,50);
        stroke(0,0,0);
        beginShape();
        fill(0,0,0);
        vertex(-10,10);
        vertex(-20,30);
        vertex(-10,40);
        endShape();
        beginShape();
        fill(0,0,0);
        vertex(10,10);
        vertex(20,30);
        vertex(10,40);
        endShape();
        if(fire){
            fireX = [];
            fireY = [];
            fireFill = [];
            for(var i = 0;i<100;i++){
                fireY.push(random(50,100));
                fireX.push(random(-20,20));
                fireFill.push(color(255-i*2,0,0));
            }
            fire = false;
        }
        for(var i = 0;i<fireX.length;i++){
            fireY[i]++;
            if(fireY[i]>=100){
                fireY[i] = random(50,100);
            }
            fill(fireFill[i]);
            ellipse(fireX[i]*(fireY[i]-50)/50,fireY[i],10,10);
        }
        popMatrix();
        return;
    }
    if(onTop){
        ellipse(passage*50+50,350,40,40);
        return;
    }
    if(air === true){
        ellipse(passage*50+50,350,timer+10,timer+10);
        return;
    }
    if(air === false){
        ellipse(passage*50+50,350,20,20);
        return;
    }
};
//coins
var coin = function(passage,y){
    fill(255,255,0);
    ellipse(passage*50+50,y,40,40);
    fill(200,200,0);
    ellipse(passage*50+50,y,20,20);
};
//where EVERYTHING happens
var draw= function() {
    if(pause === false){
        if(frameCount<720){
            for(var i = 0;i<5;i++){
            background(0, 0, 0);
            fill(255,255,255);
            noStroke();
            for(var i = 0;i<circles;i++){
                circlesX[i] = 200+cos(i)*frameCount%200;
                circlesY[i] = 200+sin(i)*frameCount%200;
                ellipse(circlesX[i],circlesY[i],cos(i*20)*10,sin(i*20)*10);
                circlesTimer[i]--;
                if(circlesTimer[i]<=0){
                    circlesX.splice(i,1);
                    circlesY.splice(i,1);
                    circlesTimer.splice(i,1);
                    circles--;
                }
            
                
            }
            if(frameCount%1 === 0){
                circles++;
                circlesX.push(200);
                circlesY.push(200);
                circlesTimer.push(1000);
            }
            }
        
        }
        else if(frameCount < 1000){
            frameRate(160);
            textAlign(CENTER,CENTER);
            textSize(20);
            fill(255,0,0,1);
            ellipse(200,200,150,150);
            fill(0,255,0);
            text("JAYDEN",200,150);
            if(frameCount>750){
                text("PRESENTS",200,250);
            }
        }
        else if(frameCount<1200){
            background(0,0,0);
            textSize((frameCount-1000)/4);
            text("Subway Surfers",200+random(-5,5),200+random(-5,5));
            normalSpeed = 1;
        }
        else if(frameCount>1250){
        if(mainPage){
            rectMode(CENTER);
            stroke(0,0,0);
            background(0, 0, 0);
            frameRate(100);
            textAlign(CENTER,CENTER);
            fill(255, 0, 0);
            rect(50,200,75,75);
            rect(200,200,100,100);
            textSize(50);
            fill(0,255,0);
            text("play",200,200);
            text("$"+money,100,50);
            textSize(15);
            text("boost rate:1 boost every "+boostSpawn/100+" seconds.",250,25);
            text("More Boosts",50,200);
            text("$1000",50,210);
            textSize(75);
            text("SUBWAY", 200,100);
            text("SURFERS",200,300);
            if(mouseIsPressed && dist(mouseX,mouseY,200,200)<=50){
                mainPage = false;
            }
            if(mouseIsPressed && dist(mouseX,mouseY,100,200)<=75/2){
                if(money>=1000 && boostSpawn>50){
                    money-=1000;
                    boostSpawn-=500;
                }
            }
        }
        else{
        if(frameCount%100 === 0){
            normalSpeed+=0.001;    
        }
        stroke(0,0,0);
        score+=scoreRate;
        background(255, 0, 0);
        timer--;
        if(timer<=0){
            air = false;
        }
        if(frameCount%trainSpawn === 0){
            trains.push(round(random(1,5)));
            trainsY.push(-50);
            trainsLength.push(random(50,200));
        }
        if(frameCount%blockSpawn === 0){
            blocks.push(round(random(1,5)));
            blocksY.push(-50);
        }
        if(frameCount%safeTrainSpawn === 0){
            safeTrains.push(round(random(1,5)));
            safeTrainsY.push(-50);
            safeTrainsLength.push(random(50,275));
        }
        if(frameCount%boostSpawn === 0){
            boosts.push(round(random(1,5)));
            boostsY.push(-50);
            boostsType.push(round(random(1,2)));
        }
        if(frameCount%coinSpawn === 0){
            coins.push(coinPassage);
            coinsY.push(-50);
        }
        background(255, 0, 0);
        strokeWeight(1);
        setup();
        stroke(0,0,0);
        strokeWeight(5);
        for(var i = 0;i<linesY.length;i++){
            line(0,linesY[i],400,linesY[i]);
            linesY[i]+=normalSpeed;
            if(linesY[i]>=400){
                linesY[i] = 0;
        }
        }
        imageMode(CENTER);
        
        for(var i = 0;i<rocksX.length;i++){
            imageMode(CENTER);
            image(getImage("cute/Rock"),rocksX[i]*10,rocksY[i]*10,10,10);
            rocksY[i]++;
            if(rocksY[i]>=400){
                rocksY[i] = 0;
            }
        }
        strokeWeight(1);
        for(var i = 0;i<boosts.length;i++){
            boost(boosts[i],boostsY[i],boostsType[i]);
            boostsY[i]+=normalSpeed;
            if(boostsY[i]+50>=340&&boosts[i] === passage && boostsY[i]<=375){
                boostIt(boostsType[i]);
                boosts.splice(i,1);
                boostsY.splice(i,1);
                boostsType.splice(i,1);
            }
        }
        for(var i = 0;i<blocks.length;i++){
            obstacle(blocks[i],blocksY[i]);
            blocksY[i]+=normalSpeed;
            if(blocksY[i]>=420){
                blocksY.splice(i,1);
                blocks.splice(i,1);
            }
            if(blocks[i] === passage && blocksY[i]>=330 && blocksY[i]<=360 && air === false && onTop === false && invincible === false){
                reset();
            }
        }
        for(var i = 0;i<trains.length;i++){
            train(trains[i],trainsY[i],trainsLength[i]);
            trainsY[i]+=normalSpeed+1;
            if(trainsY[i]>=400+trainsLength[i]/2&& onTop === false){
                trains.splice(i,1);
                trainsY.splice(i,1);
                trainsLength.splice(i,1);
            }
            if(trainsY[i]+trainsLength[i]/2 >= 340&&passage === trains[i]&& trainsY[i]<=400 && invincible === false){      reset();
            }
            for(var j = 0;j<safeTrains.length;j++){
                if(trains[i]===safeTrains[j]&& trainsY[i]+trainsLength[i]/2>=safeTrainsY[j]-safeTrainsLength[j]/2&&safeTrainsY[j]>=trainsY[i]){
                    trains.splice(i,1);
                    trainsY.splice(i,1);
                    trainsLength.splice(i,1);
                }
            }
        }
        if(doubleScore){
            doubleTimer--;
            if(doubleTimer<=0){
                doubleScore = false;
                scoreRate = 1;
            }
            scoreRate = 2;
            if(frameCount%5 === 0){
                sparksX.push(random(400));
                sparksY.push(400);
                sparksSpeed.push(random(1,3));
            }
            for(var i = 0;i<sparksX.length;i++){
                sparksY[i]-=sparksSpeed[i];
                fill(255,255,0);
                ellipse(sparksX[i],sparksY[i],15,15);
                fill(250,250,0);
                ellipse(sparksX[i],sparksY[i],10,10);
                if(sparksY[i]<=-10){
                    sparksSpeed.splice(i,1);
                    sparksY.splice(i,1);
                    sparksX.splice(i,1);
                }
            }
        }
        if(frameCount%200 === 0){
            var a = round(random(-1,1));
            if(a === -1){
                coinPassage = passage-1;
            }
            if(a === 1){
                coinPassage = passage+1;
            }
            if(coinPassage>=6||coinPassage<=0){
                coinPassage = 3;
            }
        }
        if(rocket){
            scoreRate = 5;
            invincible = true;
            normalSpeed = 10;
            if(rocketTimer === 0){
                rocketTimer = 1000;
            }
            if(frameCount%10 === 0){
                coins.push(coinPassage);
                coinsY.push(-50);
            }
            rocketTimer--;
            if(rocketTimer<=0){
                rocket = false;
            }
        }
        else{
            scoreRate = 1;
            invincible = false;
            normalSpeed = 1;
        }
        for(var i= 0;i<safeTrains.length;i++){
            safeTrain(safeTrains[i],safeTrainsY[i],safeTrainsLength[i]);
            safeTrainsY[i]+=normalSpeed+1;
            if(safeTrainsY[i]>=400+safeTrainsLength[i]/2){
                safeTrains.splice(i,1);
                safeTrainsY.splice(i,1);
                safeTrainsLength.splice(i,1);
            }
            if(passage === safeTrains[i] && safeTrainsY[i]+safeTrainsLength[i]/2>=340){ 
                if(oldPassage === passage){
                    onTop = true;
                    break;
                }
                else if(invincible === false){
                    reset();
                }
            }
            else{
                onTop = false;
            }
            
        }
        for(var i = 0;i<coins.length;i++){
            coin(coins[i],coinsY[i]);
            coinsY[i]+=normalSpeed;
            if(passage === coins[i]&&coinsY[i]+25>=340&&coinsY[i]-25<=375){
                money++;
                coins.splice(i,1);
                coinsY.splice(i,1);
            }
            if(coinsY[i]>=425){
                coins.splice(i,1);
                coinsY.splice(i,1);
            }
        }
        you(passage);
        fill(0, 0, 0);
        textSize(25);
        fill(0,0,0);
        text(score,200,100);
        text(money,100,100);
        }
        }
        oldPassage = passage;
        normalSpeed+=0.0001;
    }
    else{
        background(0,0,0);
        fill(255, 0, 0);
        textSize(50);
        textAlign(CENTER,CENTER);
        text("PAUSED",200,200);
    }
};
//moving
keyPressed=function(){
    if(keyCode === 39 && passage<5){
        passage++;
    }
    if(keyCode === 37 && passage>1){
        passage--;
    }
    if(keyCode === 38){
        air = true;
        timer = 75;
    }
};
//pause
mouseOut = function(){
    pause = true;
};
//unpause
mouseOver = function(){
    pause = false;
};
