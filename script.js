function toggleMode() {
    const b = document.body;
    b.setAttribute('data-theme', b.getAttribute('data-theme') === 'dark' ? '' : 'dark');
}

// AMBIENTAÇÃO DE FOLHAS CAINDO
const parts = document.getElementById('particles');
for (let i = 0; i < 8; i++) {
    let l = document.createElement('span'); l.className = 'leaf'; l.innerText = '🍃';
    l.style.left = Math.random() * 100 + 'vw'; l.style.animationDelay = Math.random() * 6 + 's';
    parts.appendChild(l);
}

// BANCO DE CURIOSIDADES
const facts = [
    "🚜 Tratores autônomos guiados por GPS centimétrico evitam amassar plantas prontas, aumentando a colheita.",
    "🐝 Insetos polinizadores são cruciais para mais de um terço de toda a comida que consumimos no planeta.",
    "🛰️ Imagens de satélite ajudam a calcular o carbono capturado pelo solo, gerando créditos sustentáveis.",
    "🌿 Defensivos biológicos usam fungos e insetos do bem para combater pragas sem contaminar os rios!"
];
function newFact() { document.getElementById('fact-box').innerText = facts[Math.floor(Math.random() * facts.length)]; }
newFact();

// MINIGAME 1: QUIZ MASTER
const quizData = [
    {q:"Qual tecnologia economiza água jogando direto na raiz?", o:["Pivô Central Tradicional","Irrigação por Gotejamento Inteligente"], a:1},
    {q:"O que os corredores ecológicos ajudam a preservar?", o:["A movimentação e a vida da fauna silvestre","A compactação mecânica do solo"], a:0},
    {q:"Qual o benefício direto dos bioinsumos?", o:["Substituir adubos por produtos sintéticos perigosos","Controlar pragas usando a própria natureza"], a:1}
];
let qIdx = 0, points = 0;
function buildQuiz() {
    const fb = document.getElementById('qz-feedback'); fb.style.display = 'none';
    if(qIdx >= quizData.length) {
        document.getElementById('qz-quest').innerText = "🏆 Quiz Concluído com Sucesso!";
        document.getElementById('qz-opts').innerHTML = `<button class='btn btn-main' onclick='resetQuiz()'>Refazer Quiz</button>`;
        return;
    }
    document.getElementById('qz-prog').innerText = `Questão: ${qIdx+1}/${quizData.length}`;
    document.getElementById('qz-quest').innerText = quizData[qIdx].q;
    document.getElementById('qz-opts').innerHTML = quizData[qIdx].o.map((op, i) => `<button class='quiz-opt' onclick='checkQuiz(${i})'>${op}</button>`).join('');
}
function checkQuiz(idx) {
    const fb = document.getElementById('qz-feedback'); fb.style.display = 'block';
    if(idx === quizData[qIdx].a) { points += 50; fb.innerText = "✅ Correto! +50 Pontos"; fb.style.color = "var(--primary)"; }
    else { fb.innerText = "❌ Incorreto!"; fb.style.color = "var(--danger)"; }
    document.getElementById('qz-pts').innerText = points + " pts";
    qIdx++; setTimeout(buildQuiz, 1200);
}
function resetQuiz() { qIdx = 0; points = 0; document.getElementById('qz-pts').innerText = "0 pts"; buildQuiz(); }
buildQuiz();

// MINIGAME 2: COLETOR DE ALTA PRECISÃO
let basketX = 50, colPts = 0, timer = 30, tLoop, sLoop;
function move(dir) { basketX = Math.max(10, Math.min(90, basketX + dir/4)); document.getElementById('basket').style.left = basketX + '%'; }
function startCollector() {
    document.getElementById('game-over-screen').style.display = 'none';
    colPts = 0; timer = 30; document.getElementById('col-score').innerText = "0 pts";
    tLoop = setInterval(() => {
        timer--; document.getElementById('col-time').innerText = timer + "s";
        if(timer <= 0) { clearInterval(tLoop); clearInterval(sLoop); document.getElementById('game-over-screen').style.display = 'flex'; }
    }, 1000);
    sLoop = setInterval(dropItem, 900);
}
function dropItem() {
    const it = document.createElement('div'); it.className = 'item-drop';
    const good = Math.random() > 0.35; it.innerText = good ? '🌱' : '⚠️';
    let itemX = Math.random() * 80 + 10; it.style.left = itemX + '%';
    document.getElementById('arena').appendChild(it);
    let itemY = 0;
    let falling = setInterval(() => {
        itemY += 5; it.style.top = itemY + 'px';
        if(itemY > 160 && itemY < 185 && Math.abs(itemX - basketX) < 14) {
            colPts += good ? 20 : -30; document.getElementById('col-score').innerText = colPts + " pts";
            clearInterval(falling); it.remove();
        }
        if(itemY > 200) { clearInterval(falling); it.remove(); }
    }, 25);
}

