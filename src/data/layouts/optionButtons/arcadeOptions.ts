import { ButtonConfig } from '../../../types';
import { v4 as uuidv4 } from 'uuid';

// Arcade cabinet style option buttons
const arcadeOptionButtons: ButtonConfig[] = [
  {
    id: uuidv4(),
    type: 'button',
    x: 950,
    y: 400,
    color: '#ff0000',
    size: 60,
    label: '1P',
    isOption: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 1050,
    y: 400,
    color: '#0000ff',
    size: 60,
    label: '2P',
    isOption: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 1150,
    y: 400,
    color: '#ffff00',
    size: 60,
    label: 'Coin',
    isOption: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 1250,
    y: 400,
    color: '#00ff00',
    size: 60,
    label: 'Menu',
    isOption: true
  }
];

export default arcadeOptionButtons;