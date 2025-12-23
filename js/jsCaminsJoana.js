//PODERS MÀGICS OLE OLE
document.addEventListener('DOMContentLoaded', () => {
	gsap.registerPlugin(ScrollTrigger);

	const lenis = new Lenis();
	lenis.on('scroll', ScrollTrigger.update);
	gsap.ticker.add((time) => {
		lenis.raf(time * 1000);
	});
	gsap.ticker.lagSmoothing(0);

	const caminsOpcions = document.querySelectorAll('.camins-opcions');
	const caminsTitle = document.querySelector('.camins-title h1');


	let isGapAnimationCompleted = false;
	let isFlipAnimationCompleted = false;



	function initAnimations() {
		ScrollTrigger.getAll().forEach(trigger => trigger.kill());

		const mm = gsap.matchMedia();

		mm.add('(max-width: 999px)', () => {
			document
				.querySelectorAll('.card, .card-container, .card-header h1')
				.forEach((el) => (el.style=''));
			return{};
		});
		
		mm.add('(min-width: 1000px)', () => {
			ScrollTrigger.create({
				trigger: '.camins-title h1',
				start: 'top top',
				end: `+=${window.innerHeight * 4}px`,
				pin: true,
				pinSpacing: true,
				onUpdate: (self) => {
					const progress = self.progress;
					//Animació de la posició
					if (progress >= 0.1 && progress < 0.25) {
						const headerProgress = gsap.utils.mapRange(
							0.1, 0.25, 0, 1, progress
						);
						const yValue = gsap.utils.mapRange(0, 1, 100, 0, headerProgress);
						
						gsap.to(caminsTitle, {
							y: yValue,
						});
					} else if (progress < 0.1) {
						gsap.to(caminsTitle, {
							y: 100,
						});
					} else if (progress >= 0.25) {
						gsap.to(caminsTitle, {
							y: 0,
						});
					}
					//aquí la opacitat
					if (progress >= 0.01 && progress < 0.1) {
						const headerProgress = gsap.utils.mapRange(
							0.01, 0.1, 0, 1, progress
						);
						const opacityValue = gsap.utils.mapRange(0, 1, 0, 1, headerProgress);
						
						gsap.to(caminsTitle, {
							opacity: opacityValue,
						});
					} else if (progress < 0.01) {
						gsap.to(caminsTitle, {
							opacity: 0,
						});
					} else if (progress >= 0.1) {
						gsap.to(caminsTitle, {
							opacity: 1,
						});
					}
					

				
					

						isGapAnimationCompleted = true;

					
						isFlipAnimationCompleted = true;

									

				},
				
			}); 
			// STICKY / PIN DE LES IMATGES
			const caminsWrappers = gsap.utils.toArray('.camins-img-wrapper');

			caminsWrappers.forEach((wrapper) => {
				const img = wrapper.querySelector('.camins-img');

				ScrollTrigger.create({
					trigger: wrapper,
					start: 'bottom 85%',
					end: '+=1000',
					pin: true,
					pinSpacing: false,
					scrub: 0.9, //
				});
				gsap.to(img, {
					y: -10,
					scrollTrigger: {
						trigger: wrapper,
						start: 'bottom 85%',
						end: '+=1000',
						scrub: true
					}
				});

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
});