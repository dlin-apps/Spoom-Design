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

// ─── Animated Dot Grid Background ──────────────────────
(function initDotGrid() {
  const canvas = document.getElementById('dot-grid');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let dots = [];
  let raf;

  function resize() {
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.setTransform(2, 0, 0, 2, 0, 0);

    dots = [];
    const spacing = 40;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    for (let x = 0; x < w; x += spacing) {
      for (let y = 0; y < h; y += spacing) {
        dots.push({
          x: x,
          y: y,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }
  }

  function draw(t) {
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    for (let i = 0; i < dots.length; i++) {
      const d = dots[i];
      const pulse = Math.sin(t * 0.001 + d.phase) * 0.5 + 0.5;
      ctx.fillStyle = `rgba(232,197,71,${(0.06 + pulse * 0.08).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(d.x, d.y, 1.2 + pulse * 0.6, 0, Math.PI * 2);
      ctx.fill();
    }
    raf = requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  raf = requestAnimationFrame(draw);
})();
