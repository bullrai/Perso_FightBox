import React from 'react';
import { ControllerConfig } from '../types';
import { Trash2, Edit } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button, Card } from './ui/index';
import { useTheme } from '../theme/theme';
import useThemeStyles from '../hooks/useThemeStyles';

interface SavedConfigsProps {
  savedConfigs: ControllerConfig[];
  onLoadConfig: (config: ControllerConfig) => void;
  onDeleteConfig: (id: string) => void;
}

const SavedConfigs: React.FC<SavedConfigsProps> = ({
  savedConfigs,
  onLoadConfig,
  onDeleteConfig
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = useThemeStyles();
  
  if (savedConfigs.length === 0) {
    return (
      <Card>
        <p className="text-center py-4" style={{ color: theme.colors.dark.text.secondary }}>{t('saved.noConfigs')}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-2 h-auto">
      {savedConfigs.map((config) => (
        <div
          key={config.id}
          className="flex items-center justify-between p-2 rounded-md"
          style={{ backgroundColor: theme.colors.dark.surfaceHover }}
        >
          <div>
            <div className="font-medium" style={{ color: theme.colors.dark.text.primary }}>{config.name}</div>
            <div className="text-xs" style={{ color: theme.colors.dark.text.secondary }}>
              {config.buttons.length} {t('saved.buttons')}
            </div>
          </div>
          
          <div className="flex gap-1">
            <Button
              onClick={() => onLoadConfig(config)}
              variant="ghost"
              size="sm"
              title={t('saved.load')}
              leftIcon={<Edit size={16} className="text-blue-400" />}
            />
            <Button
              onClick={() => onDeleteConfig(config.id)}
              variant="ghost"
              size="sm"
              title={t('saved.delete')}
              leftIcon={<Trash2 size={16} className="text-red-400" />}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedConfigs;