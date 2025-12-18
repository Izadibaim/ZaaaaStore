document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // 1. Fungsi Ganti Tema (Dark/Light)
  themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark');
      if (body.classList.contains('dark')) {
          themeToggle.innerHTML = '🌙 Mode Gelap';
          localStorage.setItem('theme', 'dark');
      } else {
          themeToggle.innerHTML = '🌞 Mode Terang';
          localStorage.setItem('theme', 'light');
      }
  });

  // Cek tema yang tersimpan
  if (localStorage.getItem('theme') === 'dark') {
      body.classList.add('dark');
      themeToggle.innerHTML = '🌙 Mode Gelap';
  }

  // 2. Fungsi Tombol Beli
  const buyButtons = document.querySelectorAll('.buy-btn');
  buyButtons.forEach(button => {
      button.addEventListener('click', () => {
          const link = button.getAttribute('data-link');
          window.open(link, '_blank');
      });
  });

  // 3. Efek Tab Bar Active
  const tabs = document.querySelectorAll('.tab-item');
  tabs.forEach(tab => {
      tab.addEventListener('click', () => {
          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
      });
  });
});