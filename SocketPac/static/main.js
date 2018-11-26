var start = 0;
var count = 0;
var world = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
    [1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1],
    [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
    [1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1],
    [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
    [1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1],
    [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
    [1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1],
    [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
    [1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1],
    [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
    [1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1],
    [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
    [1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1],
    [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
    [1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1],
    [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
    [1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1],
    [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
    [1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1],
    [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
    [1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1],
    [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];
var worldDict = {
    0: 'blank',
    1: 'wall',
    2: 'sushi',
    3: 'onigiri',
};

var socket = io();

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
drawWorld();

var ninjamanpos = {
    left: 1,
    top: 1,
}
function update(){
    document.getElementById('ninjaman').style.left = ninjamanpos.left * 2+"%";
    document.getElementById('ninjaman').style.top = ninjamanpos.top * 2+"%";
}

function scorekeeper(){
    content = "";
    if(world[ninjamanpos.top][ninjamanpos.left] == 2){
        score = score + 10;
    }
    else if(world[ninjamanpos.top][ninjamanpos.left] == 3){
        score = score + 5;
    }
    content += "Score = "+score+"";
    
    document.getElementById('score').innerHTML = content;
}

var pumpkins =[
{left: 23,top: 23},
{left: 23,top: 1},
{left: 1,top: 23},
]

function drawPumpkin(){
    content = "";
    for(var index = 0; index < pumpkins.length; index++){
    content += "<div class=" + 'pumpkin_' + index + " style='left:"+pumpkins[index].left * 2+"%; top:"+pumpkins[index].top * 2 +"%'></div>";
    }
    console.log(content)
    document.getElementById('pumpkins').innerHTML = content;

}
drawPumpkin();

document.onkeydown = function(e){
    if(lives > 0){
        if(e.keyCode == 37 && world[ninjamanpos.top][ninjamanpos.left - 1] != 1){ //LEFT
            ninjamanpos.left = ninjamanpos.left - 1;
            start = 1;
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
    // if(start > 0){
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
                pumpkins[0].left = 23;
                pumpkins[0].top = 23;
                pumpkins[1].left = 23;
                pumpkins[1].top = 1;
                pumpkins[2].left = 1;
                pumpkins[2].top = 23;
                update();
                document.getElementById('lives').innerHTML = "Lives = "+lives+"";
            }
        }
    // }
    
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
    count ++;
    var name = document.getElementById('my_name').innerHTML;
    socket.emit('score_change', { name: name, score: score, lives: lives });
    if(lives > 0){
        if(count > 6){
            movePumpkin();
            drawPumpkin();
            reset();
        }
        //addnewpumpkin();
    }
    else{
        document.getElementById('gameover').innerHTML = "GAME OVER"
    } 

    setTimeout(gameLoop, 500);
}
gameLoop();