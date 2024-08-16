let quotes = [
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
    sessionStorage.setItem('lastQuote', JSON.stringify(randomQuote));
}
const loadLastQuote = () => {
    const lastQuote = sessionStorage.getItem('lastQuote');
    if (lastQuote) {
        const quote = JSON.parse(lastQuote);
        const quoteDisplay = document.getElementById('quoteDisplay');
        quoteDisplay.textContent = `"${quote.text}" - ${quote.category}`;
    }
}

const createAddQuoteForm = () => {
    const newQuote = document.getElementById('newQuoteText').value
    const quoteCategory = document.getElementById('newQuoteCategory').value
    if (!newQuote && !quoteCategory) {
        alert("Please add a new quote and its category")
        return;
    }
    const quoteElement = document.createElement('div');
    quoteElement.textContent = `"${newQuote}" -  ${quoteCategory}`;
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.appendChild(quoteElement);
}

document.getElementById('newQuote').addEventListener('click', showRandomQuote);
const saveQuotes = () => {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

const addQuote = () => {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        const isNewCategory = !quotes.some(quote => quote.category === newQuoteCategory);
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        saveQuotes();
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        alert('New quote added successfully!');
        if (isNewCategory) {
            populateCategories();  // Update the dropdown if a new category is added
        }
    } else {
        alert('Please enter both a quote and a category.');
    }
}

const loadQuotes = () => {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);  // Parse the JSON string back into an array
    }
    const selectedCategory = localStorage.getItem('selectedCategory') || 'all';
    document.getElementById('categoryFilter').value = selectedCategory;
    filterQuotes();
}

const exportToJsonFile = () => {
    const dataStr = JSON.stringify(quotes, null, 2);  // Convert quotes to JSON string
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'quotes.json';  // Name of the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

const importFromJsonFile = (event) => {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);  // Add imported quotes to the existing array
        saveQuotes();  // Save the updated array to local storage
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

document.getElementById('exportFile').addEventListener('click', exportToJsonFile)

const populateCategories = () => {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = [...new Set(quotes.map(quote => quote.category))];  // Extract unique categories

    // Clear existing options (except "All Categories")
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    // Populate the dropdown with unique categories
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

const filterQuotes = () => {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const quoteDisplay = document.getElementById('quoteDisplay');

    // Clear the current displayed quotes
    quoteDisplay.innerHTML = '';

    // Filter quotes based on the selected category
    const filteredQuotes = selectedCategory === 'all'
        ? quotes
        : quotes.filter(quote => quote.category === selectedCategory);

    // Display the filtered quotes
    filteredQuotes.forEach(quote => {
        const quoteElement = document.createElement('div');
        quoteElement.textContent = `"${quote.text}" - ${quote.category}`;
        quoteDisplay.appendChild(quoteElement);
    });

    // Save the selected category to local storage
    localStorage.setItem('selectedCategory', selectedCategory);
}




loadLastQuote();
loadQuotes();
populateCategories();