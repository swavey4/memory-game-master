/*
 * Create a list that holds all of your cards
 */
let listOfCards = [ "fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb" ]

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

const container = document.querySelector('.deck');
let listOpen = [];
const matchedCards = [];
shuffle(listOfCards);
function createList(){
  listOfCards.forEach(function(i){
    const listElement = document.createElement('li');
      listElement.classList.add('card');
      listElement.innerHTML = `<i class= "${i}" > </i>`
      container.appendChild(listElement);

  clickElement(listElement);
  reset();

});
}

function clickElement(listElement){
  listElement.addEventListener('click', function(){

    if (listOpen.length === 1){
        listElement.classList.add('open', 'show');
        listOpen.push(listElement);

        if(listElement.innerHTML === listOpen[0].innerHTML){
            listElement.classList.add('match');
            listOpen[0].classList.add('match');
            matchedCards.push(listElement, listOpen[0]);
            listOpen = [];
        }else {
            listElement.classList.remove('open', 'show');
            listOpen[0].classList.remove('open', 'show');
            listOpen = [];
        }
         moveInc();
         match();

     } else {
       listElement.classList.add('open', 'show');
       listOpen.push(listElement);
     }
    })
}

function reset(){
  const reset = document.querySelector('.restart');
  reset.addEventListener('click', function(){
    container.innerHTML = '';
    createList();
    listOpen = [];
    shuffle(listOfCards);
    
  })
}

const moves = document.querySelector('.moves');
let movesCounter = 0;
function moveInc(){
  movesCounter++;
  moves.innerHTML = movesCounter;

  star();
}

function match(){
  if(matchedCards.length === listOfCards.length){
    const box = document.createElement('div');
    box.classList.add('button');
    box.innerHTML = '<h1 class= "mated"> Congratulations! </h1>';
    document.querySelector('.container').appendChild(box);
    const btn = document.createElement('div');
    btn.classList.add('buttong');
    btn.innerHTML = 'Play again';
    box.appendChild(btn);

    btn.addEventListener('click', function(){
      container.innerHTML = '';
      createList();
      listOpen = [];
      box.remove();
      movesCounter = 0;
      shuffle(listOfCards);
    })
  }
}


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
