
//game constant and variables
let inputDir={
    x:0,y:0
};

const foodSound=new Audio('food.mp3');
const gameOverSound=new Audio('gameover.mp3');
const moveSound =new Audio('move.mp3');
const musicSound=new Audio('music.mp3');

let speed=5;

let lastPaintTime=0;

let snakeArr=[{
    x:13,y:15
}]
let score=0;

let food={x:7,y:8};
//Game Functions

function main(ctime){

    let hiScore=localStorage.getItem("hiScore");
    if(hiScore===null){
        localStorage.setItem("hiScore",JSON.stringify(hiScore))
    }
    window.requestAnimationFrame(main);
    // console.log(ctime);

    if((ctime- lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime=ctime;

    gameEngine();

    
}
function isCollide(sarr) {

    // if snake bump into yourself

    for (let i = 1; i < snakeArr.length; i++) {
       if(snakeArr[i].x===snakeArr[0].x && snakeArr[i].y===snakeArr[0].y ){
        return true;
       }
    }
    // if you are crossing the bo
       if (snakeArr[0].x>=18||snakeArr[0].x<=0 || snakeArr[0].y>=18||snakeArr[0].y<=0 ) {
            return true;
        
       }
        
    
    return false;
}

function gameEngine(params) {
    //Part 1 used to update the snake arr and food
    //part 2 :Render the  
    if(isCollide(snakeArr)){
        gameOverSound.play();
        inputDir={ x:0,y:0 };
        alert("Game Over. Press any key to continue");

        snakeArr=[{  x:13,y:15 }]

        // musicSound.play();
        score=0;
    }
        // if snake has eaten the food then we hace to increase the score and regenerate the food
        if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
            foodSound.play();
            score+=1;
            if(score>hiScoreval){
                hiScoreval=score;
                localStorage.setItem("hiScore",JSON.stringify(hiScoreval));
                hiScoreBox.innerHTML="HiScore: "+hiScoreval;
            }
            scoreBox.innerHTML="Score "+score;
            snakeArr.unshift({x: snakeArr[0].x+inputDir.x,y: snakeArr[0].y+inputDir.y});
            let a=2;
            let b=16;
            food ={x: Math.round(a+(b-a)* Math.random()),y: Math.round(a+(b-a)* Math.random())}
        }

        // Moving our snake

        for (let i = snakeArr.length-2; i >0 ; i--) {
          
            snakeArr[i+1]={...snakeArr[i]};// created a new obj
            
        }

        snakeArr[0].x+=inputDir.x;
        snakeArr[0].y+=inputDir.y;

    // Display the food

    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        snakeElement.classList.add('snake');

        if(index=0){
            snakeElement.classList.add('head')
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    }
    );
        foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);

}




//Main Logic start here
let hiScore=localStorage.getItem("hiscore");
if(hiScore===null){
    hiScoreval=0;
    localStorage.setItem("hiScore",JSON.stringify(hiScoreval))
}
else{
    hiScoreval=JSON.parse(hiScore);
    hiScoreBox.innerHTML="Hi Score"+hiScore;
}
window.requestAnimationFrame(main);

window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1} // game started
    moveSound.play();

    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
                     
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;         
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;        
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;        
            break;
    
        default:
            break;
    }
});

