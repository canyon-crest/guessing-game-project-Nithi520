//global variables

const { startTransition } = require("react");

// add a stop watch to see how long a round took, and look in book for guidelines
let level, answer, score, playerName;
const levelArr = document.getElementsByName("level");
const scoreArr = [];

let startTime, endTime, elapsedTime, timerInterval;
const timeArr = [];

const playBtn = document.getElementById("playBtn");
const guessBtn = document.getElementById("guessBtn");
const giveUpBtn = document.getElementById("giveUp");
const guess = document.getElementById("guess");
const msg = document.getElementById("msg");
const wins = document.getElementById("wins");
const avgScore = document.getElementById("avgScore");
const date = document.getElementById("date");
const playerInput = document.getElementById("player");
const startBtn = document.getElementById("startBtn");
const timerdisplay = document.getElementById("timer");

//Name capatlization proper and save to a variable 

function formatName(name){
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

startBtn.addEventListener("click", function() {
  const rawName = playerInput.value;
  if (rawName === "") {
    msg.textContent = "Please enter your name!";
    return;
  }

  playerName = formatName(rawName); 
  msg.textContent = "Welcome " +playerName+ " Choose a level and press Play" 
})

date.textContent = time();

function updateClock() {
  date.textContent = time();
}
updateClock();
setInterval(updateClock, 1000);

//add event listeners
playBtn.addEventListener("click",play);
guessBtn.addEventListener("click", makeGuess);
giveUpBtn.addEventListener("click", giveUp);

function play(){
    score = 0; // sets score to zero very new game 
    playBtn.disabled = true; 
    guessBtn.disabled = false; 
    guess.disabled = false;
    giveUpBtn.disabled = false;
    
    for(let i=0; i<levelArr.length; i++){
       if(levelArr[i].checked){
        level=levelArr[i].value; 
       
       levelArr[i].disabled = true;
    }

 msg.textContent =  playerName + " guess a number from 1-" + level; 
 answer = Math.floor(Math.random()*level)+1; 
 guess.placeholder = "Enter your guess here";
 guess.value ="";

}

startTime = new Date()
 clearInterval(timerInterval)
 timerInterval = setInterval(updateTimeDisplay, 1000)
}


function visibleTimer(){
    let now = new Date()
    let second = Math.celi((now-startTime)/1000)
    timerdisplay.textContent = second + "s"
}

function makeGuess(){
    let userGuess = parseInt(guess.value);
    if(isNaN(userGuess) || userGuess<1 || userGuess > level){
        msg.textContent = playerName + "Enter a VALID number between 1-" + level; 
        return;
    }
    score++; //valid guess add 1 to score
    

    if (userGuess == answer){
        let message = scoreEval() 
        msg.textContent = playerName + " you got it! It took you " + score +" tries. "+ message + " Press play to play again";
       
        endTime = new Date();
        elapsedTime = Math.floor((endTime - startTime) / 1000);
        timeArr.push(elapsedTime);
        
        updateScore();
        reset();
    }
    else if(Math.abs(userGuess-answer) <= Math.ceil(level * 0.05)){
        msg.textContent = playerName + " you are hot!!"}
    else if(Math.abs(userGuess-answer) <= Math.ceil(level * 0.10)){
        msg.textContent = playerName + " you are warm!!"}
    else if(Math.abs(userGuess-answer) <= Math.ceil(level * 0.20)){
        msg.textContent = playerName + " you are luke warm"}
    else if(Math.abs(userGuess-answer) <= Math.ceil(level * 0.50)){
        msg.textContent = playerName + " you are cold!!"}
    else{
        msg.textContent = playerName + " you are in antartica"}
}


function scoreEval(){
    if (score <= Math.ceil(level*0.10))
        return "That was an Amazing score!!!"
    else if (score <= Math.ceil(level*0.30))
        return "That was an GOOD score!!!"
    else if (score <= Math.ceil(level*0.50))
        return "That was an decent score!!!"
    else if (score <= Math.ceil(level*0.75))
        return "That was a bad score you should practice!!!"
    else 
        return "That was a horrible score!!!"  
}

function giveUp(){
    score = parseInt(level)
    msg.textContent = playerName + " you gave up! The answer was " + answer + ". Press Play to try again."
    updateScore();
    reset();

}

function reset(){
    guessBtn.disabled = true; 
    guess.disabled = true; 
    giveUpBtn.disabled = true;
    playBtn.disabled = false; 
    for(let i=0; i<levelArr.length; i++){
        levelArr[i].disabled = false;
    }

}

function updateScore(){
    scoreArr.push(score);
    scoreArr.sort((a,b) => a - b);
    let lb = document.getElementsByName("leaderboard")
    wins.textContent = "Total wins:" + scoreArr.length;
    let sum = 0;
    for(let i=0; i<scoreArr.length; i++){
        sum += scoreArr[i];
        if(i<lb.length){
            lb[i].textContent = scoreArr[i];
        }
    }
    let avg = sum/scoreArr.length;
    avgScore.textContent = "Average Score:" +avg.toFixed(2);
}


function formattedDate(){
    let d = new Date()
    const day = d.getDate()
    const monthName = d.toLocaleString('default', { month: 'long' })
    const year = d.getFullYear()

    let ending = "th"
    if (day % 10 === 1 && day !== 11) ending = "st";
    else if (day % 10 === 2 && day !== 12) ending = "nd";
    else if (day % 10 === 3 && day !== 13)
        ending = "rd" ;
    return monthName + " " + day + ending +", "+ year + " " 
}

function time(){ 
    let d = new Date(); 

    fillTime = formattedDate() + d.toLocaleTimeString(); 
    return fillTime }

