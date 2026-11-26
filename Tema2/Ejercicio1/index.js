var ahora = new Date();
var v = ahora.getHours();
var minutos = ahora.getMinutes();

var hora = document.getElementById("hora");
hora.innerHTML = v + ":" + (minutos < 10 ? "0" + minutos : minutos);

var mensaje = document.getElementById("saludo-dinamico");

if (v < 12) {
    alert("hola")
    mensaje.innerHTML = "Buenos días";
} else if (v < 18) {
    mensaje.innerHTML = "Buenas tardes";
} else {
    mensaje.innerHTML = "Buenas noches";
}