document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('showNauBtn');
    const nau = document.getElementById('nau');
    const pageHero = document.querySelector('.page-hero');
    const overlay = document.querySelector('.zoom-overlay');
    const planeta = document.querySelector('.planet');
    const cel = document.querySelector('.page-hero');

  if (!btn || !nau || !pageHero || !overlay) return;

  let started = false;

  btn.addEventListener('click', () => {
    if (started) return;
    started = true;

    btn.setAttribute('aria-pressed', 'true');
    btn.classList.add('active');

    // =========================
    // FASE 1 – MOSTRAR LA NAU
    // =========================
    nau.classList.add('visible');
    nau.setAttribute('aria-hidden', 'false');
    const vol = gsap.timeline();

    gsap.set(nau, {
        scale: 2,
        rotate: 20,
        x:-50,
        y:-200,
        
    });
    vol.set(cel, {
        backgroundSize: "170%"
    });

    vol.to(nau, {
        y: -700,
        x:1050,
        duration: 4,
        rotate:-30,
        scale:0.2,
        ease: "power2.in",
    });
    vol.to(cel, {
        backgroundSize: "130%",
        duration: 4,
        ease: "power2.in"
        }, 0);

    vol.to(nau, {
        y: -700,
        x:1070,
        duration: 0.3,
        rotate:-35,
        scale:0.2,
        ease: "power3.in0out",
    });

    vol.to(nau, {
        y: -700,
        x: 800,
        duration: 1,
        rotate: 20,
        scale:0.06,
      
        ease: "power3.out",
    });

    vol.to(cel, {
        backgroundSize: "100%",
        duration: 1,
        ease: "power3.out"
        }, '-=1');


    vol.to(nau, {
        y: -700,
        x: 800,
        duration: 0.5,
        rotate: 20,
        scale:0.01,
      
        ease: "sine.out",
        onComplete: fase2
    },'-=0.3');


    // ⚠️ TEMPORAL (sense GSAP):
    // simulem que l’animació dura 2 segons
   
  });

  // =========================
  // FASE 2 – ZOOM + TEXT
  // =========================
  function fase2() {
    // Amaguem la nau (ja ha passat darrere el planeta)
    nau.classList.remove('visible');
    nau.setAttribute('aria-hidden', 'true');

    // Activem zoom i overlay
    pageHero.classList.add('zoom-out');
    overlay.setAttribute('aria-hidden', 'false');
  }

  // =========================
  // FLETXA AVALL
  // =========================
  const downBtn = document.getElementById('downArrowBtn');
  if (downBtn) {
    downBtn.addEventListener('click', () => {
      window.location.href = 'pregunta1.html';
    });
  }
});
