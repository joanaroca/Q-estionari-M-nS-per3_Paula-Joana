document.addEventListener("DOMContentLoaded", () => {
  let bloquejat = false; 
document.body.classList.remove("is-fading");
  
  requestAnimationFrame(() => {
    document.body.classList.add("is-loaded");
  });
  document.querySelectorAll(".resposta").forEach(resposta => {
    resposta.addEventListener("click", () => {
      if (bloquejat) return;
      bloquejat = true;

      document.body.classList.remove("is-loaded");
      document.body.classList.add("is-fading");

      setTimeout(() => {
        anarASeguent();
      }, 300);
    });
  });

  function anarASeguent() {
    const match = location.pathname.match(/a(\d+)\.html/);
    if (!match) return;

    const actual = parseInt(match[1], 10);

    if (actual < 4) {
      location.href = `a${actual + 1}.html`;
    } else {
      location.href = "final.html";
    }
  }
});
