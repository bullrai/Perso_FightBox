import React from 'react';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/Button';
import { useTheme } from '../theme/theme';

interface AddButtonsProps {
  onAddButton: (type: 'directional' | 'joystick' | 'action' | 'option') => void;
}

const AddButtons: React.FC<AddButtonsProps> = ({ onAddButton }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const buttonTypes = [
    {
      id: 'joystick',
      name: t('buttons.types.joystick.title'),
      color: theme.colors.primary[900]
    },
    {
      id: 'directional',
      name: t('buttons.types.directional.title'),
      color: theme.colors.primary[900]
    },
    {
      id: 'action',
      name: t('buttons.types.action.title'),
      color: theme.colors.primary[900]
    },
    {
      id: 'option',
      name: t('buttons.types.option.title'),
      color: theme.colors.primary[900]
    }
  ];

  return (
    <div className="flex justify-center mb-3 gap-2">
      {buttonTypes.map((type) => (
        <Button
          key={type.id}
          onClick={() => onAddButton(type.id as 'directional' | 'joystick' | 'action' | 'option')}
          variant="secondary"
          size="sm"
          className="flex items-center justify-center gap-2 px-3 py-2 w-[150px]"
          style={{
            backgroundColor: theme.colors.dark.surfaceHover,
            borderColor: theme.components.button.secondary.background,
            color: theme.components.button.secondary.text
          }}
        >
          <Plus size={20} className="mx-auto" style={{ color: type.color }} />
          <span className="font-medium">{type.name}</span>
        </Button>
      ))}
    </div>
  );
};

export default AddButtons;