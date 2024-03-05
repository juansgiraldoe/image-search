const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.onload = () => {
  formulario.addEventListener('submit', validarForm);
};

function validarForm(e) {
  e.preventDefault();
  
  const termino = document.querySelector('#termino').value;

  if(termino === ''){
    mostrarAlerta('No puede ir vacio.');
    return;
  }
};

function mostrarAlerta(mensaje) {
  const existeAlerta = document.querySelector('.bg-red-100');

  if (!existeAlerta) {
    const alerta = document.createElement('P');
    alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3','rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center');
    
    const alertaTitle = document.createElement('STRONG');
    alertaTitle.classList.add('font-bold', 'block');
    alertaTitle.textContent = '¡Error!';
  
    const alertaBody = document.createElement('SPAN');
    alertaBody.classList.add('block', 'sm:inline');
    alertaBody.textContent = `${mensaje}`;
  
    alerta.appendChild(alertaTitle);
    alerta.appendChild(alertaBody);
  
    formulario.appendChild(alerta);
  
    setTimeout(() => {
      alerta.remove();
    }, 2000);
  };
};