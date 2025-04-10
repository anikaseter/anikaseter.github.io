// I did use Claude.ai to help with a few bugs I ran into, as I don't know enough about JS to
// debug on my own - it didn't write any of this code, but did help me figure out
// why things weren't working so that I could adjust my code and make it work!

let cycleButton = document.querySelector('#cycleButton');
let submitButton = document.getElementById('submitButton');
let cardPos1 = document.getElementById("card1");
let cardPos2 = document.getElementById("card2");
let cardPos3 = document.getElementById("card3");
let pokeAPI = 'https://pokeapi.co/api/v2/pokemon/';

cycleButton.addEventListener('click', refreshAllCards);
submitButton.addEventListener('click', chooseLineup);

// I love having 3 functions to do the same thing bc I don't know enough about JS :D
cardPos1.addEventListener('click', hold1);
cardPos2.addEventListener('click', hold2);
cardPos3.addEventListener('click', hold3);

class card {
    constructor(name, photo) {
        this.name = name;
        this.photo = photo;
        this.saved = false;
    }
}

let card1 = new card('', '');
let card2 = new card('', '');
let card3 = new card('', '');

refreshCard(); // To stop the first cycle click from returning a blank card
allHeld(); // To get the second button to disappear bc it was having problems doing it with the CSS

async function refreshCard() {
    let newCard = new card('', '')
    try {
        let randomId = Math.floor(Math.random() * (1001 - 1) + 1);
        let newPokemonUrl = pokeAPI + randomId + '/';
        const newPokemon = await fetch(newPokemonUrl);
        if(!newPokemon.ok) {
            throw Error(newPokemon.statusText);
        }
        else {
            const json = await newPokemon.json();
            newCard.name = properNounIt(json.species.name);
            newCard.photo = json.sprites.front_default;
            return newCard;
            // console.log(tempCard.name);
            // console.log(tempCard.photo);
        }
    }
    catch(err) {
        console.log(err);
        alert('Fail');
        return newCard;
    }
}

function properNounIt(string) {
    firstLetter = string[0].toUpperCase();
    restOfName = string.substring(1);
    return firstLetter + restOfName;
}

async function refreshAllCards() {
    if(!card1.saved) {
        card1 = await refreshCard();
        cardPos1.classList = "card solidCard";
        cardPos1.innerHTML = '<div class="photo"><img class="pokePhoto" src="' + card1.photo + '" alt="A picture of a pokemon."></div><div class="name">' + card1.name + '</div>'
        // console.log(card1.name);
        // console.log(card1.photo);
    }

    if(!card2.saved) {
        card2 = await refreshCard();
        cardPos2.classList = "card solidCard";
        cardPos2.innerHTML = '<div class="photo"><img class="pokePhoto" src="' + card2.photo + '" alt="A picture of a pokemon."></div><div class="name">' + card2.name + '</div>'
    }

    if(!card3.saved) {
        card3 = await refreshCard();
            // console.log(tempCard.name);
            // console.log(tempCard.photo);
        cardPos3.classList = "card solidCard";
        cardPos3.innerHTML = '<div class="photo"><img class="pokePhoto" src="' + card3.photo + '" alt="A picture of a pokemon."></div><div class="name">' + card3.name + '</div>'
    }
}

function hold1() {
    // Stop from holding empty card
    if(cardPos1.classList.contains("emptyCard")) {
        return;
    }

    if(!card1.saved) {
        card1.saved = true;
        cardPos1.classList = "card heldCard";
    }
    else {
        card1.saved = false;
        cardPos1.classList = "card solidCard";
    }

    allHeld();
}

function hold2() {
    // Stop from holding empty card
    if(cardPos2.classList.contains("emptyCard")) {
        return;
    }

    if(!card2.saved) {
        card2.saved = true;
        cardPos2.classList = "card heldCard";
    }
    else {
        card2.saved = false;
        cardPos2.classList = "card solidCard";
    }

    allHeld();
}
function hold3() {
    // Stop from holding empty card
    if(cardPos3.classList.contains("emptyCard")) {
        return;
    }

    if(!card3.saved) {
        card3.saved = true;
        cardPos3.classList = "card heldCard";
    }
    else {
        card3.saved = false;
        cardPos3.classList = "card solidCard";
    }

    allHeld();
}

function allHeld() {
    if(card1.saved && card2.saved && card3.saved) {
        submitButton.style.display = "initial";
    }
    else (
        submitButton.style.display = "none"
    )
}

function chooseLineup() {
    // Make the buttons go away
    cycleButton.style.display = "none";
    submitButton.style.display = "none";
    cardPos1.removeEventListener('click', hold1);
    cardPos2.removeEventListener('click', hold2);
    cardPos3.removeEventListener('click', hold3);

    // Set the pokemon names in the congrats and show the congrats message
    congratsMessage = document.getElementById("congrats");
    congratsText = "You've chosen your lineup - card1, card2, and card3 - and you're ready for battle! See you out there!"
    congratsText = congratsText.replace("card1", card1.name);
    congratsText = congratsText.replace("card2", card2.name);
    congratsText = congratsText.replace("card3", card3.name);
    congratsMessage.querySelector("p").innerHTML = congratsText;
    congratsMessage.style.display = 'initial';
}
