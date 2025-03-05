import React from 'react';
import { ControllerConfig } from '../types';
import { caseColorOptions, layoutOptions, joystickLayoutOptions, actionButtonLayoutOptions, optionButtonLayoutOptions } from '../data/defaultConfig';
import { useTranslation } from 'react-i18next';
import { Input, Select, ColorPicker } from './ui/index';
import { useTheme } from '../theme/theme';
import useThemeStyles from '../hooks/useThemeStyles';

interface ControllerEditorProps {
  config: ControllerConfig;
  onUpdateConfig: (updatedConfig: ControllerConfig) => void;
}

const ControllerEditor: React.FC<ControllerEditorProps> = ({
  config,
  onUpdateConfig
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = useThemeStyles();
  
  const handleChange = (field: keyof ControllerConfig, value: any) => {
    onUpdateConfig({
      ...config,
      [field]: value
    });
  };

  const handleLayoutChange = (layoutId: string) => {
    const selectedLayout = layoutOptions.find(layout => layout.id === layoutId);
    if (selectedLayout) {
      onUpdateConfig({
        ...config,
        buttons: selectedLayout.buttons,
        name: selectedLayout.name,
        joystickLayoutId: layoutId,
        actionButtonLayoutId: layoutId
      });
    }
  };

  const handleJoystickLayoutChange = (layoutId: string) => {
    const selectedLayout = joystickLayoutOptions.find(layout => layout.id === layoutId);
    if (selectedLayout) {
      const nonDirectionalButtons = config.buttons.filter(button => 
        !button.isDirectional);
      
      onUpdateConfig({
        ...config,
        joystickLayoutId: layoutId,
        buttons: [...nonDirectionalButtons, ...selectedLayout.buttons]
      });
    }
  };

  const handleActionButtonLayoutChange = (layoutId: string) => {
    const selectedLayout = actionButtonLayoutOptions.find(layout => layout.id === layoutId);
    if (selectedLayout) {
      const otherButtons = config.buttons.filter(button => 
        button.isDirectional || button.isOption);
      
      onUpdateConfig({
        ...config,
        actionButtonLayoutId: layoutId,
        buttons: [...otherButtons, ...selectedLayout.buttons]
      });
    }
  };

  const handleOptionButtonLayoutChange = (layoutId: string) => {
    const selectedLayout = optionButtonLayoutOptions.find(layout => layout.id === layoutId);
    if (selectedLayout) {
      const otherButtons = config.buttons.filter(button => 
        button.isDirectional || button.isAction);
      
      onUpdateConfig({
        ...config,
        optionButtonLayoutId: layoutId,
        buttons: [...otherButtons, ...selectedLayout.buttons]
      });
    }
  };

  const joystickOptions = joystickLayoutOptions.map(layout => ({
    value: layout.id,
    label: layout.name
  }));

  const actionButtonOptions = actionButtonLayoutOptions.map(layout => ({
    value: layout.id,
    label: layout.name
  }));

  const optionButtonOptions = optionButtonLayoutOptions.map(layout => ({
    value: layout.id,
    label: layout.name
  }));

  return (
    <div className="space-y-4">
      <Input
        label={t('controller.editor.name')}
        value={config.name}
        onChange={(value) => handleChange('name', value)}
      />
      
      <Select
        label={t('controller.editor.joystickLayout')}
        value={config.joystickLayoutId || "default"}
        onChange={handleJoystickLayoutChange}
        options={joystickOptions}
      />
      
      <Select
        label={t('controller.editor.actionButtonLayout')}
        value={config.actionButtonLayoutId || "default"}
        onChange={handleActionButtonLayoutChange}
        options={actionButtonOptions}
      />
      
      <Select
        label={t('controller.editor.optionButtonLayout')}
        value={config.optionButtonLayoutId || "default"}
        onChange={handleOptionButtonLayoutChange}
        options={optionButtonOptions}
        helpText={t('controller.editor.optionButtonsHelp')}
      />
      
      <div>
        <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.dark.text.secondary }}>
          {t('controller.editor.caseColor')}
        </label>
        <ColorPicker
          options={caseColorOptions}
          value={config.caseColor}
          onChange={(color) => handleChange('caseColor', color)}
        />
      </div>
    </div>
  );
};

export default ControllerEditor;