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
                '.card, .card-container, .card-header h1, .persiana, .paissatge'
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
					} else if (progress < 0.1) {
						gsap.to(stickyHeader, {
							y: 40,
							opacity: 0,
						});
					} else if (progress >= 0.25) {
						gsap.to(stickyHeader, {
							y: 0,
							opacity: 1,
						});
					}

					if (progress <= 0.1) {
						const widthPercentage = gsap.utils.mapRange(
							0, 0.1, 75, 60, progress
						);
						gsap.set(cardContainer, { width: `${widthPercentage}%` });
					} else {
						gsap.set(cardContainer, { width: '60%' });
					}

                    /* =====================================================
                        3️⃣ PERSIANA + PAISATGES
                        8 pantalles = 8 trams
                        cada tram = 0.09 de progress aprox
                    ===================================================== */

                    // TRAMS DE PUJAR / BAIXAR
                    const trams = [
                        [0.20, 0.25, 'espera', 0],
                        [0.25, 0.30, 'puja'],
                        [0.30, 0.38, 'pausa'],
                        [0.38, 0.43, 'baixa'],

                        [0.43, 0.45, 'espera', 1],
                        [0.45, 0.50, 'puja'],
                        [0.50, 0.56, 'pausa'],
                        [0.56, 0.61, 'baixa'],

                        [0.61, 0.63, 'espera', 2],                      
                        [0.63, 0.68, 'puja'],
                        [0.68, 0.74, 'pausa'],
                        [0.74, 0.79, 'baixa'],

                        [0.79, 0.81, 'espera', 3],
                        [0.81, 0.86, 'puja'],
                        [0.86, 0.92, 'pausa'],
                        ];


                    for (let i = 0; i < trams.length; i++) {
                        const tram = trams[i];
                        const [start, end, tipus] = tram;

                        if (progress >= start && progress < end) {
                            const p = gsap.utils.mapRange(start, end, 0, 1, progress);

                            // 🔽 CANVI D’IMATGE
                            if (tipus === 'espera' && typeof tram[3] === 'number') {
                            const index = tram[3];

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



