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
    if (animeId == 1){
        data = JSON.parse('{"title":"Клинок, рассекающий демонов","description":"Действие происходит в эпоху Тайсё. Ещё с древних времён ходят слухи о том, что в лесу обитают человекоподобные демоны, которые питаются людьми и ходят по ночам, ища новую жертву. Но... это же просто легенда, ведь так?..' +
            'Тандзиро Камадо — старший сын в семье, потерявший своего отца и взявший на себя заботу о своих родных. Однажды он уходит в соседний город, чтобы продать древесный уголь. Вернувшись утром, парень обнаруживает перед собой страшную картину: вся родня была зверски убита, а единственной выжившей является Нэдзуко — обращённая в демона, но пока не потерявшая всю человечность младшая сестра.' +
            'С этого момента для Тандзиро и Нэдзуко начинается долгое и опасное путешествие, в котором мальчик намерен разыскать убийцу и узнать способ исцеления для своей сестры. Но в состоянии ли дети преодолеть все трудности и вернуться домой?","image":"../img/anime/DS.jpeg","genres":["Экшен","Фэнтези"],"rating":"8.5/10"}');
    }
    else if (animeId == 2){
        data = JSON.parse('{"title":"Наруто","description":"«Это мой путь ниндзя!»' +
            '' +
            'В день рождения Наруто Узумаки на деревню под названием Коноха напал легендарный демон, Девятихвостый лис. Четвёртый Хокагэ ценой своей жизни спас деревню, запечатав демона в новорождённом Наруто, неосознанно обрекая его на жизнь в ненависти односельчан.' +
            'Несмотря на недостаток таланта во многих областях ниндзюцу, неусидчивость и задиристость, у Наруто есть мечта — стать Хокагэ, сильнейшим ниндзя в деревне. Желая признания, которого не получал, он упорно работает и тренируется вместе со своими напарниками, Саскэ Учихой и Сакурой Харуно, а также со своим наставником Какаши Хатакэ. Ему и его напарникам придётся пройти через многое по пути к своим заветным мечтам: сражения, любовь, дружба, предательство, жажда силы...","image":"../img/anime/naruto.jpeg","genres":["Экшен","Приключения"],"rating":"8.0/10"}');
    }else {
        data = JSON.parse('{"title":"Клинок, рассекающий демонов","image":"../img/anime/DS.jpeg","genres":["Экшен","Фэнтези"],"rating":"8.5/10"}');
    }

    //var data = JSON.parse('[{"title":"Клинок, рассекающий демонов","image":"../img/anime/DS.jpeg","genres":["Экшен","Фэнтези"],"rating":"8.5/10"}]');
    updateContent(data)
}

// Function to update the content of content.html
function updateContent(data) {
    // Update anime information
    document.getElementById('anime-name-content').innerText = data.title;
    document.querySelector('.anime-cover').src = data.image;
    document.querySelector('.anime-description').textContent = data.description;

    // Update anime details
    document.querySelector('.anime-rating h3').textContent = data.rating;
    document.querySelector('.anime-tags h3').textContent = data.genres.join(', ');
    //document.querySelector('.anime-studio span').textContent = data.studio;

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