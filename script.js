// ========== ELEMENT DASAR ==========
const body = document.body;
const toggleBtn = document.getElementById("theme-toggle");
const reveals = document.querySelectorAll(".product-card");

// ========== DETEKSI TEMA OTOMATIS ==========
const hour = new Date().getHours();
const savedTheme = localStorage.getItem("theme");

function applyTheme(theme) {
  body.classList.remove("light", "dark");
  body.classList.add(theme);
  toggleBtn.textContent =
    theme === "dark" ? "Mode: 🌙 Gelap" : "Mode: 🌞 Terang";
}

// Kalau user belum pernah pilih tema, sesuaikan dengan waktu
if (!savedTheme) {
  if (hour >= 6 && hour < 18) {
    applyTheme("light");
  } else {
    applyTheme("dark");
  }
} else {
  applyTheme(savedTheme);
}

// ========== TOGGLE MANUAL ==========
toggleBtn.addEventListener("click", () => {
  const newTheme = body.classList.contains("dark") ? "light" : "dark";
  applyTheme(newTheme);
  localStorage.setItem("theme", newTheme);

  // Efek rotasi kecil
  toggleBtn.style.transform = "rotate(180deg)";
  setTimeout(() => (toggleBtn.style.transform = "rotate(0deg)"), 300);

  // Kirim event ke Google Analytics (jika terhubung)
  if (typeof gtag === "function") {
    gtag("event", "theme_switch", {
      event_category: "User Interaction",
      event_label: newTheme,
      value: newTheme === "dark" ? 1 : 0,
    });
  }
});

// ========== SCROLL REVEAL EFEK ==========
function revealOnScroll() {
  reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const visiblePoint = 120;

    if (elementTop < windowHeight - visiblePoint) {
      el.classList.add("reveal", "active");
    } else {
      el.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();
