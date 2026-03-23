// ─── Year ──────────────────────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ─── Shared Navigation Loader ─────────────────────────
(function loadNav() {
  const container = document.getElementById('nav-container');
  if (!container) return;

  fetch('nav.html')
    .then(function (response) { return response.text(); })
    .then(function (html) {
      container.innerHTML = html;
      setActiveNavLink();
      initMobileMenu();
      initProductCardHovers();
    })
    .catch(function () {
      // Fallback: if fetch fails (e.g. file:// protocol), inject nav inline
      container.innerHTML =
        '<nav id="nav">' +
          '<a href="index.html" class="logo">' +
            '<img src="Images/small.png" alt="Spoom Design" style="width:28px;height:28px;border-radius:4px;">' +
            ' SPOOM DESIGN' +
          '</a>' +
          '<button class="mobile-menu-toggle" aria-label="Toggle menu" aria-expanded="false">' +
            '<span></span><span></span><span></span>' +
          '</button>' +
          '<div class="nav-links">' +
            '<a href="index.html" class="nav-link" data-nav="home">Home</a>' +
            '<a href="products.html" class="nav-link" data-nav="products">Products</a>' +
            '<a href="about.html" class="nav-link" data-nav="about">About</a>' +
            '<a href="contact.html" class="nav-link" data-nav="contact">Contact</a>' +
          '</div>' +
        '</nav>';
      setActiveNavLink();
      initMobileMenu();
      initProductCardHovers();
    });
})();

// ─── Active Nav Link ──────────────────────────────────
function setActiveNavLink() {
  // Determine current page from filename
  var path = window.location.pathname;
  var filename = path.substring(path.lastIndexOf('/') + 1).toLowerCase();

  // Map filenames to nav data-nav values
  var pageMap = {
    '': 'home',
    'index.html': 'home',
    'products.html': 'products',
    'about.html': 'about',
    'contact.html': 'contact'
  };

  var currentPage = pageMap[filename] || 'home';

  document.querySelectorAll('.nav-link[data-nav]').forEach(function (link) {
    if (link.dataset.nav === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ─── Mobile Menu ──────────────────────────────────────
function initMobileMenu() {
  var toggle = document.querySelector('.mobile-menu-toggle');
  var navLinks = document.querySelector('#nav .nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', function () {
    var isOpen = navLinks.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ─── Product Card Hover Colors ─────────────────────────
function initProductCardHovers() {
  document.querySelectorAll('.product-card').forEach(function (card) {
    var color = card.dataset.color;
    if (!color) return;

    card.addEventListener('mouseenter', function () {
      card.style.borderColor = color + '44';
      card.style.boxShadow = '0 12px 40px ' + color + '11';
    });

    card.addEventListener('mouseleave', function () {
      card.style.borderColor = '#1e1e1e';
      card.style.boxShadow = 'none';
    });
  });
}

// ─── Legacy Hash Redirect ─────────────────────────────
// Redirect old hash-based URLs to their new pages
(function redirectLegacyHash() {
  var hash = window.location.hash.replace('#', '').toLowerCase();
  var redirectMap = {
    'products': 'products.html',
    'about': 'about.html',
    'contact': 'contact.html'
  };

  if (redirectMap[hash]) {
    window.location.replace(redirectMap[hash]);
  }
})();

// ─── Init product card hovers (for non-nav-loaded pages) ─
// Also init on DOMContentLoaded as fallback for pages
// where nav container might not exist (like session-timer)
document.addEventListener('DOMContentLoaded', function () {
  // If no nav container exists, still init product cards
  if (!document.getElementById('nav-container')) {
    initProductCardHovers();
  }
});
