addTags();
var tagsOnWindow = [];
var expanded = false;

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


function addTags(){
    const checkboxes = document.getElementById('checkboxes');
    var tags = ['action', 'drama', 'sport'];
    for (const tagKey in tags) {
        const label = document.createElement('label');
        label.innerText = tags[tagKey];
        const tag = document.createElement('input');
        tag.type = 'checkbox';
        tag.value = tags[tagKey];
        label.appendChild(tag);
        checkboxes.appendChild(label);

        tag.addEventListener('change', function () {
            if (this.checked) {
                tagsOnWindow.push(tag.value);
            } else {
                var index = tagsOnWindow.indexOf(tag.value);
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
        selectName.innerHTML += tagsOnWindow[tag1] + ", ";
    }
}

function saveContent() {

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const imageInput = document.getElementById('imageInput');
    const tags = document.getElementById('tags').value;
    const studio = document.getElementById('studio').value;

    if (title && description && imageInput.files.length > 0 && tags && studio) {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', imageInput.files[0]);
        formData.append('tags', tags);
        formData.append('studio', studio);

        fetch('/save-content', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Content saved successfully!');
                } else {
                    alert('Failed to save content.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while saving the content.');
            });
    } else {
        alert('Please fill in all the fields.');
    }
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
        extra.appendChild(label);
        extra.appendChild(input);
    } else if (option.value === 'movie'){
        const label = document.createElement('label');
        label.innerText = 'Длительность:';
        const input = document.createElement('input');
        input.type = 'number';
        extra.appendChild(label);
        extra.appendChild(input);
    } else if (option.value === 'tvshow'){
        const label = document.createElement('label');
        label.innerText = 'Количество серий:';
        const input = document.createElement('input');
        input.type = 'number';
        extra.appendChild(label);
        extra.appendChild(input);
    } else if (option.value === 'manga'){
        const label = document.createElement('label');
        label.innerText = 'Цветная?';
        const select = document.createElement('select');
        const option1 = document.createElement('option');
        option1.innerText = 'Да';
        const option2 = document.createElement('option');
        option2.innerText = 'Нет';
        select.appendChild(option1);
        select.appendChild(option2);
        extra.appendChild(label);
        extra.appendChild(select);
    } else if (option.value === 'game'){
        const label = document.createElement('label');
        label.innerText = 'Бесплатная?';
        const select = document.createElement('select');
        const option1 = document.createElement('option');
        option1.innerText = 'Да';
        const option2 = document.createElement('option');
        option2.innerText = 'Нет';
        select.appendChild(option1);
        select.appendChild(option2);
        extra.appendChild(label);
        extra.appendChild(select);
    }

});
