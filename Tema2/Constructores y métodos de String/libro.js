function Libro(titulo, autor, anyo, genero) {
    this.titulo = titulo.trim();
    this.autor = autor.trim();
    this.anyo = anyo;
    this.genero = genero.trim();

    this.mostrarInfo = function() {
        return this.titulo + " - " + this.autor + " (" + this.anyo + ") · " + this.genero;
    }
}

let l1 = new Libro(" La Diamond ", " Tobillos rotos ", 1919, " Terror ");
let l2 = new Libro(" Segundo Daw ", " VicMac ", 6767, " Humor ");

let biblioteca = [];

biblioteca.push(l1);
biblioteca.push(l2);

// MOSTRAR LISTA
const botonInfo = document.getElementById("botonMostrarLista");
botonInfo.addEventListener("click", () => mostrarLista(biblioteca));

function mostrarLista(biblio) {
    const lista = document.getElementById("listaBiblioteca");
    lista.innerHTML = ""; // vaciar antes de pintar para no duplicar
    for (let libro of biblio) {
        const li = document.createElement("li");
        li.textContent = libro.mostrarInfo();
        lista.appendChild(li);
    }
}

// AÑADIR LIBRO

const botonAnyadir = document.getElementById("botonAnyadir");
botonAnyadir.addEventListener("click", anyadirLibro);

function anyadirLibro() {
    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const anio = Number(document.getElementById("anio").value);
    const genero = document.getElementById("genero").value;

    let lnuevo = new Libro(titulo, autor, anio, genero);
    biblioteca.push(lnuevo);

    mostrarLista(biblioteca); // refrescar la lista
}

// ELIMINAR POR TÍTULO

const botonEliminar = document.getElementById("botonEliminar");
botonEliminar.addEventListener("click", eliminarPorTitulo);


function eliminarPorTitulo() {
    let titulo=document.getElementById("tituloEliminar").value;
    biblioteca = biblioteca.filter(libro => libro.titulo.toLowerCase() !== titulo.toLowerCase());
}

//BUSCAR POR TÍTULO
const botonBuscar= document.getElementById("botonBuscar");
botonBuscar.addEventListener("click",burcarTitulo);


function burcarTitulo() {
    let titulo=document.getElementById("tituloBuscar").value;
    biblioteca=biblioteca.filter(libro=> libro.titulo.toLowerCase() !== titulo.toLowerCase());
}

//CALCULAR EDAD MEDIA
const botonMedia= document.getElementById("botonMedia");
botonMedia.addEventListener("click",calcularEdadMedia);

 function calcularEdadMedia() {

    /* let suma=0
     let media=0;
    for(let libro of biblioteca){
        suma+=libro.anyo
        media=suma/biblioteca.length
    }
    alert(media);
    return media;*/

     let suma=biblioteca.reduce((acu, libro) => acu + libro.anyo, 0);
     let media=suma/biblioteca.length
     alert(media);
     return media;

 }


