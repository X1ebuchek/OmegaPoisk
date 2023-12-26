var expanded = false;
var tagsOnWindow = [];
var updateButton = document.getElementById('update');

var switchElement = document.querySelector('.switch input');
if (localStorage.getItem('creator') == 'true'){
    switchElement.checked = true;
    document.getElementById('animeNavbar').href += '?creator=true';
    document.getElementById('movieNavbar').href += '?creator=true';
    document.getElementById('tv_showNavbar').href += '?creator=true';
    document.getElementById('comicNavbar').href += '?creator=true';
    document.getElementById('gameNavbar').href += '?creator=true';
}

switchElement.addEventListener('change', function() {
    var isChecked = switchElement.checked;
    if (isChecked) localStorage.setItem('creator', true);
    else localStorage.setItem('creator', false);
    var path = window.location.pathname;
    var page = path.split("/").pop();
    var name = page.split(".")[0];
    console.log(path);
    var redirectUrl = isChecked ? name + '.html?id=' + animeId + '&type=' + type + '&creator=true' : name + '.html?id=' + animeId + '&type=' + type;


    window.location.href = redirectUrl;
});

async function fetchAnimeData(animeId) {
    //const apiUrl = `https://example.com/api/anime/${animeId}`;

    // try {
    //     const response = await fetch(apiUrl);
    //     const data = await response.json();
    //
    //     // Update the content with the fetched data
    //     updateContent(data);
    // } catch (error) {
    //     console.error('Error fetching anime data:', error);
    // }

    let xhr = new XMLHttpRequest();

    var path = window.location.pathname;
    var page = path.split("/").pop();
    var name = page.split(".")[0];
    xhr.open('GET', 'http://localhost:27401/api/read/' + urlParams.get('type') + "/" + animeId);

    xhr.send();

    xhr.onload = function() {
        console.log(xhr.responseText);
        content = JSON.parse(xhr.responseText)

        let xhr1 = new XMLHttpRequest();
        xhr1.open('GET', 'http://localhost:27401/api/read/content/studio/' + animeId);
        xhr1.send();
        updateContent(content);
        xhr1.onload = function() {
            data = JSON.parse(xhr1.responseText)
            console.log(data);
            if (creator){
                divStudio = document.querySelector('.anime-studio');
                divStudio.innerHTML = '';
                span = document.createElement('span');
                span.innerText = 'Студия:';
                studioNode = document.createElement('input');
                studioNode.value = data.name;
                divStudio.appendChild(span);
                divStudio.appendChild(studioNode);
                getTags();
            }else {
                document.querySelector('.anime-studio h3').textContent = data.name;
            }
        }

        //console.log(content[0].avgRating)
    };
}

