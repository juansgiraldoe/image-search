const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const paginacion = document.querySelector('#paginacion');
let paginaActual = 1;

const registros = 40;
let totalPaginas;
let iterador;

window.onload = () => {
  formulario.addEventListener('submit', validarForm);
};

function validarForm(e) {
  e.preventDefault();
  
  const termino = document.querySelector('#termino').value;
  
  if(termino === ''){
    mostrarAlerta('No puede ir vacio.');
    return;
  };
  
  buscarImagenes();
  formulario.reset();
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

async function buscarImagenes() {

  const termino = document.querySelector('#termino').value;
  const key = `42711393-64e9934e79e15f876d7d22c71`;
  const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${registros}&page=${paginaActual}`;

  try {
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();
    totalPaginas = calcularPaginas(resultado.totalHits);
    mostrarImagenes(resultado.hits);
  } catch (error) {
    console.log(error);
  };
};

//Generador para la paginación.
function *crearPaginador(total) {
  for (let index = 1; index <= total; index++) {
    yield index;
  };
};

function calcularPaginas(total) {
  return parseInt(Math.ceil(total/registros));
};

function mostrarImagenes(imagenes) {
  limpiarHtml();
  imagenes.forEach(imagen => {
    const { previewURL, likes, views, largeImageURL } = imagen
    resultado.innerHTML += `
      <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
        <div class="bg-white rounded-lg overflow-hidden">
          <img class="w-full rounded-lg py-2 px-2" src="${previewURL}">
          <div class="p-4 flex justify-start">
            <p class="font-bold">${likes} <span class="font-light">Likes</span></p> <span class="mx-2">|</span>
            <p class="font-bold">${views} <span class="font-light">Veces vista</span></p>
          </div>
          <a class="w-auto bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded-md my-2 mx-2 block" 
          href="${largeImageURL}" target="_blank" rel="noopener noreferrer">Ver imagen</a>
        </div>
      </div>
    `;
  });
  while (paginacion.firstChild) {
    paginacion.removeChild(paginacion.firstChild)
  }
  imprimirPaginas();
};

function imprimirPaginas() {
  iterador = crearPaginador(totalPaginas);
  while (true) {
    const {value, done} = iterador.next();
    if (done) return
    const btn = document.createElement('A');
    btn.href = '#';
    btn.dataset.pagina = value;
    btn.textContent = value;
    btn.classList.add('siguiente', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'font-bold', 'mb-2', 'rounded');
    btn.onclick = () => {
      paginaActual = value
      buscarImagenes();
    }

    paginacion.appendChild(btn);
  };
};

function limpiarHtml(){
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild)
  };
};