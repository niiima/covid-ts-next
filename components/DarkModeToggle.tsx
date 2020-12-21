import React from 'react';
import useDarkMode from 'use-dark-mode';

const DarkModeToggle = () => {
  const darkMode = useDarkMode(false);

  return (
    <div>
      <button type="button" onClick={darkMode.disable}>
        ☀
      </button>
      <input type="checkbox" checked={darkMode.value} onChange={darkMode.toggle} hidden />
      <button type="button" onClick={darkMode.enable}>
        ☾
      </button>
    </div>
  );
};

export default DarkModeToggle;