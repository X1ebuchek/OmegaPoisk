function searchContent(string) {
    document.getElementById('anime-container-title').innerText = 'Результаты поиска:'
    const contentContainer = document.getElementById('content-container');

    //location.href='index.html?search=' + searchBox.value;

    //список тэгов и список студий передаются на бэк

    // Clear existing content
    contentContainer.innerHTML = '';

    // Fetch data from the server based on the search query
    //const searchQuery = searchBox.value;
    //const apiUrl = ;

    // try {
    //     const response = await fetch(apiUrl);
    //     const data = await response.json();
    //
    //     // Update the content container with the new data
    //     updateContent(data);
    // } catch (error) {
    //     console.error('Error fetching data:', error);
    // }
    var data = JSON.parse('[{"id":"1","title":"Атака Титанов","image":"../img/anime/AOT.jpeg","genres":["Экшен","Драма"],"rating":"8.6/10"},{"id":"2","title":"Клинок, рассекающий демонов","image":"../img/anime/DS.jpeg","genres":["Экшен","Фэнтези"],"rating":"8.5/10"},{"id":"3","title":"Наруто","image":"../img/anime/naruto.jpeg","genres":["Экшен","Приключения"],"rating":"8.0/10"},{"id":"4","title":"Магическая битва","image":"../img/anime/magic_battle.jpeg","genres":["Экшен","Фэнтези"],"rating":"8.6/10"},{"id":"5","title":"Невероятное приключение ДжоДжо","image":"../img/anime/jojo.jpeg","genres":["Экшен","Приключения"],"rating":"7.9/10"},{"id":"6","title":"Атака Титанов","image":"../img/anime/AOT.jpeg","genres":["Экшен","Драма"],"rating":"8.6/10"}]');
    //var data1 = JSON.parse('[{"title":"Атака Титанов","image":"../img/anime/AOT.jpeg","genres":["Экшен","Драма"],"rating":"8.6/10"},{"title":"Клинок, рассекающий демонов","image":"../img/anime/DS.jpeg","genres":["Экшен","Фэнтези"],"rating":"8.5/10"},{"title":"Наруто","image":"../img/anime/naruto.jpeg","genres":["Экшен","Приключения"],"rating":"8.0/10"},{"title":"Магическая битва","image":"../img/anime/magic_battle.jpeg","genres":["Экшен","Фэнтези"],"rating":"8.6/10"},{"title":"Невероятное приключение ДжоДжо","image":"../img/anime/jojo.jpeg","genres":["Экшен","Приключения"],"rating":"7.9/10"},{"title":"Атака Титанов","image":"../img/anime/AOT.jpeg","genres":["Экшен","Драма"],"rating":"8.6/10"}]');

    //data2 = data;
    //data3 = data;
    //data4 = data;
    //data5 = data;
    updateContent(data);
    //updateContent(data1);
    //updateContent(data2);
    //updateContent(data3);
    //updateContent(data4);
    //updateContent(data5);

}

function updateContent(data) {
    const contentContainer = document.getElementById('content-container');
    setTimeout(100);

    // Update the content container with new cards
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
    image.src = item.image;
    image.alt = 'Anime Title';

    // Add content to the card (adjust as per your JSON structure)
    const title = document.createElement('div');
    title.className = 'anime-card-title';
    title.textContent = item.title;

    const info = document.createElement('div');
    info.className = 'anime-card-info';

    const genres = document.createElement('div');
    genres.className = 'anime-card-genres';
    item.genres.forEach(genre => {
        const span = document.createElement('span');
        span.textContent = genre;
        genres.appendChild(span);
    });

    const rating = document.createElement('div');
    rating.className = 'anime-card-rating';
    rating.textContent = item.rating;



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

const urlParams = new URLSearchParams(window.location.search);
const string = urlParams.get('search');

// Fetch and update anime data
if (string) {
    searchContent(string);
}
