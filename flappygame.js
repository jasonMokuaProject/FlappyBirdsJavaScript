// Board 

let board;
let BoardWidth = 350;
let boardheight = 640;
let context;

// Bird 

let birdwidth = 34;
let birdheight = 24;
let birdX = BoardWidth / 8;
let birdY = boardheight / 2;
let birdimg;


let bird = {
    x: birdX,
    y: birdY,
    width: birdwidth,
    height: birdheight
};

// pipes

let pipeArray = [];
let pipewidth = 64;
let pipeHeight = 200;
let pipeX = BoardWidth;
let pipeY = 0;

// pyhsics 

let xVelocity = -2;

let VelocityY =0;

let Gavity = 0.4;

let topimagepipe;
let bottomimagepipe;
let gameOver = false;

window.onload = function () {

    board = document.getElementById("flappybirdboard");
    board.height = boardheight;
    board.width = BoardWidth;
    context = board.getContext("2d");


    // draw the actual flappy bird
    //  context.fillStyle="green";
    //  context.fillRect(birdX,birdY,birdwidth,birdheight);

    // load the bird image 
    birdimg = new Image();
    birdimg.src = "flappybird.png";
    birdimg.onload = function () {
        context.drawImage(birdimg, bird.x, bird.y, bird.width, bird.height);
    }


    topimagepipe = new Image();
    topimagepipe.src = "toppipe.png";

    bottomimagepipe = new Image();
    bottomimagepipe.src = "bottompipe.png";




    requestAnimationFrame(update);

    setInterval(theplacepipes, 1500);
    document.addEventListener("keydown",movebird);
}

// update

function update() {

    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);
    VelocityY +=  Gavity ;
    bird.y +=  VelocityY;

    context.drawImage(birdimg, bird.x, bird.y, bird.width, bird.height);

    for (let i = 0; i < pipeArray.length; i++) {
        let currentPipe = pipeArray[i];
        currentPipe.x += xVelocity;
 



     //   currentPipe.height += randomposition;
        context.drawImage(currentPipe.img, currentPipe.x, currentPipe.y, currentPipe.width, currentPipe.height);

        if (detectCollision(bird, currentPipe)) {
            gameOver = true;
            console.log("it touched you hear me ");
        }
    }


   
}


// pipes
function theplacepipes() {


    
    if (gameOver) {
        return;
    }
    // TOP PIPE

let randompipeY =0 ;

let randomposition = Math.floor(Math.random() * 60);
let randompositiontwo = Math.floor(Math.random() * 2);

switch(randompositiontwo){
    case 0: 
    randompipeY = pipeHeight - randomposition;
break;
case 1: 
randompipeY = pipeHeight + randomposition;
break;
case 2: 
randompipeY = pipeHeight - randomposition;
break;

default : 
randompipeY = pipeHeight + randomposition;


}




    let topPipe = {
        img: topimagepipe,
        x: pipeX,
        y: pipeY,
        height: randompipeY,
        width: pipewidth,
        passed: false


    };
    pipeArray.push(topPipe);











// BOTTOM PIPE





    // For the bottom the Y matters 



    let theY= 400;
    let newfigure=0;

        switch(randompositiontwo){

                case 0: 
    newfigure = theY - randomposition;
break;
case 1: 
newfigure= theY + randomposition;
break;
case 2: 
newfigure = theY - randomposition;
break;

default : 
newfigure = theY+ randomposition;
        }
    



    let bottomPipe = {
        img: bottomimagepipe,
        x: pipeX,
        y:newfigure ,
        height: 310,
        width: pipewidth,
        passed: false


    };
    pipeArray.push(bottomPipe);








}



// move bird


function movebird(e){

    if(e.code == "Space" || e.code =="ArrowUp" || e.code =="KeyX"){
        VelocityY =-6;

    }

}


function detectCollision(a, b) {
    return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
           a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
           a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
           a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
}