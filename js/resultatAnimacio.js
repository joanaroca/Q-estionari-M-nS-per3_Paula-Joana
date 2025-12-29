document.addEventListener('DOMContentLoaded', () => {
   gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

  const lenis = new Lenis();
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  const vol = gsap.timeline();

    vol.to(".nau", {
    duration: 2,
    x: 1300,
    y: 170,
    rotation: -10,
    ease: "sine.inOut"
    });
    
    vol.to(".nau", {
    duration: 1.5,
    x: 600,
    y: 150,
    rotation: 15,
    ease: "sine.inOut"
    });

    vol.to(".nau", {
    duration: 1.5,
    x: 1000,
    y: 100,
    rotation: 0,
    ease: "sine.inOut"
    });

    vol.to(".nau", {
    duration: 0.6,
    x: 1000,
    y: -100,
    rotation: 0,
    ease: "sine.inOut"
    });

    
    
    //surar
    vol.call(() => {
        gsap.to(".nau", {
        y: "+=20",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
        });
    });
    });


	let resizeTimer;
	window.addEventListener('resize', () => {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(() => {
			initAnimations();
		}, 250);
	});	





