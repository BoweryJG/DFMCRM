import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2C3E50',
      light: '#34495E',
      dark: '#1A252F',
    },
    secondary: {
      main: '#E74C3C',
      light: '#EC7063',
      dark: '#C0392B',
    },
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C3E50',
      secondary: '#5D6D7E',
    },
    grey: {
      50: '#FAFBFC',
      100: '#F4F6F8',
      200: '#E9ECEF',
      300: '#DEE2E6',
      400: '#CED4DA',
      500: '#ADB5BD',
      600: '#6C757D',
      700: '#495057',
      800: '#343A40',
      900: '#212529',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 1px 3px rgba(0, 0, 0, 0.05)',
    '0px 2px 4px rgba(0, 0, 0, 0.05)',
    '0px 3px 6px rgba(0, 0, 0, 0.07)',
    '0px 4px 8px rgba(0, 0, 0, 0.07)',
    '0px 5px 10px rgba(0, 0, 0, 0.08)',
    '0px 6px 12px rgba(0, 0, 0, 0.08)',
    '0px 7px 14px rgba(0, 0, 0, 0.09)',
    '0px 8px 16px rgba(0, 0, 0, 0.09)',
    '0px 9px 18px rgba(0, 0, 0, 0.10)',
    '0px 10px 20px rgba(0, 0, 0, 0.10)',
    '0px 11px 22px rgba(0, 0, 0, 0.11)',
    '0px 12px 24px rgba(0, 0, 0, 0.11)',
    '0px 13px 26px rgba(0, 0, 0, 0.12)',
    '0px 14px 28px rgba(0, 0, 0, 0.12)',
    '0px 15px 30px rgba(0, 0, 0, 0.13)',
    '0px 16px 32px rgba(0, 0, 0, 0.13)',
    '0px 17px 34px rgba(0, 0, 0, 0.14)',
    '0px 18px 36px rgba(0, 0, 0, 0.14)',
    '0px 19px 38px rgba(0, 0, 0, 0.15)',
    '0px 20px 40px rgba(0, 0, 0, 0.15)',
    '0px 21px 42px rgba(0, 0, 0, 0.16)',
    '0px 22px 44px rgba(0, 0, 0, 0.16)',
    '0px 23px 46px rgba(0, 0, 0, 0.17)',
    '0px 24px 48px rgba(0, 0, 0, 0.17)',
  ],
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3498DB',
      light: '#5DADE2',
      dark: '#2874A6',
    },
    secondary: {
      main: '#E74C3C',
      light: '#EC7063',
      dark: '#C0392B',
    },
    background: {
      default: '#0F1419',
      paper: '#1C2833',
    },
    text: {
      primary: '#E8EAED',
      secondary: '#9AA0A6',
    },
    grey: {
      50: '#1C2833',
      100: '#212F3C',
      200: '#273746',
      300: '#2C3E50',
      400: '#34495E',
      500: '#5D6D7E',
      600: '#7F8C8D',
      700: '#95A5A6',
      800: '#BDC3C7',
      900: '#D5D8DC',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 1px 3px rgba(0, 0, 0, 0.2)',
    '0px 2px 4px rgba(0, 0, 0, 0.2)',
    '0px 3px 6px rgba(0, 0, 0, 0.22)',
    '0px 4px 8px rgba(0, 0, 0, 0.22)',
    '0px 5px 10px rgba(0, 0, 0, 0.24)',
    '0px 6px 12px rgba(0, 0, 0, 0.24)',
    '0px 7px 14px rgba(0, 0, 0, 0.26)',
    '0px 8px 16px rgba(0, 0, 0, 0.26)',
    '0px 9px 18px rgba(0, 0, 0, 0.28)',
    '0px 10px 20px rgba(0, 0, 0, 0.28)',
    '0px 11px 22px rgba(0, 0, 0, 0.30)',
    '0px 12px 24px rgba(0, 0, 0, 0.30)',
    '0px 13px 26px rgba(0, 0, 0, 0.32)',
    '0px 14px 28px rgba(0, 0, 0, 0.32)',
    '0px 15px 30px rgba(0, 0, 0, 0.34)',
    '0px 16px 32px rgba(0, 0, 0, 0.34)',
    '0px 17px 34px rgba(0, 0, 0, 0.36)',
    '0px 18px 36px rgba(0, 0, 0, 0.36)',
    '0px 19px 38px rgba(0, 0, 0, 0.38)',
    '0px 20px 40px rgba(0, 0, 0, 0.38)',
    '0px 21px 42px rgba(0, 0, 0, 0.40)',
    '0px 22px 44px rgba(0, 0, 0, 0.40)',
    '0px 23px 46px rgba(0, 0, 0, 0.42)',
    '0px 24px 48px rgba(0, 0, 0, 0.42)',
  ],
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};