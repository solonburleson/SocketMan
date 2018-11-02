var world = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,4,4,4,4,4,4,4,4,4,4,4,4,1],
    [1,4,1,4,1,4,1,4,1,4,1,4,1,4,1],
    [1,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
    [1,4,1,4,1,4,1,4,1,4,1,4,1,4,1],
    [1,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
    [1,4,1,4,1,4,1,4,1,4,1,4,1,4,1],
    [1,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
    [1,4,1,4,1,4,1,4,1,4,1,4,1,4,1],
    [1,4,4,4,4,4,4,4,4,4,4,4,4,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];
var worldDict = {
    0: 'blank',
    1: 'wall',
    2: 'sushi',
    3: 'onigiri',
};

 var score = 0, lives = 3;

function drawWorld(){

    content = "";
    for(var row = 0; row < world.length; row++){
        content += "<div class = 'row'>";
        for(var x = 0; x <world[row].length; x++){ 
            if(world[row][x] == 4){ 
                var random = [0,2,3];
                var selectrandom = random[Math.floor(Math.random() * random.length)];
                content += "<div class = '"+worldDict[selectrandom]+"'></div>"
                world[row][x] = selectrandom;
            }
            else {
            content += "<div class = '"+worldDict[world[row][x]]+"'></div>";
            }
        }
    content += "</div>";    
    }
    document.getElementById('world').innerHTML = content;
    document.getElementById('score').innerHTML = "Score = "+score+"";
    document.getElementById('lives').innerHTML = "Lives = "+lives+"";
}
drawWorld()

var ninjamanpos = {
    left: 1,
    top: 1,
}
function update(){
    document.getElementById('ninjaman').style.left = ninjamanpos.left * 40+"px";
    document.getElementById('ninjaman').style.top = ninjamanpos.top * 40+"px";
}

function scorekeeper(){
    content = "";
    if(world[ninjamanpos.top][ninjamanpos.left] == 2){
        score = score + 10;
    }
    else if(world[ninjamanpos.top][ninjamanpos.left] == 3){
        score = score + 5;
    }
    content += "Score = "+score;
    
    document.getElementById('score').innerHTML = content;
}

var pumpkins =[
{left: 13,top: 10}
]

function drawPumpkin(){
    content = "";
    for(var index = 0; index < pumpkins.length; index++){
    content += "<div class= 'pumpkin' style='left:"+pumpkins[index].left * 40+"px; top:"+pumpkins[index].top * 40+"px'></div>";
    }
    
    document.getElementById('pumpkins').innerHTML = content;

}
drawPumpkin();

document.onkeydown = function(e){
    if(lives > 0){
    if(e.keyCode == 37 && world[ninjamanpos.top][ninjamanpos.left - 1] != 1){ //LEFT
        ninjamanpos.left = ninjamanpos.left - 1;
    }
    if(e.keyCode == 39 && world[ninjamanpos.top][ninjamanpos.left + 1] != 1){ //RIGHT
        ninjamanpos.left = ninjamanpos.left + 1;
    }
    if(e.keyCode == 38 && world[ninjamanpos.top - 1][ninjamanpos.left] != 1){ //UP
        ninjamanpos.top = ninjamanpos.top - 1;
    }
    if(e.keyCode == 40 && world[ninjamanpos.top + 1][ninjamanpos.left] != 1){ //DOWN
        ninjamanpos.top = ninjamanpos.top + 1;
    }
    update();
    scorekeeper();
    world[ninjamanpos.top][ninjamanpos.left] = 0;
    drawWorld();
}
}

function movePumpkin(){
    for(var index = 0; index < pumpkins.length; index++){
    if(ninjamanpos.top < pumpkins[index].top && world[pumpkins[index].top - 1][pumpkins[index].left] != 1){ // CHASE UP
        pumpkins[index].top = pumpkins[index].top -1;
    }
    if(ninjamanpos.top > pumpkins[index].top && world[pumpkins[index].top + 1][pumpkins[index].left] != 1){ // CHASE DOWN
        pumpkins[index].top = pumpkins[index].top +1;
    }
    if(ninjamanpos.left < pumpkins[index].left && world[pumpkins[index].top][pumpkins[index].left - 1] != 1){ // CHASE LEFT
        pumpkins[index].left = pumpkins[index].left -1;
    }
    if(ninjamanpos.left > pumpkins[index].left && world[pumpkins[index].top][pumpkins[index].left + 1] != 1){ //CHASE RIGHT
        pumpkins[index].left = pumpkins[index].left +1;
    } 
    if(ninjamanpos.left == pumpkins[index].left && ninjamanpos.top == pumpkins[index].top){
        ninjamanpos.left = 1;
        ninjamanpos.top = 1;
        lives = lives - 1;
        update();
        document.getElementById('lives').innerHTML = "Lives = "+lives+"";
    }
    }
}

var newpumpkin = 0; //maybe move the variable into a function?
function reset(){
    var resetcount = 0;
    for(var row = 0; row < world.length; row++){
        for(var x = 0; x <world[row].length; x++){
            if(world[row][x] > 1){
                resetcount = resetcount + 1;
            }
        }
    }
    if(resetcount == 0){
    for(var row = 0; row < world.length; row++){
        for(var x = 0; x <world[row].length; x++){
            if(world[row][x] == 0){
                world[row][x] = 4;
                newpumpkin = newpumpkin + 1;
            }
        }
    }
    drawWorld();
    }
    
}

function addnewpumpkin(){
    if(newpumpkin % 3 == 0){
        pumpkins.push({left: 9,top: 10});
    }
}


function gameLoop(){
    if(lives > 0){
    // console.log('gameLoop is running!')
    movePumpkin();
    drawPumpkin();
    reset();
    //addnewpumpkin();
    }
    else{
        document.getElementById('gameover').innerHTML = "GAME OVER"
    } 

    setTimeout(gameLoop, 500);
}
gameLoop();