document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

	const lenis = new Lenis();
	lenis.on('scroll', ScrollTrigger.update);
	gsap.ticker.add((time) => {
		lenis.raf(time * 1000);
	});
	gsap.ticker.lagSmoothing(0);

    const stickyHeader = document.querySelector('.sticky-header4 h1');
    const contenidorProblema = document.querySelector('.contenidor-problema');
    const framePasta = document.querySelector('.objecte.pasta');
    const framePeix = document.querySelector('.objecte.peix');
    const framePizza = document.querySelector('.objecte.pizza');
    const frameArros = document.querySelector('.objecte.arros');

    //lets i constants aquí
    
    const entradaY = 920;
    const esperaEntradaY = 420;
    const dinsY = -80;
    const sortidaY = -1080;

    const dinsD = 0;
    const sortidaD = 135;
    
    let yEntrar
    let ySortir
    let rotateDins
    let rotateSortir

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
				trigger: '.sticky4',
				start: 'top top',
				end: `+=${window.innerHeight * 10}px`,
				pin: true,
				pinSpacing: true,
				onUpdate: (self) => {
					const progress = self.progress;
					//titulin
					if (progress >= 0.1 && progress < 0.15) {
						const headerProgress = gsap.utils.mapRange(
							0.1, 0.15, 0, 1, progress
						);
						const yValue = gsap.utils.mapRange(0, 1, 300, 0, headerProgress);
						
						gsap.to(stickyHeader, {
							y: yValue,
						});
					} else if (progress < 0.1) {
						gsap.to(stickyHeader, {
							y: 300,
						});
					} else if (progress >= 0.15) {
						gsap.to(stickyHeader, {
							y: 0,
						});
					}
                    isTitleAnimationCompleted = true;  

					if (progress < 0.15) {
                        gsap.to(framePasta,{
                            y: entradaY,
                        })
                        gsap.to(frameArros,{
                            y: entradaY,
                        })
                        gsap.to(framePizza,{
                            y: entradaY,
                        })
                        gsap.to(framePeix,{
                            y: entradaY,
                        })
                    }

                    //plat d'espaguetis
                   if (progress >= 0.1 && isTitleAnimationCompleted && progress <0.21) {
                        const frameProgressPastaEntrada = gsap.utils.mapRange(
                            0.1, 0.21, 0, 1, progress
                        );

                        yEntrar = gsap.utils.mapRange(0, 1, entradaY, dinsY, frameProgressPastaEntrada)

                        gsap.to(framePasta,{
                            y: yEntrar,
                        });
                   
                    } else if (progress < 0.1){
                        gsap.to(framePasta, {
                            y: entradaY,
                        });
                       
                    } else if (progress >= 0.21 && progress < 0.32){
                        gsap.to(framePasta, {
                            y: dinsY,
                        });
                    } else if(progress >= 0.32){
                        const frameProgressPastaSortida = gsap.utils.mapRange(
                        0.32, 0.43, 0, 1, progress
                        );

                        ySortir = gsap.utils.mapRange(0, 1, dinsY, sortidaY, frameProgressPastaSortida)
                        
                        gsap.to(framePasta,{
                            y: ySortir,
                        })

                        rotateDins = gsap.utils.mapRange(0, 1, dinsD, sortidaD, frameProgressPastaSortida)
                        gsap.to(framePasta,{
                            rotate: rotateDins,
                        });
                    }
                    //plat de peixitu
                   if (progress >= 0.32 && isTitleAnimationCompleted && progress <0.43) {
                    const frameProgressPeixEntrada = gsap.utils.mapRange(
                        0.32, 0.43, 0, 1, progress
                    );

                    yEntrar = gsap.utils.mapRange(0, 1, esperaEntradaY, dinsY, frameProgressPeixEntrada)

                    gsap.to(framePeix,{
                        y: yEntrar,
                    })
                   
                    } else if (progress >= 0.21  && progress < 0.32){
                        gsap.to(framePeix, {
                            y: esperaEntradaY,
                        });
                       
                    } else if (progress < 0.21){
                        gsap.to(framePeix, {
                            y: entradaY,
                        });
                       
                    } else if (progress >= 0.43 && progress < 0.54){
                        gsap.to(framePeix, {
                            y: dinsY,
                        });
                    } else if(progress >= 0.54){
                        const frameProgressPeixSortida = gsap.utils.mapRange(
                        0.54, 0.65, 0, 1, progress
                        );

                        ySortir = gsap.utils.mapRange(0, 1, dinsY, sortidaY, frameProgressPeixSortida)

                        gsap.to(framePeix,{
                            y: ySortir,
                        });

                        rotateDins = gsap.utils.mapRange(0, 1, dinsD, sortidaD, frameProgressPeixSortida)
                        gsap.to(framePeix,{
                            rotate: rotateDins,
                        });
                    }

                    //ara la pizza
                   if (progress >= 0.54 && isTitleAnimationCompleted && progress <0.65) {
                    const frameProgressPizzaEntrada = gsap.utils.mapRange(
                        0.54, 0.65, 0, 1, progress
                    );

                    yEntrar = gsap.utils.mapRange(0, 1, esperaEntradaY, dinsY, frameProgressPizzaEntrada)

                    gsap.to(framePizza,{
                        y: yEntrar,
                    })
                   
                    } else if (progress >= 0.43  && progress < 0.54){

                        gsap.to(framePizza, {
                            y: esperaEntradaY,
                        });
                       
                    } else if (progress < 0.43){
                        gsap.to(framePizza, {
                            y: entradaY,
                        });
                       
                    } else if (progress >= 0.65 && progress < 0.76){
                        gsap.to(framePizza, {
                            y: dinsY,
                        });
                    } else if(progress >= 0.76){
                        const frameProgressPizzaSortida = gsap.utils.mapRange(
                        0.76, 0.87, 0, 1, progress
                        );

                        ySortir = gsap.utils.mapRange(0, 1, dinsY, sortidaY, frameProgressPizzaSortida)

                        gsap.to(framePizza,{
                            y: ySortir,
                        });

                        rotateDins = gsap.utils.mapRange(0, 1, dinsD, sortidaD, frameProgressPizzaSortida)
                        gsap.to(framePizza,{
                            rotate: rotateDins,
                        });

                        
                    }
                    //arrosset
                   if (progress >= 0.76 && isTitleAnimationCompleted && progress <0.87) {
                    const frameProgressArrosEntrada = gsap.utils.mapRange(
                        0.76, 0.87, 0, 1, progress
                    );

                    yEntrar = gsap.utils.mapRange(0, 1, esperaEntradaY, dinsY, frameProgressArrosEntrada)

                    gsap.to(frameArros,{
                        y: yEntrar,
                    })
                   
                    } else if (progress >= 0.65  && progress < 0.76){
                        gsap.to(frameArros, {
                            y: esperaEntradaY,
                        });
                       
                    } else if (progress < 0.65){
                        gsap.to(frameArros, {
                            y: entradaY,
                        });
                       
                    } else if (progress >= 0.87 && progress < 0.98){
                        gsap.to(frameArros, {
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




