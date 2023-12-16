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