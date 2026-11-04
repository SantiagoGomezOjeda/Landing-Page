const menuButton = document.getElementById('menuButton');
const navLinks = document.getElementById('navLinks');
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Abrir menú' : 'Cerrar menú');
  navLinks.classList.toggle('open', !expanded);
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menú');
}));
document.getElementById('year').textContent = new Date().getFullYear();
