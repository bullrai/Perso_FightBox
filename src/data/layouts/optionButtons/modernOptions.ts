import { ButtonConfig } from '../../../types';
import { v4 as uuidv4 } from 'uuid';

// Modern console style option buttons
const modernOptionButtons: ButtonConfig[] = [
  {
    id: uuidv4(),
    type: 'button',
    x: 1000,
    y: 450,
    color: '#000000',
    size: 60,
    label: 'Options',
    isOption: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 1100,
    y: 450,
    color: '#000000',
    size: 60,
    label: 'Share',
    isOption: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 1000,
    y: 350,
    color: '#000000',
    size: 60,
    label: 'PS',
    isOption: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 1100,
    y: 350,
    color: '#000000',
    size: 60,
    label: 'Touch',
    isOption: true
  }
];

export default modernOptionButtons;