// DOM elements
const container = document.getElementById("card-container");
const characterBox = document.getElementById("character-box");

let winnerCard = null; // variable to randomnly choose winning card

// created function for getting new set of cards
function createNewDeck(){
    characterBox.innerHTML = "";
    container.innerHTML = "";
}