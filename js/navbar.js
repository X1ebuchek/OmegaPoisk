const loginButton = document.getElementById('login-button');
const closeButton = document.getElementById('close-button');
const addContentButton = document.getElementById('add-content-button');
const accountButton = document.getElementById('account-button');
const dropdown = document.getElementById('account-dropdown');
const toggle = document.getElementsByClassName('switch-container')[0];

updateAuthenticationStatus();

function updateAuthenticationStatus() {
    if (localStorage.getItem('user')){
        loginButton.style.display = 'none';
        closeButton.style.display = '';
        addContentButton.style.display = '';
        accountButton.style.display = '';
        dropdown.style.display = '';
        var role = JSON.parse(localStorage.getItem('user')).role;
        if (role === 'CREATOR' || role === 'ADMIN'){
            //localStorage.setItem('creator',false);
            toggle.style.display = '';
        }

    }else {
        loginButton.style.display = '';
        closeButton.style.display = 'none';
        addContentButton.style.display = 'none';
        accountButton.style.display = 'none';
        dropdown.style.display = 'none';
        toggle.style.display = 'none';
    }
}

function setFalseAuthenticated(){
    localStorage.clear();
}

function toggleDropdown() {
    const dropdown = document.getElementById('account-dropdown');
    dropdown.style.display = (dropdown.style.display === 'none' || dropdown.style.display === '') ? 'block' : 'none';
}
