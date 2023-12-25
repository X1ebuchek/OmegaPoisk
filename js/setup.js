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
            document.querySelector('.anime-studio h3').textContent = data.name;
        }

        //console.log(content[0].avgRating)
    };
}

// Function to update the content of content.html
function updateContent(data) {
    // Update anime information
    document.getElementById('anime-name-content').innerText = data.content.title;
    document.querySelector('.anime-cover').src = data.content.posterPath;
    document.querySelector('.anime-description').textContent = data.content.description;

    // Update anime details
    document.querySelector('.anime-rating h3').textContent = data.avgRating + " / 10";
    data.tags.forEach(genre => {
        document.querySelector('.anime-tags h3').textContent += genre.name + " ";
    });


    // Update reviews (assuming 'reviews' is an array in your data)
    //const reviewList = document.querySelector('.review-list');
    //reviewList.innerHTML = ''; // Clear existing reviews

    // data.reviews.forEach(review => {
    //     const li = document.createElement('li');
    //     li.textContent = review;
    //     reviewList.appendChild(li);
    // });
}

// Get the anime ID from the query parameter (you may need to adjust this based on your URL structure)
const urlParams = new URLSearchParams(window.location.search);
const animeId = urlParams.get('id');

// Fetch and update anime data
if (animeId) {
    fetchAnimeData(animeId);
}