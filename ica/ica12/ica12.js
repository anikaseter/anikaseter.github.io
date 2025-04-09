let btn = document.querySelector('button');
let answerBtn = document.querySelector('#js-tweet');
let quoteUrl = 'https://trivia.cyberwisp.com/getrandomchristmasquestion';

btn.addEventListener('click', getQuote);

getQuote();

async function getQuote() {
    try {
        const newQuote = await fetch(quoteUrl);
        if(!newQuote.ok) {
            throw Error(newQuote.statusText);
        }
        else {
            const json = await newQuote.json();
            // console.log(json);
            displayQuote(json.question);
            document.querySelector('#js-answer-text').textContent = '';

            answerBtn.addEventListener('click', () => displayAnswer(json.answer));
        }
    }
    catch(err) {
        console.log(err);
        alert('Fail');
    }
}

function displayQuote(quote) {
    const quoteText = document.querySelector('#js-quote-text');
    quoteText.textContent = quote;
}

function displayAnswer(answer) {
    const answerText = document.querySelector('#js-answer-text');
    answerText.textContent = answer;
}