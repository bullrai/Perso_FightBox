import { ButtonConfig } from '../../types';
import { v4 as uuidv4 } from 'uuid';

// Venom Mayflash F500 layout
const venomF500Buttons: ButtonConfig[] = [
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
  // Action buttons in arcade layout (2 rows of 4)
  {
    id: uuidv4(),
    type: 'button',
    x: 500,
    y: 200,
    color: '#ff0000',
    size: 92,
    label: '1',
    isAction: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 600,
    y: 200,
    color: '#0000ff',
    size: 92,
    label: '2',
    isAction: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 700,
    y: 200,
    color: '#00ff00',
    size: 92,
    label: '3',
    isAction: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 800,
    y: 200,
    color: '#ffff00',
    size: 92,
    label: '4',
    isAction: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 500,
    y: 300,
    color: '#800080',
    size: 92,
    label: '5',
    isAction: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 600,
    y: 300,
    color: '#ffa500',
    size: 92,
    label: '6',
    isAction: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 700,
    y: 300,
    color: '#ffffff',
    size: 92,
    label: '7',
    isAction: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 800,
    y: 300,
    color: '#ffffff',
    size: 92,
    label: '8',
    isAction: true
  }
];

export default venomF500Buttons;