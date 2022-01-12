let apiQuotes = [];
let quote;
const mainContainer = document.getElementById('main-container')
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter-btn');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// apiURL = 'https://type.fit/api/quotes'

function showLoadingSpinner() {
    loader.hidden = false;
	mainContainer.hidden = true;
}

function removeLoadingSpinner() {
    if(!loader.hidden) {
        loader.hidden = true;
		mainContainer.hidden = false;
    }
}

function newQuote() {
	showLoadingSpinner();
	quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
	if (!quote.author) {
		authorText.textContent = 'Unknown'
	} else {
		authorText.textContent = quote.author
	}

	if (quote.text.length > 100 ) {
		quoteText.classList.add('long-quote')
	} else {
		quoteText.classList.remove('long-quote')
	}

	quoteText.textContent = quote.text
	removeLoadingSpinner();
}

//Get Quote from API
async function getQuote() {
	showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch(error) {
        newQuote();
    }
}

function tweetQuote() {
	const twitterURL = 	`https://twitter.com/intent/tweet?text=${quote.text} - ${quote.author}`
	window.open(twitterURL, '_blank');
}

newQuoteButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote);


getQuote();
