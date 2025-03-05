import React, { ButtonHTMLAttributes } from 'react';
import { useTheme } from '../../theme/theme';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isFullWidth?: boolean;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  isFullWidth = false,
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const theme = useTheme();
  
  // Définir les classes de taille
  let sizeClasses = '';
  
  switch (size) {
    case 'sm':
      sizeClasses = 'px-2 py-1 text-sm';
      break;
    case 'md':
      sizeClasses = 'px-4 py-2';
      break;
    case 'lg':
      sizeClasses = 'px-6 py-3 text-lg';
      break;
    default:
      sizeClasses = 'px-4 py-2';
  }
  
  // Définir les classes pour la largeur
  const widthClass = isFullWidth ? 'w-full' : '';
  
  // Définir les classes pour l'état désactivé
  const disabledClasses = disabled || isLoading ? 'opacity-60 cursor-not-allowed' : '';
  
  // Utiliser directement les valeurs du thème pour les styles
  const buttonStyle = {
    backgroundColor: variant === 'primary' 
      ? theme.components.button.primary.background 
      : variant === 'secondary' 
        ? theme.components.button.secondary.background 
        : variant === 'danger' 
          ? theme.components.button.danger.background 
          : 'transparent',
    color: variant === 'primary' 
      ? theme.components.button.primary.text 
      : variant === 'secondary' 
        ? theme.components.button.secondary.text 
        : variant === 'danger' 
          ? theme.components.button.danger.text 
          : theme.colors.dark.text.primary,
    borderColor: variant === 'outline' ? theme.colors.dark.border : undefined,
    border: variant === 'outline' ? '1px solid' : undefined
  };
  
  return (
    <button
      className={`
        ${sizeClasses}
        ${widthClass}
        ${disabledClasses}
        rounded-md font-medium transition-colors duration-200
        flex items-center justify-center gap-2
        ${className}
      `}
      style={buttonStyle}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {!isLoading && leftIcon && <span>{leftIcon}</span>}
      <span>{children}</span>
      {!isLoading && rightIcon && <span>{rightIcon}</span>}
    </button>
  );
};

export default Button;