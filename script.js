// === ELEMENTS ===
const body = document.body;
const toggleBtn = document.getElementById('theme-toggle');
const reveals = document.querySelectorAll('.product-card');
const buyButtons = document.querySelectorAll('.buy-btn');

// === THEME DETECTION & APPLY ===
const savedTheme = localStorage.getItem('theme');
const hour = new Date().getHours();

function applyTheme(theme) {
  body.classList.remove('light', 'dark');
  body.classList.add(theme);
  toggleBtn.textContent = theme === 'dark' ? 'Mode: 🌙 Gelap' : 'Mode: 🌞 Terang';
  toggleBtn.setAttribute('aria-pressed', theme === 'dark');
}

// Tentukan tema awal
if (savedTheme) {
  applyTheme(savedTheme);
} else {
  applyTheme(hour >= 6 && hour < 18 ? 'light' : 'dark');
}

// === 🌗 TOGGLE MODE (MANUAL) ===
toggleBtn.addEventListener('click', () => {
  const isDark = body.classList.toggle('dark');
  body.classList.toggle('light', !isDark);
  const mode = isDark ? 'dark' : 'light';
  applyTheme(mode);
  localStorage.setItem('theme', mode);

  // Animasi klik kecil
  toggleBtn.style.transform = 'scale(0.9)';
  setTimeout(() => (toggleBtn.style.transform = 'scale(1)'), 200);
});

// === ✨ SCROLL REVEAL + ANIMASI CARD ===
function revealOnScroll() {
  const offset = 120;
  reveals.forEach((el, index) => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - offset) {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
      el.style.transition = `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`;
    } else {
      el.style.opacity = 0;
      el.style.transform = 'translateY(30px)';
    }
  });
}

// Set posisi awal sebelum muncul
reveals.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
revealOnScroll();

// === 🛒 BUY BUTTON TRACKING ===
buyButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const product = btn.dataset.product;
    const link = btn.dataset.link;

    if (typeof gtag === 'function') {
      gtag('event', 'click_buy', {
        event_category: 'Purchase',
        event_label: product,
      });
    }

    if (link) window.open(link, '_blank', 'noopener');
  });
});
