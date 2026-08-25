const themeKey = 'questscore-theme';
let themeToggle = document.querySelector('[data-theme-toggle]');
if (!themeToggle) {
  themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.type = 'button';
  themeToggle.dataset.themeToggle = '';
  themeToggle.setAttribute('aria-pressed', 'false');
  const themeTarget = document.querySelector('.top-actions') || document.querySelector('.login-panel-inner') || document.querySelector('.profile-panel');
  themeTarget?.prepend(themeToggle);
}
function applyTheme(theme) {
  const dark = theme === 'dark';
  document.body.classList.toggle('dark-mode', dark);
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.innerHTML = dark ? '☀ <span>Light mode</span>' : '☾ <span>Dark mode</span>';
  }
}
applyTheme(localStorage.getItem(themeKey) || 'light');
themeToggle?.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
  localStorage.setItem(themeKey, nextTheme);
  applyTheme(nextTheme);
});
