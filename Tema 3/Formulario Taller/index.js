// OBJETO VEHÍCULO
function Vehiculo(propietario, matricula, marca, incidencias, otraIncidencia, fechaEntrada) {
    this.propietario = propietario;
    this.matricula = matricula;
    this.marca = marca;
    this.incidencias = incidencias;
    this.otraIncidencia = otraIncidencia;
    this.fechaEntrada = fechaEntrada;
    this.mostrarVehiculo = function () {
        return `${this.matricula} - ${this.marca}`;
    }
}

//CLAVE
const CLAVE = "Taller";

// STORAGE

function obtenerVehiculos() {
    const ListaString = localStorage.getItem(CLAVE);
    if (ListaString) {
        const ListaPlana = JSON.parse(ListaString);
        return ListaPlana.map(v => new Vehiculo(v.propietario, v.matricula, v.marca, v.incidencias, v.otraIncidencia, v.fechaEntrada));
    } else {
        return [];
    }
}

function guardarVehiculos(datos) {
    localStorage.setItem(CLAVE, JSON.stringify(datos));
}

// LISTA VEHÍCULOS
let ListaVehiculos = obtenerVehiculos();

// ELEMENTOS HTML

const formulario = document.getElementById("formulario");
const CampOtraMarca = document.getElementById("campoOtraMarca");
const selectMarca = document.getElementById("marca");
const propietario = document.getElementById("propietario");
const matricula = document.getElementById("matricula");
const otraMarca = document.getElementById("otraMarca");
const checkOtros = document.getElementById("checkOtros");
const CampOtraIncidencia = document.getElementById("campoOtraIncidencia");
const otraIncidencia = document.getElementById("otraIncidencia");
const mensaje = document.getElementById("mensajeError");
const listaCoches = document.getElementById("listaCoches");
const contador = document.getElementById("contador");
const filtroMarca = document.getElementById("filtroMarca");
const filtroMatricula = document.getElementById("filtroMatricula");

CampOtraMarca.style.display = "none";
CampOtraIncidencia.style.display = "none";

selectMarca.addEventListener("change", function () {
    if (selectMarca.value === "otros") {
        CampOtraMarca.style.display = "block";
    } else {
        CampOtraMarca.style.display = "none";
        otraMarca.value = "";
    }
});

checkOtros.addEventListener("change", function () {
    if (CampOtraIncidencia.style.display === "none") {
        CampOtraIncidencia.style.display = "block";
    } else {
        CampOtraIncidencia.style.display = "none";
        otraIncidencia.value = "";
    }
});

// FECHA (igual que en el Ejercicio Contador)

function obtenerFecha() {
    let miFecha = new Date();
    let dia = miFecha.getDate();
    let mes = miFecha.getMonth() + 1;
    let anyo = miFecha.getFullYear();
    let hora = miFecha.getHours();
    let minuto = miFecha.getMinutes();

    if (dia < 10) { dia = "0" + dia; }
    if (mes < 10) { mes = "0" + mes; }
    if (hora < 10) { hora = "0" + hora; }
    if (minuto < 10) { minuto = "0" + minuto; }

    return dia + "/" + mes + "/" + anyo + " " + hora + ":" + minuto;
}

// PINTAR LA LISTA

function crearTarjeta(vehiculo) {
    const tarjeta = document.createElement("div");
    tarjeta.className = "coche";

    const titulo = document.createElement("h3");
    titulo.textContent = vehiculo.mostrarVehiculo();
    tarjeta.appendChild(titulo);

    const prop = document.createElement("p");
    prop.textContent = "Propietario: " + vehiculo.propietario;
    tarjeta.appendChild(prop);

    let textoIncidencias = vehiculo.incidencias.join(", ");
    if (vehiculo.otraIncidencia !== "") {
        textoIncidencias = textoIncidencias + " (" + vehiculo.otraIncidencia + ")";
    }
    const inc = document.createElement("p");
    inc.textContent = "Incidencias: " + textoIncidencias;
    tarjeta.appendChild(inc);

    const fecha = document.createElement("p");
    fecha.textContent = "Entrada: " + vehiculo.fechaEntrada;
    tarjeta.appendChild(fecha);

    // FASE 5: BOTÓN ELIMINAR
    const botonEliminar = document.createElement("button");
    botonEliminar.className = "btn-eliminar";
    botonEliminar.textContent = "🗑 Eliminar";
    botonEliminar.addEventListener("click", function () {
        eliminarVehiculo(vehiculo.matricula);
    });
    tarjeta.appendChild(botonEliminar);

    return tarjeta;
}

