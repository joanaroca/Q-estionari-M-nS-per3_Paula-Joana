document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.remove("is-fading");
  
  requestAnimationFrame(() => {
    document.body.classList.add("is-loaded");
  });

  const TOTAL_PREGUNTES = 5;
  let bloquejat = false; // ⛔ evita doble click

  /* =========================
     INIT STORAGE
  ========================= */
  function initStorage() {
    if (!localStorage.getItem("quizResultats")) {
      localStorage.setItem(
        "quizResultats",
        JSON.stringify({
          A: 0,
          B: 0,
          C: 0,
          D: 0,
          E: 0
        })
      );
    }
  }

  initStorage();

  /* =========================
     CLICK A RESPOSTES
  ========================= */
  document.querySelectorAll(".resposta").forEach(resposta => {
    resposta.addEventListener("click", () => {

      if (bloquejat) return; // 🚫 evita doble click
      bloquejat = true;

      const punts = resposta.dataset.punts; // ex: "A" o "A,B"
      if (!punts) return;

      const data = JSON.parse(localStorage.getItem("quizResultats"));

      punts.split(",").forEach(lletra => {
        if (data[lletra] !== undefined) {
          data[lletra]++;
        }
      });

      localStorage.setItem("quizResultats", JSON.stringify(data));

      // petit delay perquè no pugui clicar 2 cops seguits
      document.body.classList.remove("is-loaded");
document.body.classList.add("is-fading");

setTimeout(() => {
  anarASeguent();
}, 500); // mateix temps que el CSS

    });
  });

  /* =========================
     CANVI DE PÀGINA
  ========================= */
  function anarASeguent() {
    const match = location.pathname.match(/pregunta(\d+)\.html/);
    if (!match) return;

    const actual = parseInt(match[1], 10);

    if (actual < TOTAL_PREGUNTES) {
      location.href = `pregunta${actual + 1}.html`;
    } else {
      const personatgeFinal = calcularPersonatgeFinal();
      localStorage.setItem("personatgeFinal", personatgeFinal);
      location.href = "resultat.html";
    }
  }

  /* =========================
     CÀLCUL PERSONATGE (AMB EMPAT 🎲)
  ========================= */
  function calcularPersonatgeFinal() {
    const data = JSON.parse(localStorage.getItem("quizResultats"));

    const max = Math.max(...Object.values(data));

    // tots els que tenen el màxim (empat)
    const empatats = Object.keys(data).filter(
      lletra => data[lletra] === max
    );

    // si n'hi ha més d'un → random
    const lletraGuanyadora =
      empatats[Math.floor(Math.random() * empatats.length)];

    return mapPersonatge(lletraGuanyadora);
  }

  function mapPersonatge(lletra) {
    return {
      A: "conan",
      B: "espies",
      C: "bessones",
      D: "pingu",
      E: "doraemon"
    }[lletra];
  }

  /* =========================
     FUNCIÓ PÚBLICA RESULTAT
  ========================= */
  window.mostrarResultatFinal = function () {
  const personatge = localStorage.getItem("personatgeFinal");
  if (!personatge) return;

  document.querySelectorAll(
    ".personatge-nom, .img-person > div, .descripcio > div"
  ).forEach(el => {
    el.style.opacity = 0;
  });

  document.querySelectorAll(`.${personatge}`).forEach(el => {
    el.style.opacity = 1;
  });

  const intro = document.querySelector(".text-titol.intro");
  if (intro) intro.style.opacity = 1;
};


  /* =========================
     RESET QUIZ
  ========================= */
  document.querySelector(".comencar")?.addEventListener("click", () => {
    localStorage.clear();
  });

});
