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

    [1,4,1,4,1,4,1,4,1,4,1,6,6,6,1,4,1,4,1,4,1,4,1,4,1],
    [1,4,4,4,4,4,4,4,4,4,1,5,5,5,1,4,4,4,4,4,4,4,4,4,1],
    [1,4,1,4,1,4,1,4,1,4,1,1,1,1,1,4,1,4,1,4,1,4,1,4,1],

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
    5: 'home',
    6: 'door'
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
    document.getElementById('ninjaman').style.left = ninjamanpos.left * 32+"px";
    document.getElementById('ninjaman').style.top = ninjamanpos.top * 32+"px";
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
{left: 13,top: 13},
{left: 12,top: 13},
{left: 11,top: 13},
]

function drawPumpkin(){
    content = "";
    for(var index = 0; index < pumpkins.length; index++){
    content += "<div class=" + 'pumpkin_' + index + " style='left:"+pumpkins[index].left * 32+"px; top:"+pumpkins[index].top * 32 +"px'></div>";
    }
    console.log(content)
    document.getElementById('pumpkins').innerHTML = content;

}
drawPumpkin();

function moveNinja(){
    document.onkeyup = function(e){
        console.log(e)
        if(lives > 0){
            if(e.which == 37 && world[ninjamanpos.top][ninjamanpos.left - 1] != 1){ //LEFT
                ninjamanpos.left = ninjamanpos.left - 1;
                start = 1;
            }
            if(e.which == 39 && world[ninjamanpos.top][ninjamanpos.left + 1] != 1){ //RIGHT
                ninjamanpos.left = ninjamanpos.left + 1;
            }
            if(e.which == 38 && world[ninjamanpos.top - 1][ninjamanpos.left] != 1){ //UP
                ninjamanpos.top = ninjamanpos.top - 1;
            }
            if(e.which == 40 && world[ninjamanpos.top + 1][ninjamanpos.left] != 1){ //DOWN
                ninjamanpos.top = ninjamanpos.top + 1;
            }
            update();
            scorekeeper();
            world[ninjamanpos.top][ninjamanpos.left] = 0;
            drawWorld();
        }
    }
}

