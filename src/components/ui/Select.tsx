import React, { SelectHTMLAttributes } from 'react';
import { useTheme } from '../../theme/theme';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  helpText?: string;
  error?: string;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  label,
  helpText,
  error,
  className = '',
  ...props
}) => {
  const theme = useTheme();
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };
  
  // Utiliser directement les valeurs du thème pour les styles
  const selectStyle = {
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
      
      <select
        value={value}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:border-transparent"
        style={{
          ...selectStyle,
          ...(props.disabled ? { opacity: 0.6 } : {})
        }}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {helpText && !error && (
        <p className="text-xs mt-1" style={helpTextStyle}>{helpText}</p>
      )}
      
      {error && (
        <p className="text-xs mt-1" style={errorStyle}>{error}</p>
      )}
    </div>
  );
};

export default Select;