const numeros = [1, 2, 3, 4, 5, 6, 7]
let numero;                         // Vble global
let intentos_restantes = 10;
let aciertos = 0;
let fallidos = 0;
let ventana = false;
let delays = Array();
let delay;
let time_init;
let time_end;

function iniciarJuego() {
    numero = obtenerNumero(numeros)
    restaurarColorBotones()
    encenderBoton(numero)
    ventana = true
    time_init = new Date(Date.now());
}

function asignar_eventos_botones_arco() {
    const lista = document.querySelectorAll(".btn_luz")
    for (const btn of lista) {
        btn.addEventListener("click", ev => {
            intentos_restantes -= 1;
            if (validar(btn.id)) {
                sumarAciertos()
                time_end = new Date(Date.now());
                delay = time_end - time_init
                delays.push(delay)
                console.log(obtenerPromedio(delays))
                console.log(delays)
                document.getElementById("span_intentos_restantes").innerHTML = `${intentos_restantes}`
                document.getElementById("span_delay_promedio").innerHTML = `${obtenerPromedio(delays)}`
            } else {
                sumarFallidos()
            }

            if (intentos_restantes > 0) {
                reiniciarJuego()
            } else {
                finalizarJuego()
            }


        })
    }
}

function validar(btn_id_apretado) {
    let len = btn_id_apretado.length
    let btn_num = Number(btn_id_apretado.substring(4, len))
    if (btn_num == numero) {
        // console.log("Acertado")
        return true
    } else {
        // console.log("Fallido")
        return false
    }
}

function encenderBoton(id) {
    let id_btn = `btn_${id}`
    let btn = document.getElementById(id_btn)
    btn.style.backgroundColor = "red"
}

function restaurarColorBotones() {
    const lista = document.querySelectorAll(".btn_luz")
    for (const btn of lista) {
        btn.style.backgroundColor = ""
    }
}

function obtenerNumero(numeros) {
    let indice = Math.floor(Math.random() * numeros.length)
    let numero = numeros[indice]
    return (numero)
}

function sumarAciertos() {
    aciertos = aciertos + 1
}

function sumarFallidos() {
    fallidos = fallidos + 1
}

function reiniciarJuego() {
    iniciarJuego()
}

function finalizarJuego() {
    restaurarColorBotones()
}

function asignar_eventos_botones_control() {
    const btn_play = document.getElementById("btn_play")
    btn_play.addEventListener("click", ev => {
        iniciarJuego()
        asignar_eventos_botones_arco()
    })
}

function obtenerPromedio(array){
    let suma = 0.0;
    let len = array.length;
    for (const num of array){
        suma = suma + num
    }
    return suma / len
}

document.getElementById("span_intentos_restantes").innerHTML = `${intentos_restantes}`
asignar_eventos_botones_control()