function movePumpkin(){
    // console.log(count, "this is count")
    // if(count == 6){
    //     pumpkins[0].top = 11;
    //     pumpkins[0].left = 13;
    // }
    for(var index = 0; index < pumpkins.length; index++){
        if(ninjamanpos.top < pumpkins[index].top && ninjamanpos.left < pumpkins[index].left){ // pumpkin is down and right of ninjaman
            var move = Math.floor(Math.random() * (2 - 1 + 1) ) + 1;
            if(move == 1 && world[pumpkins[index].top - 1][pumpkins[index].left] != 1){ //chase up
                pumpkins[index].top = pumpkins[index].top -1;
            }
            else if(move == 1 && world[pumpkins[index].top - 1][pumpkins[index].left] == 1) { //chase left
                pumpkins[index].left = pumpkins[index].left -1;
            }
            else if(move == 2 && world[pumpkins[index].top][pumpkins[index].left - 1] != 1) { //chase left
                pumpkins[index].left = pumpkins[index].left -1;
            }
            else { //chase up
                pumpkins[index].top = pumpkins[index].top -1;
            }
        }
        else if(ninjamanpos.top < pumpkins[index].top && ninjamanpos.left > pumpkins[index].left){ //pumpkin is down and right of ninjaman
            var move = Math.floor(Math.random() * (2 - 1 + 1) ) + 1;
            if(move == 1 && world[pumpkins[index].top - 1][pumpkins[index].left] != 1){ //chase up
                pumpkins[index].top = pumpkins[index].top -1;
            }
            else if (move == 1 && world[pumpkins[index].top - 1][pumpkins[index].left] == 1) { //chase right
                pumpkins[index].left = pumpkins[index].left +1;
            }
            else if(move == 2 && world[pumpkins[index].top][pumpkins[index].left + 1] != 1) { //chase right
                pumpkins[index].left = pumpkins[index].left +1;
            }
            else { //chase up
                pumpkins[index].top = pumpkins[index].top -1;
            }
        }
        else if(ninjamanpos.top > pumpkins[index].top && ninjamanpos.left > pumpkins[index].left){ //pumpkin is up and right of ninjaman
            var move = Math.floor(Math.random() * (2 - 1 + 1) ) + 1;
            if(move == 1 && world[pumpkins[index].top + 1][pumpkins[index].left] != 1){ //chase down
                pumpkins[index].top = pumpkins[index].top +1;
            }
            else if (move == 1 && world[pumpkins[index].top + 1][pumpkins[index].left] == 1) { //chase right
                pumpkins[index].left = pumpkins[index].left +1;
            }
            else if (move == 2 && world[pumpkins[index].top][pumpkins[index].left + 1] != 1) { //chase right
                pumpkins[index].left = pumpkins[index].left +1;
            }
            else { //chase down
                pumpkins[index].top = pumpkins[index].top +1;
            }
        }
        else if(ninjamanpos.top > pumpkins[index].top && ninjamanpos.left < pumpkins[index].left) { //pumpkin is up and left of ninjaman
            var move = Math.floor(Math.random() * (2 - 1 + 1) ) + 1;
            if(move == 1 && world[pumpkins[index].top + 1][pumpkins[index].left] != 1){ //chase down
                pumpkins[index].top = pumpkins[index].top +1;
            }
            else if (move == 1 && world[pumpkins[index].top + 1][pumpkins[index].left] == 1) { //chase left
                pumpkins[index].left = pumpkins[index].left -1;
            }
            else if (move == 2 && world[pumpkins[index].top][pumpkins[index].left - 1] != 1){ //chase left
                pumpkins[index].left = pumpkins[index].left -1;
            }
            else { //chase down
                pumpkins[index].top = pumpkins[index].top +1;
            }
        }
        else if(ninjamanpos.top == pumpkins[index].top){
            if(ninjamanpos.left < pumpkins[index].left){ //enemy right of ninjaman
                if(world[pumpkins[index].top][pumpkins[index].left - 1] != 1){
                    pumpkins[index].left = pumpkins[index].left -1;
                }
                else {
                    var move = Math.floor(Math.random() * (2 - 1 + 1) ) + 1;
                    if(move == 1){
                        pumpkins[index].top = pumpkins[index].top +1; //move down
                    }
                    else {
                        pumpkins[index].top = pumpkins[index].top -1; //move up
                    };
                };
            };
            if(ninjamanpos.left > pumpkins[index].left){ //enemy left 
                if(world[pumpkins[index].top][pumpkins[index].left + 1] != 1){
                    pumpkins[index].left = pumpkins[index].left +1;
                }
                else {
                    var move = Math.floor(Math.random() * (2 - 1 + 1) ) + 1;
                    if(move == 1){
                        pumpkins[index].top = pumpkins[index].top +1; //move down
                    }
                    else {
                        pumpkins[index].top = pumpkins[index].top -1; //move up
                    };
                };
            };
        }
        else if(ninjamanpos.left == pumpkins[index].left){
            if(ninjamanpos.top > pumpkins[index].top){ //enemy up
                if(world[pumpkins[index].top + 1][pumpkins[index].left] != 1){
                    pumpkins[index].top = pumpkins[index].top +1;
                }
                else {
                    var move = Math.floor(Math.random() * (2 - 1 + 1) ) + 1;
                    if(move == 1){
                        pumpkins[index].left = pumpkins[index].left +1; //move right
                    }
                    else {
                        pumpkins[index].left = pumpkins[index].left -1; //move left
                    };
                };
            }
            if(ninjamanpos.top < pumpkins[index].top){ //enemy down
                if(world[pumpkins[index].top - 1][pumpkins[index].left] != 1){
                    pumpkins[index].top = pumpkins[index].top -1;
                }
                else {
                    var move = Math.floor(Math.random() * (2 - 1 + 1) ) + 1;
                    if(move == 1){
                        pumpkins[index].left = pumpkins[index].left +1; //move right
                    }
                    else {
                        pumpkins[index].left = pumpkins[index].left -1; //move left
                    };
                };
            }
        };
        if(ninjamanpos.left == pumpkins[index].left && ninjamanpos.top == pumpkins[index].top){
            ninjamanpos.left = 1;
            ninjamanpos.top = 1;
            lives = lives - 1;
            pumpkins =[
                {left: 13,top: 13},
                {left: 12,top: 13},
                {left: 11,top: 13},
                ]
            update();
            document.getElementById('lives').innerHTML = "Lives = "+lives+"";
            count = 0;
        }
    }
    
}

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

function gameLoop(){
    count ++;
    var name = document.getElementById('my_name').innerHTML;
    socket.emit('score_change', { name: name, score: score, lives: lives, count: count });
    if(lives > 0){
        if(count > 6){
            moveNinja();
            movePumpkin();
            drawPumpkin();
            reset();
        }
    }
    else{
        document.getElementById('gameover').innerHTML = "GAME OVER"
    } 

    setTimeout(gameLoop, 500);
}
gameLoop();