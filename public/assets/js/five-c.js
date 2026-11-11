// C pages: reveal on scroll, start the illustration, count up the figures and track reading progress
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function countUp(el) {
    var end = parseFloat(el.dataset.count), dec = parseInt(el.dataset.dec || '0', 10);
    var pre = el.dataset.pre || '', suf = el.dataset.suf || '';
    function show(v) { el.textContent = pre + v.toLocaleString('en-IN', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf; }
    if (reduce) { show(end); return; }
    var t0 = null;
    requestAnimationFrame(function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / 1400, 1);
      show(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    });
  }

  var targets = document.querySelectorAll('.ca-reveal, .c-illo, .ca-journey');
  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('in'); });
    document.querySelectorAll('[data-count]').forEach(countUp);
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        en.target.querySelectorAll('[data-count]').forEach(countUp);
        io.unobserve(en.target);
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(function (el) { io.observe(el); });
  }

  var art = document.querySelector('.ca-article');
  if (art) {
    var tick = function () {
      var r = art.getBoundingClientRect();
      var p = Math.min(Math.max((window.innerHeight * 0.6 - r.top) / r.height, 0), 1);
      art.style.setProperty('--p', p.toFixed(3));
    };
    window.addEventListener('scroll', tick, { passive: true });
    window.addEventListener('resize', tick);
    tick();
  }
})();
