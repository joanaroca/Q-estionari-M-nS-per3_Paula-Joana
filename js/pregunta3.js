//aqui comença el nou si nena!
document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

	const lenis = new Lenis();
	lenis.on('scroll', ScrollTrigger.update);
	gsap.ticker.add((time) => {
		lenis.raf(time * 1000);
	});
	gsap.ticker.lagSmoothing(0);

  //ELEMENTS

    const stickyHeader = document.querySelector('.sticky-header h1');
    const cardContainer = document.querySelector('.card-container');
    const persiana = document.querySelector('.persiana');
    const paisatges = document.querySelectorAll('.paissatge');
    const stickyP = document.querySelector('.sticky-header p');
    const opcionsP = document.querySelector('.opcions');
  //VARIABLES DE CONTROL


    const PUJADA = -327; // quants px puja la persiana

    

  //ESTAT INICIAL IMATGES

    paisatges.forEach((img, i) => {
    gsap.set(img, { opacity: i === 0 ? 1 : 0 });
    });

  //scrolltrigger ;)

    function initAnimations(){
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
        const mm = gsap.matchMedia();

		mm.add('(max-width: 999px)', () => {
			document.querySelectorAll(
                '.card, .card-container, .card-header h1, .persiana,'
            )

				.forEach((el) => (el.style=''));
			return{};
		});

    mm.add('(min-width: 1000px)', () => {
			ScrollTrigger.create({
				trigger: '.sticky',
				start: 'top top',
				end: `+=${window.innerHeight * 15}px`,
				pin: true,
				pinSpacing: true,
				onUpdate: (self) => {
					const progress = self.progress;
					
					if (progress >= 0.01 && progress < 0.1) {
						const headerProgress = gsap.utils.mapRange(
							0.01, 0.1, 0, 1, progress
						);
						const yValue = gsap.utils.mapRange(0, 1, 40, 0, headerProgress);
						const opacityValue = gsap.utils.mapRange(0, 1, 0, 1, headerProgress);
						
						gsap.to(stickyHeader, {
							y: yValue,
							opacity: opacityValue,
						});
						gsap.to(stickyP, {
							y: yValue,
							opacity: opacityValue,
						});

					} else if (progress < 0.1) {
						gsap.to(stickyHeader, {
							y: 40,
							opacity: 0,
						});
						gsap.to(stickyP, {
							y: 20,
							opacity: 0,
						});


					} else if (progress >= 0.25) {
						gsap.to(stickyHeader, {
							y: 0,
							opacity: 1,
						});
						gsap.to(stickyP, {
							y: 0,
							opacity: 1,
						});
					}

					if (progress <= 0.1) {
						const widthPercentage = gsap.utils.mapRange(
							0, 0.1, 75, 60, progress
						);
						gsap.set(cardContainer, { width: `${widthPercentage}%` });

            const opcionsOpacity = gsap.utils.mapRange(
              0, 0.1, 0, 1, progress
            );
            gsap.set(opcionsP, { opacity: `${opcionsOpacity}`});
					} else {
						gsap.set(cardContainer, { width: '60%' });
            gsap.set(opcionsP, {opacity: 1})
					}
          
          

          
          

          const trams = [
              [0.10, 0.15, 'espera', 0],
              [0.15, 0.20, 'puja'],
              [0.20, 0.29, 'pausa'],
              [0.29, 0.34, 'baixa'],

              [0.34, 0.37, 'espera', 1],
              [0.37, 0.42, 'puja'],
              [0.42, 0.51, 'pausa'],
              [0.51, 0.56, 'baixa'],

              [0.56, 0.59, 'espera', 2],                      
              [0.59, 0.68, 'puja'],
              [0.68, 0.77, 'pausa'],
              [0.77, 0.82, 'baixa'],

              [0.82, 0.85, 'espera', 3],
              [0.85, 0.94, 'puja'],
              [0.94, 0.99, 'pausa'],
              ];

          if (progress < trams[0][0]) {
            paisatges.forEach((img, i) => {
            gsap.set(img, { opacity: i === 0 ? 1 : 0 });
            });

            gsap.set(persiana, { y: 0 });
          } else {    


          for (let i = 0; i < trams.length; i++) {
              const [start, end, tipus, index] = trams[i];

            if (progress >= start && progress < end) {
              const p = gsap.utils.mapRange(start, end, 0, 1, progress);
                

              // 🔽 CANVI D’IMATGE
              if (tipus === 'espera' && typeof index === 'number') {
                paisatges.forEach((img, i) => {
                  gsap.to(img, {
                    opacity: i === index ? 1 : 0,
                    duration: 0.15,
                    overwrite: true
                  });
                });
              

              paisatges.forEach((img, i) => {
                  gsap.to(img, {
                  opacity: i === index ? 1 : 0,
                  duration: 0.1,
                  overwrite: true
                  });
              });
              }

              let y;

              if (tipus === 'puja') {
              y = gsap.utils.mapRange(0, 1, 0, PUJADA, p);
              }

              if (tipus === 'baixa') {
              y = gsap.utils.mapRange(0, 1, PUJADA, 0, p);
              }

              if (tipus === 'pausa') {
              y = PUJADA;
              }
              if (tipus === 'espera') {
              y = 0;
              }
              

              gsap.set(persiana, { y });

              break; 
            }
            }
          }
                    
                
    }

  });
});
}
    initAnimations();

	let resizeTimer;
	window.addEventListener('resize', () => {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(() => {
			initAnimations();
		}, 250);
	});

	// when a power card is clicked, navigate to problema.html
	const powerCards = document.querySelectorAll('.card');
	if (powerCards && powerCards.length) {
		powerCards.forEach(card => {
			card.addEventListener('click', function () {
				window.location.href = 'problema.html';
			});
		});
	}

});



