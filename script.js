/**
 * AGROECOHUB PRO - SCRIPT DE ALTA PERFORMANCE
 * Desenvolvido para máxima interatividade e fluidez.
 */

// 1. GERENCIAMENTO DE TEMA E AMBIENTE
const toggleTheme = () => {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
    document.getElementById('theme-toggle').innerText = newTheme === 'light' ? '✨ Tema Claro' : '🌑 Tema Escuro';
};

// 2. SISTEMA DE PARTÍCULAS DE FUNDO
const canvas = document.getElementById('particle-canvas');
for (let i = 0; i < 15; i++) {
    const p = document.createElement('div');
    p.style.position = 'absolute';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.top = Math.random() * 100 + 'vh';
    p.style.width = '10px';
    p.style.height = '10px';
    p.style.background = 'var(--primary)';
    p.style.borderRadius = '50%';
    p.style.opacity = '0.4';
    p.style.animation = `float ${Math.random() * 5 + 5}s infinite linear`;
    canvas.appendChild(p);
}

// 3. BANCO DE DADOS DE CURIOSIDADES
const factDB = [
    "🚜 O Brasil é líder mundial em plantio direto, técnica que preserva a umidade do solo e evita erosão.",
    "🐝 As abelhas aumentam em até 30% a produtividade da soja através da polinização natural.",
    "🛰️ Sensores de satélite podem medir o nível de clorofila das plantas a 700km de distância.",
    "🧬 A tecnologia CRISPR permite criar milho resistente à seca sem usar genes de outras espécies.",
    "🦌 Corredores ecológicos ajudam a onça-parda a transitar por fazendas, controlando javalis naturalmente."
];
const updateFact = () => {
    const box = document.getElementById('dynamic-fact');
    box.style.opacity = 0;
    setTimeout(() => {
        box.innerText = factDB[Math.floor(Math.random() * factDB.length)];
        box.style.opacity = 1;
    }, 300);
};

// 4. JOGO 1: QUIZ PROFISSIONAL
const quizQuestions = [
    {q: "O que é Agricultura de Precisão?", o: ["Plantar muito em pouco espaço", "Usar tecnologia para aplicar recursos no local exato", "Plantar apenas frutas"], a: 1},
    {q: "Como as árvores ajudam as plantações?", o: ["Dando sombra e atraindo polinizadores", "Ocupando espaço desnecessário", "Gastando água"], a: 0},
    {q: "Qual técnica evita a erosão do solo?", o: ["Arado pesado", "Queimada controlada", "Plantio Direto sobre palhada"], a: 2}
];
let qIndex = 0, qScore = 0;
const loadQuiz = () => {
    const qBox = document.getElementById('question-box');
    const oBox = document.getElementById('options-box');
    if (qIndex >= quizQuestions.length) {
        qBox.innerText = "🏆 Quiz Finalizado!";
        oBox.innerHTML = `<button class='btn-primary' onclick='resetQuiz()'>Reiniciar</button>`;
        return;
    }
    const item = quizQuestions[qIndex];
    qBox.innerText = item.q;
    oBox.innerHTML = item.o.map((opt, i) => `<button class='opt-btn' onclick='checkQuiz(${i})'>${opt}</button>`).join('');
    document.getElementById('quiz-p').innerText = `Questão: ${qIndex + 1}/3`;
};
const checkQuiz = (i) => {
    if (i === quizQuestions[qIndex].a) { qScore += 100; document.getElementById('quiz-s').innerText = `Score: ${qScore}`; }
    qIndex++; setTimeout(loadQuiz, 500);
};
const resetQuiz = () => { qIndex = 0; qScore = 0; loadQuiz(); };
loadQuiz();

// 5. JOGO 2: COLETOR DRONE (OTIMIZADO)
let droneX = 50, colScore = 0, gameActive = false, timerCount = 30;
function moveLeft() { if(!gameActive) return; droneX = Math.max(5, droneX - 5); updateDrone(); }
function moveRight() { if(!gameActive) return; droneX = Math.min(95, droneX + 5); updateDrone(); }
function updateDrone() { document.getElementById('player-drone').style.left = droneX + '%'; }
function initCollector() {
    gameActive = true; colScore = 0; timerCount = 30;
    document.getElementById('start-overlay').style.display = 'none';
    const gameLoop = setInterval(() => {
        timerCount--;
        document.getElementById('col-t').innerText = `Tempo: ${timerCount}s`;
        if(timerCount <= 0) { clearInterval(gameLoop); gameActive = false; document.getElementById('start-overlay').style.display = 'flex'; }
        spawnAgroItem();
    }, 1000);
}
function spawnAgroItem() {
    if(!gameActive) return;
    const item = document.createElement('div');
    const isGood = Math.random() > 0.3;
    item.innerText = isGood ? '🌱' : '⚠️';
    item.style.position = 'absolute';
    item.style.left = Math.random() * 90 + '%';
    item.style.top = '-20px';
    item.style.fontSize = '1.5rem';
    item.style.transition = 'top 2s linear';
    document.getElementById('collector-arena').appendChild(item);
    setTimeout(() => item.style.top = '250px', 100);
    setTimeout(() => {
        const xPos = parseFloat(item.style.left);
        if(Math.abs(xPos - droneX) < 10) {
            colScore += isGood ? 20 : -50;
            document.getElementById('col-s').innerText = `Pontos: ${colScore}`;
        }
        item.remove();
    }, 2100);
}

