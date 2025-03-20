// 1. COMPLETE VARIABLE AND FUNCTION DEFINITIONS

const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

// 2. RAW TEXT STRINGS

let storyText = '\"It\'s 94 fahrenheit outside!\", said :insertx:. Bob agreed, but decided they wanted to go to :inserty: anyways. So, off they went. But before long, a giant 300 pound piano fell from the sky, and :insertx: :insertz:. Bob decided to go to :inserty: anyway, and the Piano Incident proceeded to go down in history.';

let insertX = ['Sherlock Holmes', 'James T. Kirk', 'Percy Jackson', 'Bob Ross', 'Q', 'an actual slug', 'Kathryn Janeway', 'The Beegees', 'BTS', 'Rick Astley'];

let insertY = ['where no one has gone before', '221B Baker Street', 'Camp Rock', 'Camp Halfblood', 'the Q continuum', 'Earth'];

let insertZ = ['spontaneously combusted', 'got rickrolled', 'was teleported to and trapped in a different dimension', 'got stuck playing piano for all of eternity', 'was launched into space', 'realized they had an assignment due and had to go back home'];

// 3. EVENT LISTENER AND PARTIAL FUNCTION DEFINITION

randomize.addEventListener('click', result);

function result() {
  let newStory = storyText;
  let xItem = randomValueFromArray(insertX);
  let yItem = randomValueFromArray(insertY);
  let zItem = randomValueFromArray(insertZ);

  // Replace the placeholders w/ the Items
  newStory = newStory.replaceAll(':insertx:', xItem);
  newStory = newStory.replaceAll(':inserty:', yItem);
  newStory = newStory.replaceAll(':insertz:', zItem);

  if(customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replaceAll('Bob', name);
  }

  if(document.getElementById("uk").checked) {
    let weight = Math.round(300 / 14);
    weight += ' stone';
    newStory = newStory.replaceAll('300 pound', weight);
    let temperature =  Math.round((94 - 32) * 5/9);
    temperature += ' centigrade';
    newStory = newStory.replaceAll('94 fahrenheit', temperature);
  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
  story.style.animationPlayState = 'running';
}
