function searchContent(string) {
    const contentContainer = document.getElementById('content-container');

    contentContainer.innerHTML = '';

    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://localhost:27401/api/read/anime');

    xhr.send();

    xhr.onload = function() {
        content = JSON.parse(xhr.responseText)
        updateContent(content)
        //console.log(content[0].avgRating)
    };

}

function searchContentInCreatorMode(string) {
    const contentContainer = document.getElementById('content-container');

    contentContainer.innerHTML = '';

    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://localhost:27401/api/read/anime');

    xhr.send();

    xhr.onload = function() {
        content = JSON.parse(xhr.responseText)
        updateContent(content)
        //console.log(content[0].avgRating)
    };

}

function updateContent(data) {
    const contentContainer = document.getElementById('content-container');

    data.forEach(item => {
        const card = createCard(item);
        contentContainer.appendChild(card);
    });
}

function createCard(item) {
    // Create a new card element
    const card = document.createElement('div');
    card.className = 'anime-card';

    const imageContainer = document.createElement('div');
    imageContainer.className = 'anime-card-image-container';

    const image = document.createElement('img');
    image.src = item.content.posterPath;
    image.alt = 'Anime Title';

    // Add content to the card (adjust as per your JSON structure)
    const title = document.createElement('div');
    title.className = 'anime-card-title';
    title.textContent = item.content.title;

    const info = document.createElement('div');
    info.className = 'anime-card-info';

    const genres = document.createElement('div');
    genres.className = 'anime-card-genres';
    item.tags.forEach(genre => {
        const span = document.createElement('span');
        span.textContent = genre.name;
        genres.appendChild(span);
    });

    const rating = document.createElement('div');
    rating.className = 'anime-card-rating';
    rating.textContent = parseFloat(item.avgRating).toFixed(1) + "/10";



    // Append content to the card
    imageContainer.appendChild(image);
    info.appendChild(title);
    info.appendChild(genres);

    card.appendChild(imageContainer);
    card.appendChild(info);
    card.appendChild(rating);

    card.addEventListener('click', function () {
        window.location.href = 'content.html?id='+item.id;
    });

    return card;
}

const switchElement = document.querySelector('.switch input');

switchElement.addEventListener('change', function() {
    var isChecked = switchElement.checked;

    var redirectUrl = isChecked ? 'index.html?creator=true' : 'index.html';

    window.location.href = redirectUrl;
});

const urlParams = new URLSearchParams(window.location.search);
const string = urlParams.get('search');
const creator = urlParams.get('creator');

// Fetch and update anime data
if (string) {
    document.getElementById('anime-container-title').innerText = 'Результаты поиска:'
    searchContent(string);
}else if (creator){
    switchElement.checked = true;
    searchContentInCreatorMode();
}else searchContent();




