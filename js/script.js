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