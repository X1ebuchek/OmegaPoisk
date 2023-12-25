getTags();
var listTags = [];
var tagsOnWindow = [];
var expanded = false;
var urlAdd = 'http://localhost:27401/api/creator/add/anime';
var extraField = "seriesNum";

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

function saveContent() {

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const imageInput = document.getElementById('imageInput');
    //const tags = document.getElementById('tags').value;
    const studio = document.getElementById('studio').value;
    var extraInput = document.getElementById('extra-input').value;

    if (extraInput === "Да"){
        extraInput = true;
    }else if (extraInput === "Нет"){
        extraInput = false;
    }
    console.log(extraInput);

    if (title && description && imageInput.files.length > 0 && studio) {
        const formData = new FormData();

        formData.append('image', imageInput.files[0]);

        let cont = {
            "content": {
                "id": 0,
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
        //console.log(json);

        // let xhr = new XMLHttpRequest();
        //
        // xhr.open('GET', 'http://localhost:27401/api/creator/add/anime');
        //
        // xhr.send();
        //
        // xhr.onload = function() {
        //     console.log(xhr.responseText);
        //     tags = JSON.parse(xhr.responseText);
        //     console.log(tags);
        //     listTags = tags;
        //     addTags(tags)
        // };
    }
}


function changeType(){

}

const selectType = document.getElementById('type');
const extra = document.getElementById('extra');
selectType.addEventListener('change', function () {
    var indexSelected = selectType.selectedIndex;
    var option = selectType.querySelectorAll('option')[indexSelected];
    extra.innerHTML = '';
    if (option.value === 'anime'){
        const label = document.createElement('label');
        label.innerText = 'Количество серий:';
        const input = document.createElement('input');
        input.type = 'number';
        input.id = 'extra-input';
        extra.appendChild(label);
        extra.appendChild(input);
        urlAdd = 'http://localhost:27401/api/creator/add/anime';
        extraField = "seriesNum";
    } else if (option.value === 'movie'){
        const label = document.createElement('label');
        label.innerText = 'Длительность:';
        const input = document.createElement('input');
        input.type = 'number';
        input.id = 'extra-input';
        extra.appendChild(label);
        extra.appendChild(input);
        urlAdd = 'http://localhost:27401/api/creator/add/movie';
        extraField = "duration";
    } else if (option.value === 'tvshow'){
        const label = document.createElement('label');
        label.innerText = 'Количество серий:';
        const input = document.createElement('input');
        input.type = 'number';
        input.id = 'extra-input';
        extra.appendChild(label);
        extra.appendChild(input);
        urlAdd = 'http://localhost:27401/api/creator/add/tv_show';
        extraField = "seriesNum";
    } else if (option.value === 'manga'){
        const label = document.createElement('label');
        label.innerText = 'Цветная?';
        const select = document.createElement('select');
        select.id = 'extra-input';
        const option1 = document.createElement('option');
        option1.innerText = 'Да';
        const option2 = document.createElement('option');
        option2.innerText = 'Нет';
        select.appendChild(option1);
        select.appendChild(option2);
        extra.appendChild(label);
        extra.appendChild(select);
        urlAdd = 'http://localhost:27401/api/creator/add/comic';
        extraField = "isColored";
    } else if (option.value === 'game') {
        const label = document.createElement('label');
        label.innerText = 'Бесплатная?';
        const select = document.createElement('select');
        select.id = 'extra-input';
        const option1 = document.createElement('option');
        option1.innerText = 'Да';
        const option2 = document.createElement('option');
        option2.innerText = 'Нет';
        select.appendChild(option1);
        select.appendChild(option2);
        extra.appendChild(label);
        extra.appendChild(select);
        urlAdd = 'http://localhost:27401/api/creator/add/game';
        extraField = "isFree";
    }

});