// MINIGAME 3: JOGO DA MEMÓRIA
const symbols = ['🐝','🐝','🚜','🚜','🌱','🌱','☀️','☀️'];
let flipped = [];
function initMemo() {
    const board = document.getElementById('memo-board'); board.innerHTML = ''; flipped = [];
    symbols.sort(() => Math.random() - 0.5).forEach((sym) => {
        const card = document.createElement('div'); card.className = 'memo-card'; card.dataset.sym = sym; card.innerText = '?';
        card.onclick = () => {
            if(flipped.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
                card.classList.add('flipped'); card.innerText = sym; flipped.push(card);
                if(flipped.length === 2) setTimeout(evalMemo, 500);
            }
        };
        board.appendChild(card);
    });
}
function evalMemo() {
    if(flipped[0].dataset.sym === flipped[1].dataset.sym) { flipped[0].classList.add('matched'); flipped[1].classList.add('matched'); }
    else { flipped[0].classList.remove('flipped'); flipped[0].innerText = '?'; flipped[1].classList.remove('flipped'); flipped[1].innerText = '?'; }
    flipped = [];
}
initMemo();

// MINIGAME 4: SIMULADOR DE IRRIGAÇÃO ATIVA
let moisture = 50, watering = false, irrPoints = 0;
setInterval(() => {
    moisture += watering ? 6 : -4; moisture = Math.max(0, Math.min(100, moisture));
    document.getElementById('moist-val').innerText = moisture + "%";
    const msg = document.getElementById('irri-msg');
    if(moisture >= 60 && moisture <= 80) {
        irrPoints += 5; document.getElementById('irr-pts').innerText = irrPoints;
        msg.innerText = "🎯 Umidade ideal! Ganhando pontos!"; msg.style.color = "var(--primary)";
    } else {
        msg.innerText = moisture > 80 ? "🚨 Solo Inundado! Desligue!" : "🍂 Solo Seco! Ligue a água!";
        msg.style.color = "var(--danger)";
    }
}, 750);
function toggleWater() {
    watering = !watering; const btn = document.getElementById('btn-water');
    btn.innerText = watering ? "Desligar Irrigação 🛑" : "Ligar Irrigação 💦";
    btn.className = watering ? "btn-water on" : "btn-water";
}

// MINIGAME 5: EQUILÍBRIO ECOSSISTÊMICO
function updateEco() {
    let tech = parseInt(document.getElementById('slide-t').value);
    let forest = parseInt(document.getElementById('slide-f').value);
    document.getElementById('val-t').innerText = tech + "%";
    document.getElementById('val-f').innerText = forest + "%";
    
    // Cálculo de balanço real
    let health = 100 - Math.abs(tech - forest) - Math.abs(50 - (tech + forest)/2);
    health = Math.max(10, Math.round(health));
    
    document.getElementById('gauge-fill').style.width = health + "%";
    const status = document.getElementById('eco-status');
    if(health > 80) { status.innerText = "🌿 Fazenda Perfeita! Lucro e Natureza em Harmonia."; status.style.color = "var(--primary)"; }
    else if(tech > forest) { status.innerText = "⚠️ Alerta: Excesso de poluição e falta de abelhas."; status.style.color = "var(--danger)"; }
    else { status.innerText = "📉 Alerta: Pouca produção de alimentos. Risco de prejuízo."; status.style.color = "var(--secondary)"; }
}
updateEco();
