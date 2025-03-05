import { ControllerConfig, ButtonConfig, LayoutOption } from '../types';
import defaultButtons from './layouts/defaultLayout';
import hitboxButtons from './layouts/hitboxLayout';
import horiAlphaButtons from './layouts/horiAlphaLayout';
import venomF500Buttons from './layouts/venomF500Layout';
import defaultOptionButtons from './layouts/optionButtons/defaultOptions';
import arcadeOptionButtons from './layouts/optionButtons/arcadeOptions';
import modernOptionButtons from './layouts/optionButtons/modernOptions';
import { colors } from '../theme/theme';

export const themeColors = {
  buttons: colors.arcade,
  cases: colors.case
};

export const defaultConfig: ControllerConfig = {
  id: 'default',
  name: 'Default Controller',
  caseColor: '#333333',
  buttons: defaultButtons,
  width: 1322, // Largeur demandée
  height: 548, // Hauteur demandée
  price: 149.99,
  joystickLayoutId: 'default',
  actionButtonLayoutId: 'default',
  optionButtonLayoutId: 'default'
};

export const layoutOptions: LayoutOption[] = [
  { 
    id: 'default', 
    name: 'Default Layout', 
    buttons: defaultButtons,
    description: 'Configuration standard avec joystick et boutons'
  },
  { 
    id: 'hitbox', 
    name: 'Hitbox Style', 
    buttons: hitboxButtons,
    description: 'Tous les boutons, sans joystick (style Hitbox)'
  },
  { 
    id: 'hori-alpha', 
    name: 'Hori Fighting Stick Alpha', 
    buttons: horiAlphaButtons,
    description: 'Joystick et boutons en disposition Hori Alpha'
  },
  { 
    id: 'venom-f500', 
    name: 'Venom Mayflash F500', 
    buttons: venomF500Buttons,
    description: 'Style arcade avec joystick et 8 boutons'
  }
];

// Extract directional buttons from layouts
const getDirectionalButtons = (layoutId: string): ButtonConfig[] => {
  switch (layoutId) {
    case 'hitbox':
      return hitboxButtons.filter(button => 
        button.type === 'button' && ['↑', '↓', '←', '→'].includes(button.label)
      ).map(button => ({ ...button, isDirectional: true }));
    case 'hori-alpha':
      return horiAlphaButtons.filter(button => 
        button.type === 'joystick'
      ).map(button => ({ ...button, isDirectional: true }));
    case 'venom-f500':
      return venomF500Buttons.filter(button => 
        button.type === 'joystick'
      ).map(button => ({ ...button, isDirectional: true }));
    case 'default':
    default:
      return defaultButtons.filter(button => 
        button.type === 'joystick'
      ).map(button => ({ ...button, isDirectional: true }));
  }
};

// Extract action buttons from layouts
const getActionButtons = (layoutId: string): ButtonConfig[] => {
  switch (layoutId) {
    case 'hitbox':
      return hitboxButtons.filter(button => 
        !['↑', '↓', '←', '→'].includes(button.label)
      ).map(button => ({ ...button, isAction: true }));
    case 'hori-alpha':
      return horiAlphaButtons.filter(button => 
        button.type !== 'joystick'
      ).map(button => ({ ...button, isAction: true }));
    case 'venom-f500':
      return venomF500Buttons.filter(button => 
        button.type !== 'joystick'
      ).map(button => ({ ...button, isAction: true }));
    case 'default':
    default:
      return defaultButtons.filter(button => 
        button.type !== 'joystick'
      ).map(button => ({ ...button, isAction: true }));
  }
};

export const joystickLayoutOptions: LayoutOption[] = [
  {
    id: 'default',
    name: 'Default Joystick',
    buttons: getDirectionalButtons('default'),
    description: 'Standard joystick configuration'
  },
  {
    id: 'hitbox',
    name: 'Hitbox Directional',
    buttons: getDirectionalButtons('hitbox'),
    description: 'Boutons directionnels style Hitbox'
  },
  {
    id: 'hori-alpha',
    name: 'Hori Alpha Joystick',
    buttons: getDirectionalButtons('hori-alpha'),
    description: 'Joystick style Hori Alpha'
  },
  {
    id: 'venom-f500',
    name: 'Venom F500 Joystick',
    buttons: getDirectionalButtons('venom-f500'),
    description: 'Joystick style Venom F500'
  }
];

export const actionButtonLayoutOptions: LayoutOption[] = [
  {
    id: 'default',
    name: 'Default Buttons',
    buttons: getActionButtons('default'),
    description: 'Standard button configuration'
  },
  {
    id: 'hitbox',
    name: 'Hitbox Buttons',
    buttons: getActionButtons('hitbox'),
    description: 'Boutons style Hitbox'
  },
  {
    id: 'hori-alpha',
    name: 'Hori Alpha Buttons',
    buttons: getActionButtons('hori-alpha'),
    description: 'Boutons style Hori Alpha'
  },
  {
    id: 'venom-f500',
    name: 'Venom F500 Buttons',
    buttons: getActionButtons('venom-f500'),
    description: 'Boutons style Venom F500'
  }
];

export const optionButtonLayoutOptions: LayoutOption[] = [
  {
    id: 'default',
    name: 'Default Options',
    buttons: defaultOptionButtons,
    description: 'Standard option buttons (Start, Select, etc.)'
  },
  {
    id: 'arcade',
    name: 'Arcade Options',
    buttons: arcadeOptionButtons,
    description: 'Arcade cabinet style option buttons (1P, 2P, Coin, etc.)'
  },
  {
    id: 'modern',
    name: 'Modern Console',
    buttons: modernOptionButtons,
    description: 'Modern console style option buttons (Options, Share, etc.)'
  }
];

export const colorOptions = [
  { name: 'Black', value: themeColors.buttons.black },
  { name: 'White', value: themeColors.buttons.white },
  { name: 'Red', value: themeColors.buttons. red },
  { name: 'Blue', value: themeColors.buttons.blue },
  { name: 'Green', value: themeColors.buttons.green },
  { name: 'Yellow', value: themeColors.buttons.yellow },
  { name: 'Purple', value: themeColors.buttons.purple },
  { name: 'Orange', value: themeColors.buttons.orange },
  { name: 'Pink', value: themeColors.buttons.pink },
  { name: 'Cyan', value: themeColors.buttons.cyan }
];

export const caseColorOptions = [
  { name: 'Black', value: themeColors.cases.black },
  { name: 'White', value: themeColors.cases.white },
  { name: 'Gray', value: themeColors.cases.gray },
  { name: 'Red', value: themeColors.cases.red },
  { name: 'Blue', value: themeColors.cases.blue },
  { name: 'Green', value: themeColors.cases.green }
];

export const buttonTypeOptions = [
  { name: 'Button', value: 'button' },
  { name: 'Joystick', value: 'joystick' },
  { name: 'D-Pad', value: 'dpad' }
];

// Calculate base price and additional costs
export const calculatePrice = (config: ControllerConfig): number => {
  const basePrice = 99.99;
  const buttonPrice = config.buttons.length * 5.99;
  const joystickCount = config.buttons.filter(b => b.type === 'joystick').length;
  const joystickPrice = joystickCount * 15.99;
  
  return basePrice + buttonPrice + joystickPrice;
};