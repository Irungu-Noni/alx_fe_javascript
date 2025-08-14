document.addEventListener('DOMContentLoaded', () => {
    const quoteButton = document.getElementById('newQuote');
    quoteButton.addEventListener('click', displayRandomQuote);

    const dynamicQuotes = [
        { text: "No human is limited.", category: "Inspirational"},
        { text: "Code is machine poetry.", category: "Programming"},
        { text: "Life is what happens when you're busy making other plans.", category: "Life"},
        { text: "Nope, don't feel like it.", category: "Humor"},
        { text: "Knowing yourself is the beginning of all wisdom.", category: "Wisdom"},
        { text: "The only true wisdom is in knowing you know nothing.", category: "Wisdom" },
        { text: "Push yourself, because no one else is going to do it for you.", category: "Motivation"},
        { text: "Great things never come from comfort zones.", category: "Motivation"}  
    ];

    function displayRandomQuote() {
        const randomIndex = Math.floor(Math.random() * dynamicQuotes.length);
        const pickedQuote = dynamicQuotes[randomIndex];
    
        const quoteElement = document.getElementById('quoteDisplay');
        quoteElement.textContent = `"${pickedQuote.text}" - ${pickedQuote.category}`;
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
    };

    // Show a random quote on page load
    displayRandomQuote();

    createAddQuoteForm();
});
