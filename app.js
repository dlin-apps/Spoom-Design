// ─── Year ──────────────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ─── Page Navigation ───────────────────────────────────
const pages = ['home', 'products', 'about', 'contact'];
let currentPage = 'home';

function navigateTo(page) {
  if (!pages.includes(page)) return;

  // Hide current page
  const currentEl = document.getElementById(`page-${currentPage}`);
  if (currentEl) currentEl.style.display = 'none';

  // Show new page
  const newEl = document.getElementById(`page-${page}`);
  if (newEl) {
    newEl.style.display = 'block';

    // Re-trigger animations
    const animEls = newEl.querySelectorAll('.animate-in');
    animEls.forEach((el) => {
      el.style.animation = 'none';
      el.offsetHeight; // force reflow
      el.style.animation = '';
    });
  }

  // Update nav active state
  document.querySelectorAll('.nav-link').forEach((link) => {
    if (link.dataset.page === page) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  currentPage = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Track page view in Google Analytics
  if (typeof gtag === 'function') {
    gtag('event', 'page_view', { page_title: page, page_path: '/' + page });
  }
}

// Attach click handlers to all navigation triggers
document.querySelectorAll('[data-page]').forEach((el) => {
  el.addEventListener('click', () => navigateTo(el.dataset.page));
});

// ─── Product Card Hover Colors ─────────────────────────
document.querySelectorAll('.product-card').forEach((card) => {
  const color = card.dataset.color;
  if (!color) return;

  card.addEventListener('mouseenter', () => {
    card.style.borderColor = color + '44';
    card.style.boxShadow = `0 12px 40px ${color}11`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.borderColor = '#1e1e1e';
    card.style.boxShadow = 'none';
  });
});

// ─── Grid background is CSS-only, no JS needed ────────
