const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
function syncTheme() {
  const dark = root.dataset.theme === 'dark';
  themeButton.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
  document.querySelector('meta[name="theme-color"]').content = '#b83b1e';
  document.querySelector('link[rel="icon"]').href = `assets/images/favicon-${dark ? 'dark' : 'light'}.svg`;
}
themeButton.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('portfolio-theme', root.dataset.theme); } catch {}
  syncTheme();
});
syncTheme();
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav');
function closeMenu() {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.lastElementChild.textContent = '+';
}
menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.lastElementChild.textContent = open ? '−' : '+';
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) { closeMenu(); menuButton.focus(); }
});
matchMedia('(min-width: 641px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
const preview = document.querySelector('.preview-dialog');
let previewTrigger;
document.querySelectorAll('[data-preview]').forEach(button => button.addEventListener('click', () => {
  previewTrigger = button;
  preview.querySelector('img').src = button.dataset.preview;
  preview.querySelector('img').alt = `${button.dataset.title} website screenshot`;
  preview.querySelector('h2').textContent = button.dataset.title;
  preview.showModal();
  document.body.classList.add('preview-open');
}));
preview.querySelector('.close-preview').addEventListener('click', () => preview.close());
preview.addEventListener('click', event => {
  const bounds = preview.getBoundingClientRect();
  if (event.target === preview && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) preview.close();
});
preview.addEventListener('close', () => {
  document.body.classList.remove('preview-open');
  previewTrigger?.focus({preventScroll:true});
});
document.querySelector('.contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = `Portfolio inquiry from ${data.get('name').trim()}`;
  const body = `Name: ${data.get('name').trim()}\nEmail: ${data.get('email').trim()}\n\n${data.get('message').trim()}`;
  window.location.href = `mailto:bausasrheyven@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
