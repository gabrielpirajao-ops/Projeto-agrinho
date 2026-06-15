/**
 * ==========================================================================
 * AGROECOHUB PRO - ARQUITETURA DE JOGOS E INTERATIVIDADE
 * Motores independentes para cada minigame, otimizados para evitar memory leaks.
 * ==========================================================================
 */

// 1. CHAVEADOR DE AMBIENTE (TEMA GLOBAL)
function toggleTheme() {
    const rootBody = document.body;
    const activeTheme = rootBody.getAttribute('data-theme');
    const targetTheme = activeTheme === 'light' ? 'dark' : 'light';
    rootBody.setAttribute('data-theme', targetTheme);
    document.getElementById('theme-toggle').innerText = targetTheme === 'light' ? '✨ Modo Claro' : '🌑 Modo Escuro';
}

// 2. SISTEMA DE PARTÍCULAS SINTÉTICAS DE FUNDO
const particleBox = document.getElementById('particle-canvas');
if (particleBox) {
    for (let index = 0; index < 12; index++) {
        const drop = document.createElement('div');
        drop.style.position = 'absolute';
        drop.style.left = Math.random() * 100 + 'vw';
        drop.style.top = Math.random() * 100 + 'vh';
        drop.style.width = '8px';
        drop.style.height = '8px';
        drop.style.background = 'rgba(0, 184, 148, 0.3)';
        drop.style.borderRadius = '50%';
        drop.style.pointerEvents = 'none';
        particleBox.appendChild(drop);
    }
}

// 3. ENGENHO DE CURIOSIDADES CIENTÍFICAS
const agroFacts = [
    "🚜 O Plantio Direto mantém resíduos vegetais protegendo o solo, o que reduz a perda de nutrientes em até 90%.",
    "🐝 Polinizadores ativos geram ganhos produtivos de bilhões de dólares anualmente em plantações globais.",
    "🛰️ Câmeras termais acopladas em órbitas analisam o nível exato de hidratação celular das lavouras de soja.",
    "🧬 Ferramentas como o CRISPR apenas sintonizam os genes nativos da própria semente para resistirem ao estresse climático.",
    "🦠 Fungos biológicos microscópicos digerem carcaças de pragas, agindo como guardiões invisíveis da terra."
];

function updateFact() {
    const textContainer = document.getElementById('dynamic-fact');
    if (textContainer) {
        textContainer.style.transform = 'scale(0.98)';
        setTimeout(() => {
            textContainer.innerText = agroFacts[Math.floor(Math.random() * agroFacts.length)];
            textContainer.style.transform = 'scale(1)';
        }, 150);
    }
}

// 4. MOTOR DO JOGO 01: QUIZ CIENTÍFICO
const quizPool = [
    {q: "O que caracteriza a Agricultura 5.0?", o: ["Uso massivo de tração animal", "Integração total de robótica, IA e dados em nuvem", "Foco apenas em grandes plantações de monocultura"], a: 1},
    {q: "Como a Fixação Biológica de Nitrogênio (FBN) ajuda a terra?", o: ["Usando bactérias nativas para nutrir a raiz sem poluir", "Encharcando os lençóis freáticos com minerais sintéticos", "Compactando as camadas mais profundas do solo"], a: 0},
    {q: "Qual a função da rotação de culturas?", o: ["Esteticamente deixar a fazenda bonita", "Variar espécies para quebrar o ciclo de pragas e repor minerais", "Aumentar a erosão da terra de forma acelerada"], a: 1}
];
let activeQuizIndex = 0, totalQuizScore = 0;

function renderQuiz() {
    const qBox = document.getElementById('question-box');
    const oBox = document.getElementById('options-box');
    const qMsg = document.getElementById('quiz-msg');
    
    if (qMsg) qMsg.style.display = 'none';
    if (activeQuizIndex >= quizPool.length) {
        qBox.innerText = "🏆 Certificação Concluída!";
        oBox.innerHTML = `<button class='btn-primary' style='width:100%' onclick='restartQuiz()'>Refazer Avaliação</button>`;
        return;
    }
    const currentQuestion = quizPool[activeQuizIndex];
    qBox.innerText = currentQuestion.q;
    oBox.innerHTML = currentQuestion.o.map((option, idx) => `<button class='opt-btn' onclick='evalQuiz(${idx})'>${option}</button>`).join('');
    document.getElementById('quiz-p').innerText = `Questão: ${activeQuizIndex + 1}/3`;
}

