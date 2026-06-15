/* ========================= */
/* AGRINHO 2026 */
/* ========================= */

let totalScore = 0;

/* ========================= */
/* ELEMENTOS */
/* ========================= */

const totalScoreElement =
document.getElementById(
"totalScore"
);

const goldScore =
document.getElementById(
"goldScore"
);

const silverScore =
document.getElementById(
"silverScore"
);

const bronzeScore =
document.getElementById(
"bronzeScore"
);

const finishModal =
document.getElementById(
"finishModal"
);

const closeModal =
document.getElementById(
"closeModal"
);

/* ========================= */
/* PONTUAÇÃO */
/* ========================= */

function addPoints(points){

totalScore += points;

if(totalScoreElement){

totalScoreElement.textContent =
totalScore;

}

updateRanking();

checkWinner();

}

function updateRanking(){

if(goldScore){

goldScore.textContent =
totalScore + " pts";

}

if(silverScore){

silverScore.textContent =
Math.max(
0,
totalScore - 10
) + " pts";

}

if(bronzeScore){

bronzeScore.textContent =
Math.max(
0,
totalScore - 20
) + " pts";

}

}

function checkWinner(){

if(totalScore >= 100){

finishModal.style.display =
"flex";

}

}

/* ========================= */
/* FECHAR MODAL */
/* ========================= */

if(closeModal){

closeModal.addEventListener(
"click",
() => {

finishModal.style.display =
"none";

}
);

}

/* ========================= */
/* JOGO 1 */
/* CAÇA AO VAZAMENTO */
/* ========================= */

const startWaterGame =
document.getElementById(
"startWaterGame"
);

const waterArea =
document.getElementById(
"waterGameArea"
);

const waterScore =
document.getElementById(
"waterScore"
);

let waterPoints = 0;

let waterTimer = null;

function createDrop(){

const drop =
document.createElement(
"div"
);

drop.innerHTML = "💧";

drop.style.fontSize = "2rem";

drop.style.cursor = "pointer";

drop.style.position =
"absolute";

drop.style.left =
Math.random() * 80 +
"%";

drop.style.top =
Math.random() * 70 +
"px";

drop.style.transition =
".3s";

drop.addEventListener(
"click",
() => {

waterPoints++;

addPoints(2);

waterScore.textContent =
"Pontuação: " +
waterPoints;

drop.remove();

}
);

waterArea.appendChild(
drop
);

setTimeout(() => {

if(
waterArea.contains(drop)
){

drop.remove();

}

},3000);

}

function startLeakGame(){

waterArea.innerHTML = "";

waterPoints = 0;

waterScore.textContent =
"Pontuação: 0";

let seconds = 20;

const timerText =
document.createElement(
"h4"
);

timerText.textContent =
"Tempo: 20";

waterArea.appendChild(
timerText
);

const spawnInterval =
setInterval(() => {

createDrop();

},700);

waterTimer =
setInterval(() => {

seconds--;

timerText.textContent =
"Tempo: " +
seconds;

if(seconds <= 0){

clearInterval(
waterTimer
);

clearInterval(
spawnInterval
);

const result =
document.createElement(
"h3"
);

result.textContent =
"Fim do jogo! +" +
(waterPoints * 2) +
" pontos";

waterArea.appendChild(
result
);

}

},1000);

}

if(startWaterGame){

startWaterGame.addEventListener(
"click",
startLeakGame
);

}

/* ========================= */
/* ANIMAÇÃO DOS CARDS */
/* ========================= */

const animatedElements =
document.querySelectorAll(
".card, .future-card, .tech-card, .idea-card, .game-card, .stat-box"
);

const observer =
new IntersectionObserver(

(entries)=>{

entries.forEach(

(entry)=>{

if(
entry.isIntersecting
){

entry.target.style.opacity =
"1";

entry.target.style.transform =
"translateY(0px)";

}

}

);

},
{
threshold:0.15
}

);

animatedElements.forEach(

(el)=>{

el.style.opacity =
"0";

el.style.transform =
"translateY(40px)";

el.style.transition =
".8s";

observer.observe(el);

}

);

console.log(
"Agrinho 2026 carregado."
);

/* ========================= */
/* JOGO 2 */
/* PLANTIO SUSTENTÁVEL */
/* ========================= */

const startPlantGame =
document.getElementById(
"startPlantGame"
);

const plantArea =
document.getElementById(
"plantGameArea"
);

const plantQuestions = [

{
question:
"Qual prática é mais sustentável?",

options:[
"Irrigação inteligente",
"Desperdício de água"
],

correct:0
},

{
question:
"O que ajuda a preservar o solo?",

options:[
"Rotação de culturas",
"Desmatamento"
],

correct:0
},

{
question:
"Qual energia é renovável?",

options:[
"Energia Solar",
"Carvão Mineral"
],

correct:0
},

{
question:
"Qual atitude ajuda o meio ambiente?",

options:[
"Reflorestamento",
"Queimadas"
],

correct:0
},

{
question:
"Qual recurso deve ser economizado?",

options:[
"Água",
"Poluição"
],

correct:0
}

];

