/**
 * Header Component - App title, Theme Switcher, and Mobile History Toggle.
 */

export function renderHeader(onThemeToggle, onMobileHistoryToggle) {
  const header = document.createElement('header');
  header.className = 'calculator-header';

  header.innerHTML = `
    <div class="logo">
      <span class="logo-icon">🧮</span>
      <span class="logo-text">Calculator</span>
    </div>
    <div style="display: flex; gap: 0.5rem; align-items: center;">
      <button id="mobile-history-toggle" class="history-toggle-mobile-btn" aria-label="Toggle calculation history">
        📜
      </button>
      <button id="theme-toggle" class="theme-toggle-btn" aria-label="Toggle light/dark theme">
        <span class="theme-icon">☼</span>
      </button>
    </div>
  `;

  const themeBtn = header.querySelector('#theme-toggle');
  themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('antigravity_calc_theme', nextTheme);
    themeBtn.querySelector('.theme-icon').textContent = nextTheme === 'dark' ? '☼' : '☾';
    if (onThemeToggle) onThemeToggle(nextTheme);
  });

  const mobileHistBtn = header.querySelector('#mobile-history-toggle');
  mobileHistBtn.addEventListener('click', () => {
    if (onMobileHistoryToggle) onMobileHistoryToggle();
  });

  // Init theme icon
  const savedTheme = localStorage.getItem('antigravity_calc_theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeBtn.querySelector('.theme-icon').textContent = savedTheme === 'dark' ? '☼' : '☾';
  }

  return header;
}
