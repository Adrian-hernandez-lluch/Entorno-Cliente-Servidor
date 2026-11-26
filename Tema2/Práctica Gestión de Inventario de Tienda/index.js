// OBJETO PRODUCTO
function Producto(nombre, categoria, precio) {
    this.nombre = nombre;
    this.categoria = categoria;
    this.precio = precio;
    this.mostrarProducto = function () {
        return `${this.nombre} [Categoría: ${this.categoria}] - Precio: ${this.precio}`;
    }
}

// ARRAY DE PRODUCTOS
let ListaProductos = [];

//CLAVE
const CLAVE = "inventario-almacen";

// ELEMENTOS HTML

const btnAnyadirProducto = document.getElementById("btn-anadir");
const btnEliminarPorNombre = document.getElementById("btn-eliminar-porNombre");
const btnEliminaElUltimo = document.getElementById("btn-eliminar-ultimo");
const btnFiltrarPorPrecio = document.getElementById("btnFiltrar-Por-Precio");
const btnLimpiarFiltro = document.getElementById("btnLimpiarFiltro");
const btnLimpiarFiltro2 = document.getElementById("btnLimpiarFiltro2");
const btnFiltrarPorCategoria=document.getElementById("btnFiltrarPorCategoria");

const lista = document.getElementById("lista-tareas");

const ValorTotalTexto = document.getElementById("valor-total");

const inputNombre = document.getElementById("nombre");
const inputCategoria = document.getElementById("categoria");
const inputPrecio = document.getElementById("precio");
const inputEliminarPorNombre = document.getElementById("eliminar-porNombre");
const inputFiltrarPorPrecio = document.getElementById("Filtrar-Por-Precio");
const inputFiltrarCategoria = document.getElementById("FiltrarCategoria");

// STORAGE

function obtenerProductos() {
    const ListaString = localStorage.getItem(CLAVE);
    if (ListaString) {
        const ListaPlana = JSON.parse(ListaString);
        return ListaPlana.map(ListaString => new Producto(ListaString.nombre, ListaString.categoria, ListaString.precio));
    } else {
        return [];
    }
}

function guardarProductos(datos) {
    localStorage.setItem(CLAVE, JSON.stringify(datos));
}

function renderizarProductos(ListaProductos) {

    lista.innerHTML = "";
    for (let i = 0; i < ListaProductos.length; i++) {
        const li = document.createElement("li");
        li.textContent = ListaProductos[i].mostrarProducto();
        lista.appendChild(li);
    }
    CalcularValorTotal();
}

// BOTONES
btnAnyadirProducto.addEventListener("click", function () {
    ListaProductos = obtenerProductos();
    const nombre = inputNombre.value;
    const categoria = inputCategoria.value;
    const precio = inputPrecio.value;

    ListaProductos.push(new Producto(nombre, categoria, precio));
    guardarProductos(ListaProductos);
    renderizarProductos(ListaProductos);

});

btnEliminarPorNombre.addEventListener("click", function () {
    ListaProductos = obtenerProductos();
    const nombreEliminado = inputEliminarPorNombre.value;
    const ListaProductoEliminado = ListaProductos.filter(productos => nombreEliminado.toLowerCase() !== productos.nombre.toLowerCase());
    ListaProductos = ListaProductoEliminado;
    guardarProductos(ListaProductos);
    renderizarProductos(ListaProductos);
});

btnEliminaElUltimo.addEventListener("click", function () {
    ListaProductos = obtenerProductos()
    ListaProductos.pop()
    guardarProductos(ListaProductos);
    renderizarProductos(ListaProductos);
});

function CalcularValorTotal() {
    ListaProductos = obtenerProductos();
    let acu = 0;
    for (let i = 0; i < ListaProductos.length; i++) {
        acu += Number(ListaProductos[i].precio);
    }
    ValorTotalTexto.textContent = "Valor Total del Inventario: " + acu;
}
btnFiltrarPorPrecio.addEventListener("click", function () {
    const precio=inputFiltrarPorPrecio.value;
    ListaProductos= obtenerProductos();
    let FiltroPorPrecio=ListaProductos.filter(producto => Number(producto.precio) >= Number(precio));
    renderizarProductos(FiltroPorPrecio);
});

btnLimpiarFiltro.addEventListener("click", function () {
renderizarProductos(obtenerProductos());
})

btnLimpiarFiltro2.addEventListener("click", function () {
    renderizarProductos(obtenerProductos());
})

btnFiltrarPorCategoria.addEventListener("click", function () {
    const categoria=inputFiltrarCategoria.value;
    ListaProductos= obtenerProductos();
    let FiltroPorCategoria=ListaProductos.filter(producto => producto.categoria.toLowerCase() === categoria.toLowerCase());
    renderizarProductos(FiltroPorCategoria);
})

renderizarProductos(obtenerProductos());



