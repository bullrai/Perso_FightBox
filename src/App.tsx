import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ControllerConfig, ButtonConfig } from './types';
import { defaultConfig, calculatePrice } from './data/defaultConfig';
import ControllerCanvas from './components/ControllerCanvas';
import ButtonEditor from './components/ButtonEditor';
import ControllerEditor from './components/ControllerEditor';
import ExportOptions from './components/ExportOptions';
import { Gamepad2, Settings } from 'lucide-react';
import LanguageSelector from './components/LanguageSelector';
import { useTranslation } from 'react-i18next';
import { Tabs } from './components/ui';
import { useTheme } from './theme/theme';
import useThemeStyles from './hooks/useThemeStyles';
import Sidebar from './components/Sidebar';

function App() {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = useThemeStyles();
  
  const [controllerConfig, setControllerConfig] = useState<ControllerConfig>({
    ...defaultConfig,
    price: calculatePrice(defaultConfig)
  });
  const [selectedButtonId, setSelectedButtonId] = useState<string | null>(null);
  const [savedConfigs, setSavedConfigs] = useState<ControllerConfig[]>([]);
  const [activeTab, setActiveTab] = useState<'controller' | 'button'>('controller');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Load saved configurations from localStorage
  useEffect(() => {
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

  // Update price whenever configuration changes
  useEffect(() => {
    setControllerConfig(prev => ({
      ...prev,
      price: calculatePrice(prev)
    }));
  }, [controllerConfig.buttons, controllerConfig.caseColor]);

  // Update active tab when a button is selected or deselected
  useEffect(() => {
    if (selectedButtonId) {
      setActiveTab('button');
    }
  }, [selectedButtonId]);

  const selectedButton = controllerConfig.buttons.find(
    button => button.id === selectedButtonId
  ) || null;

  const handleUpdateConfig = (updatedConfig: ControllerConfig) => {
    setControllerConfig(updatedConfig);
    setSelectedButtonId(null);
  };

  const handleUpdateButton = (updatedButton: ButtonConfig) => {
    setControllerConfig(prev => ({
      ...prev,
      buttons: prev.buttons.map(button => 
        button.id === updatedButton.id ? updatedButton : button
      )
    }));
  };

  const handleMoveButton = (id: string, x: number, y: number) => {
    setControllerConfig(prev => ({
      ...prev,
      buttons: prev.buttons.map(button => 
        button.id === id ? { ...button, x, y } : button
      )
    }));
  };

  const handleAddButton = (buttonType: 'directional' | 'joystick' | 'action' | 'option') => {
    let newButton: ButtonConfig;
    
    switch (buttonType) {
      case 'joystick':
        newButton = {
          id: uuidv4(),
          type: 'joystick',
          x: Math.floor(controllerConfig.width / 2) - 200,
          y: Math.floor(controllerConfig.height / 2),
          color: '#000000',
          size: 92,
          label: `Joystick ${controllerConfig.buttons.filter(b => b.type === 'joystick').length + 1}`,
          isDirectional: true
        };
        break;
      case 'directional':
        newButton = {
          id: uuidv4(),
          type: 'button',
          x: Math.floor(controllerConfig.width / 2) - 200,
          y: Math.floor(controllerConfig.height / 2),
          color: '#000000',
          size: 92,
          label: `↑`,
          isDirectional: true
        };
        break;
      case 'option':
        newButton = {
          id: uuidv4(),
          type: 'button',
          x: Math.floor(controllerConfig.width / 2) + 200,
          y: Math.floor(controllerConfig.height / 2),
          color: '#ffffff',
          size: 60,
          label: `Option ${controllerConfig.buttons.filter(b => b.isOption).length + 1}`,
          isOption: true
        };
        break;
      case 'action':
      default:
        newButton = {
          id: uuidv4(),
          type: 'button',
          x: Math.floor(controllerConfig.width / 2),
          y: Math.floor(controllerConfig.height / 2),
          color: '#ff0000',
          size: 92,
          label: `Button ${controllerConfig.buttons.filter(b => b.isAction).length + 1}`,
          isAction: true
        };
        break;
    }
    
    setControllerConfig(prev => ({
      ...prev,
      buttons: [...prev.buttons, newButton]
    }));
    
    setSelectedButtonId(newButton.id);
    setActiveTab('button');
  };

  const handleDeleteButton = (id: string) => {
    setControllerConfig(prev => ({
      ...prev,
      buttons: prev.buttons.filter(button => button.id !== id)
    }));
    
    if (selectedButtonId === id) {
      setSelectedButtonId(null);
      setActiveTab('controller');
    }
  };

  const handleSaveConfig = (config: ControllerConfig) => {
    const configToSave = {
      ...config,
      id: config.id === 'default' ? uuidv4() : config.id
    };
    
    const updatedConfigs = [...savedConfigs, configToSave];
    setSavedConfigs(updatedConfigs);
    
    // Save to localStorage
    localStorage.setItem('arcadeControllerConfigs', JSON.stringify(updatedConfigs));
  };

  const handleLoadConfig = (config: ControllerConfig) => {
    setControllerConfig(config);
    setSelectedButtonId(null);
    setActiveTab('controller');
  };

  const handleDeleteConfig = (id: string) => {
    const updatedConfigs = savedConfigs.filter(config => config.id !== id);
    setSavedConfigs(updatedConfigs);
    
    // Update localStorage
    localStorage.setItem('arcadeControllerConfigs', JSON.stringify(updatedConfigs));
  };

  // Tabs configuration for controller/button editor
  const editorTabs = [
    {
      id: 'controller',
      label: (
        <div className="flex items-center justify-center gap-2">
          <Settings size={18} />
          {t('tabs.controller')}
        </div>
      ),
      content: (
        <div className="p-4">
          <ControllerEditor
            config={controllerConfig}
            onUpdateConfig={handleUpdateConfig}
          />
        </div>
      )
    },
    {
      id: 'button',
      label: (
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gray-400" />
          {t('tabs.buttons')}
        </div>
      ),
      content: (
        <div className="p-4">
          <ButtonEditor
            button={selectedButton}
            onUpdateButton={handleUpdateButton}
            onDeleteButton={handleDeleteButton}
            allButtons={controllerConfig.buttons}
            onSelectButton={setSelectedButtonId}
            onAddButton={handleAddButton}
          />
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen text-gray-100 bg-circle">
      <header className="text-white p-4 shadow-md fixed top-0 left-0 right-0 z-40" style={{ backgroundColor: styles.header.background, color: styles.header.text }}>
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gamepad2 size={28} />
            <h1 className="text-2xl font-bold">{t('app.title')}</h1>
          </div>
          <LanguageSelector />
        </div>
      </header>
      
      <main className="w-full pt-20 pb-6 px-4">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <ControllerCanvas
              config={controllerConfig}
              selectedButton={selectedButtonId}
              onSelectButton={setSelectedButtonId}
              onMoveButton={handleMoveButton}
              onAddButton={handleAddButton}
            />
          </div>
        </div>
      </main>

      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)}>
        <div className="space-y-6">
          <div className="rounded-lg shadow overflow-hidden border" style={{ 
            backgroundColor: theme.components.card.background,
            borderColor: theme.components.card.border,
            borderWidth: theme.components.card.borderWidth,
            color: theme.components.card.text
          }}>
            <Tabs 
              tabs={editorTabs} 
              defaultTabId={activeTab}
              onChange={(tabId) => setActiveTab(tabId as 'controller' | 'button')}
            />
          </div>

          <ExportOptions
            config={controllerConfig}
            onSaveConfig={handleSaveConfig}
            onLoadConfig={handleLoadConfig}
          />
        </div>
      </Sidebar>
      
      <footer className="text-white py-6 mt-12" style={{ backgroundColor: styles.footer.background, color: styles.footer.text }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Gamepad2 />
                {t('app.title')}
              </h2>
              <p className="mt-1" style={{ color: styles.footer.secondaryText }}>
                {t('app.subtitle')}
              </p>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm" style={{ color: styles.footer.secondaryText }}>
                {t('app.footer.copyright', { year: new Date().getFullYear() })}
              </p>
              <p className="text-xs mt-1" style={{ color: styles.footer.secondaryText }}>
                {t('app.footer.localSave')}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;