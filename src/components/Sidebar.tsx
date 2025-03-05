import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../theme/theme';
import { Button } from './ui';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, children }) => {
  const theme = useTheme();

  return (
    <div 
      className={`fixed top-[72px] bottom-0 z-30 transition-all duration-300 ease-in-out ${
        isOpen ? 'right-0' : '-right-[400px]'
      }`}
      style={{
        width: '400px',
        backgroundColor: theme.components.sidebar.background,
        borderLeft: `${theme.components.card.borderWidth} solid ${theme.components.card.border}`,
      }}
    >
      <Button
        onClick={onToggle}
        variant="ghost"
        className="absolute -left-14 top-4 p-2 rounded-l-md"
        style={{
          backgroundColor: theme.components.sidebar.background,
          borderWidth: theme.components.card.borderWidth,
          borderStyle: 'solid',
          borderColor: theme.components.card.border,
          borderRight: 'none',
        }}
      >
        {isOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </Button>

      <div className="h-full overflow-y-auto custom-scrollbar">
        {children}
      </div>
    </div>
  );
};

export default Sidebar;