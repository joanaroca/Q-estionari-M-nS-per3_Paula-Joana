// Handles scroll-to-next-page and image click navigation for discover pages
document.addEventListener('DOMContentLoaded', function () {
  const body = document.body;
  const next = body.getAttribute('data-next');
  const prev = body.getAttribute('data-prev');
  const img = document.querySelector('.center-food');

  // click on central image -> Viure2.html (was Escull.html)
  if (img) {
    img.addEventListener('click', function () {
      // fade out then navigate
      body.classList.add('page-fade-out');
      setTimeout(function () {
        window.location.href = 'Viure2.html';
      }, 600);
    });
  }

  // debounce for wheel/touch events
  let scrolling = false;
  function goTo(url){
    if (!url) return;
    body.classList.add('page-fade-out');
    setTimeout(function(){ window.location.href = url; }, 600);
  }

  window.addEventListener('wheel', function (e) {
    if (scrolling) return;
    if (e.deltaY > 30) {
      scrolling = true;
      if (next) goTo(next);
      setTimeout(() => scrolling = false, 1000);
    } else if (e.deltaY < -30) {
      scrolling = true;
      if (prev) goTo(prev);
      setTimeout(() => scrolling = false, 1000);
    }
  }, { passive: true });

  // touch support: detect swipe up/down
  let touchStartY = null;
  window.addEventListener('touchstart', function(e){
    if (e.touches && e.touches.length) touchStartY = e.touches[0].clientY;
  }, { passive: true });
  window.addEventListener('touchend', function(e){
    if (touchStartY === null) return;
    const touchEndY = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientY : null;
    if (touchEndY === null) return;
    const diff = touchStartY - touchEndY;
    if (Math.abs(diff) > 40 && !scrolling) {
      scrolling = true;
      if (diff > 0) { // swipe up -> next
        if (next) goTo(next);
      } else { // swipe down -> prev
        if (prev) goTo(prev);
      }
      setTimeout(() => scrolling = false, 1000);
    }
    touchStartY = null;
  }, { passive: true });
});
