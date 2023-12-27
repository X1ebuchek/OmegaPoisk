
var isRedirect = false;
var hidden = true;

function pop(){
    if (isRedirect === true){
        popup("Успешно");
        isRedirect = false;
    }
}
pop();


function popup(text){
    const popupContainer = document.getElementById('popupContainer');
    document.getElementById('popupText').innerText = text;

    // Перед показом окна устанавливаем новое положение справа
    popupContainer.style.right = '20px';

    setTimeout(function () {
        // Закрываем окно через 5 секунд
        popupContainer.style.right = '-300px'; // устанавливаем положение за пределы экрана
    }, 5000);
}

function searchContent(string) {
    hidden = true;
    const contentContainer = document.getElementById('content-container');

    contentContainer.innerHTML = '';

    let xhr = new XMLHttpRequest();

    var path = window.location.pathname;
    var page = path.split("/").pop();
    var name = page.split(".")[0];

    if (search) url = 'http://localhost:27401/api/search/' + name;
    else url = 'http://localhost:27401/api/read/' + name;

    xhr.open('GET', url);
    xhr.setRequestHeader("Content-type", "text/plain");
    xhr.send(search);

    xhr.onload = function() {
        content = JSON.parse(xhr.responseText)
        updateContent(content)
        //console.log(content[0].avgRating)
    };

}

function searchContentInCreatorMode() {
    hidden = false;
    const contentContainer = document.getElementById('content-container');

    contentContainer.innerHTML = '';

    let xhr = new XMLHttpRequest();

    var path = window.location.pathname;
    var page = path.split("/").pop();
    var name = page.split(".")[0];
    if (search) url = 'http://localhost:27401/api/search/' + name + "/creator";
    else url = 'http://localhost:27401/api/creator/read/' + name;
    xhr.open('GET', url);
    console.log(JSON.parse(localStorage.getItem('user')).token);
    xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem('user')).token);
    xhr.setRequestHeader("Content-type", "text/plain");
    xhr.send(search);

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

    const deleteButton = document.createElement('div');
    deleteButton.className = 'delete-button';
    if (hidden) deleteButton.hidden = 'hidden';

    const aX = document.createElement('a');
    aX.id = 'delete-button';
    aX.innerText = '✖';
    deleteButton.appendChild(aX)

    const imageContainer = document.createElement('div');
    imageContainer.className = 'anime-card-image-container';

    const image = document.createElement('img');
    image.src = item.content.posterPath;
    image.alt = 'Anime Title';
    image.style.height = '300px';
    image.style.width = '220px';

    // Add content to the card (adjust as per your JSON structure)
    const title = document.createElement('div');
    title.className = 'anime-card-title';
    title.textContent = item.content.title;

    const info = document.createElement('div');
    info.className = 'anime-card-info';

    const genres = document.createElement('div');
    genres.className = 'anime-card-genres';

    item.tags.slice(0, item.tags.length>3 ? 3 : item.tags.length).forEach(genre => {
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

    card.appendChild(deleteButton);
    card.appendChild(imageContainer);
    card.appendChild(info);
    card.appendChild(rating);

    aX.addEventListener('click', function ()  {
        let xhr = new XMLHttpRequest();

        var path = window.location.pathname;
        var page = path.split("/").pop();
        var name = page.split(".")[0];
        xhr.open('POST', 'http://localhost:27401/api/creator/del/' + name + "/" + item.content.id);

        xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem('user')).token);
        xhr.send();

        xhr.onload = function() {
            location.reload();
        };
    });

    image.addEventListener('click', function () {
        var path = window.location.pathname;
        var page = path.split("/").pop();
        var name = page.split(".")[0];
        if (creator) window.location.href = 'content.html?id='+item.content.id + "&type="+name + "&creator=true";
        else window.location.href = 'content.html?id='+item.content.id + "&type="+name;
    });

    return card;
}

const switchElement = document.querySelector('.switch input');

switchElement.addEventListener('change', function() {
    var isChecked = switchElement.checked;
    if (isChecked) localStorage.setItem('creator', true);
    else localStorage.setItem('creator', false);
    var path = window.location.pathname;
    var page = path.split("/").pop();
    var name = page.split(".")[0];
    var redirectUrl = isChecked ? name + '.html?creator=true' : name + '.html';


    window.location.href = redirectUrl;
});

const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click',()=>{
    var path = window.location.pathname;
    var page = path.split("/").pop();
    var name = page.split(".")[0];
    if (creator) location.href = name + '.html?search=' + document.getElementsByClassName('search-box').item(0).value + "&creator=true";
    else location.href = name + '.html?search=' + document.getElementsByClassName('search-box').item(0).value;
});

const urlParams = new URLSearchParams(window.location.search);
const search = urlParams.get('search');
const creator = urlParams.get('creator');

// Fetch and update anime data

if (localStorage.getItem('creator') == 'true'){
    document.getElementById('animeNavbar').href += '?creator=true';
    document.getElementById('movieNavbar').href += '?creator=true';
    document.getElementById('tv_showNavbar').href += '?creator=true';
    document.getElementById('comicNavbar').href += '?creator=true';
    document.getElementById('gameNavbar').href += '?creator=true';
}
if (creator){
    switchElement.checked = true;
    searchContentInCreatorMode();
}else if (search){
    document.getElementById('anime-container-title').innerText = 'Результаты поиска:';
    searchContent(search);
}else searchContent();





