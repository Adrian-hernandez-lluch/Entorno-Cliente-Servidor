let titulo=document.getElementById("titulo");
const arrayDiasSemana=["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];

setTimeout(DiaSemana,1000);

function DiaSemana() {
    let miFecha = new Date();
    let date=miFecha.getDate()
   let dia=miFecha.getDay();
   let hora=miFecha.getHours();
   let minuto=miFecha.getMinutes();
   let segundo=miFecha.getSeconds();

    if(date<=10){date="0"+date;}
    if(hora<=10){hora="0"+hora;}
    if(minuto<=10){minuto="0"+minuto;}
    if(segundo<=10){segundo="0"+segundo;}
    titulo.innerHTML=+hora+":"+minuto+":"+segundo;
}
const bucle=setInterval(DiaSemana,1000);


