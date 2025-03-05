import { ButtonConfig } from '../../types';
import { v4 as uuidv4 } from 'uuid';

// Hitbox layout - All buttons, no joystick
const hitboxButtons: ButtonConfig[] = [
  // Directional buttons
  {
    id: uuidv4(),
    type: 'button',
    x: 200,
    y: 200,
    color: '#000000',
    size: 92,
    label: '↑',
    isDirectional: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 120,
    y: 280,
    color: '#000000',
    size: 92,
    label: '←',
    isDirectional: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 200,
    y: 280,
    color: '#000000',
    size: 92,
    label: '↓',
    isDirectional: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 280,
    y: 280,
    color: '#000000',
    size: 92,
    label: '→',
    isDirectional: true
  },
  // Action buttons
  {
    id: uuidv4(),
    type: 'button',
    x: 500,
    y: 200,
    color: '#ff0000',
    size: 92,
    label: 'P',
    isAction: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 600,
    y: 200,
    color: '#ff0000',
    size: 92,
    label: 'P',
    isAction: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 700,
    y: 200,
    color: '#ff0000',
    size: 92,
    label: 'P',
    isAction: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 800,
    y: 200,
    color: '#ff0000',
    size: 92,
    label: 'P',
    isAction: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 500,
    y: 300,
    color: '#0000ff',
    size: 92,
    label: 'K',
    isAction: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 600,
    y: 300,
    color: '#0000ff',
    size: 92,
    label: 'K',
    isAction: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 700,
    y: 300,
    color: '#0000ff',
    size: 92,
    label: 'K',
    isAction: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 800,
    y: 300,
    color: '#0000ff',
    size: 92,
    label: 'K',
    isAction: true
  }
];

export default hitboxButtons;