const btn = document.getElementById('boton1');
const btn2 = document.getElementById('boton2');
const divbtn2 = document.getElementById('divbtn2');
const modbtn2 = document.querySelector('.button');
modbtn2.disabled = true;
divbtn2.style.opacity = 0;

const bcolores = [
    '#16A34A',
    '#F0D902',
    '#F43E30'
];

const fcolores = [
    '#FFFFFF',
    '#000000',
    '#FFFFFF',
];

const limites = [
    2,
    4,
    6
]

const randomColor = () =>{
    let number = Math.random();
    return Math.floor(number * 3);
}

let posicion = 0;

const mostrarTiempo = (minutos, segundos) =>{
    let pminutos = minutos;
    let psegundos = segundos;
    if(segundos < 10 )
       psegundos = '0' + segundos;
    if(minutos < 10 )
        pminutos = '0' + minutos; 
    document.getElementById('tiempo').innerHTML = `${pminutos}:${psegundos}`;
}

const changeColors =(minuto) =>{
    if(posicion === 0 && minuto === 0 )
    {
        document.body.style.background = bcolores[posicion];
        document.body.style.color = fcolores[posicion];
    }
    if(posicion < 3 && minuto >= limites[posicion]){
        document.body.style.backgroundColor = bcolores[posicion];
        document.body.style.color = fcolores[posicion];
        posicion += 1;
    }
}

let minutos = 0;
let segundos = 0;
const chronometro = () => {
    segundos += 1;
    let lleva = Math.floor(segundos / 60);
    minutos += lleva;
    segundos %= 60;
    console.log({segundos, lleva, minutos});
    changeColors(minutos);    
    mostrarTiempo(minutos, segundos);

}




let statusBoton = 0;
const contenidoBoton = [
    'Pausar',
    'Reanudar'
];

let llamadaChrono = null;

btn.addEventListener('click', function(event){
    // const numero = randomColor();
    // document.body.style.backgroundColor = bcolores[numero];
    // console.log("Hice algo :0 \n", numero);
    // document.body.style.color = fcolores[numero];
    const cosito = document.getElementById('boton1').textContent;
    console.log({cosito});
    if(cosito === 'Iniciar' || cosito === 'Reanudar')
    {
        if(!llamadaChrono)
            llamadaChrono = setInterval(chronometro, 1000);
            divbtn2.style.opacity = 0;
            modbtn2.disabled = true;
    }
    else if (cosito == 'Pausar'){
        clearInterval(llamadaChrono);
        llamadaChrono = null;
        divbtn2.style.opacity = 1;
        modbtn2.disabled = false;
    }
    
    document.getElementById('boton1').innerHTML = contenidoBoton[statusBoton % 2];
    statusBoton += 1;
    
});


btn2.addEventListener('click', function(event){
    clearInterval(llamadaChrono);
    llamadaChrono = null;
    posicion = segundos = minutos = 0;
    changeColors(minutos);
    mostrarTiempo(minutos,segundos);
    document.getElementById('boton1').innerHTML = 'Iniciar';
    statusBoton = 0;
    divbtn2.style.opacity = 0;
    modbtn2.disabled = true;
    
});