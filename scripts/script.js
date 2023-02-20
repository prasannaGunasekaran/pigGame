"use strict";
//get el
const player0el=document.getElementById('player-0')
const player1el=document.getElementById('player-1')
const total0el = document.getElementById("totalScore-0");
const total1el = document.getElementById("totalScore-1");
const current0el = document.getElementById("currentScore-0");
const current1el = document.getElementById("currentScore-1");
const btnResetEl = document.querySelector(".btn-reset");
const btnRollEl = document.querySelector(".btn-roll");
const btnHoldEl = document.querySelector(".btn-hold");
const resultEl=document.querySelector(".result")
const diceEl = document.querySelector(".dice");

// global variables
let scores , current , activePlayer, dice ;

//init setup

function init() {
  scores = [0, 0]; 
  current = 0;
  activePlayer = 0; 
  dice=0;

  total0el.innerText = 0;
  total1el.innerText = 0;

  current0el.innerText = 0;
  current1el.innerText = 0;

  player0el.classList.add("active-player");
  player1el.classList.remove("active-player");

  player0el.classList.remove("winner");
  player1el.classList.remove("winner");

  diceEl.classList.add("hidden");

   btnRollEl.classList.remove("hidden");
   btnHoldEl.classList.remove("hidden");

   resultEl.innerText="";


};
//getting random number step-1
function randomNumber(num){
  return Math.floor(Math.random()*num)+1;
};

//switch the player step-3
function switchPlayer(){
  player0el.classList.toggle('active-player');
  player1el.classList.toggle('active-player');

// display score
document.getElementById(`totalScore-${activePlayer}`).innerText=scores[activePlayer];
current=0;
document.getElementById(`currentScore-${activePlayer}`).innerText=current;
  //switching
  activePlayer = activePlayer === 0 ? 1 : 0;

}
//roll step-2
btnRollEl.addEventListener('click' , function(){
 dice = randomNumber(6);
 console.log(dice)
 diceEl.classList.remove('hidden');
 diceEl.src=`./images/dice-${dice}.png`

 
  if(dice !== 1){
    current = current + dice;
    console.log(current)
    document.getElementById(`currentScore-${activePlayer}`).innerHTML=current;

  }else{
    //step-3
    switchPlayer();
  }
});

btnHoldEl.addEventListener('click' , function(){
  scores[activePlayer] = scores[activePlayer] + current;

  current= 0;
  document.getElementById(`currentScore-${activePlayer}`).innerText=current;

// if score is >=100
  if(scores[activePlayer] >= 100){

    // player wins
    document.getElementById(`player-${activePlayer}`).classList.remove('active-player');

    document.getElementById(`player-${activePlayer}`).classList.add('active-player');

    document.getElementById(`totalScore-${activePlayer}`).innerText=scores[activePlayer];

    // resultEl.classList.remove("close");
    // resultEl.classList.add("show")

    if(scores[0] >= 100){
      resultEl.innerText=`player 1  won the game`;
    }
    else if(scores[1] >= 100){
      resultEl.innerText=`player 2 won the game`;
    }
    else{
      resultEl.innerText=`error`;
    }
  

    diceEl.classList.add('hidden');
    btnRollEl.classList.add('hidden');
    btnHoldEl.classList.add('hidden');
// switch  player
  }else{
    switchPlayer();

  }
});


btnResetEl.addEventListener('click' , function(){ 
  init();

})


init()

