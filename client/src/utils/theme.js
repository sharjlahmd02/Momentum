export const applyTheme = (theme) => {

  const root =
    document.documentElement;

  if (theme === 'dark') {
    root.classList.add('dark');
  }

  else {
    root.classList.remove('dark');
  }

  localStorage.setItem(
    'theme',
    theme
  );
};

export const initializeTheme = () => {

  const savedTheme =
    localStorage.getItem('theme');

  if (savedTheme) {
    applyTheme(savedTheme);
  }

  else {

    // DEFAULT DARK MODE

    applyTheme('dark');
  }
};