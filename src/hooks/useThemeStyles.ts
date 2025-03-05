import { useMemo } from 'react';
import { useTheme } from '../theme/theme';

// Hook personnalisé pour générer des styles basés sur le thème
export const useThemeStyles = () => {
  const theme = useTheme();
  
  // Memoize les styles pour éviter des recalculs inutiles
  return useMemo(() => {
    return {
      // Styles pour les conteneurs principaux
      container: {
        background: theme.colors.dark.background,
        text: theme.colors.dark.text.primary,
      },
      
      // Styles pour l'en-tête
      header: {
        background: theme.components.header.background,
        text: theme.components.header.text,
      },
      
      // Styles pour le pied de page
      footer: {
        background: theme.components.footer.background,
        text: theme.components.footer.text,
        secondaryText: theme.components.footer.secondaryText,
      },
      
      // Styles pour les cartes et panneaux
      card: {
        background: theme.components.card.background,
        border: theme.components.card.border,
        text: theme.components.card.text,
        secondaryText: theme.components.card.secondaryText,
      },
      
      // Styles pour le canvas
      canvas: {
        background: theme.components.canvas.background,
        text: theme.components.canvas.text,
      },
      
      // Styles pour les onglets
      tabs: {
        active: {
          background: theme.components.sidebar.activeTab.background,
          border: theme.components.sidebar.activeTab.border,
          text: theme.components.sidebar.activeTab.text,
        },
        inactive: {
          background: theme.components.sidebar.inactiveTab.background,
          text: theme.components.sidebar.inactiveTab.text,
          hoverBackground: theme.components.sidebar.inactiveTab.hoverBackground,
        },
      },
      
      // Styles pour les boutons
      button: {
        primary: {
          background: theme.components.button.primary.background,
          hoverBackground: theme.components.button.primary.hoverBackground,
          text: theme.components.button.primary.text,
        },
        secondary: {
          background: theme.components.button.secondary.background,
          hoverBackground: theme.components.button.secondary.hoverBackground,
          text: theme.components.button.secondary.text,
        },
        danger: {
          background: theme.components.button.danger.background,
          hoverBackground: theme.components.button.danger.hoverBackground,
          text: theme.components.button.danger.text,
        },
      },
      
      // Styles pour les champs de formulaire
      input: {
        background: theme.components.input.background,
        border: theme.components.input.border,
        text: theme.components.input.text,
        placeholder: theme.components.input.placeholder,
        focus: {
          border: theme.components.input.focus.border,
          shadow: theme.components.input.focus.shadow,
        },
      },
      
      // Couleurs pour les boutons d'arcade
      arcadeButtons: theme.colors.arcade,
      
      // Couleurs pour les boîtiers
      casings: theme.colors.case,
    };
  }, [theme]);
};

export default useThemeStyles;