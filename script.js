const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
const yearEl = document.getElementById('year');
const expItems = document.querySelectorAll('.exp-item');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
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
    const isOpen = item.classList.contains('open');

    expItems.forEach((currentItem) => {
      const currentToggle = currentItem.querySelector('.exp-toggle');
      currentItem.classList.remove('open');
      if (currentToggle) currentToggle.setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      item.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });
});