function renderizarVehiculos(ListaVehiculos) {

    listaCoches.innerHTML = "";

    if (ListaVehiculos.length === 0) {
        listaCoches.innerHTML = '<p class="vacio">No hay vehículos registrados.</p>';
    }

    for (let i = 0; i < ListaVehiculos.length; i++) {
        listaCoches.appendChild(crearTarjeta(ListaVehiculos[i]));
    }

    // Cuenta TODOS los coches, aunque haya un filtro puesto
    contador.textContent = obtenerVehiculos().length;
}

// FORMULARIO

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const data = new FormData(event.target);
    const incidencias = data.getAll("incidencias[]");
    const hayOtros = incidencias.filter(i => i === "otros").length > 0;

    try {

        if (!(data.get("propietario") || "").trim()) {
            throw new Error("Falta el propietario");
        } else if (!(data.get("matricula") || "").trim()) {
            throw new Error("Falta la matrícula");
        } else if (!data.get("marca")) {
            throw new Error("Falta la marca");
        } else if (data.get("marca") === "otros" && !(data.get("otraMarca") || "").trim()) {
            throw new Error("Falta la especificación de marca");
        } else if (incidencias.length === 0) {
            throw new Error("Falta la/las incidencias");
        } else if (hayOtros && !(data.get("otraIncidencia") || "").trim()) {
            throw new Error("Describe la incidencia de 'Otros'");
        }

        mensaje.textContent = "";

        let marca = data.get("marca");
        if (marca === "otros") {
            marca = data.get("otraMarca").trim();
        }

        const nuevo = new Vehiculo(
            data.get("propietario").trim(),
            data.get("matricula").trim().toUpperCase(),
            marca,
            incidencias,
            (data.get("otraIncidencia") || "").trim(),
            obtenerFecha()
        );

        // FASE 6: antes del push comprobarás si la matrícula ya existe

        ListaVehiculos = obtenerVehiculos();
        ListaVehiculos.push(nuevo);
        guardarVehiculos(ListaVehiculos);
        renderizarVehiculos(ListaVehiculos);
        filtroMarca.value = "todas";
        filtroMatricula.value = "";

        // Vaciar los campos de texto
        propietario.value = "";
        matricula.value = "";

    } catch (errores) {
        mensaje.textContent = errores.message;
    }
});

// FILTROS (marca y matrícula a la vez)

function aplicarFiltros() {
    const marca = filtroMarca.value;
    const textoMatricula = filtroMatricula.value.trim().toUpperCase();

    ListaVehiculos = obtenerVehiculos();

    if (marca !== "todas") {
        ListaVehiculos = ListaVehiculos.filter(v => v.marca === marca);
    }

    if (textoMatricula !== "") {
        ListaVehiculos = ListaVehiculos.filter(v => v.matricula.includes(textoMatricula));
    }

    renderizarVehiculos(ListaVehiculos);
}

filtroMarca.addEventListener("change", aplicarFiltros);

// Se filtra mientras se escribe (como el Validador en Tiempo Real)
filtroMatricula.addEventListener("keyup", aplicarFiltros);

// ELIMINAR VEHÍCULO (como "eliminar por nombre" del Inventario)

function eliminarVehiculo(matriculaEliminar) {
    let todos = obtenerVehiculos();
    todos = todos.filter(v => v.matricula !== matriculaEliminar);
    guardarVehiculos(todos);
    aplicarFiltros();   // vuelve a pintar respetando los filtros que haya puestos
}


renderizarVehiculos(ListaVehiculos);