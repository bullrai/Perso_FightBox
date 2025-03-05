import { ButtonConfig } from '../../types';
import { v4 as uuidv4 } from 'uuid';

// Hori Fighting Stick Alpha layout
const horiAlphaButtons: ButtonConfig[] = [
  // Joystick
  {
    id: uuidv4(),
    type: 'joystick',
    x: 250,
    y: 250,
    color: '#000000',
    size: 92,
    label: 'Joystick',
    isDirectional: true
  },
  // Action buttons in curved layout
  {
    id: uuidv4(),
    type: 'button',
    x: 500,
    y: 200,
    color: '#ffff00',
    size: 92,
    label: 'Y',
    isAction: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 600,
    y: 200,
    color: '#00ff00',
    size: 92,
    label: 'X',
    isAction: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 700,
    y: 200,
    color: '#ffffff',
    size: 92,
    label: 'LB',
    isAction: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 800,
    y: 200,
    color: '#ffffff',
    size: 92,
    label: 'RB',
    isAction: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 500,
    y: 300,
    color: '#ff0000',
    size: 92,
    label: 'B',
    isAction: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 600,
    y: 300,
    color: '#0000ff',
    size: 92,
    label: 'A',
    isAction: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 700,
    y: 300,
    color: '#ffffff',
    size: 92,
    label: 'LT',
    isAction: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 800,
    y: 300,
    color: '#ffffff',
    size: 92,
    label: 'RT',
    isAction: true
  }
];

export default horiAlphaButtons;