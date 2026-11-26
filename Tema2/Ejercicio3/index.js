const a = 5;
const b = 10;

const textoResultado = document.getElementById("resultado-calculo");
const boton1 = document.getElementById("btn-calcular");

boton1.addEventListener("click", mostrarSuma);

function suma(x, y) {
    return x + y;
}

function mostrarSuma() {
    const resultado = suma(a, b);
    textoResultado.textContent = "Resultado: " + resultado;
}