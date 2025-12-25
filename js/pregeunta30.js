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

            const tl = gsap.timeline({
                paused: true,
                defaults: { ease: 'none' }
            });
            const PAUSA = 0.4;
            const PUJADA_DUR = 1;
            const BAIXADA_DUR = 1;

            gsap.set(persiana, { y: 0 });

            paisatges.forEach((img, i) => {
            gsap.set(img, { opacity: i === 0 ? 1 : 0 });
            });

            for (let i = 0; i < paisatges.length; i++) {

                tl.to(persiana, { y: PUJADA, duration: PUJADA_DUR });

                 tl.to(paisatges, {
                    opacity: (index) => (index === i ? 1 : 0),
                    duration: 0.3
                }, '<');

                tl.to({}, { duration: PAUSA });

                tl.to(persiana, { y: 0, duration: BAIXADA_DUR });
                }

			ScrollTrigger.create({
				trigger: '.sticky',
				start: 'top top',
				end: `+=${window.innerHeight * 10}px`,
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
                    // 🔽 CONTROL TIMELINE PERSIANA
                    const startPersiana = 0.27;

                    if (progress >= startPersiana) {
                    tl.progress(gsap.utils.mapRange(startPersiana, 1, 0, 1, progress));
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



