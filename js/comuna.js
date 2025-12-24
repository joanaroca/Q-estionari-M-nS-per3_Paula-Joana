//Detectiu Conan: A
//Espies de Veritat: B
//Les 3 Bessones: C
//Pingu: D
//Doraemon: E

document.addEventListener("DOMContentLoaded", () => {

  const TOTAL_PREGUNTES = 5;

  function init() {
    if (!localStorage.getItem("resultatsData")) {
      localStorage.setItem("resultatsData", JSON.stringify({
        resultats: { A: 0, B: 0, C: 0, D: 0, E: 0 },
        historial: []
      }));
    }
  }

  init();

  document.querySelectorAll(".resposta").forEach(resposta => {
    resposta.addEventListener("click", () => {

      console.log("clic", resposta.dataset.punts); // 👈 AQUI


      const punts = resposta.dataset.punts.split(",");
      const data = JSON.parse(localStorage.getItem("resultatsData"));

      punts.forEach(p => {
        data.resultats[p]++;
        data.historial.push(p);
      });

      localStorage.setItem("resultatsData", JSON.stringify(data));

      anarASeguent();
    });
  });

  function anarASeguent() {
    const match = location.pathname.match(/pregunta(\d+)\.html/);
    if (!match) return;

    const actual = parseInt(match[1]);

    if (actual < TOTAL_PREGUNTES) {
      location.href = `pregunta${actual + 1}.html`;
    } else {
      const personatge = calcularPersonatgeFinal();
      localStorage.setItem("personatgeFinal", personatge);
      location.href = "resultat.html";
    }
  }
  const personatge = localStorage.getItem("personatgeFinal");

document.querySelectorAll(".personatge").forEach(p => {
  if (p.dataset.id === personatge) {
    p.classList.add("actiu");
  }
});
document.getElementById("comencar")?.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.clear();
});

});
