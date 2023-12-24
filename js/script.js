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

    xhr.send(JSON.stringify(user));

    xhr.onload = () => {
        if (xhr.status == 400){
            popup("Неправильный логин или пароль");
        } else {
            localStorage.setItem('user',xhr.responseText);
            window.location.href = 'index.html';
        }
    }
});

const regButton = document.getElementById('register-button');
regButton.addEventListener('click',() =>{
    login = document.getElementById('register-form-login');
    user.login = login.value;
    user.pass = document.getElementById("register-form-password").value;
    user.email = document.getElementById("email").value;

    if (document.getElementById("omega").checked){
        user.role = "CREATOR";
    } else user.role = "USER";

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:27401/auth/register");
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    console.log(JSON.stringify(user));

    xhr.send(JSON.stringify(user));

    xhr.onload = () => {

        console.log(xhr.responseText);

        if (xhr.status == 400){
            popup("Такой пользователь уже существует");
        } else {
            localStorage.setItem('user',xhr.responseText);
            popup("Ура")
            window.location.href = 'index.html';
        }
    }
    // if (login.value == 'admin'){
    //     localStorage.setItem('authenticated',"true");
    //     window.location.href = 'index.html';
    // }else {
    //     popup("Такой пользователь уже существует");
    // }
});

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