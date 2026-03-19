// ─── Year ──────────────────────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ─── Page Navigation ───────────────────────────────────
const pages = ['home', 'products', 'about', 'contact'];
let currentPage = 'home';

function navigateTo(page, updateHash = true) {
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
      void el.offsetHeight; // force reflow
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

  // Update URL hash
  if (updateHash) {
    if (page === 'home') {
      history.replaceState(null, '', window.location.pathname);
    } else {
      history.replaceState(null, '', `#${page}`);
    }
  }

  // Track page view in Google Analytics
  if (typeof gtag === 'function') {
    gtag('event', 'page_view', {
      page_title: page,
      page_path: page === 'home' ? '/' : `/#${page}`
    });
  }
}

function handleInitialHash() {
  const hash = window.location.hash.replace('#', '').toLowerCase();

  if (pages.includes(hash)) {
    navigateTo(hash, false);
  } else {
    navigateTo('home', false);
  }
}

// Attach click handlers to all navigation triggers
document.querySelectorAll('[data-page]').forEach((el) => {
  el.addEventListener('click', (event) => {
    event.preventDefault();
    navigateTo(el.dataset.page);
  });
});

// React to browser back/forward
window.addEventListener('hashchange', handleInitialHash);

// ─── Product Card Hover Colors ─────────────────────────
document.querySelectorAll('.product-card').forEach((card) => {
  const color = card.dataset.color;
  if (!color) return;

  card.addEventListener('mouseenter', () => {
    card.style.borderColor = `${color}44`;
    card.style.boxShadow = `0 12px 40px ${color}11`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.borderColor = '#1e1e1e';
    card.style.boxShadow = 'none';
  });
});

// ─── Clickable Product Cards ───────────────────────────
document.querySelectorAll('.product-card[data-href]').forEach((card) => {
  const href = card.dataset.href;
  if (!href) return;

  card.style.cursor = 'pointer';

  card.addEventListener('click', () => {
    window.location.href = href;
  });

  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      window.location.href = href;
    }
  });
});

// ─── Init ──────────────────────────────────────────────
handleInitialHash();