// Function to update the content of content.html
function updateContent(data) {
    if (type == 'anime'){
        document.querySelector('.anime-extra span').innerText = 'Количество серий:';
        document.querySelector('.anime-extra h3').innerText = data.content.seriesNum;
    }
    if (type == 'movie'){
        document.querySelector('.anime-extra span').innerText = 'Длительность:';
        document.querySelector('.anime-extra h3').innerText = data.content.duration;
    }
    if (type == 'tv_show'){
        document.querySelector('.anime-extra span').innerText = 'Количество серий:';
        document.querySelector('.anime-extra h3').innerText = data.content.seriesNum;
    }
    if (type == 'comic'){
        document.querySelector('.anime-extra span').innerText = 'Цветная?';
        document.querySelector('.anime-extra h3').innerText = data.content.isColored ? 'Да' : 'Нет';
    }
    if (type == 'game'){
        document.querySelector('.anime-extra span').innerText = 'Бесплатная?';
        document.querySelector('.anime-extra h3').innerText = data.content.isFree ? 'Да' : 'Нет';
    }
    // Update anime information
    if (creator){
       updateButton.style.display = '';

        var switchElement = document.querySelector('.switch input');
        switchElement.checked = true;

        divName = document.getElementById('anime-name-and-desc');
        divName.innerHTML = '';
        nameNode = document.createElement('input');
        nameNode.value = data.content.title;
        divName.appendChild(nameNode);
        descNode = document.createElement('textarea');
        descNode.style.height = '100px';
        descNode.value = data.content.description;
        divName.appendChild(descNode);
        image = document.querySelector('.anime-cover');
        image.src = data.content.posterPath;
        imageChange = document.createElement('input');
        imageChange.type = 'file';
        imageChange.id = 'file-upload';
        imageChange.accept = 'image/*';
        imageChange.hidden = 'hidden';
        divName.appendChild(imageChange);
        divTags = document.querySelector('.anime-tags');
        divTags.innerHTML = '';
        span = document.createElement('span');
        span.innerText = 'Тэги:';
        divTags.appendChild(span);
        tagsContainer = document.createElement('div');
        tagsContainer.id = 'tagsContainer';
        selectBox = document.createElement('div');
        selectBox.className = 'selectBox';
        select = document.createElement('select');
        option = document.createElement('option');
        option.id = 'selectName';
        data.tags.forEach(genre => {
            option.innerHTML += genre.name + " ";
        });
        select.appendChild(option);
        overSelect = document.createElement('div');
        overSelect.className = 'overSelect';
        selectBox.appendChild(select);
        selectBox.appendChild(overSelect);
        checkboxes = document.createElement('div');
        checkboxes.id = 'checkboxes';
        tagsContainer.appendChild(selectBox);
        tagsContainer.appendChild(checkboxes);
        divTags.appendChild(tagsContainer);

        divExtra = document.querySelector('.anime-extra');
        divExtra.innerHTML = '';
        span1 = document.createElement('span');
        if (type == 'anime'){
            span1.innerText = 'Количество серий:';
            input = document.createElement('input');
            input.type = 'number';
            input.id = 'extra-input';
            input.value = data.content.seriesNum;
            divExtra.appendChild(span1);
            divExtra.appendChild(input);
            urlAdd = 'http://localhost:27401/api/creator/update/anime';
        }
        if (type == 'movie'){
            span1.innerText = 'Длительность:';
            input = document.createElement('input');
            input.type = 'number';
            input.id = 'extra-input';
            input.value = data.content.duration;
            divExtra.appendChild(span1);
            divExtra.appendChild(input);
            urlAdd = 'http://localhost:27401/api/creator/update/movie';
        }
        if (type == 'tv_show'){
            span1.innerText = 'Количество серий:';
            input = document.createElement('input');
            input.type = 'number';
            input.id = 'extra-input';
            input.value = data.content.seriesNum;
            divExtra.appendChild(span1);
            divExtra.appendChild(input);
            urlAdd = 'http://localhost:27401/api/creator/update/tv_show';
        }
        if (type == 'comic'){
            span1.innerText = 'Цветная?';
            select = document.createElement('select');
            select.id = 'extra-input';
            option1 = document.createElement('option');
            option1.innerText = 'Да';
            option2 = document.createElement('option');
            option2.innerText = 'Нет';
            select.value = data.content.isColored ? 'Да' : 'Нет';
            select.appendChild(option1);
            select.appendChild(option2);
            divExtra.appendChild(span1);
            divExtra.appendChild(select);
            urlAdd = 'http://localhost:27401/api/creator/update/comic';
        }
        if (type == 'game'){
            span1.innerText = 'Бесплатная?';
            select = document.createElement('select');
            select.id = 'extra-input';
            option1 = document.createElement('option');
            option1.innerText = 'Да';
            option2 = document.createElement('option');
            option2.innerText = 'Нет';
            select.value = data.content.isFree ? 'Да' : 'Нет';
            select.appendChild(option1);
            select.appendChild(option2);
            divExtra.appendChild(span1);
            divExtra.appendChild(select);
            urlAdd = 'http://localhost:27401/api/creator/update/game';
        }


        imageChange.addEventListener('change', previewImage);
        image.addEventListener('click', function (){
            document.getElementById('file-upload').click();
        });

        selectBox.addEventListener("click", showCheckboxes);

    }else {
        document.getElementById('anime-name-content').innerText = data.content.title;
        document.querySelector('.anime-cover').src = data.content.posterPath;
        document.querySelector('.anime-description').textContent = data.content.description;

        // Update anime details
        document.querySelector('.anime-rating h3').textContent = data.avgRating + " / 10";
        data.tags.forEach(genre => {
            document.querySelector('.anime-tags h3').textContent += genre.name + " ";
        });
    }

updateButton.addEventListener('click',()=>{
    saveContent();
});

    function saveContent() {

        const title = document.querySelector('#anime-name-and-desc input').value;
        const description = document.querySelector('#anime-name-and-desc textarea').value;
        const imageInput = document.getElementById('file-upload');
        //const tags = document.getElementById('tags').value;
        const studio = document.querySelector('.anime-studio input').value;
        var extraInput = document.getElementById('extra-input').value;

        if (extraInput === "Да"){
            extraInput = true;
        }else if (extraInput === "Нет"){
            extraInput = false;
        }
        console.log(extraInput);

        console.log(title);
        console.log(description);
        console.log(imageInput.files.length);
        console.log(studio);
        if (title && description && studio) {
            const formData = new FormData();

            formData.append('image', imageInput.files[0]);

            let cont = {
                "content": {
                    "id": animeId,
                    "title": title,
                    "description": description,
                    "posterPath": "//",
                    "seriesNum": extraInput,
                    "duration": extraInput,
                    "isFree": extraInput,
                    "isColored": extraInput
                },
                "studio": studio,
                "tags": tagsOnWindow
            }

            const json = JSON.stringify(cont);
            const blob = new Blob([json], {
                type: 'application/json'
            });

            formData.append("json", blob);
            userData = JSON.parse(localStorage.getItem('user'));
            console.log(cont);

            fetch(urlAdd, {
                method: 'POST',
                headers : {'Authorization': 'Bearer ' + userData.token},
                body: formData
            })

            isRedirect = true;
            //window.location.href = 'anime.html';

        }
    }

    // Update reviews (assuming 'reviews' is an array in your data)
    //const reviewList = document.querySelector('.review-list');
    //reviewList.innerHTML = ''; // Clear existing reviews

    // data.reviews.forEach(review => {
    //     const li = document.createElement('li');
    //     li.textContent = review;
    //     reviewList.appendChild(li);
    // });
}

