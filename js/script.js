// ===========================
// Fanta Fan Site — Interactions
// ===========================

document.getElementById('year').textContent = new Date().getFullYear();

/* ---- nav scroll state ---- */
const nav = document.getElementById('nav');
const progressBar = document.getElementById('progressBar');

function onScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 40);

  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---- mobile menu ---- */
const burger = document.getElementById('burger');
const navMobile = document.getElementById('navMobile');
burger.addEventListener('click', () => {
  const open = navMobile.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
  burger.classList.toggle('open', open);
});
navMobile.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    navMobile.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  })
);

/* ---- scroll reveal ---- */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('in-view'), i * 60);
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

/* ---- animated counters ---- */
const counters = document.querySelectorAll('.stat-num');
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count, 10);
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    counterIO.unobserve(el);
  });
}, { threshold: 0.6 });
counters.forEach(el => counterIO.observe(el));

/* ---- flavor card active state (touch/click) ---- */
const flavorCards = document.querySelectorAll('.flavor-card');
flavorCards.forEach(card => {
  card.addEventListener('click', () => {
    flavorCards.forEach(c => c !== card && c.classList.remove('active'));
    card.classList.toggle('active');
  });
});

/* ---- floating bubbles background ---- */
const bubblesBg = document.getElementById('bubblesBg');
const BUBBLE_COUNT = 22;
for (let i = 0; i < BUBBLE_COUNT; i++) {
  const b = document.createElement('span');
  const size = 8 + Math.random() * 26;
  b.style.width = size + 'px';
  b.style.height = size + 'px';
  b.style.left = Math.random() * 100 + 'vw';
  const duration = 10 + Math.random() * 14;
  b.style.animationDuration = duration + 's';
  b.style.animationDelay = (Math.random() * duration) + 's';
  bubblesBg.appendChild(b);
}
