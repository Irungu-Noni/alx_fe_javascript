document.addEventListener('DOMContentLoaded', () => {

    let dynamicQuotes = [
        { text: "No human is limited.", category: "Inspirational"},
        { text: "Code is machine poetry.", category: "Programming"},
        { text: "Life is what happens when you're busy making other plans.", category: "Life"},
        { text: "Nope, don't feel like it.", category: "Humor"},
        { text: "Knowing yourself is the beginning of all wisdom.", category: "Wisdom"},
        { text: "The only true wisdom is in knowing you know nothing.", category: "Wisdom" },
        { text: "Push yourself, because no one else is going to do it for you.", category: "Motivation"},
        { text: "Great things never come from comfort zones.", category: "Motivation"}  
    ];

    loadQuotes();
    populateCategories();

    showRandomQuote();
    createAddQuoteForm();

    setInterval(syncQuotes, 30000); // Show a new quote every 10 seconds

    const quoteButton = document.getElementById('newQuote');
    quoteButton.addEventListener('click', showRandomQuote);

    const filterSelect = document.getElementById('categoryFilter');
    filterSelect.addEventListener('change', filterQuotes);

    function displayQuotes(quotesToDisplay) {
        const quoteDisplay = document.getElementById('quoteDisplay');

        quoteDisplay.innerHTML = ''; // Clear previous quotes
        if (quotesToDisplay.length > 0) {
            quotesToDisplay.forEach(quote => {
                const quoteElement = document.createElement('div');
                quoteElement.innerHTML = `"${quote.text}" <em>${quote.category}</em>`;
                quoteDisplay.appendChild(quoteElement);
            });
        } else {
            quoteDisplay.innerHTML = '<p>No quotes available in this category.</p>';
        }
    };

    function filterQuotes() {
        const selectedCategory = document.getElementById('categoryFilter').value;
        const quoteDisplay = document.getElementById('quoteDisplay');

        let filteredQuotes = [];

        if (selectedCategory === 'all') {
            filteredQuotes = dynamicQuotes;
        } else {
            // Filter quotes based on the selected category
            filteredQuotes = dynamicQuotes.filter(quote => quote.category === selectedCategory);

            displayQuotes(filteredQuotes);
        };
    };

    function populateCategories() {
        const categorySelect = document.getElementById('categoryFilter');

        const categories = new Set(dynamicQuotes.map(quote => quote.category));
    
        categorySelect.innerHTML = '<option value="all">All Categories</option>'; // Reset options

        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    };

    function loadQuotes() {
        const savedQuoteString = localStorage.getItem('originalQuotes');

        if (savedQuoteString !== null) {
            dynamicQuotes = JSON.parse(savedQuoteString);
        }
    };

    function saveQuotes() {
        localStorage.setItem('originalQuotes', JSON.stringify(dynamicQuotes));
    };

    function importFromJsonFile(event) {
        const fileReader = new FileReader();

        fileReader.onload = function(event) {
            const importedQuotes = JSON.parse(event.target.result);
            dynamicQuotes.push(...importedQuotes);
            saveQuotes();
            alert('Quotes imported successfully!');
        };
        fileReader.readAsText(event.target.files[0]);
    };

    function exportQuotes() {
        const quoteData = JSON.stringify(dynamicQuotes);

        const quoteBlob = new Blob([quoteData], {type: 'application/json'});

        const quoteUrl = URL.createObjectURL(quoteBlob);

        const quoteLink = document.createElement('a');
        quoteLink.href = quoteUrl;
        quoteLink.download = 'TheeQuotes.json';

        quoteLink.click();

        URL.revokeObjectURL(quoteUrl);
    };

    function showRandomQuote() {
        const randomIndex = Math.floor(Math.random() * dynamicQuotes.length);
        const pickedQuote = dynamicQuotes[randomIndex];
    
        const quoteElement = document.getElementById('quoteDisplay');
        quoteElement.innerHTML = `<p>"${pickedQuote.text}"</p>
        <p><em>${pickedQuote.category}</em></p>`;
    };

    function createAddQuoteForm() {
        const documentDiv = document.createElement('div');
    
        const textInput = document.createElement('input');

        textInput.id = "newQuoteText";
        textInput.type = "text";
        textInput.placeholder = "Enter a new quote";

        const categoryInput = document.createElement('input');

        categoryInput.id = "newQuoteCategory";
        categoryInput.type = "text";
        categoryInput.placeholder = "Enter quote category";

        const textButton= document.createElement('button');

        textButton.onclick = addQuote;
        textButton.textContent = "Add Quote";

        documentDiv.appendChild(textInput);
        documentDiv.appendChild(categoryInput);
        documentDiv.appendChild(textButton);

        document.body.appendChild(documentDiv);
    };

    function addQuote() {
        const newQuoteAddText = document.getElementById("newQuoteText").value;
        const newQuoteAddCategory = document.getElementById("newQuoteCategory").value;

        const addNewQuote = {text: newQuoteAddText, category: newQuoteAddCategory};

        dynamicQuotes.push(addNewQuote);

        document.getElementById("newQuoteText").value = "";
        document.getElementById("newQuoteCategory").value = "";

        saveQuotes();
        populateCategories();
    };
});

async function syncQuotes() {
    try {
        const newQuote = {
            title: "New Quote from Server",
            body: "This is a dynamically added quote from the server.",
            userId: 1
        };

        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newQuote)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const addedQuote = await response.json();
        console.log('New Quote added successfully:', addedQuote);
        alert('New Quote successfully sent to server!');
    } catch (error) {
        console.error('Error adding new quote:', error);
        alert('Failed to add new quote. Please try again later.');
    }
}