function startPlantingGame(){

plantArea.innerHTML = "";

const randomQuestion =

plantQuestions[
Math.floor(
Math.random() *
plantQuestions.length
)
];

const title =
document.createElement(
"h4"
);

title.textContent =
randomQuestion.question;

plantArea.appendChild(
title
);

randomQuestion.options.forEach(

(option,index)=>{

const button =
document.createElement(
"button"
);

button.textContent =
option;

button.style.margin =
"10px";

button.addEventListener(
"click",
()=>{

if(
index ===
randomQuestion.correct
){

button.style.background =
"#22c55e";

addPoints(10);

plantArea.innerHTML +=
"<p>✅ Resposta correta! +10 pontos</p>";

}else{

button.style.background =
"#ef4444";

plantArea.innerHTML +=
"<p>❌ Resposta incorreta.</p>";

}

}
);

plantArea.appendChild(
button
);

}

);

}

if(startPlantGame){

startPlantGame.addEventListener(
"click",
startPlantingGame
);

}

/* ========================= */
/* JOGO 3 */
/* QUIZ AGRINHO */
/* ========================= */

const startQuiz =
document.getElementById(
"startQuiz"
);

const quizArea =
document.getElementById(
"quizArea"
);

const quizQuestions = [

{
question:
"Qual tecnologia monitora lavouras pelo céu?",

options:[
"Drone",
"Trator",
"Enxada"
],

correct:0
},

{
question:
"Qual recurso natural é essencial para a agricultura?",

options:[
"Água",
"Plástico",
"Fumaça"
],

correct:0
},

{
question:
"O que significa sustentabilidade?",

options:[
"Produzir preservando recursos",
"Desperdiçar recursos",
"Poluir mais"
],

correct:0
},

{
question:
"Qual instituição brasileira é referência em pesquisa agrícola?",

options:[
"Embrapa",
"NASA",
"FIFA"
],

correct:0
},

{
question:
"Qual energia é limpa?",

options:[
"Solar",
"Petróleo",
"Diesel"
],

correct:0
}

];

function startQuizGame(){

quizArea.innerHTML = "";

const question =

quizQuestions[
Math.floor(
Math.random() *
quizQuestions.length
)
];

const title =
document.createElement(
"h4"
);

title.textContent =
question.question;

quizArea.appendChild(
title
);

question.options.forEach(

(option,index)=>{

const button =
document.createElement(
"button"
);

button.textContent =
option;

button.style.margin =
"10px";

button.addEventListener(
"click",
()=>{

if(
index ===
question.correct
){

button.style.background =
"#22c55e";

addPoints(15);

quizArea.innerHTML +=
"<p>🎉 Correto! +15 pontos</p>";

}else{

button.style.background =
"#ef4444";

quizArea.innerHTML +=
"<p>❌ Tente novamente.</p>";

}

}
);

quizArea.appendChild(
button
);

}

);

}

if(startQuiz){

startQuiz.addEventListener(
"click",
startQuizGame
);

}

/* ========================= */
/* PARTÍCULAS EXTRAS */
/* ========================= */

function createParticle(){

const particle =
document.createElement(
"div"
);

particle.innerHTML = "🌱";

particle.style.position =
"fixed";

particle.style.left =
Math.random() * 100 +
"vw";

particle.style.bottom =
"-30px";

particle.style.fontSize =
"20px";

particle.style.opacity =
"0.4";

particle.style.pointerEvents =
"none";

particle.style.zIndex =
"2";

document.body.appendChild(
particle
);

let position = -30;

const animation =
setInterval(()=>{

position += 2;

particle.style.bottom =
position + "px";

if(
position >
window.innerHeight + 100
){

clearInterval(
animation
);

particle.remove();

}

},30);

}

setInterval(
createParticle,
3500
);

/* ========================= */
/* CONTADOR ANIMADO */
/* ========================= */

const statNumbers =
document.querySelectorAll(
".stat-box h3"
);

statNumbers.forEach(

(stat)=>{

stat.addEventListener(
"mouseenter",
()=>{

stat.style.transform =
"scale(1.1)";

}
);

stat.addEventListener(
"mouseleave",
()=>{

stat.style.transform =
"scale(1)";

}
);

}

);

/* ========================= */
/* EFEITO NOS BOTÕES */
/* ========================= */

const buttons =
document.querySelectorAll(
"button"
);

buttons.forEach(

(button)=>{

button.addEventListener(
"mouseenter",
()=>{

button.style.transform =
"translateY(-3px)";

}
);

button.addEventListener(
"mouseleave",
()=>{

button.style.transform =
"translateY(0px)";

}
);

}

);

/* ========================= */
/* SCROLL SUAVE EXTRA */
/* ========================= */

document
.querySelectorAll(
'a[href^="#"]'
)
.forEach(

(anchor)=>{

anchor.addEventListener(
"click",
function(e){

e.preventDefault();

const target =
document.querySelector(
this.getAttribute(
"href"
)
);

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

}
);

}

);

/* ========================= */
/* INICIALIZAÇÃO */
/* ========================= */

updateRanking();

console.log(
"Todos os minigames carregados."
);
