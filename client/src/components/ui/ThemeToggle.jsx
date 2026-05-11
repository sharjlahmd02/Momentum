import { useState } from 'react';

import {
  applyTheme,
} from '../../utils/theme';

function ThemeToggle() {

  const [theme, setTheme] =
    useState(
      localStorage.getItem('theme')
      || 'dark'
    );

  const toggleTheme = () => {

    const newTheme =
      theme === 'dark'
        ? 'light'
        : 'dark';

    setTheme(newTheme);

    applyTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className='px-4 py-2 rounded-lg border'
      style={{
        background:
          'var(--bg-secondary)',

        borderColor:
          'var(--border-color)',
      }}
    >
      {theme === 'dark'
        ? 'Dark'
        : 'Light'}
    </button>
  );
}

export default ThemeToggle;