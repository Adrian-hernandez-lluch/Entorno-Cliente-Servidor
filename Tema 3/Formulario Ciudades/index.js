// OBJETO CIUDAD
function Ciudad(ciudad, cp, habitantes) {
    this.ciudad = ciudad;
    this.cp = cp;
    this.habitantes = habitantes;
    this.mostrarInformacion = function () {
        return `${this.ciudad} (${this.cp}) - ${this.habitantes} habitantes`;
    }
}

// CÓDIGO DEL PROFESOR
// (lo copio aquí porque lo que hay dentro de <script src="index.js"> no se ejecuta)

const CLAVE_LS = "ciudades_dwec";

function revivirObjetoCiudad(arrayObj) {
    return arrayObj.map(elemento =>
        new Ciudad(
            elemento.ciudad,
            String(elemento.cp),
            Number(elemento.habitantes)
        )
    );
}

function cargarDeLocalStorage() {
    try {
        const ciudadesCadena = localStorage.getItem(CLAVE_LS);
        if (!ciudadesCadena) return [];
        const parsed = JSON.parse(ciudadesCadena);
        return revivirObjetoCiudad(parsed);
    } catch {
        return [];
    }
}

let ciudades = cargarDeLocalStorage();

// REGEX (las del enunciado)
const regexCp = /^[1-9]\d{4}$/;
const regexHabitantes = /^[1-9]\d*$/;

// ELEMENTOS HTML
const formulario = document.getElementById("formCiudades");
const inputCiudad = document.getElementById("ciudad");
const inputCp = document.getElementById("cp");
const inputHabitantes = document.getElementById("habitantes");
const listaCiudades = document.getElementById("listaCiudades");
const mensajeError = document.getElementById("error");
const botonFiltroHabitantes = document.getElementById("filtroHabitantes");
const inputFiltroHabitantes = document.getElementById("InputfiltroHabitantes");
const estadisticas = document.getElementById("estadísticas");

// STORAGE
function guardarCiudades(datos) {
    localStorage.setItem(CLAVE_LS, JSON.stringify(datos));
}

// MOSTRAR LISTA DE CIUDADES
function renderizarCiudades(datos) {
    listaCiudades.innerHTML = "";

    for (let i = 0; i < datos.length; i++) {
        const li = document.createElement("li");
        li.textContent = datos[i].mostrarInformacion();

        // Botón para eliminar la ciudad
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.addEventListener("click", function () {
            ciudades = eliminarCiudad(ciudades, datos[i].ciudad);
            guardarCiudades(ciudades);
            renderizarCiudades(ciudades);
        });

        li.appendChild(botonEliminar);
        listaCiudades.appendChild(li);
    }

    // Cada vez que se pinta la lista, se actualizan también las estadísticas
    renderizarEstadisticas(calcularEstadisticas(datos));
}

// CALCULAR ESTADÍSTICAS
function calcularEstadisticas(array) {
    let totalCiudades = array.length;
    let totalHabitantes = array.reduce((acu, c) => acu + c.habitantes, 0);

    let ciudadMasGrande = "";
    let ciudadMenosHabitantes = "";
    let promedioHabitantes = 0;

    // Si la lista está vacía no se puede buscar la mayor ni la menor
    if (array.length > 0) {
        let mayor = array.reduce((mayor, c) => c.habitantes > mayor.habitantes ? c : mayor);
        let menor = array.reduce((menor, c) => c.habitantes < menor.habitantes ? c : menor);
        ciudadMasGrande = mayor.ciudad;
        ciudadMenosHabitantes = menor.ciudad;
        promedioHabitantes = totalHabitantes / totalCiudades;
    }

    return {
        totalCiudades: totalCiudades,
        totalHabitantes: totalHabitantes,
        ciudadMasGrande: ciudadMasGrande,
        ciudadMenosHabitantes: ciudadMenosHabitantes,
        promedioHabitantes: promedioHabitantes
    };
}

// MOSTRAR ESTADÍSTICAS
function renderizarEstadisticas(objetoEstadisticas) {
    estadisticas.innerHTML = "";

    const p1 = document.createElement("p");
    p1.textContent = "Total ciudades: " + objetoEstadisticas.totalCiudades;
    estadisticas.appendChild(p1);

    const p2 = document.createElement("p");
    p2.textContent = "Total habitantes: " + objetoEstadisticas.totalHabitantes;
    estadisticas.appendChild(p2);

    const p3 = document.createElement("p");
    p3.textContent = "Ciudad más grande: " + objetoEstadisticas.ciudadMasGrande;
    estadisticas.appendChild(p3);

    const p4 = document.createElement("p");
    p4.textContent = "Ciudad con menos habitantes: " + objetoEstadisticas.ciudadMenosHabitantes;
    estadisticas.appendChild(p4);

    const p5 = document.createElement("p");
    p5.textContent = "Promedio habitantes: " + objetoEstadisticas.promedioHabitantes.toFixed(2);
    estadisticas.appendChild(p5);
}

// FORMULARIO
formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const data = new FormData(event.target);
    const ciudad = (data.get("ciudad") || "").trim();
    const cp = (data.get("cp") || "").trim();
    const habitantes = (data.get("habitantes") || "").trim();

    try {
        if (!ciudad) {
            throw new Error("Falta rellenar ciudad");
        } else if (!regexCp.test(cp)) {
            throw new Error("El CP no es válido");
        } else if (!regexHabitantes.test(habitantes)) {
            throw new Error("Los habitantes no son válidos");
        }

        mensajeError.textContent = "";

        const nueva = new Ciudad(ciudad, cp, Number(habitantes));

        ciudades.push(nueva);
        guardarCiudades(ciudades);
        renderizarCiudades(ciudades);

        inputCiudad.value = "";
        inputCp.value = "";
        inputHabitantes.value = "";

    } catch (errores) {
        mensajeError.textContent = errores.message;
    }
});

// FILTRAR POR HABITANTES
function filtrarCiudadesPorHabitantes(array, num) {
    return array.filter(c => c.habitantes >= num);
}

botonFiltroHabitantes.addEventListener("click", function (event) {
    // El botón está dentro del form: sin esto se enviaría el formulario
    event.preventDefault();

    const num = Number(inputFiltroHabitantes.value);
    const filtradas = filtrarCiudadesPorHabitantes(ciudades, num);
    renderizarCiudades(filtradas);
});

// ELIMINAR CIUDAD POR NOMBRE
function eliminarCiudad(array, nombreCiudad) {
    return array.filter(c => c.ciudad.toLowerCase() !== nombreCiudad.toLowerCase());
}

// Al cargar la página
renderizarCiudades(ciudades);