document.addEventListener('DOMContentLoaded', function() {
  const root = document.documentElement;
  const stored = localStorage.getItem('theme');
  let theme = 'light';

  if (stored) {
    theme = stored;
  } else if (window.matchMedia) {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  root.setAttribute('data-theme', theme);
});