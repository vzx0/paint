let canvas = document.getElementById("canvas");
let contexto = canvas.getContext("2d");
let desenhando = false;
let corPincel = "#000000"; // Cor padrão
let desenhosAnteriores = []; // Array para armazenar estados anteriores do canvas

canvas.addEventListener("mousedown", function(event) {
    desenhando = true;
    contexto.beginPath();
    contexto.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    salvarEstadoAnterior(); // Salva o estado atual do canvas antes de iniciar um novo desenho
});

canvas.addEventListener("mousemove", function(event) {
    if (desenhando) {
        contexto.strokeStyle = corPincel;
        contexto.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        contexto.stroke();
    }
});

canvas.addEventListener("mouseup", function(event) {
    desenhando = false;
});

// Listener para atualizar a cor do pincel quando a paleta de cores é alterada
let corPincelInput = document.getElementById("corPincel");
corPincelInput.addEventListener("input", function() {
    corPincel = corPincelInput.value;
});

// Função para salvar o estado atual do canvas
function salvarEstadoAnterior() {
    let estadoAnterior = canvas.toDataURL(); // Converte o estado atual em uma imagem base64
    desenhosAnteriores.push(estadoAnterior); // Adiciona à pilha de estados anteriores
}

// Listener para desfazer a última ação de desenho com Ctrl + Z
window.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.key === "z") {
        desfazerUltimaAcao();
    }
});

// Função para desfazer a última ação de desenho
function desfazerUltimaAcao() {
    if (desenhosAnteriores.length > 0) {
        desenhosAnteriores.pop(); // Remove o último estado salvo
        limparCanvas();
        restaurarEstadoAnterior(); // Restaura o estado anterior
    }
}

// Função para limpar o canvas
function limparCanvas() {
    contexto.clearRect(0, 0, canvas.width, canvas.height);
}

// Função para restaurar o estado anterior do canvas
function restaurarEstadoAnterior() {
    if (desenhosAnteriores.length > 0) {
        let imagemAnterior = new Image();
        imagemAnterior.src = desenhosAnteriores[desenhosAnteriores.length - 1];
        imagemAnterior.onload = function() {
            contexto.drawImage(imagemAnterior, 0, 0);
        };
    }
}