const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const jokeText = document.getElementById('joke-text');

// Hide joke-text container
jokeText.hidden = true;

// Disable/Enable button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: 'c0ecc873429e4bf9b74276905d879021',
    src: joke,
    hl: 'en-au',
    v: 'Jack',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

// Get Jokes from Joke API
async function getJokes() {
  let joke = '';
  const apiUrl =
    'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // "twopart" joke format: setup + delivery; "single" joke format: joke
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text-to-Speech
    tellMe(joke);
    // Disable button
    toggleButton();

    // Show joke-text
    jokeText.hidden = false;
    jokeText.innerText = joke;
  } catch (error) {
    // Catch errors here
    console.log('Fetch error:', error);
  }
}

// Event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
