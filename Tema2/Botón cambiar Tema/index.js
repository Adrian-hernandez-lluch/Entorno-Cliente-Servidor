let botonTema = document.getElementById("botonTema");
let fondo = document.getElementById("fondo");

if (localStorage.getItem("tema") === "claro") {
    fondo.classList.add("claro");
    fondo.classList.remove("oscuro");
} else {
    fondo.classList.add("oscuro");
    fondo.classList.remove("claro");
}

botonTema.addEventListener("click", function () {
    fondo.classList.toggle("claro");
    fondo.classList.toggle("oscuro");

    if (fondo.classList.contains("claro")) {
        localStorage.setItem("tema", "claro");
    } else {
        localStorage.setItem("tema", "oscuro");
    }
});