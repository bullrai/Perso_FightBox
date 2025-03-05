export interface ButtonConfig {
  id: string;
  type: 'joystick' | 'button' | 'dpad';
  x: number;
  y: number;
  color: string;
  size: number;
  label: string;
  isDirectional?: boolean;
  isAction?: boolean;
  isOption?: boolean;
}

export interface ControllerConfig {
  id: string;
  name: string;
  caseColor: string;
  buttons: ButtonConfig[];
  width: number;
  height: number;
  price: number;
  joystickLayoutId?: string;
  actionButtonLayoutId?: string;
  optionButtonLayoutId?: string;
}

export interface ColorOption {
  name: string;
  value: string;
}

export interface ButtonTypeOption {
  name: string;
  value: 'joystick' | 'button' | 'dpad';
}

export interface LayoutOption {
  id: string;
  name: string;
  buttons: ButtonConfig[];
  description: string;
}