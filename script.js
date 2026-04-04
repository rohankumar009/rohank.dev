const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
const yearEl = document.getElementById('year');
const brandLink = document.querySelector('.brand');
const themeToggle = document.getElementById('theme-toggle');
const menuClock = document.getElementById('menu-clock');
const expItems = document.querySelectorAll('.exp-item');
const projectItems = document.querySelectorAll('.project-item');
const root = document.documentElement;
const themeStorageKey = 'rohank-theme';

function formatMenuClock(date) {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const hours24 = date.getHours();
  const hours12 = hours24 % 12 || 12;
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const meridiem = hours24 >= 12 ? 'PM' : 'AM';

  return `${weekdays[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()}  ${hours12}:${minutes} ${meridiem}`;
}

function updateMenuClock() {
  if (!menuClock) return;
  menuClock.textContent = formatMenuClock(new Date());
}

function applyTheme(theme) {
  const isDark = theme === 'dark';
  root.setAttribute('data-theme', isDark ? 'dark' : 'light');

  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

function initializeTheme() {
  const savedTheme = window.localStorage.getItem(themeStorageKey);
  const preferredTheme = savedTheme
    || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  applyTheme(preferredTheme);
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

initializeTheme();
updateMenuClock();
window.setInterval(updateMenuClock, 1000);

if (brandLink) {
  brandLink.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

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

  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) {
      mobileMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    window.localStorage.setItem(themeStorageKey, nextTheme);
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
