/* ============================================================
   main.js — Portfolio Interactions & Animations
   ============================================================ */

// ── Navbar scroll effect ──────────────────────────────────────
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ── Active nav link on scroll ─────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

function setActiveLink() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', setActiveLink);

// ── AOS-like scroll reveal ────────────────────────────────────
function revealOnScroll() {
  document.querySelectorAll('[data-aos]').forEach(el => {
    const delay = el.dataset.aosDelay ? parseInt(el.dataset.aosDelay) : 0;
    const rect  = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      setTimeout(() => el.classList.add('aos-animate'), delay);
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // run once on load

// ── Typed text effect ─────────────────────────────────────────
const words   = ['DEVELOPER', 'DESIGNER', 'CREATOR'];
const target  = document.querySelector('.typed-text');
let   wi = 0, ci = 0, deleting = false;

function typeLoop() {
  if (!target) return;
  const word = words[wi];
  if (!deleting) {
    target.textContent = word.slice(0, ++ci);
    if (ci === word.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    target.textContent = word.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      wi = (wi + 1) % words.length;
    }
  }
  setTimeout(typeLoop, deleting ? 60 : 110);
}
typeLoop();

// ── Theme toggle ──────────────────────────────────────────────
const themeBtn = document.getElementById('themeToggle');

function applyTheme(isLight) {
  document.body.classList.toggle('light-mode', isLight);
  const icon = themeBtn ? themeBtn.querySelector('i') : null;
  if (icon) icon.className = isLight ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
}

// Restore saved preference on load
const savedTheme = localStorage.getItem('theme');
applyTheme(savedTheme === 'light');

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const isNowLight = !document.body.classList.contains('light-mode');
    applyTheme(isNowLight);
    localStorage.setItem('theme', isNowLight ? 'light' : 'dark');
  });
}

// ── Smooth close mobile menu on link click ───────────────────
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const collapse = document.getElementById('navMenu');
    if (collapse && collapse.classList.contains('show')) {
      const bsCollapse = bootstrap.Collapse.getInstance(collapse);
      if (bsCollapse) bsCollapse.hide();
    }
  });
});
