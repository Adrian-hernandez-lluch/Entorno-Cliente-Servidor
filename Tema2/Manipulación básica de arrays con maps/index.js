
//LISTA DE IVA

var numeros=[1,2,3];
var conIva=numeros.map(n=>n*1.21);

const listaNumeros=document.getElementById("listaNúmeros");

for(let n of conIva){
    const li=document.createElement("li");
    li.textContent=n;
    listaNumeros.appendChild(li);
}

// LISTA DE NOMBRES SIN ESPACIOS Y EN MAYÚSCULAS

const listaNombres=document.getElementById("listaNombres");
var nombres=["Adrián","Luis","Iván","Victor"];
var SepararMayusculas=nombres.map(n=>{
    n.trim()
    n.toUpperCase();
    return n
});

for(let n of SepararMayusculas){
    const li=document.createElement("li");
    li.textContent=n;
    listaNombres.appendChild(li);
}

//LISTA DE OBJETOS

var objetos=[
    {id:1,nombre:"Ratón",precio:12.00},
    {id:2,nombre:"Teclado",precio:20.00},
    {id:3,nombre:"Monitor",precio:120.00}
]

const listaObjetos=document.getElementById("listaObjetos");

var objetosMap=objetos.map(n=>`Producto: ${n.id} Nombre: ${n.nombre} Precio: ${n.precio}`);

for(let n of objetosMap){
    const li=document.createElement("li");
    li.textContent=n;
    listaObjetos.appendChild(li);
}

//LISTA DE NOTAS, FILTER

var notas=[1,2,3,4,5,6,7,8,9,10];
var filtroNotas=notas.filter(n=>n>=5);

console.log(filtroNotas);

const listaNotas=document.getElementById("listaNotas");

for(let n of filtroNotas){
    const li=document.createElement("li");
    li.textContent=n;
    listaNotas.appendChild(li);
}

//LISTA OBJETOS DE PRECIO Y STOCK

var objetos2=[
    {nombre:"Ratón",precio:12.00,stock:50},
    {nombre:"Teclado",precio:20.00,stock:30},
    {nombre:"Monitor",precio:120.00,stock:0}
]
var filtroObjetos=objetos2.filter(n => n.stock>0 && n.precio>0.00 ).map(n =>`nombre: ${n.stock} precio:${n.precio} stock:${n.stock}`);
const listaObjetos2=document.getElementById("listaObjetos2");

for(let n of filtroObjetos){
    const li=document.createElement("li");
    li.textContent=n;
    listaObjetos2.appendChild(li);
}

//LISTA CESTA COMPRA, CALCULAR TOTAL USANDO REDUCE

var compra = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var total = compra.reduce((acu, n) => acu + n, 0);
const listaCompra = document.getElementById("listaCompra");


// Pintar el total al final
const liTotal = document.createElement("li");
liTotal.textContent = "Total: " + total;
listaCompra.appendChild(liTotal);

// AGRUPAR ALUMNOS POR CURSO

var alumnos=[
    {nombre: "Victor",curso:"1º DAW"},
    {nombre: "Adrián",curso:"2º DAW"},
    {nombre: "Iván",curso:"1º DAW"},
    {nombre: "Luis",curso:"2º DAW"},
    {nombre: "Danny",curso:"1º DAW"},
    {nombre: "Robert",curso:"2º DAW"}
]

const listaAlumnos=document.getElementById("AlumnoCurso");

var agruparCurso=alumnos.reduce((acu,a)=>{
const curso=a.curso;

// Si la clave del curso no existe  en el objeto, la iniciamos como un array vacío
if(!acu[curso]){
    acu[curso]=[];
}

//Añadimos el nombre al array del curso correspondiente
    acu[curso].push(a.nombre)

// Devolvemos el acumulador actualizado
return acu;

},{})

for(let n of agruparCurso){
    const li=document.createElement("li");
    li.textContent=n;
    listaAlumnos.appendChild(li);
}
