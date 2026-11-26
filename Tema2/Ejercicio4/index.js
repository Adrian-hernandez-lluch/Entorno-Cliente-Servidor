var eventos=document.getElementById("Eventos");
eventos.addEventListener("mouseover",cambiarFondo);
eventos.addEventListener("mouseout",cambioOriginal);

function cambiarFondo(){
    eventos.classList.toggle("eventoFondo")
}
function cambioOriginal(){
    eventos.classList.toggle("eventoOriginal")
}