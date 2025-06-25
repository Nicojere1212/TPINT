
const btnLogin = document.getElementById('btnLogin');
const btnRecuperar = document.getElementById('btnRecuperar');
const usernameInput = document.getElementById('usuario');
const passwordInput = document.getElementById('password');
const mailInput = document.getElementById('correoElectronico');
const formLogin = document.querySelector('form[action="home.html"]');

function validarCampos() {
    userValido = usernameInput.value.trim() !== '';
    passValido = passwordInput.value.trim() !== '';

    btnLogin.disabled = !(userValido && passValido);
}

function validarCamposConEmail() {
    userValido = usernameInput.value.trim() !== '';
    emailValido = mailInput.value.trim() !== '';

    btnRecuperar.disabled = !(userValido && emailValido);
}


if (usernameInput && passwordInput && btnLogin) {
usernameInput.addEventListener('input', validarCampos);
passwordInput.addEventListener('input', validarCampos);
}


if (usernameInput && mailInput && btnRecuperar) {
    usernameInput.addEventListener('input', validarCamposConEmail);
    mailInput.addEventListener('input', validarCamposConEmail);
}


if (formLogin) {

const form = document.querySelector('form');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioIngresado = usernameInput.value.trim();
    const passwordIngresado = passwordInput.value.trim();

    const usuarioValido = usuarios.find(usuario =>
        usuario.usuario === usuarioIngresado && usuario.password === passwordIngresado
    );
    if (usuarioValido) {
        window.location.href = 'home.html';
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});
}


const formRecuperar = document.querySelector('form.recuperoForm');

if (formRecuperar) {
    formRecuperar.addEventListener('submit', function (event) {
        event.preventDefault();

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        const usuarioIngresado = usernameInput.value.trim().toLowerCase();
        const correoIngresado = mailInput.value.trim().toLowerCase();

        const usuarioExiste = usuarios.find(usuario =>
            usuario.usuario.toLowerCase() === usuarioIngresado &&
            usuario.email.toLowerCase() === correoIngresado
        );

        if (usuarioExiste) {
            alert('Correo enviado. Por favor, revisá tu bandeja de entrada.');
            window.location.href = 'index.html';
        } else {
            alert('Los datos no coinciden con ningún usuario registrado.');
        }
    });
}