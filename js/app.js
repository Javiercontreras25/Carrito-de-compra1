//variables

const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos  = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
// listeners

cargarEventListeners();

function cargarEventListeners() {
    //dispara cuando se presiona agregar carrito
    cursos.addEventListener('click', comprarCurso);
    //cuando se elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    //al vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    //Al cargar el documento, mostrar LocalStorage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}

//funciones
//funcion que añade el curso al carrito

function comprarCurso(e) {
    e.preventDefault();
    //delegation para agregar-carrito
    if(e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;
        // enviamos el curso seleccionado para tomar sus datos
        leerDatosCurso(curso);
    }
}

//lee los datos del curso
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoCurso);
}
//muestra  el curso seleccionado en el carrito

function insertarCarrito(curso) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
             <img src="${curso.imagen}">
        </td>
        <td>${curso.titulo} </td>
        <td>${curso.precio} </td>
        <td>  
            <a href="#" class="borrar-curso" data-id="${curso.id}">x</a>
        </td>
   `;
    listaCursos.appendChild(row);
    guardarCursoLocalStorage(curso);
}

function eliminarCurso(e) {
    e.preventDefault();

    let curso,
       cursoId;

    if (e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');
        
    }

    eliminarCursoLocalStorage(cursoId);
}

function vaciarCarrito () {
    listaCursos.innerHTML = '';
}



//almacena  cursos en el carrito  al local storage

function guardarCursoLocalStorage(curso) {
 let cursos;

 // toma el valor de un arreglo con datos de ls o vacío
 cursos = obtenerCursosLocalStorage();

 // el curso  seleccionado se agrega  al arreglo
 cursos.push(curso);
 localStorage.setItem('cursos', JSON.stringify(cursos));
}


//comprueba que haya elementos en el local storage
function obtenerCursosLocalStorage(curso) {
    let cursosLs;

    //comprobamos si hay algo en local storage
    if(localStorage.getItem('cursos')== null) {
        cursosLs = []
    } else {
        cursosLs = JSON.parse( localStorage.getItem('cursos') );
    }
    return cursosLs;
}

//imprime los cursos de local storage en el carrito

function leerLocalStorage() {
    let cursoLS;
    cursoLS = obtenerCursosLocalStorage();
    
    cursoLS.forEach(function(curso){
        //construir el template
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                 <img src="${curso.imagen}">
            </td>
            <td>${curso.titulo} </td>
            <td>${curso.precio} </td>
            <td>  
                <a href="#" class="borrar-curso" data-id="${curso.id}">x</a>
            </td>
       `;
        listaCursos.appendChild(row);
    });

}


//eliminar el curso por el id en localStorage 


function eliminarCursoLocalStorage(curso) {
   let cursosLS;

   console.log(curso);
   cursosLS = obtenerCursosLocalStorage();

   cursosLS.forEach(function(cursoLS,index){
     if (cursoLS.id == curso) {
        cursosLS.splice(index, 1);
     }
   });
   localStorage.setItem('cursos', JSON.stringify(cursosLS));
}