function evalQuiz(chosenIdx) {
    const feedback = document.getElementById('quiz-msg');
    feedback.style.display = 'block';
    if (chosenIdx === quizPool[activeQuizIndex].a) {
        totalQuizScore += 100;
        feedback.innerText = "✅ Excelente! Resposta correta.";
        feedback.style.color = "var(--primary)";
    } else {
        feedback.innerText = "❌ Incorreto. Revise o material de apoio!";
        feedback.style.color = "var(--danger)";
    }
    document.getElementById('quiz-s').innerText = `Score: ${totalQuizScore}`;
    activeQuizIndex++;
    setTimeout(renderQuiz, 1000);
}

function restartQuiz() { activeQuizIndex = 0; totalQuizScore = 0; document.getElementById('quiz-s').innerText = "Score: 0"; renderQuiz(); }
renderQuiz();

// 5. MOTOR DO JOGO 02: COLETOR DRONE AUTÔNOMO
let dronePositionX = 50, dronePoints = 0, isGameRunning = false, remainingTime = 30, droneInterval, dropInterval;

function moveLeft() { if(isGameRunning) { dronePositionX = Math.max(8, dronePositionX - 8); updateDroneUI(); } }
function moveRight() { if(isGameRunning) { dronePositionX = Math.min(92, dronePositionX + 8); updateDroneUI(); } }
function stopMove() {} // Reservado para compatibilidade de eventos touch
function updateDroneUI() { document.getElementById('player-drone').style.left = dronePositionX + '%'; }

function initCollector() {
    isGameRunning = true; dronePoints = 0; remainingTime = 30;
    document.getElementById('start-overlay').style.display = 'none';
    document.getElementById('col-s').innerText = "Pontos: 0";
    
    droneInterval = setInterval(() => {
        remainingTime--;
        document.getElementById('col-t').innerText = `Tempo: ${remainingTime}s`;
        if(remainingTime <= 0) {
            clearInterval(droneInterval);
            clearInterval(dropInterval);
            isGameRunning = false;
            document.getElementById('start-overlay').style.display = 'flex';
        }
    }, 1000);
    dropInterval = setInterval(createFallingTarget, 800);
}

function createFallingTarget() {
    if(!isGameRunning) return;
    const target = document.createElement('div');
    const state = Math.random() > 0.4;
    target.className = 'item-drop';
    target.innerText = state ? '🌱' : '⚠️';
    let targetX = Math.random() * 80 + 10;
    target.style.left = targetX + '%';
    target.style.top = '0px';
    document.getElementById('collector-arena').appendChild(target);

    let verticalPos = 0;
    let fallbackLoop = setInterval(() => {
        verticalPos += 6;
        target.style.top = verticalPos + 'px';
        if(verticalPos > 180 && verticalPos < 210 && Math.abs(targetX - dronePositionX) < 12) {
            dronePoints += state ? 25 : -40;
            document.getElementById('col-s').innerText = `Pontos: ${dronePoints}`;
            clearInterval(fallbackLoop);
            target.remove();
        }
        if(verticalPos > 220) { clearInterval(fallbackLoop); target.remove(); }
    }, 25);
}

// 6. MOTOR DO JOGO 03: TABULEIRO DE PRÁTICAS CONSERVACIONISTAS
const memoIcons = ['🐝','🐝','🚜','🚜','🌱','🌱','🛰️','🛰️'];
let selectedCards = [];

function generateMemoryGrid() {
    const table = document.getElementById('memory-board');
    if (!table) return;
    table.innerHTML = '';
    selectedCards = [];
    
    const shuffled = [...memoIcons].sort(() => Math.random() - 0.5);
    shuffled.forEach((symbol) => {
        const itemCard = document.createElement('div');
        itemCard.className = 'memo-card';
        itemCard.dataset.symbol = symbol;
        itemCard.innerText = '?';
        
        itemCard.onclick = () => {
            if(selectedCards.length < 2 && !itemCard.classList.contains('flipped') && !itemCard.classList.contains('matched')) {
                itemCard.classList.add('flipped');
                itemCard.innerText = symbol;
                selectedCards.push(itemCard);
                if(selectedCards.length === 2) setTimeout(verifyMemoryMatch, 400);
            }
        };
        table.appendChild(itemCard);
    });
}

