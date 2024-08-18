const alfabeto = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
    "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
]

const inputOriginal = document.getElementById('inputOriginal');
const cifrador = document.getElementById('cifrador');
const resultado = document.getElementById('resultado');
const rango = document.getElementById('rango');

const shifMessage = () =>{
    const wordArray = [...inputOriginal.value.toUpperCase()]
    printChar(0, wordArray)
}

const printChar = (currentLetra, wordArray) => {
    if(wordArray.length === currentLetra) return;
    inputOriginal.value = inputOriginal.value.substring(1);
    const spanCharacter = document.createElement("span");
    resultado.appendChild(spanCharacter);
    animateCharacter(spanCharacter)
    .then(() => {
        const characterSinCodificar = wordArray[currentLetra];
        spanCharacter.innerHTML = alfabeto.includes(characterSinCodificar) ?
            alfabeto[(alfabeto.indexOf(characterSinCodificar) + parseInt(rango.value)) %alfabeto.length ] :
            characterSinCodificar;
            printChar(currentLetra + 1, wordArray);
    })
}

const animateCharacter = spanCharacter =>{
    let cambiosDeLetra = 0;
    return new Promise (res =>{
        const intervalo = setInterval(()=>{
            spanCharacter.innerHTML = alfabeto[Math.floor(Math.random() * alfabeto.length)]
            cambiosDeLetra++;
            if(cambiosDeLetra === 20){
                clearInterval(intervalo);
                res();
            }
        },10)
    })
}


const sumbit = e =>{
    e.preventDefault();
    resultado.innerHTML = '';
    shifMessage();
}

cifrador.onsubmit = sumbit;