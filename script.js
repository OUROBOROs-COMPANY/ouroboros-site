// 1. Efeito de Digitação
const textElement = document.querySelector('.typing-text');
const text = "Ordem Universal de Ruptura e Obfuscação...";
let index = 0;

function typeText() {
    if (index < text.length) {
        textElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeText, 100);
    } else {
        setTimeout(() => {
            textElement.textContent = "";
            index = 0;
            typeText();
        }, 3000); // Pausa antes de reiniciar
    }
}
// Limpa o texto inicial para começar a digitar
textElement.textContent = "";
typeText();

// 2. Efeito Matrix (Chuva de código no fundo)
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+{}[]|;:,.<>?";
const fontSize = 16;
const columns = canvas.width / fontSize;

const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function drawMatrix() {
    // Fundo preto com opacidade para criar o rastro
    ctx.fillStyle = "rgba(5, 5, 5, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ffff";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 35);

// Ajusta o canvas ao redimensionar a tela
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
// --- Controle de Áudio ---
const audio = document.getElementById('bg-music');
const audioBtn = document.getElementById('audio-control');
const audioIcon = document.getElementById('audio-icon');

// Define o volume inicial (0.0 a 1.0)
audio.volume = 0.2;

let isPlaying = false;

audioBtn.addEventListener('click', () => {
    if (!isPlaying) {
        audio.play().then(() => {
            isPlaying = true;
            audioIcon.textContent = "[ 🔊 ]";
            audioBtn.classList.remove('muted');
        }).catch(error => {
            console.log("Erro ao tocar áudio:", error);
        });
    } else {
        audio.pause();
        isPlaying = false;
        audioIcon.textContent = "[ 🔇 ]";
        audioBtn.classList.add('muted');
    }
});

// Tenta tocar o áudio no primeiro clique em QUALQUER lugar do site
// (Isso contorna a regra de autoplay dos navegadores de forma limpa)
document.body.addEventListener('click', function playOnFirstClick() {
    if (!isPlaying) {
        audio.play().then(() => {
            isPlaying = true;
            audioIcon.textContent = "[ 🔊 ]";
            audioBtn.classList.remove('muted');
        }).catch(e => console.log("Autoplay bloqueado."));
    }
    // Remove o evento após o primeiro clique para não ficar tocando toda hora
    document.body.removeEventListener('click', playOnFirstClick);
}, { once: true });