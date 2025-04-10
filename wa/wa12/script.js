let cycleButton = document.querySelector('#cycleButton');
let pokeAPI = 'https://pokeapi.co/api/v2/pokemon/';

cycleButton.addEventListener('click', refreshAllCards);

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

async function refreshCard() {
    try {
        let randomId = Math.floor(Math.random() * (1001 - 1) + 1);
        let newPokemonUrl = pokeAPI + randomId + '/';
        const newPokemon = await fetch(newPokemonUrl);
        if(!newPokemon.ok) {
            throw Error(newPokemon.statusText);
        }
        else {
            const json = await newPokemon.json();
            return json;
        }
    }
    catch(err) {
        console.log(err);
        alert('Fail');
    }
}

function refreshAllCards() {
    if(!card1.saved) {
        card1.name = refreshCard.forms.name;
    }
}