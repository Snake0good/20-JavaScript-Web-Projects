const button = document.getElementById('btn');
const audioElement = document.getElementById('audio');

const apiKey = 'c60b6c92664e4c10a0fc2c34e3a939a8';

function toggleButton() {
    button.disabled = !button.disabled;
}

function tellJoke(joke) {
    VoiceRSS.speech({
        key: apiKey,
        src: joke,
        hl: 'en-us',
        v: 'John',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}


// jokes from API
async function getJokes() {
    let joke;
    const apiURL = 'https://v2.jokeapi.dev/joke/Programming,Dark,Christmas?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        if(data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        tellJoke(joke);
        toggleButton();
    } catch(error) {
        console.log(error)
    }
}

button.addEventListener('click', getJokes)
audioElement.addEventListener('ended', toggleButton)