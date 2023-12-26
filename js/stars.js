getRating();
const ratingGroup = document.querySelector('.rating-group');

// Get the h1 element
const h2Element = document.querySelector('.rating-group > h2');

// Add a click event listener to the rating group
ratingGroup.addEventListener('click', (event) => {
    // Check if the clicked element is an input with type radio
    if (event.target.tagName === 'INPUT' && event.target.type === 'radio') {
        // Update the h1 text content with the value of the selected radio
        h2Element.textContent = event.target.value + " / 10";
        addRating(event.target.value);
    }
});

function addRating(value){
    let rating = {
        "id": 0,
        "value": value,
        "userId": JSON.parse(localStorage.getItem('user')).id,
        "contentId": animeId
    }
    let xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://localhost:27401/api/rating/add');
    xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem('user')).token);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.send(JSON.stringify(rating));

    xhr.onload = function() {
        console.log(xhr.responseText);
        location.reload();
    };
}

function getRating(){
    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://localhost:27401/api/rating/' + animeId);
    xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem('user')).token);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.send();

    xhr.onload = function() {
        console.log(xhr.responseText);
        data = JSON.parse(xhr.responseText);

        selectedStar = document.getElementById('hsr-'+data.value);
        //selectedStar.checked = true;
        h2Element.textContent = data.value + " / 10";
        //location.reload();
    };
}