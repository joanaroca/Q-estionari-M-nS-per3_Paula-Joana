document.addEventListener('DOMContentLoaded', function () {
	const btn = document.getElementById('showNauBtn');
	const nau = document.getElementById('nau');

	if (!btn || !nau) return;

	btn.addEventListener('click', function () {
		const isVisible = nau.classList.contains('visible');
		const pageHero = document.querySelector('.page-hero');

		if (!isVisible) {
			// show the nau
			nau.classList.add('visible');
			nau.setAttribute('aria-hidden', 'false');
			btn.setAttribute('aria-pressed', 'true');
			btn.classList.add('active');
			// trigger background zoom-out and reveal overlay
			if (pageHero) {
				pageHero.classList.add('zoom-out');
				const overlay = pageHero.querySelector('.zoom-overlay');
				if (overlay) overlay.setAttribute('aria-hidden', 'false');
			}
		} else {
			// hide the nau
			nau.classList.remove('visible');
			nau.setAttribute('aria-hidden', 'true');
			btn.setAttribute('aria-pressed', 'false');
			btn.classList.remove('active');
			if (pageHero) {
				pageHero.classList.remove('zoom-out');
				const overlay = pageHero.querySelector('.zoom-overlay');
				if (overlay) overlay.setAttribute('aria-hidden', 'true');
			}
		}
	});

	// down arrow behaviour: scroll to #informacio or navigate
	const downBtn = document.getElementById('downArrowBtn');
	const pageHero = document.querySelector('.page-hero');
	if (downBtn) {
		downBtn.addEventListener('click', function () {
			// Navigate to the dedicated discover page
			window.location.href = 'descobreix.html';
		});
	}
});
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

