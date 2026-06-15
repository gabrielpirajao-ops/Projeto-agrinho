// CONFIGURAÇÕES GERAIS E PARTÍCULAS
const canvas = document.getElementById('particle-canvas');
const ctx = canvas?.getContext('2d');
let particles = [];

function resizeCanvas() {
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * -1 - 0.5;
    }
    update() {
        this.y += this.speedY;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        if (!ctx) return;
        ctx.fillStyle = document.documentElement.getAttribute('data-theme') === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,184,148,0.2)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 40; i++) particles.push(new Particle());
}
function animateParticles() {
    if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
    }
    requestAnimationFrame(animateParticles);
}
if (canvas) { initParticles(); animateParticles(); }

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const target = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', target);
    document.getElementById('theme-toggle').innerText = target === 'dark' ? '🌙 Escuro' : '☀️ Claro';
}

// JOGO 1: QUIZ
const quizData = [
    { q: "Qual técnica economiza mais água na agricultura?", o: ["Aspersão convencional", "Gotejamento direcionado", "Inundação de sulcos"], a: 1 },
    { q: "Qual o papel principal dos drones na lavoura?", o: ["Substituir tratores", "Mapeamento e detecção de pragas", "Espantar pássaros"], a: 1 },
    { q: "O que caracteriza a rotação de culturas?", o: ["Mudar a posição do sol", "Alternar espécies na mesma área", "Usar adubo químico"], a: 1 }
];
let currentQuizIdx = 0, quizPoints = 0;

function loadQuiz() {
    const current = quizData[currentQuizIdx];
    document.getElementById('quiz-question').innerText = current.q;
    const container = document.getElementById('quiz-options');
    container.innerHTML = '';
    current.o.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'opt-btn';
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(i);
        container.appendChild(btn);
    });
}

function checkAnswer(chosen) {
    if (chosen === quizData[currentQuizIdx].a) quizPoints += 10;
    document.getElementById('quiz-score').innerText = quizPoints;
    currentQuizIdx = (currentQuizIdx + 1) % quizData.length;
    loadQuiz();
}
loadQuiz();

// JOGO 2: DRONE
let dronePos = 50, dronePoints = 0;
function moveDrone(dir) {
    dronePos += dir === 'left' ? -15 : 15;
    dronePos = Math.max(5, Math.min(85, dronePos));
    document.getElementById('player-drone').style.left = `${dronePos}%`;
}

function spawnItem() {
    const screen = document.getElementById('drone-screen');
    if (!screen) return;
    const item = document.createElement('div');
    item.className = 'item-drop';
    item.innerText = Math.random() > 0.4 ? '🐛' : '💧';
    item.style.left = `${Math.random() * 85 + 5}%`;
    item.style.top = '0px';
    screen.appendChild(item);

    let fall = setInterval(() => {
        let top = parseInt(item.style.top) || 0;
        if (top > 150) {
            let itemLeft = parseFloat(item.style.left);
            if (Math.abs(itemLeft - dronePos) < 15) {
                dronePoints += item.innerText === '🐛' ? 15 : 5;
                document.getElementById('drone-score').innerText = dronePoints;
            }
            clearInterval(fall);
            item.remove();
        } else {
            item.style.top = `${top + 8}px`;
        }
    }, 50);
}
setInterval(spawnItem, 2500);

// JOGO 3: MEMÓRIA
const icons = ['🌱', '🚜', '☀️', '💧', '🌱', '🚜', '☀️', '💧'];
let flippedCards = [], matchedPairs = 0;

function initMemoryGame() {
    const board = document.getElementById('memory-board');
    if (!board) return;
    board.innerHTML = '';
    flippedCards = [];
    matchedPairs = 0;
    document.getElementById('memo-score').innerText = '0';
    
    let shuffled = [...icons].sort(() => Math.random() - 0.5);
    shuffled.forEach((icon, idx) => {
        const card = document.createElement('div');
        card.className = 'memo-card';
        card.dataset.icon = icon;
        card.dataset.id = idx;
        card.onclick = () => flipCard(card);
        board.appendChild(card);
    });
}

