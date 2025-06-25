const form = document.getElementById('formCrearUsuario');
const nombreInput = document.getElementById('nombre');
const apellidoInput = document.getElementById('apellido');
const emailInput = document.getElementById('correoElectronico');
const usuarioInput = document.getElementById('usuario');
const passwordInput = document.getElementById('password');
const confirmarPasswordInput = document.getElementById('confirmarPassword');
const metodoPagoRadios = document.getElementsByName('FormaPago');
const cardNumberInput = document.getElementById('CardNumber');
const cvvInput = document.getElementById('CVV');
const btnConfirmar = document.getElementById('btn-registrarse');

// === Funciones de validación ===
const regexLetras = /^[a-zA-Z\sÀ-ÿ]+$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexUsuario = /^[a-zA-Z0-9]{3,}$/;
const regexCVV = /^[1-9][0-9]{2}$/;

function validarNombreApellido(valor) {
  return regexLetras.test(valor.trim());
}

function validarEmail(valor) {
  return regexEmail.test(valor.trim());
}

function validarUsuario(valor) {
  return regexUsuario.test(valor.trim());
}

function validarPassword(valor) {
  if (valor.length < 8) return false;
  const letras = valor.match(/[a-zA-Z]/g) || [];
  const numeros = valor.match(/[0-9]/g) || [];
  const especiales = valor.match(/[^a-zA-Z0-9]/g) || [];
  return letras.length >= 2 && numeros.length >= 2 && especiales.length >= 2;
}

function confirmarPassword(pass, confirmar) {
  return pass === confirmar;
}

function metodoPagoSeleccionado() {
  return Array.from(metodoPagoRadios).some(radio => radio.checked);
}

function validarTarjeta(numero) {
  if (!/^\d{16}$/.test(numero)) return false;
  const digitos = numero.split('').map(Number);
  const suma = digitos.slice(0, 15).reduce((acc, val) => acc + val, 0);
  const ultimo = digitos[15];
  return (suma % 2 === 0 && ultimo % 2 === 1) || (suma % 2 === 1 && ultimo % 2 === 0);
}

function validarCVV(cvv) {
  return regexCVV.test(cvv);
}

function mostrarError(input, mensaje) {
  eliminarError(input);
  const span = document.createElement('span');
  span.className = 'error';
  span.style.color = 'red';
  span.textContent = mensaje;
  input.insertAdjacentElement('afterend', span);
}

function eliminarError(input) {
  const siguiente = input.nextElementSibling;
  if (siguiente && siguiente.classList.contains('error')) {
    siguiente.remove();
  }
}

// === Validación al enviar ===
function validarFormulario() {
  let valido = true;

  if (!validarNombreApellido(nombreInput.value)) {
    mostrarError(nombreInput, 'Solo letras y espacios.');
    valido = false;
  } else eliminarError(nombreInput);

  if (!validarNombreApellido(apellidoInput.value)) {
    mostrarError(apellidoInput, 'Solo letras y espacios.');
    valido = false;
  } else eliminarError(apellidoInput);

  if (!validarEmail(emailInput.value)) {
    mostrarError(emailInput, 'Correo inválido.');
    valido = false;
  } else eliminarError(emailInput);

  if (!validarUsuario(usuarioInput.value)) {
    mostrarError(usuarioInput, 'Mínimo 3 caracteres alfanuméricos.');
    valido = false;
  } else eliminarError(usuarioInput);

  if (!validarPassword(passwordInput.value)) {
    mostrarError(passwordInput, 'Debe tener 8+ caracteres, 2 letras, 2 números, 2 especiales.');
    valido = false;
  } else eliminarError(passwordInput);

  if (!confirmarPassword(passwordInput.value, confirmarPasswordInput.value)) {
    mostrarError(confirmarPasswordInput, 'Las contraseñas no coinciden.');
    valido = false;
  } else eliminarError(confirmarPasswordInput);

  if (!metodoPagoSeleccionado()) {
    alert('Seleccioná un método de pago.');
    valido = false;
  }

  const metodo = Array.from(metodoPagoRadios).find(r => r.checked);
  if (metodo?.value === 'Tarjeta') {
    if (!validarTarjeta(cardNumberInput.value)) {
      mostrarError(cardNumberInput, 'Tarjeta inválida.');
      valido = false;
    } else eliminarError(cardNumberInput);

    if (!validarCVV(cvvInput.value)) {
      mostrarError(cvvInput, 'CVV inválido.');
      valido = false;
    } else eliminarError(cvvInput);
  }

  return valido;
}

//validaciónpara activar el botón
function esFormularioValido() {
  return (
    validarNombreApellido(nombreInput.value) &&
    validarNombreApellido(apellidoInput.value) &&
    validarEmail(emailInput.value) &&
    validarUsuario(usuarioInput.value) &&
    validarPassword(passwordInput.value) &&
    confirmarPassword(passwordInput.value, confirmarPasswordInput.value) &&
    metodoPagoSeleccionado()
  );
}

function actualizarEstadoBoton() {
  btnConfirmar.disabled = !esFormularioValido();
}

[nombreInput, apellidoInput, emailInput, usuarioInput, passwordInput, confirmarPasswordInput, cardNumberInput, cvvInput]
  .forEach(input => input.addEventListener('input', actualizarEstadoBoton));
metodoPagoRadios.forEach(r => r.addEventListener('change', actualizarEstadoBoton));

//submit event
form.addEventListener('submit', function (e) {
  e.preventDefault(); // Evita el envío automático

  if (!validarFormulario()) {
    alert('Por favor corregí los errores antes de continuar.');
    return;
  }

  const nuevoUsuario = {
    nombre: nombreInput.value.trim(),
    apellido: apellidoInput.value.trim(),
    email: emailInput.value.trim(),
    usuario: usuarioInput.value.trim(),
    password: passwordInput.value.trim()
  };

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  // Validar si ya existe el usuario
  if (usuarios.some(u => u.usuario === nuevoUsuario.usuario)) {
    alert('El usuario ya existe. Por favor, elige otro nombre de usuario.');
    return;
  }

  usuarios.push(nuevoUsuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  alert('Usuario creado exitosamente. Ahora podés iniciar sesión.');
  window.location.href = 'index.html';
});