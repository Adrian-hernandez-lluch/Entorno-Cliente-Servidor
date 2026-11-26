
function Tarea(nombre, prioridad) {
    this.nombre = nombre;
    this.prioridad = prioridad;
    this.mostrarTarea = function () {
        return this.nombre + " prioridad : " + this.prioridad;
    };
}

const lista = document.getElementById("lista-tareas");
const inputTarea = document.getElementById("nueva-tarea");
const inputPrioridad = document.getElementById("prioridad-tarea");
const botonAnyadir = document.getElementById("btn-anadir");
const botonEliminarUltima = document.getElementById("btn-eliminar-ultima");
const botonOrdenar = document.getElementById("btn-ordenar");

// Storage

function obtenerTareas() {
    const listaString = localStorage.getItem("lista-tareas");

    if (listaString) {
        const datos = JSON.parse(listaString);
        // JSON no guarda funciones: hay que recrear las Tareas
        // para que vuelvan a tener mostrarTarea()
        return datos.map(function (d) {
            return new Tarea(d.nombre, d.prioridad);
        });
    }

    return [
        new Tarea("Estudiar JavaScript", "alta"),
        new Tarea("Hacer la compra", "media")
    ];
}

function guardarTareas() {
    localStorage.setItem("lista-tareas", JSON.stringify(arrayTareas));
}

// Array principal
let arrayTareas = obtenerTareas();


function renderizarTareas() {
    lista.innerHTML = "";
    for (let i = 0; i < arrayTareas.length; i++) {
        const li = document.createElement("li");
        li.textContent = arrayTareas[i].mostrarTarea();
        lista.appendChild(li);
    }
}

//  Botones
botonAnyadir.addEventListener("click", function () {

    const nombreTarea = inputTarea.value.trim();
    const prioridad = inputPrioridad.value;

    if (nombreTarea) {
        arrayTareas.push(new Tarea(nombreTarea, prioridad));
        guardarTareas();
        renderizarTareas();
        inputTarea.value = "";
    }
});

botonEliminarUltima.addEventListener("click", function () {
    arrayTareas.pop();
    guardarTareas();
    renderizarTareas();
});

botonOrdenar.addEventListener("click", function () {
    arrayTareas.sort(function (a, b) {
        return a.nombre.localeCompare(b.nombre);
    });
    guardarTareas();
    renderizarTareas();
});

renderizarTareas();