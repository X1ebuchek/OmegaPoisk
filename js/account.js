getLists();
function getLists(){
    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://localhost:27401/api/list/all');
    xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem('user')).token);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.send();

    xhr.onload = function() {
        console.log(xhr.responseText);
        addLists(JSON.parse(xhr.responseText));
    };
}
function addLists(data){
    var animeCardWatched = document.querySelector('.anime-card-watched div');
    var animeCardWatching = document.querySelector('.anime-card-watching div');
    var animeCardWillWatch = document.querySelector('.anime-card-will-watch div');
    data.watched.forEach(review =>{
        reviewBlock = document.createElement('div');
        reviewBlock.className = 'review-block';
        deleteButton = document.createElement('div');
        deleteButton.className = 'delete-button1';
        deleteButton.style.right = '0';

        aX = document.createElement('a');
        aX.id = 'delete-button1';
        aX.innerText = '✖';
        aX.value = '1';
        deleteButton.appendChild(aX);
        reviewUser = document.createElement('p');
        reviewUser.className = 'review-user';
        reviewUser.innerText = review.contentType.toUpperCase();
        reviewText = document.createElement('p');
        reviewText.className = 'review-text';
        reviewText.innerText = review.contentTitle;
        reviewBlock.appendChild(deleteButton);
        reviewBlock.appendChild(reviewUser);
        reviewBlock.appendChild(reviewText);
        animeCardWatched.appendChild(reviewBlock);

        aX.addEventListener('click', ()=>{
            deleteFromList(review);
        });
    });

    data.watching.forEach(review =>{
        reviewBlock = document.createElement('div');
        reviewBlock.className = 'review-block';
        deleteButton = document.createElement('div');
        deleteButton.className = 'delete-button1';
        deleteButton.style.right = '0';

        aX = document.createElement('a');
        aX.id = 'delete-button1';
        aX.innerText = '✖';
        aX.value = '2';
        deleteButton.appendChild(aX);
        reviewUser = document.createElement('p');
        reviewUser.className = 'review-user';
        reviewUser.innerText = review.contentType.toUpperCase();
        reviewText = document.createElement('p');
        reviewText.className = 'review-text';
        reviewText.innerText = review.contentTitle;
        reviewBlock.appendChild(deleteButton);
        reviewBlock.appendChild(reviewUser);
        reviewBlock.appendChild(reviewText);
        animeCardWatching.appendChild(reviewBlock);

        aX.addEventListener('click', ()=>{
            deleteFromList(review);
        });
    });

    data.willWatch.forEach(review =>{
        reviewBlock = document.createElement('div');
        reviewBlock.className = 'review-block';
        deleteButton = document.createElement('div');
        deleteButton.className = 'delete-button1';
        deleteButton.style.right = '0';

        aX = document.createElement('a');
        aX.id = 'delete-button1';
        aX.innerText = '✖';
        aX.value = '3';
        deleteButton.appendChild(aX);
        reviewUser = document.createElement('p');
        reviewUser.className = 'review-user';
        reviewUser.innerText = review.contentType.toUpperCase();
        reviewText = document.createElement('p');
        reviewText.className = 'review-text';
        reviewText.innerText = review.contentTitle;
        reviewBlock.appendChild(deleteButton);
        reviewBlock.appendChild(reviewUser);
        reviewBlock.appendChild(reviewText);
        animeCardWillWatch.appendChild(reviewBlock);

        aX.addEventListener('click', ()=>{
            deleteFromList(review);
        });
    });



    function deleteFromList(review){
        let cont = {
            "userId": JSON.parse(localStorage.getItem('user')).id,
            "listId": '',
            "contentId": review.contentId,
            "contentTitle": review.contentTitle,
            "contentType": review.contentType
        }

        let xhr = new XMLHttpRequest();

        xhr.open('POST', 'http://localhost:27401/api/list/del');
        xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem('user')).token);
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        xhr.send(JSON.stringify(cont));

        xhr.onload = function() {
            console.log(xhr.responseText);
            location.reload();
        };
    }
}