// 6. JOGO 4: IRRIGAÇÃO SMART
let moisture = 50, pumpOn = false, irrPoints = 0;
setInterval(() => {
    moisture += pumpOn ? 4 : -2;
    moisture = Math.max(0, Math.min(100, moisture));
    document.getElementById('water-fill').style.strokeDasharray = `${moisture}, 100`;
    document.getElementById('moisture-text').innerText = `${moisture}%`;
    if(moisture > 65 && moisture < 85) {
        irrPoints += 10;
        document.getElementById('irr-score').innerText = irrPoints;
    }
}, 800);
const togglePump = () => {
    pumpOn = !pumpOn;
    document.getElementById('pump-toggle').innerText = pumpOn ? 'PARAR BOMBA 🛑' : 'LIGAR BOMBA 💧';
    document.getElementById('pump-status').innerText = pumpOn ? 'REGANDO...' : 'DESLIGADA';
};

// 7. JOGO 5: EQUILIBRIO
const runSim = () => {
    const t = document.getElementById('t-slider').value;
    const f = document.getElementById('f-slider').value;
    document.getElementById('t-label').innerText = `${t}%`;
    document.getElementById('f-label').innerText = `${f}%`;
    const health = 100 - Math.abs(t - f);
    document.getElementById('health-fill').style.width = health + '%';
    const msg = document.getElementById('health-msg');
    if(health > 85) { msg.innerText = "💎 Sinergia Total! Produção e Vida em harmonia."; msg.style.color = "#00b894"; }
    else if(t > f) { msg.innerText = "🚨 Alerta: Excesso de tecnologia sem árvores causa pragas."; msg.style.color = "#ff7675"; }
    else { msg.innerText = "📉 Alerta: Baixa produção. A fazenda não é sustentável financeiramente."; msg.style.color = "#0984e3"; }
};

// 8. JOGO 6: CARBON CLICKER
let carbonTotal = 0;
const startCarbonGame = () => {
    document.getElementById('btn-carbon').style.display = 'none';
    const arena = document.getElementById('carbon-arena');
    const playCarbon = setInterval(() => {
        const tree = document.createElement('div');
        tree.className = 'tree-pop';
        tree.innerText = '🌳';
        tree.style.left = Math.random() * 80 + 10 + '%';
        tree.style.top = Math.random() * 60 + 20 + '%';
        tree.onclick = () => {
            carbonTotal += 5;
            document.getElementById('carbon-counter').innerText = `${carbonTotal}kg Capturados`;
            tree.remove();
        };
        arena.appendChild(tree);
        setTimeout(() => tree.remove(), 1500);
    }, 1000);
    setTimeout(() => { clearInterval(playCarbon); document.getElementById('btn-carbon').style.display = 'block'; }, 20000);
};

// 9. MURAL INTERATIVO
const addPostIt = () => {
    const input = document.getElementById('mural-input');
    if(input.value.trim() === "") return;
    const note = document.createElement('div');
    note.className = `note ${Math.random() > 0.5 ? 'yellow' : 'blue'}`;
    note.innerText = input.value;
    document.getElementById('mural-canvas').prepend(note);
    input.value = "";
};

// INICIALIZAÇÃO
window.onload = () => {
    runSim();
    initMemo(); // Função da memória opcional, mas recomendada expandir se necessário.
};

// Função básica de memória para não quebrar o HTML
function initMemo() {
    const board = document.getElementById('memory-board');
    const icons = ['🌾','🌾','🚜','🚜','🐝','🐝','🧪','🧪'];
    icons.sort(() => Math.random() - 0.5).forEach(icon => {
        const card = document.createElement('div');
        card.style.background = 'var(--accent)';
        card.style.borderRadius = '8px';
        card.style.height = '50px';
        card.style.display = 'flex';
        card.style.alignItems = 'center';
        card.style.justifyContent = 'center';
        card.style.cursor = 'pointer';
        card.innerText = '?';
        card.onclick = () => { card.innerText = icon; card.style.background = 'white'; };
        board.appendChild(card);
    });
}
function resetMemory() { document.getElementById('memory-board').innerHTML = ''; initMemo(); }
