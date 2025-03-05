import { createContext, useContext } from 'react';

// Définition des couleurs de base
export const colors = {
  // Couleurs primaires de l'application
  primary: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
    950: '#2e1065',
  },
  
  // Couleurs pour le mode sombre (fond, surface, texte)
  dark: {
    background: '#10141e',
    surface: '#1e1e1e',
    surfaceHover: '#2a2a2a',
    surfaceActive: '#323232',
    border: '#333333',
    borderLight: '#444444',
    text: {
      primary: '#ffffff',
      secondary: '#a0a0a0',
      tertiary: '#6b6b6b',
      disabled: '#4a4a4a',
    },
  },
  
  // Couleurs pour les boutons d'arcade
  arcade: {
    blue: '#0000ff',
    green: '#00ff00',
    red: '#ff0000',
    purple: '#800080',
    white: '#ffffff',
    black: '#000000',
    yellow: '#ffff00',
    orange: '#ffa500',
    pink: '#ffc0cb',
    cyan: '#00ffff',
  },
  
  // Couleurs pour les boîtiers
  case: {
    black: '#333333',
    white: '#f5f5f5',
    gray: '#808080',
    red: '#8b0000',
    blue: '#000080',
    green: '#006400',
  },
  
  // Couleurs de statut
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
};

// Fonction utilitaire pour ajouter de l'opacité à une couleur
export const withOpacity = (color: string, opacity: number): string => {
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
};

// Définition du thème complet
export const theme = {
  colors,
  
  // Composants spécifiques
  components: {
    header: {
      background: colors.primary[900],
      text: colors.dark.text.primary,
    },
    footer: {
      background: colors.dark.surface,
      text: colors.dark.text.primary,
      secondaryText: colors.dark.text.secondary,
    },
    canvas: {
      background: 'transparent',
      border: 'transparent',
      borderWidth: '3px',
      text: colors.dark.text.primary,
      secondaryText: colors.dark.text.secondary,
    },
    sidebar: {
      background: colors.dark.surface,
      activeTab: {
        background: withOpacity(colors.primary[500], 0.25),
        border: colors.primary[300],
        borderWidth: '3px', // Épaisseur de la bordure des tabs actifs
        text: colors.primary[300],
      },
      inactiveTab: {
        background: 'transparent',
        text: colors.dark.text.secondary,
        hoverBackground: colors.dark.surfaceHover,
      },
    },
    button: {
      primary: {
        background: colors.primary[900],
        hoverBackground: colors.primary[700],
        text: colors.dark.text.primary,
      },
      secondary: {
        background: colors.dark.surfaceHover,
        hoverBackground: colors.dark.surfaceActive,
        text: colors.dark.text.primary,
      },
      danger: {
        background: colors.status.error,
        hoverBackground: '#dc2626', // Rouge plus foncé
        text: colors.dark.text.primary,
      },
    },
    card: {
      background: 'transparent',
      border: 'transparent',
      borderWidth: '3px', // Épaisseur de la bordure des cards
      text: colors.dark.text.primary,
      secondaryText: colors.dark.text.secondary,
    },
    input: {
      background: colors.dark.surfaceHover,
      border: colors.dark.border,
      text: colors.dark.text.primary,
      placeholder: colors.dark.text.tertiary,
      focus: {
        border: colors.primary[300],
        shadow: withOpacity(colors.primary[500], 0.25),
      },
    },
  },
  
  // Espacement et tailles
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  
  // Typographie
  typography: {
    fontFamily: {
      sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  
  // Bordures et ombres
  borders: {
    radius: {
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      full: '9999px',
    },
    width: {
      thin: '1px',
      medium: '2px',
      thick: '4px',
    },
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  
  // Transitions
  transitions: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// Contexte pour le thème
export const ThemeContext = createContext(theme);

// Hook pour utiliser le thème
export const useTheme = () => useContext(ThemeContext);

export default theme;