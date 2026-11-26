/* const alumnos = [
    ["Adrián", 9, 8, 9, 10],
    ["Iván", 2, 1, 2, 3],
    ["Luis", 0, 2, 0, 3]
];

const lista = document.getElementById("lista-alumnos");
const botonMedia = document.getElementById("botonMedia");

function calcularMedia(notas) {
    let suma = 0;
    for (let nota of notas) {
        suma += nota;
    }
    return suma / notas.length;
}

botonMedia.addEventListener("click", function () {
    lista.innerHTML = "";

    for (let alumno of alumnos) {
        const nombre = alumno[0];
        const notas = alumno.slice(1);
        const media = calcularMedia(notas);

        const li = document.createElement("li");
        li.textContent = `La media de ${nombre} es ${media.toFixed(2)}`;
        lista.appendChild(li);
    }
}); */

const alumnos = [
    { nombre: "Adrián", notas: [9, 8, 9, 10] },
    { nombre: "Iván", notas: [2, 1, 2, 3] },
    { nombre: "Luis", notas: [0, 2, 0, 3] }
];

const lista = document.getElementById("lista-alumnos");
const botonMedia = document.getElementById("botonMedia");

function calcularMedia(notas) {
   /* let suma = 0;
    for (let nota of notas) {
        suma += nota;
    }
    return suma / notas.length;
    --------------------------------------------------------------------------*/

    let suma=notas.reduce((accum ,nota) => accum +nota,1);
    return suma/notas.length;

}

function sumarPunto(notas){
    notas.map(notas => notas+1);
}

function filtrarMedia(notas){
    return notas.filter((nota => nota >=5));
}


botonMedia.addEventListener("click", function () {
    lista.innerHTML = "";

   /* for (let alumno of alumnos) {
        const media = calcularMedia(alumno.notas);
        const li = document.createElement("li");
        li.textContent = `La media de ${alumno.nombre} es ${media.toFixed(2)}`;
        lista.appendChild(li);
    }*/

    alumnos.forEach((alumno) => {
        const media = calcularMedia(alumno.notas);
        const li = document.createElement("li");
        li.textContent = `La media de ${alumno.nombre} es ${media.toFixed(2)}`;
        lista.appendChild(li);
    });
});
