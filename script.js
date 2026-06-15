/* DESIGN E PALETA DE CORES MODERNA (CYBER-AGRO) */
:root {
    --bg: #f0f7f4;
    --surface: #ffffff;
    --text: #0f172a;
    --text-light: #64748b;
    --primary: #00b894;
    --secondary: #0984e3;
    --accent: #fdcb6e;
    --danger: #ff7675;
    --purple: #a29bfe;
    --radius-lg: 20px;
    --radius-md: 12px;
    --shadow: 0 10px 30px rgba(0, 184, 148, 0.08);
    --border: #e2e8f0;
}

[data-theme="dark"] {
    --bg: #070d0a;
    --surface: #0f1d16;
    --text: #f8fafc;
    --text-light: #94a3b8;
    --border: #1b3527;
    --shadow: 0 10px 35px rgba(0,0,0,0.4);
}

* { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Space Grotesk', sans-serif; }
body { background: var(--bg); color: var(--text); padding-bottom: 20px; transition: background 0.3s, color 0.3s; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 16px; }

/* NAVBAR COMPACTA */
.navbar { height: 75px; background: var(--surface); display: flex; align-items: center; justify-content: space-between; padding: 0 24px; box-shadow: var(--shadow); border-bottom: 2px solid var(--primary); position: sticky; top: 0; z-index: 100; }
.logo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.5rem; color: var(--primary); }
.nav-right { display: flex; align-items: center; gap: 15px; }
.nav-item { text-decoration: none; color: var(--text); font-weight: 700; font-size: 0.95rem; }
.btn-theme { background: var(--bg); border: 2px solid var(--primary); padding: 8px 14px; border-radius: var(--radius-md); color: var(--text); font-weight: 700; cursor: pointer; }

/* HERO IMPRESSIONANTE */
.hero { text-align: center; padding: 70px 16px; background: linear-gradient(135deg, rgba(0,184,148,0.12), rgba(9,132,227,0.12)); border-radius: 0 0 40px 40px; margin-bottom: 40px; }
.badge { background: var(--primary); color: white; padding: 6px 14px; border-radius: 20px; font-weight: 700; font-size: 0.8rem; display: inline-block; margin-bottom: 15px; letter-spacing: 1px; }
.hero h1 { font-family: 'Syne', sans-serif; font-size: 2.8rem; line-height: 1.1; margin-bottom: 15px; color: var(--text); }
.hero p { max-width: 650px; margin: 0 auto 25px; color: var(--text-light); font-size: 1.1rem; font-weight: 500; }

/* INFORMAÇÕES ADICIONAIS */
.section-title { font-family: 'Syne', sans-serif; font-size: 1.9rem; margin-bottom: 20px; color: var(--text); display: flex; align-items: center; gap: 10px; }
.info-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 25px; }
.info-card { background: var(--surface); padding: 25px; border-radius: var(--radius-lg); box-shadow: var(--shadow); border-left: 6px solid var(--primary); }
.info-card.tech { border-color: var(--secondary); }
.info-card.fauna { border-color: var(--accent); }
.info-card.agua { border-color: var(--purple); }
.info-card .icon { font-size: 2rem; margin-bottom: 10px; }
.info-card h3 { margin-bottom: 8px; font-family: 'Syne', sans-serif; }
.info-card p { color: var(--text-light); font-size: 0.95rem; text-align: justify; }

.fact-container { background: var(--surface); padding: 20px; border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; box-shadow: var(--shadow); border: 2px dashed var(--accent); }
.fact-container h3 { font-family: 'Syne', sans-serif; min-width: 200px; }
#fact-box { flex: 1; font-weight: 500; color: var(--text); }

/* GRID DE JOGOS COLORIDOS */
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 25px; margin-top: 20px; }
.card { background: var(--surface); padding: 25px; border-radius: var(--radius-lg); box-shadow: var(--shadow); border: 2px solid var(--border); transition: transform 0.2s, border-color 0.2s; position: relative; }
.card:hover { transform: translateY(-5px); }
.card-tag { position: absolute; top: 15px; right: 20px; font-size: 0.75rem; font-weight: 800; opacity: 0.6; letter-spacing: 0.5px; }
.game-card h3 { font-family: 'Syne', sans-serif; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid var(--border); }
.game-desc { font-size: 0.9rem; color: var(--text-light); margin-bottom: 15px; }

/* DETALHES DE ESTILO DE CADA JOGO */
.c-quiz { border-top: 5px solid var(--primary); }
.c-coletor { border-top: 5px solid var(--secondary); }
.c-memoria { border-top: 5px solid var(--accent); }
.c-irrigador { border-top: 5px solid var(--danger); }
.c-equilibrio { border-top: 5px solid var(--purple); }