function flipCard(card) {
    if (flippedCards.length >= 2 || card.classList.contains('flipped') || card.classList.contains('matched')) return;
    card.classList.add('flipped');
    card.innerText = card.dataset.icon;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        setTimeout(() => {
            if (flippedCards[0].dataset.icon === flippedCards[1].dataset.icon) {
                flippedCards.forEach(c => c.classList.add('matched'));
                matchedPairs++;
                document.getElementById('memo-score').innerText = matchedPairs;
            } else {
                flippedCards.forEach(c => {
                    c.classList.remove('flipped');
                    c.innerText = '';
                });
            }
            flippedCards = [];
        }, 800);
    }
}
initMemoryGame();

// JOGO 4: IRRIGADOR (CORRIGIDO PARA BARRA DE LARGURA)
let soilMoistureLevel = 50, smartIrrPoints = 0, isPumpActive = false;

function togglePump() {
    isPumpActive = !isPumpActive;
    const btn = document.getElementById('pump-toggle');
    if (btn) {
        btn.innerText = isPumpActive ? "DESLIGAR VÁLVULA 🛑" : "LIGAR VÁLVULA 💦";
        btn.className = isPumpActive ? "btn-pump on" : "btn-pump";
    }
}

setInterval(() => {
    soilMoistureLevel += isPumpActive ? 6 : -4;
    soilMoistureLevel = Math.max(0, Math.min(100, soilMoistureLevel));
    
    const gauge = document.getElementById('water-fill');
    if (gauge) {
        gauge.style.width = `${soilMoistureLevel}%`;
        document.getElementById('moisture-text').innerText = `Umidade Atual: ${soilMoistureLevel}%`;
        const stateMessage = document.getElementById('pump-status');
        
        if (soilMoistureLevel >= 65 && soilMoistureLevel <= 85) {
            smartIrrPoints += 5;
            document.getElementById('irr-score').innerText = smartIrrPoints;
            stateMessage.innerText = "Status: Ideal";
            stateMessage.style.color = "#00b894";
        } else {
            stateMessage.innerText = "Status: Crítico";
            stateMessage.style.color = "#ff7675";
        }
    }
}, 800);

// JOGO 5: ECOSSISTEMA
function updateEco() {
    const t = parseInt(document.getElementById('slide-trees').value);
    const p = parseInt(document.getElementById('slide-pest').value);
    
    document.getElementById('val-trees').innerText = t;
    document.getElementById('val-pest').innerText = p;

    let balance = 100 - (Math.abs(t - 7) * 8) - (Math.abs(p - 2) * 8);
    balance = Math.max(0, Math.min(100, balance));

    document.getElementById('eco-score').innerText = `${balance}%`;
    const fill = document.getElementById('health-fill');
    fill.style.width = `${balance}%`;

    const msg = document.getElementById('health-msg');
    if (balance > 75) { msg.innerText = "Perfeito!"; msg.style.color = "#00b894"; }
    else if (balance > 45) { msg.innerText = "Instável"; msg.style.color = "#fdcb6e"; }
    else { msg.innerText = "Colapso!"; msg.style.color = "#ff7675"; }
}
updateEco();

// JOGO 6: CARBON CLICKER
let carbonTotal = 0;
function spawnTree() {
    const zone = document.getElementById('click-zone');
    if (!zone) return;
    const tree = document.createElement('div');
    tree.className = 'tree-pop';
    tree.innerText = '🌳';
    tree.style.left = `${Math.random() * 80 + 5}%`;
    tree.style.top = `${Math.random() * 60 + 10}%`;
    
    tree.onclick = () => {
        carbonTotal += 25;
        document.getElementById('carbon-val').innerText = carbonTotal;
        tree.remove();
    };
    zone.appendChild(tree);
    setTimeout(() => tree.remove(), 2000);
}
setInterval(spawnTree, 1400);

// MURAL DE RECADOS
const colors = ['yellow', 'blue'];
function addNote() {
    const input = document.getElementById('mural-input');
    if (!input || !input.value.trim()) return;

    const grid = document.getElementById('mural-grid');
    const note = document.createElement('div');
    note.className = `note ${colors[Math.floor(Math.random() * colors.length)]}`;
    note.innerText = input.value;
    
    grid.appendChild(note);
    input.value = '';
        }
