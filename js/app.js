document.addEventListener('DOMContentLoaded', function () {
  //objeto validador
  const email = {
    email: '',
    asunto: '',
    mensaje: '',
  };

  // Seleccionamos elementos necesarios
  const inputEmail = document.querySelector('#email');
  const inputAsunto = document.querySelector('#asunto');
  const inputMensaje = document.querySelector('#mensaje');
  const formulario = document.querySelector('#formulario');
  const btnSubmit = document.querySelector('#formulario button[type="submit"]');
  const btnReset = document.querySelector('#formulario button[type="reset"]');
  const spinner = document.querySelector('#spinner');

  // Asignar eventos
  inputEmail.addEventListener('input', validarFormulario);
  inputAsunto.addEventListener('input', validarFormulario);
  inputMensaje.addEventListener('input', validarFormulario);

  formulario.addEventListener('submit', enviarEmail);

  btnReset.addEventListener('click', function (e) {
    e.preventDefault();
    //reiniciar el objeto
    resetFormulario();
  });

  //funciones
  function enviarEmail(e) {
    e.preventDefault();
    formulario.appendChild(spinner);
    spinner.classList.add('flex');
    spinner.classList.remove('hidden');

    setTimeout(() => {
      spinner.remove()
      resetFormulario();

      //Alerta envio ok
      const alertaExito = document.createElement('p');
      alertaExito.classList.add('bg-green-500','text-white','p-2','text-center','rounded-lg','mt-10','font-bold','text-sm','uppercase');
      alertaExito.textContent = 'Mensaje enviado correctamente';
      formulario.appendChild(alertaExito);
      setTimeout(()=> {
        alertaExito.remove();
      },2000)
    }, 3000);
  }


  function validarFormulario(e) {
    
    if (e.target.value.trim() === '') {
      mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
      email[e.target.name] = '';
      comprobarCampos();
      return;
    }

    if (e.target.id === 'email' && !validarEmail(e.target.value)) {
      mostrarAlerta('El email es inválido', e.target.parentElement);
      email[e.target.name] = '';
      comprobarCampos();
      return;
    }

    limpiarAlerta(e.target.parentElement);

    //asignar los valores
    email[e.target.name] = e.target.value.trim().toLowerCase();

    // comproboar el objeto de email
    comprobarCampos();
  }

  function mostrarAlerta(message, referencia) {
    //verificar alerta existente
    const alerta = referencia.querySelector('.bg-red-600');
    if (alerta) {
      alerta.remove();
    }

    // Generar alertar HTML
    const error = document.createElement('div');
    error.textContent = message;
    error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

    //Insertar error en HTML
    referencia.appendChild(error);
  }

  function limpiarAlerta(referencia) {
    if (referencia.id === 'formulario') {
      const alerta = referencia.querySelectorAll('.bg-red-600');
      alerta.forEach((elemento) => elemento.parentNode.removeChild(elemento));
      return;
    }
    // si ya existe, la elimina
    const alerta = referencia.querySelector('.bg-red-600');
    if (alerta) {
      alerta.remove();
    }
  }

  function validarEmail(email) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const resultado = regex.test(email);

    return resultado;
  }

  function comprobarCampos() {
    if (Object.values(email).includes('')) {
      btnSubmit.classList.add('opacity-50');
      btnSubmit.disabled = true;
      return;
    }

    btnSubmit.classList.remove('opacity-50');
    btnSubmit.disabled = false;
  }

  function resetFormulario() {

    //reiniciar el objeto
    email.email = '';
    email.asunto = '';
    email.mensaje = '';
    formulario.reset();
    //console.log(e.target.parentElement.parentElement.parentElement)
    limpiarAlerta(formulario);
    comprobarCampos();
  }
});