.status-row { display: flex; justify-content: space-between; font-weight: 700; margin-bottom: 15px; }
.pts { color: var(--secondary); font-size: 1.1rem; }

/* BOTÕES GERAIS */
.btn { border: none; padding: 12px 24px; border-radius: var(--radius-md); font-weight: 700; cursor: pointer; transition: 0.2s; font-size: 0.95rem; }
.btn-main { background: var(--primary); color: white; }
.btn-accent { background: var(--accent); color: #000; }
.btn-reset { background: var(--bg); color: var(--text); border: 2px solid var(--border); width: 100%; margin-top: 15px; }
.btn:hover { opacity: 0.9; transform: scale(1.02); }

/* JOGO 1: QUIZ */
.quiz-opt { width: 100%; padding: 12px 16px; background: var(--bg); border: 2px solid transparent; border-radius: var(--radius-md); text-align: left; margin-bottom: 10px; font-weight: 600; color: var(--text); cursor: pointer; transition: 0.2s; }
.quiz-opt:hover { border-color: var(--primary); background: var(--surface); }
.game-feedback { text-align: center; font-weight: 700; padding: 8px; margin-top: 5px; border-radius: 6px; display: none; }

/* JOGO 2: COLETOR */
.arena { width: 100%; height: 200px; background: linear-gradient(to bottom, #87ceeb, #e0f7fa); border-radius: var(--radius-md); position: relative; overflow: hidden; border: 2px solid var(--secondary); margin-top: 10px; }
#basket { position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); font-size: 1.8rem; z-index: 5; transition: left 0.1s ease-out; }
.item-drop { position: absolute; font-size: 1.5rem; top: -30px; z-index: 4; }
.overlay { position: absolute; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.65); display: flex; align-items: center; justify-content: center; }
.btn-play { background: var(--secondary); color: white; }
.controls { display: flex; gap: 10px; margin-top: 12px; }
.btn-ctrl { flex: 1; padding: 12px; background: var(--bg); border: 2px solid var(--secondary); border-radius: var(--radius-md); font-weight: 700; color: var(--text); cursor: pointer; }

/* JOGO 3: MEMÓRIA */
.memo-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.memo-card { height: 55px; background: var(--accent); color: var(--accent); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 1.4rem; font-weight: 700; cursor: pointer; user-select: none; transition: 0.2s; }
.memo-card.flipped { background: var(--bg); color: var(--text); border: 2px solid var(--accent); }
.memo-card.matched { background: rgba(0, 184, 148, 0.2); color: var(--primary); border: 2px solid var(--primary); cursor: default; }

/* JOGO 4: IRRIGADOR */
.btn-water { width: 100%; padding: 14px; border: none; border-radius: var(--radius-md); font-weight: 700; color: white; background: var(--danger); cursor: pointer; font-size: 1rem; }
.btn-water.on { background: var(--primary); }
.feedback-msg { text-align: center; margin-top: 12px; font-weight: 700; font-size: 1rem; }

/* JOGO 5: EQUILÍBRIO */
.slider-group { margin-bottom: 12px; }
.slider-group label { display: flex; justify-content: space-between; font-weight: 600; margin-bottom: 4px; font-size: 0.9rem; }
.slider-group input { width: 100%; height: 6px; background: var(--bg); border-radius: 5px; outline: none; }
.gauge-bar { width: 100%; height: 18px; background: var(--bg); border-radius: 10px; overflow: hidden; margin-top: 12px; border: 1px solid var(--border); }
#gauge-fill { height: 100%; width: 50%; background: var(--purple); transition: width 0.4s; }
#eco-status { text-align: center; font-weight: 700; margin-top: 8px; font-size: 0.95rem; }

/* ANIMADOR DE PARTÍCULAS */
.leaf { position: fixed; pointer-events: none; z-index: -1; opacity: 0.2; animation: fall 10s infinite linear; top: -20px; }
@keyframes fall { 0% { transform: translateY(0) rotate(0deg); } 100% { transform: translateY(105vh) rotate(360deg); } }

footer { background: var(--surface); text-align: center; padding: 25px; margin-top: 40px; border-radius: var(--radius-lg) var(--radius-lg) 0 0; font-weight: 700; font-size: 0.9rem; border-top: 2px solid var(--border); color: var(--text-light); }

@media(max-width: 500px) {
    .hero h1 { font-size: 2rem; }
    .nav-right { display: none; }
    .grid { grid-template-columns: 1fr; }
       }
                 
