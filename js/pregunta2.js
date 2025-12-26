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
    const frames = document.querySelectorAll('.frame');
    const frameTecno = document.querySelector('.frame.tecno');
    const frameImpuls = document.querySelector('.frame.impuls');
    const frameFets = document.querySelector('.frame.fets');
    const frameAventura = document.querySelector('.frame.aventura');



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
				end: `+=${window.innerHeight * 5}px`,
				pin: true,
				pinSpacing: true,
				onUpdate: (self) => {
					const progress = self.progress;
					
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
                    
                   if (progress >= 0.1 && isTitleAnimationCompleted && progress <0.2) {
                    const frameProgress1 = gsap.utils.mapRange(
                        0.1, 0.2, 0, 1, progress
                    );

                    const yArriba1 = gsap.utils.mapRange(0, 1, 1000, 0, frameProgress1)

                    gsap.to(frameTecno,{
                        y: yArriba1,
                    })
                    } else if (progress < 0.1){
                        gsap.to(frameTecno, {
                            y: 1000,
                        });
                    } else if (progress >= 0.2 && progress < 0.3){
                        gsap.to(frameTecno, {
                            y: 0,
                        });
                    }
                    if (progress >= 0.3 && progress < 0.4){
                        const frameProgressMarxa = gsap.utils.mapRange(
                        0.2, 0.3, 0, 1, progress
                        );

                        const yMarxa1 = gsap.utils.mapRange(0, 1, 0, -500, frameProgressMarxa)
                        const yArriba2 = gsap.utils.mapRange(0, 1, 1000, 0, frameProgressMarxa)

                        gsap.to (frameTecno,{
                            y: yMarxa1,
                        });
                        gsap.to (frameAventura,{
                            y: yArriba2,
                        });
                    } else if (progress <= 0.3){
                        gsap.to(frameAventura,{
                            y:1000,
                        });
                    } else if (progress >= 0.4 && progress < 0.5){
                        gsap.to(frameAventura, {
                            y: 0,
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




