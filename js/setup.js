var expanded = false;
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
    // Update anime information
    if (creator){
        divName = document.getElementById('anime-name-and-desc');
        divName.innerHTML = '';
        nameNode = document.createElement('input');
        nameNode.value = data.content.title;
        divName.appendChild(nameNode);
        descNode = document.createElement('textarea');
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
const creator = urlParams.get('creator');

// Fetch and update anime data
if (animeId) {
    fetchAnimeData(animeId);
}