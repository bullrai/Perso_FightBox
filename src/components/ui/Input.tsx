import React, { InputHTMLAttributes } from 'react';
import { useTheme } from '../../theme/theme';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string | number;
  onChange: (value: string) => void;
  label?: string;
  helpText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  label,
  helpText,
  error,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}) => {
  const theme = useTheme();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  
  // Utiliser directement les valeurs du thème pour les styles
  const inputStyle = {
    backgroundColor: theme.components.input.background,
    borderColor: error ? theme.colors.status.error : theme.components.input.border,
    color: theme.components.input.text
  };
  
  const labelStyle = {
    color: theme.colors.dark.text.secondary
  };
  
  const helpTextStyle = {
    color: theme.colors.dark.text.tertiary
  };
  
  const errorStyle = {
    color: theme.colors.status.error
  };
  
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium mb-1" style={labelStyle}>
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {leftIcon}
          </div>
        )}
        
        <input
          value={value}
          onChange={handleChange}
          className={`
            w-full px-3 py-2 border rounded-md focus:ring-2 focus:border-transparent
            ${leftIcon ? 'pl-10' : ''}
            ${rightIcon ? 'pr-10' : ''}
          `}
          style={{
            ...inputStyle,
            ...(props.disabled ? { opacity: 0.6 } : {})
          }}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>
      
      {helpText && !error && (
        <p className="text-xs mt-1" style={helpTextStyle}>{helpText}</p>
      )}
      
      {error && (
        <p className="text-xs mt-1" style={errorStyle}>{error}</p>
      )}
    </div>
  );
};

export default Input;