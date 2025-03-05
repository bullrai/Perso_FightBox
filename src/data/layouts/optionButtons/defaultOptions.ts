import { ButtonConfig } from '../../../types';
import { v4 as uuidv4 } from 'uuid';

// Default option buttons layout with 4 buttons
const defaultOptionButtons: ButtonConfig[] = [
  {
    id: uuidv4(),
    type: 'button',
    x: 1000,
    y: 200,
    color: '#ffffff',
    size: 60,
    label: 'Start',
    isOption: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 1100,
    y: 200,
    color: '#ffffff',
    size: 60,
    label: 'Select',
    isOption: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 1000,
    y: 300,
    color: '#ffffff',
    size: 60,
    label: 'Home',
    isOption: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 1100,
    y: 300,
    color: '#ffffff',
    size: 60,
    label: 'Share',
    isOption: true
  }
];

export default defaultOptionButtons;