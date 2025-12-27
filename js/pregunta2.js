document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

	const lenis = new Lenis();
	lenis.on('scroll', ScrollTrigger.update);
	gsap.ticker.add((time) => {
		lenis.raf(time * 1000);
	});
	gsap.ticker.lagSmoothing(0);

    const stickyHeader = document.querySelector('.sticky-header1 h1');
    const contenidorProblema = document.querySelector('.contenidor-problema');
    const frameTecno = document.querySelector('.frame.tecno');
    const frameImpuls = document.querySelector('.frame.impuls');
    const frameFets = document.querySelector('.frame.fets');
    const frameAventura = document.querySelector('.frame.aventura');

    //les y aquí
    const entradaY = 1000;
    const dinsY = 0;
    const sortidaY = -1000;

    let yEntrar
    let ySortir

    //som-hi


    let isTitleAnimationCompleted = false;
    let isProblemesCompleted = false;

    function initAnimations() {
		ScrollTrigger.getAll().forEach(trigger => trigger.kill());

		const mm = gsap.matchMedia();

		mm.add('(max-width: 999px)', () => {
			document
				.querySelectorAll(
                    '.frame, .contenidor-problemes, .objecte h1')
				.forEach((el) => (el.style=''));
			return{};
		});

        mm.add('(min-width: 1000px)', () => {
			ScrollTrigger.create({
				trigger: '.sticky1',
				start: 'top top',
				end: `+=${window.innerHeight * 10}px`,
				pin: true,
				pinSpacing: true,
				onUpdate: (self) => {
					const progress = self.progress;
					//titulin
					if (progress >= 0.01 && progress < 0.1) {
						const headerProgress = gsap.utils.mapRange(
							0.01, 0.1, 0, 1, progress
						);
						const yValue = gsap.utils.mapRange(0, 1, 300, 0, headerProgress);
						
						gsap.to(stickyHeader, {
							y: yValue,
						});
					} else if (progress < 0.01) {
						gsap.to(stickyHeader, {
							y: 300,
						});
					} else if (progress >= 0.1) {
						gsap.to(stickyHeader, {
							y: 0,
						});
					}
                    isTitleAnimationCompleted = true;  

                    //fem-ho per parts, primer el Tecno :)
                   if (progress >= 0.1 && isTitleAnimationCompleted && progress <0.2) {
                    const frameProgressTecnoEntrada = gsap.utils.mapRange(
                        0.1, 0.2, 0, 1, progress
                    );

                    yEntrar = gsap.utils.mapRange(0, 1, entradaY, dinsY, frameProgressTecnoEntrada)

                    gsap.to(frameTecno,{
                        y: yEntrar,
                    })
                   
                    } else if (progress < 0.1){
                        gsap.to(frameTecno, {
                            y: entradaY,
                        });
                       
                    } else if (progress >= 0.2 && progress < 0.325){
                        gsap.to(frameTecno, {
                            y: dinsY,
                        });
                    } else if(progress >= 0.325){
                        const frameProgressTecnoSortida = gsap.utils.mapRange(
                        0.325, 0.425, 0, 1, progress
                        );

                        ySortir = gsap.utils.mapRange(0, 1, dinsY, sortidaY, frameProgressTecnoSortida)

                        gsap.to(frameTecno,{
                            y: ySortir,
                        })
                    }

                    //ara toca impuls
                   if (progress >= 0.325 && isTitleAnimationCompleted && progress <0.425) {
                    const frameProgressImpulsEntrada = gsap.utils.mapRange(
                        0.325, 0.425, 0, 1, progress
                    );

                    yEntrar = gsap.utils.mapRange(0, 1, entradaY, dinsY, frameProgressImpulsEntrada)

                    gsap.to(frameImpuls,{
                        y: yEntrar,
                    })
                   
                    } else if (progress < 0.325){
                        gsap.to(frameImpuls, {
                            y: entradaY,
                        });
                       
                    } else if (progress >= 0.425 && progress < 0.55){
                        gsap.to(frameImpuls, {
                            y: dinsY,
                        });
                    } else if(progress >= 0.55){
                        const frameProgressImpulsSortida = gsap.utils.mapRange(
                        0.55, 0.675, 0, 1, progress
                        );

                        ySortir = gsap.utils.mapRange(0, 1, dinsY, sortidaY, frameProgressImpulsSortida)

                        gsap.to(frameImpuls,{
                            y: ySortir,
                        })
                    }
                    //ara toca fets
                   if (progress >= 0.55 && isTitleAnimationCompleted && progress <0.65) {
                    const frameProgressFetsEntrada = gsap.utils.mapRange(
                        0.55, 0.65, 0, 1, progress
                    );

                    yEntrar = gsap.utils.mapRange(0, 1, entradaY, dinsY, frameProgressFetsEntrada)

                    gsap.to(frameFets,{
                        y: yEntrar,
                    })
                   
                    } else if (progress < 0.55){
                        gsap.to(frameFets, {
                            y: entradaY,
                        });
                       
                    } else if (progress >= 0.65 && progress < 0.775){
                        gsap.to(frameFets, {
                            y: dinsY,
                        });
                    } else if(progress >= 0.775){
                        const frameProgressFetsSortida = gsap.utils.mapRange(
                        0.775, 0.875, 0, 1, progress
                        );

                        ySortir = gsap.utils.mapRange(0, 1, dinsY, sortidaY, frameProgressFetsSortida)

                        gsap.to(frameFets,{
                            y: ySortir,
                        })
                    }
                    //som-hi, ara Aventuraa
                   if (progress >= 0.775 && isTitleAnimationCompleted && progress <0.875) {
                    const frameProgressAventuraEntrada = gsap.utils.mapRange(
                        0.775, 0.875, 0, 1, progress
                    );

                    yEntrar = gsap.utils.mapRange(0, 1, entradaY, dinsY, frameProgressAventuraEntrada)

                    gsap.to(frameAventura,{
                        y: yEntrar,
                    })
                   
                    } else if (progress < 0.775){
                        gsap.to(frameAventura, {
                            y: entradaY,
                        });
                       
                    } else if (progress >= 0.875 && progress < 1){
                        gsap.to(frameAventura, {
                            y: dinsY,
                        });
                    } 

                    

                   
    }})})}
    initAnimations();

	let resizeTimer;
	window.addEventListener('resize', () => {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(() => {
			initAnimations();
		}, 250);
	});	
});




