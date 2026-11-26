const arrayDiasSemana=["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];

const botonDias=document.getElementById("btn-dias");
const lista=document.getElementById("lista-dias");

botonDias.addEventListener("click",recorrerSemana);

function recorrerSemana(){
    lista.innerHTML="";
    for (let i=0;i<arrayDiasSemana.length;i++){
        lista.innerHTML+="<li>"+arrayDiasSemana[i]+"</li>"
    }
}