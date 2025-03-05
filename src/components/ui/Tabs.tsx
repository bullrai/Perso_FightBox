import React, { ReactNode, useState } from 'react';
import { useTheme } from '../../theme/theme';

interface Tab {
  id: string;
  label: ReactNode;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTabId?: string;
  onChange?: (tabId: string) => void;
  className?: string;
  tabsClassName?: string;
  contentClassName?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTabId,
  onChange,
  className = '',
  tabsClassName = '',
  contentClassName = '',
}) => {
  const theme = useTheme();
  const [activeTabId, setActiveTabId] = useState(defaultTabId || tabs[0]?.id);
  
  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId);
    if (onChange) {
      onChange(tabId);
    }
  };
  
  const activeTab = tabs.find(tab => tab.id === activeTabId);
  
  // Utiliser directement les valeurs du thème pour les styles
  const activeTabStyle = {
    backgroundColor: theme.components.sidebar.activeTab.background,
    borderBottomWidth: theme.components.sidebar.activeTab.borderWidth,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.components.sidebar.activeTab.border,
    color: theme.components.sidebar.activeTab.text
  };
  
  const inactiveTabStyle = {
    color: theme.components.sidebar.inactiveTab.text
  };
  
  const borderStyle = {
    borderColor: theme.colors.dark.border
  };
  
  return (
    <div className={`${className}`}>
      <div className={`flex border-b ${tabsClassName}`} style={borderStyle}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`
              flex-1 py-3 px-4 text-center font-medium
              ${activeTabId === tab.id ? 'border-b-2' : 'hover:bg-gray-700'}
            `}
            style={activeTabId === tab.id ? activeTabStyle : inactiveTabStyle}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className={`${contentClassName}`}>
        {activeTab?.content}
      </div>
    </div>
  );
};

export default Tabs;