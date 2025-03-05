import React, { ReactNode } from 'react';
import { useTheme } from '../../theme/theme';

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  footer?: ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  footer,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
}) => {
  const theme = useTheme();
  
  // Utiliser directement les valeurs du thème pour les styles
  const cardStyle = {
    backgroundColor: theme.components.card.background,
    borderColor: theme.components.card.border,
    borderWidth: theme.components.card.borderWidth,
    color: theme.components.card.text
  };
  
  const headerStyle = {
    borderColor: theme.colors.dark.border
  };
  
  const footerStyle = {
    borderColor: theme.colors.dark.border
  };
  
  return (
    <div 
      className={`rounded-lg shadow overflow-hidden border ${className}`}
      style={cardStyle}
    >
      {(title || subtitle) && (
        <div 
          className={`p-4 border-b ${headerClassName}`}
          style={headerStyle}
        >
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {subtitle && <p className="text-sm mt-1" style={{ color: theme.components.card.secondaryText }}>{subtitle}</p>}
        </div>
      )}
      
      <div className={`p-4 ${bodyClassName}`}>
        {children}
      </div>
      
      {footer && (
        <div 
          className={`p-4 border-t ${footerClassName}`}
          style={footerStyle}
        >
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;