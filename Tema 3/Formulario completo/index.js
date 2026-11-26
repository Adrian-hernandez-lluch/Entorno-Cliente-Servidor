
document.getElementById("formulario").addEventListener("submit", function (event) {
    event.preventDefault();

    const  data= new FormData(event.target);
    const mensaje = document.getElementById("mensajeError");

    try {
        if (!(data.get("nombre") || "").trim()) {
            throw new Error("El nombre está vacío");
        }

        if (!(data.get("email") || "").trim()) {
            throw new Error("El correo está vacío");
        }

        if (!(data.get("modalidad") || "").trim()) {
            throw new Error("La modalidad está vacío");
        }

        if (data.getAll("turnos[]").length===0) {
            throw new Error("No has elegido ninún turno ");
        }

        if (data.getAll("cursos[]").length===0) {
            throw new Error("No has elegido ningún curso");
        }

        if (!(data.get("comentarios") || "").trim()) {
            throw new Error("El comentario está vacío");
        }

        if (!data.has("condiciones")) {
            throw new Error("Selecciona las condiciones");
        }

        if (!data.has("newsletter")) {
            throw new Error("Selecciona las newsletters");
        }
    }catch (errores){
        mensaje.textContent = errores.message;
    }
});