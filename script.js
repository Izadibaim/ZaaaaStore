// elements
const body = document.body;
const toggleBtn = document.getElementById('theme-toggle');
const reveals = document.querySelectorAll('.product-card');
const buyButtons = document.querySelectorAll('.buy-btn');

// theme detection & apply
const savedTheme = localStorage.getItem('theme');
const hour = new Date().getHours();
function applyTheme(t){
  body.classList.remove('light','dark');
  body.classList.add(t);
  toggleBtn.textContent = t === 'dark' ? 'Mode: 🌙 Gelap' : 'Mode: 🌞 Terang';
  toggleBtn.setAttribute('aria-pressed', t==='dark');
}
if(savedTheme) applyTheme(savedTheme);
else applyTheme((hour>=6 && hour<18) ? 'light' : 'dark');

// manual toggle
toggleBtn.addEventListener('click', ()=>{
  const next = body.classList.contains('dark') ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
  toggleBtn.style.transform = 'rotate(180deg)';
  setTimeout(()=> toggleBtn.style.transform = 'rotate(0deg)', 300);
  if(typeof gtag === 'function') gtag('event','theme_switch',{event_category:'UX',event_label:next});
});

// scroll reveal simple
function revealOnScroll(){
  const offset = 120;
  reveals.forEach((el, i)=>{
    const top = el.getBoundingClientRect().top;
    if(top < window.innerHeight - offset){
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
      el.style.transition = 'opacity .6s ease, transform .6s ease';
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
revealOnScroll();

// buy button — open merchant link + track
buyButtons.forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    const product = btn.dataset.product;
    const link = btn.dataset.link;
    if(typeof gtag === 'function') gtag('event','click_buy',{event_category:'Purchase',event_label:product});
    // open in new tab
    if(link) window.open(link, '_blank', 'noopener');
  });
});
