var input=document.getElementById("nombre-usuario");
var parrafo=document.getElementById("feedback-usuario");


input.addEventListener("keyup",function () {
    var contenido=input.value;
    if(contenido.length<5){
        parrafo.innerHTML="Necesitas al menos 5 caracteres";
        parrafo.classList.add("parrafoMalo");
        parrafo.classList.remove("parrafoBueno");
    }else{
        parrafo.innerHTML="Mensaje exitoso";
        parrafo.classList.add("parrafoBueno");
    }

input.addEventListener("focus",function (){
    input.toggle("borde");
})

    input.addEventListener("blur",function (){
        input.toggle("borderOriginal");
    })
})