import React from 'react';
import { useTheme } from '../../theme/theme';

interface ColorOption {
  name: string;
  value: string;
}

interface ColorPickerProps {
  options: ColorOption[];
  value: string;
  onChange: (color: string) => void;
  className?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  options,
  value,
  onChange,
  className = '',
}) => {
  const theme = useTheme();
  
  // Utiliser les couleurs du thème pour le style de sélection
  const selectedRingStyle = {
    ringColor: theme.colors.primary[500],
    ringOffsetColor: theme.colors.dark.background
  };
  
  return (
    <div className={`grid grid-cols-6 gap-2 ${className}`}>
      {options.map((color) => (
        <div
          key={color.value}
          className={`w-8 h-8 rounded-full cursor-pointer ${
            value === color.value ? 'ring-2 ring-offset-2' : ''
          }`}
          style={{ 
            backgroundColor: color.value,
            ...(value === color.value ? { 
              '--tw-ring-color': selectedRingStyle.ringColor,
              '--tw-ring-offset-color': selectedRingStyle.ringOffsetColor
            } : {})
          }}
          onClick={() => onChange(color.value)}
          title={color.name}
        />
      ))}
    </div>
  );
};

export default ColorPicker;