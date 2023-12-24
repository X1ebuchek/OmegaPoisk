const ratingGroup = document.querySelector('.rating-group');

// Get the h1 element
const h2Element = document.querySelector('.rating-group > h2');

// Add a click event listener to the rating group
ratingGroup.addEventListener('click', (event) => {
    // Check if the clicked element is an input with type radio
    if (event.target.tagName === 'INPUT' && event.target.type === 'radio') {
        // Update the h1 text content with the value of the selected radio
        h2Element.textContent = event.target.value + " / 10";
    }
});