function getTags(){
    const checkboxes = document.getElementById('checkboxes');
    var tags = [];
    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://localhost:27401/api/read/all_tags');

    xhr.send();

    xhr.onload = function() {
        console.log(xhr.responseText);
        tags = JSON.parse(xhr.responseText);
        console.log(tags);
        //listTags = tags;
        addTags(tags)
    };

}

function addTags(tags){
    for (const tagKey in tags) {
        const label = document.createElement('label');
        label.innerText = tags[tagKey].name;
        const tag = document.createElement('input');
        tag.type = 'checkbox';
        tag.value = tags[tagKey].name;
        label.appendChild(tag);
        checkboxes.appendChild(label);

        tag.addEventListener('change', function () {
            if (this.checked) {
                tagsOnWindow.push(tags[tagKey]);
            } else {
                var index = tagsOnWindow.indexOf(tags[tagKey]);
                if (index !== -1) {
                    tagsOnWindow.splice(index, 1);
                }
            }
            addTextToOption();
        });
    }
}

function addTextToOption(){
    const selectName = document.getElementById('selectName');
    selectName.innerHTML = '';
    for (const tag1 in tagsOnWindow) {
        selectName.innerHTML += tagsOnWindow[tag1].name + " ";
    }
}

function showCheckboxes() {
    var checkboxes = document.getElementById("checkboxes");
    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }
}

function previewImage() {
    const fileInput = document.getElementById('file-upload');
    const imgElement = document.getElementById('user-photo-img');

    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            imgElement.src = e.target.result;
        };

        reader.readAsDataURL(file);
    }
}

// Get the anime ID from the query parameter (you may need to adjust this based on your URL structure)
const urlParams = new URLSearchParams(window.location.search);
const animeId = urlParams.get('id');
const type = urlParams.get('type');
const creator = urlParams.get('creator');

// Fetch and update anime data
if (animeId) {
    fetchAnimeData(animeId);
}