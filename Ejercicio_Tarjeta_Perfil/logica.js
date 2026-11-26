const botonDatos=document.getElementById('boton-datos');
const botonImagen=document.getElementById("boton-imagen");
const botonTema=document.getElementById("boton-tema")

const arrayNombres=["Adrián Hernández Lluch","Antonio","Victor","Danny","Iván","Luis","Robert"];
const arrayDescripciones=["desc 1","desc 2","desc 3","desc 4","desc 5","desc 6","desc 7",];
const arrayImagenes=[];

let contadorNombres=0;
let contadorDescripciones=0;

botonDatos.addEventListener('click',cambiarDatos);
botonImagen.addEventListener("click",cambiarImagen);
botonTema.addEventListener("click",cambiarTema);

var nombre=document.getElementById("nombre-usuario");
var descripcion=document.getElementById("descripcion-usuario");
var imagen=document.getElementById("foto-perfil");
var tarjeta=document.getElementById("tarjeta-perfil");


function cambiarDatos() {

    nombre.innerHTML=arrayNombres[contadorNombres];
    contadorNombres++;
    if(contadorNombres===arrayNombres.length){
        contadorNombres=0;
    }

    descripcion.innerHTML=arrayDescripciones[contadorDescripciones];
    contadorDescripciones++;
    if(contadorDescripciones===arrayDescripciones.length){
        contadorDescripciones=0;
    }



   /* if(nombre.innerHTML==="Adrián Hernández Lluch"){
        nombre.innerHTML="Antonio José Garcia";
        descripcion.innerHTML="Estusiante de DAM";
    } else{
        nombre.innerHTML="Adrián Hernández Lluch";
        descripcion.innerHTML="Estudiante de DAW";
    }*/

    console.log("Datos del perfil actualizados.");
}

function cambiarImagen() {



    if(imagen.src.includes("OIP.webp")){
        imagen.src="OIP2.webp";
    }else{
        imagen.src="OIP.webp";
    }
    console.log("la imagen está activa");
}
function cambiarTema(){


    tarjeta.classList.toggle('temaFondo');
    nombre.classList.toggle("temaLetra");
    window.alert("El tema se ha cambiado");
}