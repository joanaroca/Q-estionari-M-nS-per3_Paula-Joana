document.addEventListener('DOMContentLoaded', () => {
   gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

  const lenis = new Lenis();
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  
  

  const vol = gsap.timeline();

   
    vol.to(".nau", {
    duration: 1.9,
    x: 1300,
    y: 170,
    rotation: -10,
    scale: 1.2,
    ease: "sine.inOut"
    });

    vol.to(".nau", {
    duration: 0.5,
    rotation: -15,
    sacle: 1,
    ease: "sine.inOut"
    },'-=0.5');

    vol.to(".nau", {
    duration: 1,
    x: 600,
    y: 150,
    rotation: 15,
    scale: 1,
    ease: "sine.inOut"
    });

    vol.to(".nau", {
    duration: 0.5,
    rotation: 20,
    ease: "sine.inOut"
    },'-=0.5');

    vol.to(".nau", {
    duration: 1.5,
    x: 1000,
    y: 100,
    rotation: 0,
    ease: "sine.inOut"
    });

    vol.to(".nau", {
    duration: 0.2,
    x: 1000,
    y: 110,
    rotation: 0,
    ease: "sine.inOut"
    });

    vol.to(".nau", {
    duration: 0.6,
    x: 1000,
    y: -105,
    rotation: 0,
    ease: "sine.inOut"
    });
    vol.to(".nau", {
    duration: 0.2,
    x: 1000,
    y: -100,
    rotation: 0,
    ease: "sine.inOut"
    });

    
//incialment ha destar a sota
    vol.to(".llum", {
        duration: 0.1,
        y: 195,
        ease: "sine.inOut"
    },'-=0.8')

    //aquest es mou cap amunt
    vol.to(".llum", {
        duration: 0.6,
        y: 0,
        ease: "sine.inOut"
    },'-=0.8')

    vol.to(".planeta",{
            duration:0.1,
            opacity: 1,
            onComplete: () => {
                if (window.mostrarResultatFinal) {
                window.mostrarResultatFinal();
                }
            }
            
        },'-=0.5')
// amb aixo li posem opacitat
    vol.to(".llum", {
        duration: 0.3,
        opacity: 1,
        
    },'-=0.4')
    
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
    
    vol.to(".llum", {
        duration: 0.3,
        opacity: 0,
        
    },'+=1')
    });
    


	let resizeTimer;
	window.addEventListener('resize', () => {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(() => {
			initAnimations();
		}, 250);
	});	





