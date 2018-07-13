/*
 * Create a list that holds all of your card
 */
let listOfCards = [ "fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb" ]

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
/* DISPLAY CARDS
*/
const container = document.querySelector('.deck');
let listOpen = [];
const matchedCards = [];
shuffle(listOfCards);
// LOOP THROUGH EACH CARD AND ADD CARD CLASS
function createList(){
  listOfCards.forEach(function(i){
    const listElement = document.createElement('li');
      listElement.classList.add('card');
      listElement.innerHTML = `<i class= "${i}" > </i>`
      container.appendChild(listElement);

  clickElement(listElement);
});
}

/*
/* MATCHING CARDS
*/

function clickElement(listElement){
  listElement.addEventListener('click', function(){

    if (listOpen.length === 1){
        listElement.classList.add('open', 'show');
        listOpen.push(listElement);

// COMPARE IF CARDS MATCH
        if(listElement.innerHTML === listOpen[0].innerHTML){
            listElement.classList.add('match');
            listOpen[0].classList.add('match');
            matchedCards.push(listElement, listOpen[0]);
            listOpen = [];
        }else {

            setTimeout(function(){
            listElement.classList.remove('open', 'show');
            listOpen[0].classList.remove('open', 'show');

            listOpen = [];
          }, 500);
        }

        moveInc();
        match();


     } else {
       listElement.classList.add('open', 'show');
       listOpen.push(listElement);
     }

     restart();
    })
}

/*
/* RESET FUNCTION
*/

const reset = document.querySelector('.restart');

function restart(){
reset.addEventListener('click', function(){
  // CLEAR CARDS
  container.innerHTML = '';
  // ADD CARDS
  createList();
  // CLEAR CARDS IN OPEN ARRAY
  listOpen = [];
  // SHUFFLE CARDS
  shuffle(listOfCards);
  // RESET TIMER
  clearInterval(timer);
  minute = 0;
  second = 0;
  time.innerHTML = minute+":"+second;
  //  RESET MOVES
  movesCounter = 0;
  moves.innerHTML = movesCounter;
  starRating.innerHTML = `<li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>`;
  })
}

/*
/* MOVE COUNTER
*/
const moves = document.querySelector('.moves');
let movesCounter = 0;
moves.innerHTML = 0;

function moveInc(){
  movesCounter++;
  moves.innerHTML = movesCounter;

    star();

/* START TIMER */
  if(movesCounter === 1){
        second = 0;
        minute = 0;
        hour = 0;
        setTime();
    }
}

/*
/* GAME OVER
*/

function match(){
  if(matchedCards.length === listOfCards.length){
    // STOP TIMER
    clearInterval(timer);
    // CREATE MODAL
    const box = document.createElement('div');
    box.classList.add('button');
    box.innerHTML = '<h1 class= "mated"> Congratulations! </h1>';
    document.querySelector('.container').appendChild(box);
    const innerBox = document.createElement('div');
    innerBox.classList.add('inner');
    box.appendChild(innerBox);
    innerBox.appendChild(starRating);
    innerBox.appendChild(time);
    innerBox.appendChild(moves);
    const btn = document.createElement('div');
    btn.classList.add('buttong');
    btn.innerHTML = 'Play again';
    box.appendChild(btn);



// CLICK TO RESTART

    btn.addEventListener('click', function(){
      location.reload();
      box.remove();
      container.innerHTML = '';
      listOpen = [];
      createList();
      movesCounter = 0;
      shuffle(listOfCards);
      // RESET TIMER
      clearInterval(timer);
      minute = 0;
      second = 0;
      time.innerHTML = minute+":"+second;
      //  RESET MOVES
      movesCounter = 0;
      moves.innerHTML = movesCounter;
      starRating.innerHTML = `<li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li>`;
    })
  }
}


/*
/* STAR RATING
*/

const starRating = document.querySelector('.stars');
function star(){
  if (movesCounter > 25){
    starRating.innerHTML = `<li><i class="fa fa-star"></i></li>`;
  } else if (movesCounter > 17 ){
    starRating.innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
  } else if (movesCounter < 16){
    starRating.innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
  }
}

/*
/* TIMER FUNCTION
*/
let second = 0, minute = 0;
const time = document.querySelector(".timer");
let timer;

function setTime(){
  timer = setInterval(function(){
  time.innerHTML = minute+":"+second;
  second++;

  if(second === 60){
    minute++;
    second = 0;
    }
    if(minute === 60){
    hour++;
    minute = 0;
        }

},1000)
}


createList();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
