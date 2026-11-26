const usuario = {
    nombre: "Ana García",
    edad: 28,
    ciudad: "Valencia",
    hobbies: ["Leer", "Senderismo", "Fotografía"]
};
var boton1=document.getElementById("btn-mostrar-perfil");

var span1=document.getElementById("perfil-nombre");
var span2=document.getElementById("perfil-edad");
var span3=document.getElementById("perfil-ciudad");
var span4=document.getElementById("perfil-hobbies");

boton1.addEventListener("click",cambiarDatos);

function cambiarDatos(){
   /* span1.innerHTML="<span>"+usuario.nombre+"</span>"
    span2.innerHTML="<span>"+ usuario.edad +"</span>"
    span3.innerHTML="<span>"+usuario.ciudad+"</span>"
    span4.innerHTML="<span>"+usuario.hobbies+"</span>"*/

    span1.textContent=usuario.nombre;
    span2.textContent=usuario.edad;
    span3.textContent=usuario.ciudad;
    span4.textContent=usuario.hobbies;
    usuario.hobbies.sort();
    span4.textContent=usuario.hobbies.join("  ,");
}