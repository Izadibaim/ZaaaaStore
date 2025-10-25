// === Tema otomatis sesuai waktu ===
const hour = new Date().getHours();
if (hour >= 6 && hour < 18) {
  document.body.classList.add('light');
} else {
  document.body.classList.add('dark');
}

// === Tombol toggle tema manual ===
const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.addEventListener('click', () => {
  if (document.body.classList.contains('light')) {
    document.body.classList.replace('light', 'dark');
    toggleBtn.textContent = '🌙 Mode';
  } else {
    document.body.classList.replace('dark', 'light');
    toggleBtn.textContent = '☀️ Mode';
  }
});

// === Tracking Klik Produk ke Google Analytics ===
const buyButtons = document.querySelectorAll('.buy-btn');
buyButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const productName = btn.dataset.product;
    const link = btn.dataset.link;

    // Kirim event ke Google Analytics
    if (typeof gtag === 'function') {
      gtag('event', 'click_buy', {
        event_category: 'Ecommerce',
        event_label: productName,
      });
    }

    // Buka link produk
    window.open(link, '_blank');
  });
});
