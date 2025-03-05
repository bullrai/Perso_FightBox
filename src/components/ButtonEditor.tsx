import React, { useState } from 'react';
import { ButtonConfig } from '../types';
import { Joystick, MousePointer, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button, ColorPicker } from './ui/index';
import { useTheme } from '../theme/theme';
import useThemeStyles from '../hooks/useThemeStyles';

interface ButtonEditorProps {
  button: ButtonConfig | null;
  onUpdateButton: (updatedButton: ButtonConfig) => void;
  onDeleteButton: (id: string) => void;
  allButtons: ButtonConfig[];
  onSelectButton: (id: string | null) => void;
  onAddButton: (type: 'directional' | 'joystick' | 'action' | 'option') => void;
}

const ButtonEditor: React.FC<ButtonEditorProps> = ({
  button,
  onUpdateButton,
  onDeleteButton,
  allButtons,
  onSelectButton,
  onAddButton
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = useThemeStyles();
  
  const [editingLabelId, setEditingLabelId] = useState<string | null>(null);
  const [editingLabelValue, setEditingLabelValue] = useState<string>('');
  const [editingPositionId, setEditingPositionId] = useState<string | null>(null);
  const [editingPositionX, setEditingPositionX] = useState<number>(0);
  const [editingPositionY, setEditingPositionY] = useState<number>(0);

  const buttonColors = [
    { name: t('buttons.colors.blue'), value: '#0000ff' },
    { name: t('buttons.colors.green'), value: '#00ff00' },
    { name: t('buttons.colors.red'), value: '#ff0000' },
    { name: t('buttons.colors.purple'), value: '#800080' },
    { name: t('buttons.colors.white'), value: '#ffffff' },
    { name: t('buttons.colors.black'), value: '#000000' }
  ];

  const directionalButtons = allButtons.filter(btn => btn.isDirectional);
  const actionButtons = allButtons.filter(btn => btn.isAction);
  const optionButtons = allButtons.filter(btn => btn.isOption);

  const handleColorChange = (buttonId: string, color: string) => {
    const buttonToUpdate = allButtons.find(b => b.id === buttonId);
    if (buttonToUpdate) {
      onUpdateButton({
        ...buttonToUpdate,
        color
      });
    }
  };

  const startEditingLabel = (buttonId: string, currentLabel: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingLabelId(buttonId);
    setEditingLabelValue(currentLabel);
  };

  const saveLabel = (buttonId: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const buttonToUpdate = allButtons.find(b => b.id === buttonId);
    if (buttonToUpdate && editingLabelValue.trim() !== '') {
      onUpdateButton({
        ...buttonToUpdate,
        label: editingLabelValue.trim()
      });
    }
    setEditingLabelId(null);
  };

  const startEditingPosition = (buttonId: string, x: number, y: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingPositionId(buttonId);
    setEditingPositionX(x);
    setEditingPositionY(y);
  };

  const savePosition = (buttonId: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const buttonToUpdate = allButtons.find(b => b.id === buttonId);
    if (buttonToUpdate) {
      onUpdateButton({
        ...buttonToUpdate,
        x: editingPositionX,
        y: editingPositionY
      });
    }
    setEditingPositionId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, buttonId: string, type: 'label' | 'position') => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      if (type === 'label') {
        saveLabel(buttonId);
      } else {
        savePosition(buttonId);
      }
    } else if (e.key === 'Escape') {
      if (type === 'label') {
        setEditingLabelId(null);
      } else {
        setEditingPositionId(null);
      }
    }
  };

  const renderButtonItem = (btn: ButtonConfig) => {
    return (
      <div 
        key={btn.id} 
        className={`p-2 border rounded-md ${button && button.id === btn.id ? 'border-purple-500 bg-purple-900 bg-opacity-30' : 'border-gray-700'}`}
        onClick={() => onSelectButton(btn.id)}
        style={{
          borderColor: button && button.id === btn.id ? theme.colors.primary[500] : theme.colors.dark.border,
          backgroundColor: button && button.id === btn.id ? `${theme.colors.primary[900]}4D` : 'transparent'
        }}
      >
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center">
            <div 
              className="w-5 h-5 rounded-full mr-1" 
              style={{ backgroundColor: btn.color }}
            />
            
            {editingLabelId === btn.id ? (
              <form onSubmit={(e) => saveLabel(btn.id, e)} className="flex items-center">
                <input
                  type="text"
                  value={editingLabelValue}
                  onChange={(e) => setEditingLabelValue(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, btn.id, 'label')}
                  className="px-1 py-0.5 border rounded-md text-xs w-20"
                  style={{
                    backgroundColor: theme.components.input.background,
                    borderColor: theme.components.input.border,
                    color: theme.components.input.text
                  }}
                  autoFocus
                  onClick={(e) => e.stopPropagation()}
                />
                <Button 
                  type="submit"
                  variant="ghost"
                  size="sm"
                  className="ml-1 p-0.5 rounded-full"
                  style={{ color: theme.colors.status.success }}
                  onClick={(e) => {
                    e.stopPropagation();
                    saveLabel(btn.id);
                  }}
                />
              </form>
            ) : (
              <div className="flex items-center">
                <span 
                  className="font-medium text-sm cursor-pointer hover:text-blue-300"
                  onClick={(e) => startEditingLabel(btn.id, btn.label, e)}
                  title="Cliquez pour modifier"
                  style={{ color: theme.colors.dark.text.primary }}
                >
                  {btn.label}
                </span>
              </div>
            )}
          </div>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteButton(btn.id);
            }}
            variant="ghost"
            size="sm"
            className="p-0.5 rounded-full"
            style={{ color: theme.colors.status.error }}
            title="Supprimer le bouton"
          />
        </div>
        
        <div className="flex items-center text-xs">
          <select
            value={btn.color}
            onChange={(e) => handleColorChange(btn.id, e.target.value)}
            className="flex-1 px-1 py-0.5 border rounded-md text-xs"
            style={{
              backgroundColor: theme.components.input.background,
              borderColor: theme.components.input.border,
              color: theme.components.input.text
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {buttonColors.map((color) => (
              <option key={color.value} value={color.value}>
                {color.name}
              </option>
            ))}
          </select>
        </div>
        
        {button && button.id === btn.id && (
          <div className="mt-1 text-xs">
            {editingPositionId === btn.id ? (
              <form onSubmit={(e) => savePosition(btn.id, e)} className="flex items-center gap-1">
                <span style={{ color: theme.colors.dark.text.secondary }}>X:</span>
                <input
                  type="number"
                  value={editingPositionX}
                  onChange={(e) => setEditingPositionX(Number(e.target.value))}
                  onKeyDown={(e) => handleKeyDown(e, btn.id, 'position')}
                  className="px-1 py-0.5 border rounded-md text-xs w-14"
                  style={{
                    backgroundColor: theme.components.input.background,
                    borderColor: theme.components.input.border,
                    color: theme.components.input.text
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                <span style={{ color: theme.colors.dark.text.secondary }}>Y:</span>
                <input
                  type="number"
                  value={editingPositionY}
                  onChange={(e) => setEditingPositionY(Number(e.target.value))}
                  onKeyDown={(e) => handleKeyDown(e, btn.id, 'position')}
                  className="px-1 py-0.5 border rounded-md text-xs w-14"
                  style={{
                    backgroundColor: theme.components.input.background,
                    borderColor: theme.components.input.border,
                    color: theme.components.input.text
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                <Button 
                  type="submit"
                  variant="ghost"
                  size="sm"
                  className="p-0.5 rounded-full"
                  style={{ color: theme.colors.status.success }}
                  onClick={(e) => {
                    e.stopPropagation();
                    savePosition(btn.id);
                  }}
                />
              </form>
            ) : (
              <div className="flex items-center justify-between">
                <span 
                  className="cursor-pointer hover:text-blue-300" 
                  onClick={(e) => startEditingPosition(btn.id, btn.x, btn.y, e)}
                  style={{ color: theme.colors.primary[400] }}
                >
                  {t('buttons.position')}: X:{Math.round(btn.x)} Y:{Math.round(btn.y)}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderButtonSection = (title: string, buttons: ButtonConfig[], icon: React.ReactNode) => {
    if (buttons.length === 0) {
      return (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2 border-b pb-1" style={{ borderColor: theme.colors.dark.border }}>
            {icon}
            <h4 className="text-md font-medium" style={{ color: theme.colors.dark.text.primary }}>{title}</h4>
            <span className="text-xs" style={{ color: theme.colors.dark.text.secondary }}>(0)</span>
          </div>
          <p className="text-sm py-1" style={{ color: theme.colors.dark.text.secondary }}>{t('buttons.editor.noButtonsInCategory')}</p>
        </div>
      );
    }

    const halfLength = Math.ceil(buttons.length / 2);
    const leftColumnButtons = buttons.slice(0, halfLength);
    const rightColumnButtons = buttons.slice(halfLength);

    return (
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2 border-b pb-1" style={{ borderColor: theme.colors.dark.border }}>
          {icon}
          <h4 className="text-md font-medium" style={{ color: theme.colors.dark.text.primary }}>{title}</h4>
          <span className="text-xs" style={{ color: theme.colors.dark.text.secondary }}>({buttons.length})</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            {leftColumnButtons.map(renderButtonItem)}
          </div>
          <div className="space-y-2">
            {rightColumnButtons.map(renderButtonItem)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {renderButtonSection(t('buttons.editor.directional'), directionalButtons, <Joystick size={16} className="text-blue-400" />)}
        {renderButtonSection(t('buttons.editor.action'), actionButtons, <MousePointer size={16} className="text-red-400" />)}
        {renderButtonSection(t('buttons.editor.option'), optionButtons, <Settings size={16} className="text-green-400" />)}
        
        {allButtons.length === 0 && (
          <p className="text-center py-4" style={{ color: theme.colors.dark.text.secondary }}>{t('buttons.editor.noButtons')}</p>
        )}
      </div>
    </div>
  );
};

export default ButtonEditor;