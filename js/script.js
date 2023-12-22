const signInBtnLink = document.querySelector('.signInBtn-link');
const signUpBtnLink = document.querySelector('.signUpBtn-link');
const wrapper = document.querySelector('.wrapper');

// Обработчик события для кнопки "Создать аккаунт"
signUpBtnLink.addEventListener('click', (event) => {
    event.preventDefault(); // Отменяем стандартное действие ссылки
    wrapper.classList.toggle('active');
});

// Обработчик события для кнопки "Войти"
signInBtnLink.addEventListener('click', () => {
    wrapper.classList.toggle('active');
});

const emailInput = document.querySelector('input[type="email"]');
const emailLabel = document.querySelector('label[for="email"]');

emailInput.addEventListener('focus', () => {
  emailLabel.classList.add('active');
});

emailInput.addEventListener('blur', () => {
  if (emailInput.value === '') {
    emailLabel.classList.remove('active');
  }
});

//
//
//JSON FORMAT FOR USER
//
//
let user = {
    id: 0,
    login: "",
    email: "",
    pass:  "",
    role:  "USER", // USER | ADMIN | CREATOR
    token: ""
}

const loginButton = document.getElementById('login-button');
loginButton.addEventListener('click',() =>{
    login = document.getElementById('login-form-login');
    user.login = login.value;
    user.pass = document.getElementById("password-form-login").value;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:27401/auth/login");
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    console.log(JSON.stringify(user));
    xhr.onload = () => {
        console.log(xhr.responseText);
    }
    xhr.send(JSON.stringify(user));
    if (login.value == 'admin'){
        localStorage.setItem('authenticated',"true");
        window.location.href = 'index.html';
    }else {
        popup();
    }
});

function popup(){
    const popupContainer = document.getElementById('popupContainer');

    // Перед показом окна устанавливаем новое положение справа
    popupContainer.style.right = '20px';

    setTimeout(function () {
        // Закрываем окно через 5 секунд
        popupContainer.style.right = '-300px'; // устанавливаем положение за пределы экрана
    }, 5000);
}