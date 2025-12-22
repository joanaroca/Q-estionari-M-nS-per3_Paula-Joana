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
