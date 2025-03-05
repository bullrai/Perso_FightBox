import React, { useState, useRef } from 'react';
import { ControllerConfig } from '../types';
import { toPng, toJpeg } from 'html-to-image';
import { saveAs } from 'file-saver';
import { Download, Save, Upload } from 'lucide-react';
import SavedConfigs from './SavedConfigs';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import { Button, Card, Tabs } from './ui/index';
import { useTheme } from '../theme/theme';
import useThemeStyles from '../hooks/useThemeStyles';

interface ExportOptionsProps {
  config: ControllerConfig;
  onSaveConfig: (config: ControllerConfig) => void;
  onLoadConfig?: (config: ControllerConfig) => void;
}

const ExportOptions: React.FC<ExportOptionsProps> = ({ 
  config, 
  onSaveConfig,
  onLoadConfig 
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = useThemeStyles();
  
  const [configName, setConfigName] = useState(config.name);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showSavedConfigs, setShowSavedConfigs] = useState(false);
  const [savedConfigs, setSavedConfigs] = useState<ControllerConfig[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load saved configurations from localStorage
  React.useEffect(() => {
    const savedConfigsStr = localStorage.getItem('arcadeControllerConfigs');
    if (savedConfigsStr) {
      try {
        const configs = JSON.parse(savedConfigsStr);
        setSavedConfigs(configs);
      } catch (error) {
        console.error('Error loading saved configurations:', error);
      }
    }
  }, []);

  const exportPNG = () => {
    const element = document.getElementById('controller-svg');
    if (!element) return;
    
    toPng(element)
      .then((dataUrl) => {
        saveAs(dataUrl, `${config.name.replace(/\s+/g, '-').toLowerCase()}.png`);
      })
      .catch((error) => {
        console.error('Error exporting PNG:', error);
      });
  };

  const exportJPEG = () => {
    const element = document.getElementById('controller-svg');
    if (!element) return;
    
    toJpeg(element, { quality: 0.95 })
      .then((dataUrl) => {
        saveAs(dataUrl, `${config.name.replace(/\s+/g, '-').toLowerCase()}.jpg`);
      })
      .catch((error) => {
        console.error('Error exporting JPEG:', error);
      });
  };

  const exportJSON = () => {
    const dataStr = JSON.stringify(config, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    saveAs(dataUri, `${config.name.replace(/\s+/g, '-').toLowerCase()}.json`);
  };

  const handleSaveConfig = () => {
    onSaveConfig({
      ...config,
      name: configName
    });
    setShowSaveModal(false);
    
    // Update the saved configs list
    const savedConfigsStr = localStorage.getItem('arcadeControllerConfigs');
    if (savedConfigsStr) {
      try {
        const configs = JSON.parse(savedConfigsStr);
        setSavedConfigs(configs);
      } catch (error) {
        console.error('Error loading saved configurations:', error);
      }
    }
  };

  const handleLoadConfig = (loadedConfig: ControllerConfig) => {
    if (onLoadConfig) {
      onLoadConfig(loadedConfig);
    }
    setShowSavedConfigs(false);
  };

  const handleDeleteConfig = (id: string) => {
    const updatedConfigs = savedConfigs.filter(config => config.id !== id);
    setSavedConfigs(updatedConfigs);
    
    // Update localStorage
    localStorage.setItem('arcadeControllerConfigs', JSON.stringify(updatedConfigs));
  };

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedConfig = JSON.parse(content) as ControllerConfig;
        
        // Ensure the imported config has a unique ID
        const configToSave = {
          ...importedConfig,
          id: uuidv4()
        };
        
        // Save to localStorage
        const savedConfigsStr = localStorage.getItem('arcadeControllerConfigs');
        let updatedConfigs: ControllerConfig[] = [];
        
        if (savedConfigsStr) {
          try {
            updatedConfigs = [...JSON.parse(savedConfigsStr), configToSave];
          } catch (error) {
            updatedConfigs = [configToSave];
          }
        } else {
          updatedConfigs = [configToSave];
        }
        
        localStorage.setItem('arcadeControllerConfigs', JSON.stringify(updatedConfigs));
        setSavedConfigs(updatedConfigs);
        
        // Show the saved configs tab
        setShowSavedConfigs(true);
      } catch (error) {
        console.error('Error importing configuration:', error);
        alert('Invalid configuration file. Please try again with a valid JSON file.');
      }
    };
    
    reader.readAsText(file);
    
    // Reset the file input
    if (event.target) {
      event.target.value = '';
    }
  };

  // Tabs configuration for export/saved
  const exportTabs = [
    {
      id: 'export',
      label: (
        <div className="flex items-center justify-center gap-2">
          <Download size={18} />
          {t('tabs.export')}
        </div>
      ),
      content: (
        <div className="p-4">
          <div className="grid grid-cols-3 gap-2">
            <Button
              onClick={exportPNG}
              variant="secondary"
              size="md"
              leftIcon={<Download size={16} />}
            >
              PNG
            </Button>
            
            <Button
              onClick={exportJPEG}
              variant="secondary"
              size="md"
              leftIcon={<Download size={16} />}
            >
              JPEG
            </Button>
            
            <Button
              onClick={exportJSON}
              variant="secondary"
              size="md"
              leftIcon={<Download size={16} />}
            >
              JSON
            </Button>
          </div>
        </div>
      )
    },
    {
      id: 'saved',
      label: (
        <div className="flex items-center justify-center gap-2">
          <Save size={18} />
          {t('tabs.saved')}
        </div>
      ),
      content: (
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2">
              <Button
                onClick={handleImportClick}
                variant="secondary"
                size="sm"
                leftIcon={<Upload size={16} />}
              >
                {t('export.import')}
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".json"
                className="hidden"
              />
              <Button
                onClick={() => setShowSaveModal(true)}
                variant="primary"
                size="sm"
                leftIcon={<Save size={16} />}
              >
                {t('export.save')}
              </Button>
            </div>
          </div>
          
          <SavedConfigs
            savedConfigs={savedConfigs}
            onLoadConfig={handleLoadConfig}
            onDeleteConfig={handleDeleteConfig}
          />
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-lg shadow overflow-hidden border" style={{ 
        backgroundColor: styles.card.background, 
        borderWidth: theme.components.card.borderWidth,
        borderStyle: 'solid',
        borderColor: styles.card.border,
        color: styles.card.text
      }}>
        <Tabs 
          tabs={exportTabs} 
          defaultTabId={showSavedConfigs ? 'saved' : 'export'}
          onChange={(tabId) => setShowSavedConfigs(tabId === 'saved')}
        />
      </div>
      
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card title={t('export.saveConfig.title')} className="max-w-md w-full">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.dark.text.secondary }}>
                {t('export.saveConfig.name')}
              </label>
              <input
                type="text"
                value={configName}
                onChange={(e) => setConfigName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                style={{
                  backgroundColor: theme.components.input.background,
                  borderColor: theme.components.input.border,
                  color: theme.components.input.text
                }}
              />
            </div>
            
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => setShowSaveModal(false)}
                variant="secondary"
                size="md"
              >
                {t('export.saveConfig.cancel')}
              </Button>
              <Button
                onClick={handleSaveConfig}
                variant="primary"
                size="md"
              >
                {t('export.saveConfig.save')}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ExportOptions;