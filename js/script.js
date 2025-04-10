// DOM elements
const container = document.getElementById("card-container");
const characterBox = document.getElementById("character-box");

let winnerCard = null; // variable to randomnly choose winning card

// created function for getting new set of cards
function createNewDeck(){
    characterBox.innerHTML = "";
    container.innerHTML = "";

    // fetching cards from deck of cards API
    fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=3")
    .then(res => res.json())
    .then(data => {
      const cards = data.cards;

      winnerCard = cards[Math.floor(Math.random() * cards.length)]; // randomnly selected one winning card
      cards.forEach(createCard); // displaying the face-down card
    });
}

// created a function to display card element
function createCard(card){
  // for styling
  const cardWrapper = document.createElement("div");
  cardWrapper.className = "card-wrapper";

  // card back image
  const cardImg = document.createElement("img");
  cardImg.src = "https://deckofcardsapi.com/static/img/back.png";
  cardImg.className = "card-back";

  // Added click event on each card
  cardImg.onclick = () => handleCardClick(cardImg, card);

  // Added card image to the wrapper and to the container
  cardWrapper.appendChild(cardImg);
  container.appendChild(cardWrapper);
}

// function when a card is clicked
function handleCardClick(cardImg, card){
  // Disabling all other cards from being clicked again
  document.querySelectorAll(".card-back").forEach(img => img.onclick = null);

  // flipping the card
  cardImg.src = card.image;

  // if-else to check if its wiining card or not
  if (card.code === winnerCard.code) {
    const id = getCharacterId(card.value);
    showCharacter(id);
  } else {
    characterBox.innerHTML = "<h2>Nope! Try Again</h2>";
  }
}
function getCharacterId(value) {
  const map = {
    "ACE": 1, "2": 22, "3": 77, "4": 101, "5": 133,
    "6": 166, "7": 199, "8": 222, "9": 255, "10": 300,
    "JACK": 333, "QUEEN": 366, "KING": 399
  };
  // If the value isn’t found in the map then returning a random character ID
  return map[value] || Math.floor(Math.random() * 826) + 1;
}
// Fetching and displaying the winning character(API)
function showCharacter(id) {
  fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then(res => res.json())
    .then(char => {
      characterBox.innerHTML = `
        <h2>You Won! Meet ${char.name}</h2>
        <p>Status: <strong>${char.status}</strong></p>
        <img src="${char.image}" alt="${char.name}">
      `;
    });
}
// Automatically loads a new deck when the page loads
window.onload = createNewDeck;

/*
ATTRIBUTIONS

API
1.  deck of cards: https://deckofcardsapi.com/
2.  Rick and Morty: https://rickandmortyapi.com/documentation/#character

used these page for api usage and code
https://www.freecodecamp.org/news/how-to-fetch-data-from-an-api-using-the-fetch-api-in-javascript/
https://www.w3schools.com/js/js_api_fetch.asp
https://www.w3schools.com/JS/js_random.asp
https://www.w3schools.com/jsref/event_onclick.asp
https://www.w3schools.com/jsref/met_node_appendchild.asp
*/