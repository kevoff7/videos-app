import { createContext, useState, useContext, useEffect } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  themeLight: boolean;
}

interface ContextProps {
  children: JSX.Element[] | JSX.Element;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => null,
  themeLight: false
});

export const ThemeProvider = ({ children }: ContextProps) => {
  const [theme, setTheme] = useState<any>(() => {
    return window.localStorage.getItem('theme') ?? 'dark';
  });
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const values: ThemeContextType = {
    theme,
    toggleTheme,
    themeLight: theme === 'light'
  };

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
