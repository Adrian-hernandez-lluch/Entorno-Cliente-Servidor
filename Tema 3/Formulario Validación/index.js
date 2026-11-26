const regexNumerico = /^\d+$/;
const regexCorreo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const regexNombre=/^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/;
const regexDigitos=/^\d{5}$/;

// Formulario del correo
document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();

    const correo = document.getElementById("correo").value.trim();
    const resultado = document.getElementById("resultado");

    try {
        if (correo === "") {
            throw new Error("El correo está vacío");
        } else if (!regexCorreo.test(correo)) {
            throw new Error("El correo no es válido");
        }
        resultado.textContent = `Correo válido: ${correo}`;
        return true;

    } catch (error) {
        resultado.textContent = error.message;
        return false;
    }
});

// Formulario de la edad
document.getElementById("form2").addEventListener("submit", function (event) {
    event.preventDefault();

    const edad = document.getElementById("edad").value.trim();
    const resultado2 = document.getElementById("resultado2");

    try {
        if (edad === "") {
            throw new Error("La edad está vacía");
        } else if (!regexNumerico.test(edad)) {
            throw new Error("La edad debe ser un número entero");
        } else if (Number(edad) <= 0) {
            throw new Error("La edad debe ser positiva");
        }
        resultado2.textContent = `Edad válida: ${edad} años.`;
        return true;

    } catch (error) {
        resultado2.textContent = error.message;
        return false;
    }
});

// Formulario del nombre
document.getElementById("form3").addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const resultado3 = document.getElementById("resultado3");

    try{
        if (nombre === "") {
            throw new Error("El nombre no debe estar vacío");
        }else if(!regexNombre.test(nombre)) {
            throw new Error("El nombre no es válido");
        }else if(nombre<3) {
            throw new Error("El nombre no tiene más de 3 dígitos");
        }
        resultado3.textContent = `El nombre ${nombre} es válido`;
        return true;
    }catch (error) {
        resultado3.textContent = error.message;
        return false;
    }

});