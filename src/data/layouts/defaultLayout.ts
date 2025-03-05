import { ButtonConfig } from '../../types';
import { v4 as uuidv4 } from 'uuid';

const defaultButtons: ButtonConfig[] = [
  {
    id: uuidv4(),
    type: 'joystick',
    x: 300,
    y: 250,
    color: '#000000',
    size: 92,
    label: 'Joystick 1',
    isDirectional: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 500,
    y: 200,
    color: '#ff0000',
    size: 92,
    label: 'A',
    isAction: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 600,
    y: 200,
    color: '#0000ff',
    size: 92,
    label: 'B',
    isAction: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 700,
    y: 200,
    color: '#00ff00',
    size: 92,
    label: 'X',
    isAction: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 800,
    y: 200,
    color: '#ffff00',
    size: 92,
    label: 'Y',
    isAction: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 500,
    y: 300,
    color: '#ffffff',
    size: 92,
    label: 'L',
    isAction: true
  },
  {
    id: uuidv4(),
    type: 'button',
    x: 600,
    y: 300,
    color: '#ffffff',
    size: 92,
    label: 'R',
    isAction: true
  }
];

export default defaultButtons;