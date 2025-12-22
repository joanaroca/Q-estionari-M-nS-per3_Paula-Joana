document.addEventListener('DOMContentLoaded', function () {
	const btn = document.getElementById('showNauBtn');
	const nau = document.getElementById('nau');

	if (!btn || !nau) return;

	btn.addEventListener('click', function () {
		const isVisible = nau.classList.contains('visible');
		if (!isVisible) {
			nau.classList.add('visible');
			nau.setAttribute('aria-hidden', 'false');
			btn.setAttribute('aria-pressed', 'true');
			// optional: disable button after showing
			// btn.disabled = true;
		} else {
			// If clicked again, toggle hide
			nau.classList.remove('visible');
			nau.setAttribute('aria-hidden', 'true');
			btn.setAttribute('aria-pressed', 'false');
		}
	});
});
