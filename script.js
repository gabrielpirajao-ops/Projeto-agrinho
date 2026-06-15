// =========================
// AGRINHO 2026
// SCRIPT PRINCIPAL
// =========================

let waterScore = 0;
let gameRunning = false;

// =========================
// BOTÃO EXPLORAR
// =========================

function rolarParaSobre() {
    document
        .getElementById("sobre")
        .scrollIntoView({
            behavior: "smooth"
        });
}

// =========================
// JOGO 1 - ECONOMIA DE ÁGUA
// =========================

function startWaterGame() {

    if (gameRunning) {
        alert("O jogo já está acontecendo!");
        return;
    }

    gameRunning = true;

    waterScore = 0;

    document.getElementById(
        "waterScore"
    ).innerText =
        "Pontos: 0";

    const area =
        document.getElementById(
            "waterZone"
        );

    area.innerHTML = "";

    let tempo = 15;

    alert(
        "Clique nas gotas 💧 durante 15 segundos!"
    );

    const criador =
        setInterval(() => {

            const gota =
                document.createElement(
                    "div"
                );

            gota.classList.add(
                "drop"
            );

            gota.innerHTML = "💧";

            gota.style.left =
                Math.random() * 90 +
                "%";

            gota.style.top =
                Math.random() * 70 +
                "%";

            gota.onclick = () => {

                waterScore++;

                document.getElementById(
                    "waterScore"
                ).innerText =
                    "Pontos: " +
                    waterScore;

                gota.remove();
            };

            area.appendChild(gota);

            setTimeout(() => {

                if (
                    area.contains(gota)
                ) {
                    gota.remove();
                }

            }, 3000);

        }, 500);

    const contador =
        setInterval(() => {

            tempo--;

            if (tempo <= 0) {

                clearInterval(
                    criador
                );

                clearInterval(
                    contador
                );

                gameRunning =
                    false;

                alert(
                    "Fim do jogo!\nVocê economizou " +
                    waterScore +
                    " litros simbólicos de água."
                );
            }

        }, 1000);
}

// =========================
// JOGO 2 - PLANTIO
// =========================

function plantGame() {

    const opcoes = [

        {
            texto:
                "Usar irrigação inteligente",
            correta: true
        },

        {
            texto:
                "Desperdiçar água",
            correta: false
        },

        {
            texto:
                "Plantar árvores",
            correta: true
        },

        {
            texto:
                "Poluir rios",
            correta: false
        },

        {
            texto:
                "Usar biofertilizantes",
            correta: true
        },

        {
            texto:
                "Desmatar áreas protegidas",
            correta: false
        }

    ];

    const sorteio =
        opcoes[
            Math.floor(
                Math.random() *
                opcoes.length
            )
        ];

    const resposta =
        confirm(
            sorteio.texto +
            "\n\nEssa prática é sustentável?"
        );

    let mensagem = "";

    if (
        resposta === true &&
        sorteio.correta
    ) {

        mensagem =
            "Excelente! 🌱";

    }

    else if (
        resposta === false &&
        !sorteio.correta
    ) {

        mensagem =
            "Correto! 🌿";

    }

    else {

        mensagem =
            "Ops! Tente novamente.";

    }

    document.getElementById(
        "plantResult"
    ).innerText =
        mensagem;
}

// =========================
// JOGO 3 - QUIZ
// =========================

function quizGame() {

    const perguntas = [

        {
            pergunta:
                "Qual recurso natural é essencial para a agricultura?",

            resposta:
                "agua"
        },

        {
            pergunta:
                "Qual tecnologia ajuda a monitorar lavouras pelo céu?",

            resposta:
                "drone"
        },

        {
            pergunta:
                "Qual fonte de energia limpa pode ser usada em fazendas?",

            resposta:
                "solar"
        },

        {
            pergunta:
                "O que deve ser preservado para proteger a biodiversidade?",

            resposta:
                "floresta"
        },

        {
            pergunta:
                "Qual inseto é importante para a polinização?",

            resposta:
                "abelha"
        }

    ];

    const pergunta =
        perguntas[
            Math.floor(
                Math.random() *
                perguntas.length
            )
        ];

    const resposta =
        prompt(
            pergunta.pergunta
        );

    if (
        resposta === null
    ) {
        return;
    }

    const texto =
        resposta
        .toLowerCase()
        .trim();

    if (
        texto.includes(
            pergunta.resposta
        )
    ) {

        document.getElementById(
            "quizResult"
        ).innerText =
            "✅ Resposta correta!";

    }

    else {

        document.getElementById(
            "quizResult"
        ).innerText =
            "❌ Resposta incorreta.";

    }
}

// =========================
// ANIMAÇÃO DE ENTRADA
// =========================

const observer =
new IntersectionObserver(

(entries) => {

entries.forEach(

(entry) => {

if (
entry.isIntersecting
) {

entry.target.style.opacity = 1;

entry.target.style.transform =
"translateY(0px)";

}

});

},

{
threshold: 0.1
}

);

document
.querySelectorAll(
".card,.game-card,.stat-card"
)
.forEach((el) => {

el.style.opacity = 0;

el.style.transform =
"translateY(50px)";

el.style.transition =
"all .8s ease";

observer.observe(el);

});

// =========================
// EFEITO TÍTULO
// =========================

const titulo =
document.querySelector(
".hero h1"
);

let brilho = 0;

setInterval(() => {

brilho++;

titulo.style.textShadow =
`0 0 ${
10 + brilho % 20
}px rgba(34,197,94,.7)`;

}, 150);

// =========================
// PARTICULAS
// =========================

function criarParticula() {

const p =
document.createElement(
"div"
);

p.innerHTML = "🌱";

p.style.position =
"fixed";

p.style.left =
Math.random() * 100 +
"vw";

p.style.bottom =
"-30px";

p.style.fontSize =
"18px";

p.style.pointerEvents =
"none";

p.style.zIndex = 1;

document.body.appendChild(
p
);

let pos = -30;

const anim =
setInterval(() => {

pos += 2;

p.style.bottom =
pos + "px";

if (pos > window.innerHeight + 50) {

clearInterval(anim);

p.remove();

}

}, 30);

}

setInterval(
criarParticula,
2500
);

// =========================
// MENSAGEM FINAL
// =========================

console.log(
"Agrinho 2026 carregado com sucesso 🌱"
);
