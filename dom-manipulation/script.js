const quotes = [
    { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", category: "Inspiration" },
    { text: "The way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Your time is limited, don't waste it living someone else's life.", category: "Life" },
    { text: "If life were predictable it would cease to be life, and be without flavor.", category: "Philosophy" },
    { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", category: "Wisdom" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Perseverance" }
];

const showRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `${randomQuote.text} - ${randomQuote.category}`;
}

const createAddQuoteForm = () => {
    const newQuote = document.getElementById('newQuoteText').value
    const quoteCategory = document.getElementById('newQuoteCategory').value
    if (!newQuote && !quoteCategory) {
        alert("Please add a new quote and its category")
        return;
    }
    const obj = document.createElement('object');
    obj = ({ text: newQuote, category: quoteCategory })
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.appendChild(obj);
}

document.getElementById('newQuote').addEventListener('click', showRandomQuote);