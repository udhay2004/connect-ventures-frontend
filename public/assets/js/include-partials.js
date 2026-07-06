async function includePartial(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;
  try {
    const res = await fetch(url);
    el.innerHTML = await res.text();
  } catch (err) {
    console.error('Failed to load partial:', url, err);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await includePartial('#site-header', '/partials/header.html');
  await includePartial('#site-footer', '/partials/footer.html');

  // Mark current page's nav link active
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === '/' + current) {
      link.classList.add('active');
    }
  });

  // Hamburger toggle
  const hamburger = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  }

  // Scroll-to-top button
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('visible', window.scrollY > 400);
    });
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
});
