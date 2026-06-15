function toggleMode() { const t = document.body.getAttribute('data-theme'); document.body.setAttribute('data-theme', t === 'dark' ? '' : 'dark'); }

// GERADOR DE FOLHAS CAINDO
const container = document.getElementById('leaves-container');
for (let i = 0; i < 10; i++) {
    let l = document.createElement('span'); l.className = 'leaf-particle'; l.innerText = '🍃';
    l.style.left = Math.random() * 100 + 'vw'; l.style.animationDelay = Math.random() * 5 + 's'; container.appendChild(l);
}

// CURIOSIDADES DINÂMICAS
const facts = [
    "🚜 Sensores enterrados no solo avisam o celular do agricultor quando a terra está ficando seca, evitando o desperdício de água!",
    "🐝 As abelhas e polinizadores são responsáveis por garantir a reprodução de mais de 73% das plantas cultivadas.",
    "🌾 A rotação de culturas (mudar o tipo de planta a cada safra) quebra o ciclo de vida das pragas naturalmente, sem usar veneno.",
    "🛰️ Drones de alta resolução conseguem identificar plantas doentes antes mesmo que os olhos humanos consigam notar!"
];
function generateFact() {
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    document.getElementById('fact-display').innerText = randomFact;
}
generateFact(); // inicia com uma

// JOGO DO QUIZ
const quizItems = [
    { q: "Vantagem da rotação de culturas?", o: ["Desgastar o solo", "Quebrar ciclos de pragas e repor nutrientes"], a: 1 },
    { q: "O que é agricultura de precisão?", o: ["Uso de drones, IA e sensores", "Plantio manual sem dados"], a: 0 }
];
let quizIdx = 0, currentScore = 0;
function drawQuizQuestion() {
    document.getElementById('quiz-alert-box').style.display = 'none';
    if(quizIdx >= quizItems.length) { document.getElementById('quiz-question').innerText = "🎉 Concluído!"; document.getElementById('quiz-options-grid').innerHTML = ""; return; }
    let item = quizItems[quizIdx]; document.getElementById('quiz-progress').innerText = `Questão ${quizIdx + 1}/${quizItems.length}`; document.getElementById('quiz-question').innerText = item.q;
    let h = ""; item.o.forEach((opt, idx) => { h += `<button class="quiz-option" onclick="evalQuiz(${idx}, this)">${opt}</button>`; });
    document.getElementById('quiz-options-grid').innerHTML = h;
}
function evalQuiz(sel, el) {
    let corr = quizItems[quizIdx].a; const box = document.getElementById('quiz-alert-box');
    document.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);
    if(sel === corr) { currentScore += 10; el.classList.add('correct'); box.innerText = "Certo!"; }
    else { el.classList.add('wrong'); box.innerText = "Incorreto!"; }
    document.getElementById('quiz-points').innerText = currentScore; box.style.display = 'block';
    setTimeout(() => { quizIdx++; drawQuizQuestion(); }, 1500);
}
drawQuizQuestion();

// JOGO DO COLETOR
let pX = 50, gActive = false, colScore = 0, colTime = 30, cGLoop, cSLoop;
function shiftBasket(o) { if(!gActive) return; pX += o/4; pX = Math.max(5, Math.min(85, pX)); document.getElementById('basket-element').style.left = pX + '%'; }
function initCollectorGame() {
    document.getElementById('game-menu').style.display = 'none'; gActive = true; colScore = 0; colTime = 30;
    cGLoop = setInterval(() => { colTime--; document.getElementById('collector-timer').innerText = colTime; if(colTime<=0) endCollector(); }, 1000);
    cSLoop = setInterval(() => {
        if(!gActive) return; let it = document.createElement('div'); it.className = 'game-item'; let gd = Math.random() > 0.3;
        it.innerText = gd ? '🌱' : '⚠️'; it.style.left = (Math.random() * 80 + 10) + '%'; document.getElementById('game-arena').appendChild(it);
        let y = -40; let timer = setInterval(() => {
            if(!gActive) { clearInterval(timer); it.remove(); return; } y += 5; it.style.top = y + 'px';
            if(y > 210 && y < 235 && Math.abs(parseFloat(it.style.left) - pX) < 15) { colScore += gd ? 10 : -15; document.getElementById('collector-score').innerText = colScore; clearInterval(timer); it.remove(); }
            if(y > 260) { clearInterval(timer); it.remove(); }
        }, 25);
    }, 1200);
}
function endCollector() { gActive = false; clearInterval(cGLoop); clearInterval(cSLoop); const m = document.getElementById('game-menu'); m.innerHTML = `<h3>Fim!</h3><p>Pontos: ${colScore}</p><button class="btn btn-accent" onclick="initCollectorGame()">De novo</button>`; m.style.display = 'flex'; }

