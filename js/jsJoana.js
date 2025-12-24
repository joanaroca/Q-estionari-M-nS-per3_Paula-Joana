// FINESTRA DE CANVI DE PAISATGES AMB PERSIANA
let currentIndex = 0;
let isAnimating = false;
let shutterClosed = false; // track shutter open/closed state
let pendingIndex = null;

const landscapes = document.querySelectorAll('.landscape');
const buttons = document.querySelectorAll('.options button');
const shutter = document.querySelector('.shutter');

function clampIndex(i) {
	return Math.max(0, Math.min(landscapes.length - 1, i));
}

// When the shutter close animation finishes, swap landscapes while shutter is closed
function onShutterAnimationEnd(e) {
	if (e.animationName === 'shutterClose') {
		// swap landscape while closed
		if (pendingIndex !== null && pendingIndex !== currentIndex) {
			landscapes[currentIndex].classList.remove('active');
			buttons[currentIndex].classList.remove('active');

			currentIndex = pendingIndex;

			landscapes[currentIndex].classList.add('active');
			buttons[currentIndex].classList.add('active');
		}
		isAnimating = false;
		shutterClosed = true;
		// keep shutter closed until next user action (open)
	} else if (e.animationName === 'shutterOpen') {
		// fully opened
		shutter.classList.remove('opening');
		isAnimating = false;
		shutterClosed = false;
		pendingIndex = null;
	}
}

if (shutter) {
	shutter.addEventListener('animationend', onShutterAnimationEnd);
}

function closeShutterForIndex(newIndex) {
	if (isAnimating) return;
	newIndex = clampIndex(newIndex);
	if (newIndex === currentIndex) return; // no change needed

	pendingIndex = newIndex;
	isAnimating = true;
	shutter.classList.remove('opening');
	shutter.classList.add('closing');
}

function openShutter() {
	if (isAnimating) return;
	if (!shutterClosed) return; // already open
	isAnimating = true;
	shutter.classList.remove('closing');
	shutter.classList.add('opening');
}

// SCROLL: first scroll -> close shutter and set pending landscape; next scroll -> open shutter (revealing the pending landscape)
window.addEventListener('wheel', (e) => {
	if (isAnimating) return;

	const dir = e.deltaY > 0 ? 1 : -1;

	if (!shutterClosed) {
		// first scroll: close and set pending index
		const ni = clampIndex(currentIndex + dir);
		if (ni === currentIndex) return; // nothing to do
		closeShutterForIndex(ni);
	} else {
		// shutter is closed: next scroll opens it
		openShutter();
	}
});

// BUTTONS: behave similarly — close then open after automatic short delay
buttons.forEach(btn => {
	btn.addEventListener('click', () => {
		const target = parseInt(btn.dataset.index);
		if (isAnimating) return;
		if (!shutterClosed) {
			closeShutterForIndex(target);
			// optionally auto-open after a short delay so user sees the result without extra scroll
			const tryAutoOpen = () => {
				// wait for close to finish (animationend will set shutterClosed=true and isAnimating=false)
				const wait = setInterval(() => {
					if (!isAnimating && shutterClosed) {
						clearInterval(wait);
						openShutter();
					}
				}, 50);
			};
			tryAutoOpen();
		} else {
			// if shutter already closed, just change pending index and open
			pendingIndex = clampIndex(target);
			openShutter();
		}
	});
});

//PODERS MÀGICS OLE OLE
document.addEventListener('DOMContentLoaded', () => {
	gsap.registerPlugin(ScrollTrigger);

	const lenis = new Lenis();
	lenis.on('scroll', ScrollTrigger.update);
	gsap.ticker.add((time) => {
		lenis.raf(time * 1000);
	});
	gsap.ticker.lagSmoothing(0);

	const cardContainers = document.querySelectorAll('.card-container');
	const stickyHeader = document.querySelector('.sticky-header h1');


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
				trigger: '.sticky',
				start: 'top top',
				end: `+=${window.innerHeight * 4}px`,
				pin: true,
				pinSpacing: true,
				onUpdate: (self) => {
					const progress = self.progress;
					
					if (progress >= 0.1 && progress < 0.25) {
						const headerProgress = gsap.utils.mapRange(
							0.1, 0.25, 0, 1, progress
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

					if (progress <= 0.25) {
						const widthPercentage = gsap.utils.mapRange(
							0, 0.25, 75, 60, progress
						);
						gsap.set(cardContainers, { width: `${widthPercentage}%` });
					} else {
						gsap.set(cardContainers, { width: '60%' });
					}
					if (progress >= 0.35 && !isGapAnimationCompleted) {
						gsap.to(cardContainers, {
							gap: '20px',
							duration: 0.5,
							ease: 'power3.out',
						});
						gsap.to(['#card-1' ,'#card-2', '#card-3', '#card-4'], {
							borderRadius: '20px',
							duration: 0.5,
							ease: 'power3.out',
						});

						isGapAnimationCompleted = true;

					}else if (progress < 0.35 && isGapAnimationCompleted) {
						gsap.to(cardContainers, {
							gap: '0px',
							duration: 0.5,
							ease: 'power3.out',
						});
						gsap.to('#card-1', {
							borderRadius: '20px 0 0 20px',
							duration: 0.5,
							ease: 'power3.out',
						});
						gsap.to(['#card-2', '#card-3'], {
							borderRadius: '0px',
							duration: 0.5,
							ease: 'power3.out',
						});
						gsap.to('#card-4', {
							borderRadius: '0 20px 20px 0',
							duration: 0.5,
							ease: 'power3.out',
						});
						isGapAnimationCompleted = false;
					}

					if (progress >= 0.7 && !isFlipAnimationCompleted) {
						gsap.to('.card',{
							rotationY: 180,
							duration: 0.75,
							ease: 'power3.inOut',
							stagger: 0.1
						});

						gsap.to(['#card-1', '#card-4'], {
							y: 30,
							rotationZ: (i) => [-15, 15][i],
							duration: 0.75,
							ease: 'power3.inOut',
						});
						isFlipAnimationCompleted = true;

					}else if (progress < 0.7 && isFlipAnimationCompleted) {
						gsap.to('.card',{
							rotationY: 0,
							duration: 0.5,
							ease: 'power3.inOut',
							stagger: -0.1
						});

						gsap.to(['#card-1', '#card-4'], {
							y: 0,
							rotationZ: 0,
							duration: 0.5,
							ease: 'power3.inOut',
						});

						isFlipAnimationCompleted = false;
					}

				},
				
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


