const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
const yearEl = document.getElementById('year');
const brandLink = document.querySelector('.menubar-brand');
const expItems = document.querySelectorAll('.exp-item');
const projectItems = document.querySelectorAll('.project-item');

// --- Live clock ---
const datetimeEl = document.getElementById('menubar-datetime');
function updateClock() {
  if (!datetimeEl) return;
  const now = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = days[now.getDay()];
  const month = months[now.getMonth()];
  const date = now.getDate();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  datetimeEl.textContent = `${day} ${month} ${date}  ${hours}:${minutes} ${ampm}`;
}
updateClock();
setInterval(updateClock, 1000);

// --- Dark / Light mode ---
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
}
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const logoLink = document.querySelector('.menubar-logo');
[brandLink, logoLink].forEach((el) => {
  if (!el) return;
  el.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const allLinks = document.querySelectorAll('a[href^="#"]');
allLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

expItems.forEach((item) => {
  const toggle = item.querySelector('.exp-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const isOpen = item.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
});

projectItems.forEach((item) => {
  const toggle = item.querySelector('.project-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const isOpen = item.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
});
