const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("span");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let cardsChosen = [];
let cardsMatched = [];
//stop additional choices of cards
let noClick = false;

//CHECK FOR MATCHES
function checkForMatch(){
  const choiceOne = cardsChosen[0];
  const choiceTwo = cardsChosen[1];
  if (choiceOne.className === choiceTwo.className){
    // choiceOne.style.backgroundColor = 'white';
    // choiceTwo.style.backgroundColor = 'white';
    // alert('You found a match!')
    cardsMatched.push(cardsChosen);
  } else {
    choiceOne.style.backgroundColor = 'white';
    choiceTwo.style.backgroundColor = 'white';
    choiceOne.classList.remove('flipped');
    choiceTwo.classList.remove('flipped');
    // alert('Sorry try again');
  }
  if (cardsMatched.length === 5) alert('YOU WIN!');
  cardsChosen = []
  noClick = false;
}

// CLICK/FLIP EVENT
function handleCardClick(event) {
  const targetCard = event.target;
  
  //stops clicking on same card as match:
  if (targetCard.classList.contains("flipped")) return;
  if (noClick) return;

  targetCard.style.backgroundColor = targetCard.className;
  targetCard.classList.add('flipped');
  console.log("you just clicked", targetCard);
  cardsChosen.push(targetCard);
  if (cardsChosen.length === 2){
    noClick = true;
    setTimeout(checkForMatch, 1000)
  }
  
}



// when the DOM loads
createDivsForColors(shuffledColors);

/* */