function verifyMemoryMatch() {
    if(selectedCards[0].dataset.symbol === selectedCards[1].dataset.symbol) {
        selectedCards[0].classList.add('matched');
        selectedCards[1].classList.add('matched');
    } else {
        selectedCards[0].classList.remove('flipped'); selectedCards[0].innerText = '?';
        selectedCards[1].classList.remove('flipped'); selectedCards[1].innerText = '?';
    }
    selectedCards = [];
}
function resetMemory() { generateMemoryGrid(); }
generateMemoryGrid();

// 7. MOTOR DO JOGO 04: REGULADOR HÍDRICO INTELIGENTE
let soilMoistureLevel = 50, isPumpActive = false, smartIrrPoints = 0;

setInterval(() => {
    soilMoistureLevel += isPumpActive ? 5 : -3;
    soilMoistureLevel = Math.max(0, Math.min(100, soilMoistureLevel));
    
    const gauge = document.getElementById('water-fill');
    if (gauge) {
        gauge.style.strokeDasharray = `${soilMoistureLevel}, 100`;
        document.getElementById('moisture-text').innerText = `${soilMoistureLevel}%`;
        const stateMessage = document.getElementById('pump-status');
        
        if(soilMoistureLevel >= 65 && soilMoistureLevel <= 85) {
            smartIrrPoints += 5;
            document.getElementById('irr-score').innerText = smartIrrPoints;
            stateMessage.style.color = "var(--primary)";
        } else {
            stateMessage.style.color = "var(--danger)";
        }
    }
}, 800);

function togglePump() {
    isPumpActive = !isPumpActive;
    const triggerBtn = document.getElementById('pump-toggle');
    triggerBtn.innerText = isPumpActive ? 'PARAR VALVULA 🛑' : 'LIGAR VALVULA 💦';
    triggerBtn.className = isPumpActive ? 'btn-pump on' : 'btn-pump';
}

// 8. MOTOR DO JOGO 05: SIMULADOR DE SINERGIA ECO
function runSim() {
    const techValue = parseInt(document.getElementById('t-slider').value);
    const forestValue = parseInt(document.getElementById('f-slider').value);
    
    document.getElementById('t-label').innerText = `${techValue}%`;
    document.getElementById('f-label').innerText = `${forestValue}%`;
    
    const operationalStability = 100 - Math.abs(techValue - forestValue);
    document.getElementById('health-fill').style.width = operationalStability + '%';
    const reportLabel = document.getElementById('health-msg');
    
    if(operationalStability > 85) { reportLabel.innerText = "💎 Sinergia Absoluta! Propriedade Sustentável."; reportLabel.style.color = "var(--primary)"; }
    else if(techValue > forestValue) { reportLabel.innerText = "🚨 Alerta: Déficit de Mata Ciliar detectado."; reportLabel.style.color = "var(--danger)"; }
    else { reportLabel.innerText = "📉 Alerta: Retorno financeiro insuficiente para o sustento."; reportLabel.style.color = "var(--secondary)"; }
}

// 9. MOTOR DO JOGO 06: CENTRAL DE SEQUESTRO DE CO2
let capturedCarbonKilos = 0, captureActive = false;

function startCarbonGame() {
    if(captureActive) return;
    captureActive = true;
    document.getElementById('btn-carbon').style.display = 'none';
    const area = document.getElementById('carbon-arena');
    
    const spawnCycle = setInterval(() => {
        const sapling = document.createElement('div');
        sapling.className = 'tree-pop';
        sapling.innerText = '🌳';
        sapling.style.left = Math.random() * 85 + 5 + '%';
        sapling.style.top = Math.random() * 65 + 15 + '%';
        
        sapling.onclick = () => {
            capturedCarbonKilos += 10;
            document.getElementById('carbon-counter').innerText = `${capturedCarbonKilos}kg CO2 Retidos`;
            sapling.remove();
        };
        area.appendChild(sapling);
        setTimeout(() => { if(sapling) sapling.remove(); }, 1200);
    }, 900);

    setTimeout(() => {
        clearInterval(spawnCycle);
        captureActive = false;
        document.getElementById('btn-carbon').style.display = 'block';
    }, 15000);
}

// 10. MURAL COLETIVO DINÂMICO
function addPostIt() {
    const userField = document.getElementById('mural-input');
    if(!userField || userField.value.trim() === "") return;
    
    const postIt = document.createElement('div');
    postIt.className = `note ${Math.random() > 0.5 ? 'yellow' : 'blue'}`;
    postIt.innerText = userField.value;
    
    const board = document.getElementById('mural-canvas');
    if (board) board.prepend(postIt);
    userField.value = "";
}

window.onload = () => { runSim(); };