// JOGO DA MEMÓRIA SUSTENTÁVEL
const icons = ['🌱', '🌱', '☀️', '☀️', '🚜', '🚜', '🐝', '🐝'];
let flippedCards = [];
function startMemoryGame() {
    const board = document.getElementById('memory-board'); board.innerHTML = ''; flippedCards = [];
    let shuffled = icons.sort(() => Math.random() - 0.5);
    shuffled.forEach((icon, index) => {
        let card = document.createElement('div'); card.className = 'memory-card'; card.dataset.icon = icon; card.dataset.id = index; card.innerText = '?';
        card.onclick = () => flipMemoryCard(card); board.appendChild(card);
    });
}
function flipMemoryCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
        card.classList.add('flipped'); card.innerText = card.dataset.icon; flippedCards.push(card);
        if (flippedCards.length === 2) {
            setTimeout(checkMemoryMatch, 800);
        }
    }
}
function checkMemoryMatch() {
    if (flippedCards[0].dataset.icon === flippedCards[1].dataset.icon) {
        flippedCards[0].classList.add('matched'); flippedCards[1].classList.add('matched');
    } else {
        flippedCards[0].classList.remove('flipped'); flippedCards[0].innerText = '?';
        flippedCards[1].classList.remove('flipped'); flippedCards[1].innerText = '?';
    }
    flippedCards = [];
}
startMemoryGame();

// SIMULADOR DE IRRIGAÇÃO INTELIGENTE
let moisture = 50; let watering = false;
setInterval(() => {
    if (watering) { moisture += 4; if(moisture > 100) moisture = 100; } 
    else { moisture -= 2; if(moisture < 20) moisture = 20; }
    document.getElementById('moisture-val').innerText = moisture + "%";
    const feedback = document.getElementById('irrigation-feedback');
    if(moisture >= 60 && moisture <= 75) { feedback.innerText = "😊 Solo perfeito! Economizando água."; }
    else if(moisture > 75) { feedback.innerText = "🚨 Solo encharcado! Desligue a irrigação!"; }
    else { feedback.innerText = "🍂 Solo seco! Precisa de água."; }
}, 1000);
function toggleIrrigation() {
    watering = !watering; const btn = document.getElementById('irrigate-btn');
    if (watering) { btn.innerText = "DESLIGAR IRRIGAÇÃO 🛑"; btn.className = "water-btn water-on"; document.getElementById('irrigation-status').innerText = "Ligado"; } 
    else { btn.innerText = "LIGAR IRRIGAÇÃO 💦"; btn.className = "water-btn water-off"; document.getElementById('irrigation-status').innerText = "Desligado"; }
}

// SIMULADOR DE CAMPO (SLIDERS)
function runSim() {
    let t = parseInt(document.getElementById('range-tech').value), b = parseInt(document.getElementById('range-bio').value);
    document.getElementById('lbl-tech').innerText = t + "%"; document.getElementById('lbl-bio').innerText = b + "%";
    document.getElementById('badge-1').style.opacity = t >= 75 ? "1" : "0.2"; document.getElementById('badge-2').style.opacity = b >= 55 ? "1" : "0.2";
    let v = Math.min(100, Math.round((t * 0.5) + (b * 0.7))); document.getElementById('gauge-bar-fill').style.width = v + "%"; document.getElementById('gauge-value').innerText = v + "%";
    document.getElementById('sim-status-message').innerText = t >= 70 && b >= 50 ? "🏆 Sinergia Perfeita no Campo!" : "⚖️ Ajuste os níveis para melhorar os resultados.";
}
runSim();

function switchTab(e, id) { document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active')); document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active')); document.getElementById(id).classList.add('active'); e.currentTarget.classList.add('active'); }

function evalCarbon() {
    let d = parseFloat(document.getElementById('inp-diesel').value)||0, f = parseFloat(document.getElementById('inp-fert').value)||0, c = Math.round((d * 2.6) + (f * 3.4));
    document.getElementById('calc-panel').style.display = "block"; document.getElementById('calc-score-val').innerText = c;
    document.getElementById('calc-indicator').style.backgroundColor = c < 700 ? "var(--success)" : "var(--danger)";
}

function pushStickyNote() {
    let inp = document.getElementById('mural-note-text'); let txt = inp.value.trim(); if(!txt) return;
    let c = document.createElement('div'); c.className = "sticky-note"; c.style.backgroundColor = '#ffeaa7'; c.innerText = txt;
    document.getElementById('mural-canvas').appendChild(c); inp.value = "";
}
