import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

// Unified theme states: light, dark, winter (lighter), space (darker), coffee (warm/cozy)
const UNIFIED_THEMES = ['light', 'winter', 'dark', 'space', 'coffee'];

export function ThemeProvider({ children }) {
  const [unifiedTheme, setUnifiedTheme] = useState(() => {
    const saved = localStorage.getItem('unifiedTheme');
    return saved && UNIFIED_THEMES.includes(saved) ? saved : 'dark';
  });

  // Derive theme and isDark from unified theme
  const getThemeAndDark = (unified) => {
    switch (unified) {
      case 'light':
        return { theme: 'minimal', isDark: false };
      case 'dark':
        return { theme: 'minimal', isDark: true };
      case 'winter':
        return { theme: 'winter', isDark: false };
      case 'space':
        return { theme: 'space', isDark: true };
      case 'coffee':
        return { theme: 'coffee', isDark: false };
      default:
        return { theme: 'minimal', isDark: true };
    }
  };

  const { theme, isDark } = getThemeAndDark(unifiedTheme);

  useEffect(() => {
    localStorage.setItem('unifiedTheme', unifiedTheme);
    
    // Set dark mode class
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Set theme classes
    const allThemes = ['minimal', 'space', 'winter', 'coffee'];
    allThemes.forEach(t => {
      document.documentElement.classList.remove(`theme-${t}`);
    });
    document.documentElement.classList.add(`theme-${theme}`);
    document.documentElement.setAttribute('data-theme', theme);
  }, [unifiedTheme, theme, isDark]);

  const cycleTheme = () => {
    const currentIndex = UNIFIED_THEMES.indexOf(unifiedTheme);
    if (currentIndex === -1) {
      // If current theme is not in the list, default to first theme
      setUnifiedTheme(UNIFIED_THEMES[0]);
      return;
    }
    const nextIndex = (currentIndex + 1) % UNIFIED_THEMES.length;
    const nextTheme = UNIFIED_THEMES[nextIndex];
    setUnifiedTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ 
      isDark, 
      theme, 
      unifiedTheme,
      cycleTheme,
      // Legacy support - keeping these for backward compatibility if needed
      toggleDarkMode: cycleTheme,
      setTheme: () => {}, // No-op for backward compatibility
      themes: ['minimal', 'space', 'winter', 'coffee']
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

