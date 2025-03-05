import React, { useRef, useState, useEffect } from 'react';
import { ControllerConfig, ButtonConfig } from '../types';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme/theme';
import useThemeStyles from '../hooks/useThemeStyles';
import AddButtons from './AddButtons';

interface ControllerCanvasProps {
  config: ControllerConfig;
  selectedButton: string | null;
  onSelectButton: (id: string | null) => void;
  onMoveButton: (id: string, x: number, y: number) => void;
  onAddButton?: (type: 'directional' | 'joystick' | 'action' | 'option') => void;
}

const ControllerCanvas: React.FC<ControllerCanvasProps> = ({
  config,
  selectedButton,
  onSelectButton,
  onMoveButton,
  onAddButton
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = useThemeStyles();
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [scale, setScale] = useState(1);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const calculateOptimalScale = (width: number, height: number) => {
    if (width === 0 || height === 0) return 1;

    const padding = 32;
    const availableWidth = width - (padding * 2);
    const availableHeight = height - (padding * 2);

    const widthRatio = availableWidth / config.width;
    const heightRatio = availableHeight / config.height;

    return Math.min(widthRatio, heightRatio, 1);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setContainerWidth(width);
        setContainerHeight(height);
        setScale(calculateOptimalScale(width, height));
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [config.width, config.height]);

  const handleMouseDown = (e: React.MouseEvent, buttonId: string) => {
    e.stopPropagation();
    onSelectButton(buttonId);
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSvgClick = () => {
    onSelectButton(null);
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
    return false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!selectedButton || !isDragging || !svgRef.current) return;
    
    const svgRect = svgRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(config.width, (e.clientX - svgRect.left) / scale));
    const y = Math.max(0, Math.min(config.height, (e.clientY - svgRect.top) / scale));
    
    onMoveButton(selectedButton, x, y);
  };

  const renderButton = (button: ButtonConfig) => {
    const isSelected = selectedButton === button.id;
    
    switch (button.type) {
      case 'joystick':
        return (
          <g
            key={button.id}
            transform={`translate(${button.x}, ${button.y})`}
            onMouseDown={(e) => handleMouseDown(e, button.id)}
            style={{ cursor: 'move' }}
          >
            <circle
              r={button.size / 2}
              fill={button.color}
              stroke={isSelected ? theme.colors.primary[500] : 'none'}
              strokeWidth={isSelected ? 3 : 0}
            />
            <circle
              r={button.size / 4}
              fill="#333"
            />
            <text
              textAnchor="middle"
              y={button.size / 2 + 15}
              fill="white"
              fontSize="12"
            >
              {button.label}
            </text>
          </g>
        );
      
      case 'dpad':
        return (
          <g
            key={button.id}
            transform={`translate(${button.x}, ${button.y})`}
            onMouseDown={(e) => handleMouseDown(e, button.id)}
            style={{ cursor: 'move' }}
          >
            <rect
              x={-button.size / 2}
              y={-button.size / 6}
              width={button.size}
              height={button.size / 3}
              fill={button.color}
              stroke={isSelected ? theme.colors.primary[500] : 'none'}
              strokeWidth={isSelected ? 3 : 0}
            />
            <rect
              x={-button.size / 6}
              y={-button.size / 2}
              width={button.size / 3}
              height={button.size}
              fill={button.color}
              stroke={isSelected ? theme.colors.primary[500] : 'none'}
              strokeWidth={isSelected ? 3 : 0}
            />
            <text
              textAnchor="middle"
              y={button.size / 2 + 15}
              fill="white"
              fontSize="12"
            >
              {button.label}
            </text>
          </g>
        );
      
      case 'button':
      default:
        return (
          <g
            key={button.id}
            transform={`translate(${button.x}, ${button.y})`}
            onMouseDown={(e) => handleMouseDown(e, button.id)}
            style={{ cursor: 'move' }}
          >
            <circle
              r={button.size / 2}
              fill={button.color}
              stroke={isSelected ? theme.colors.primary[500] : 'none'}
              strokeWidth={isSelected ? 3 : 0}
            />
            <text
              textAnchor="middle"
              dominantBaseline="middle"
              fill={button.color === '#ffffff' || button.color === '#ffff00' ? '#000' : '#fff'}
              fontSize="14"
              fontWeight="bold"
            >
              {button.label}
            </text>
          </g>
        );
    }
  };

  const scaledWidth = config.width * scale;
  const scaledHeight = config.height * scale;

  return (
    <div 
      ref={containerRef}
      className="w-full h-[calc(100vh-180px)] rounded-lg p-4 flex flex-col"
      style={{ 
        backgroundColor: theme.components.canvas.background,
        color: theme.components.canvas.text,
        borderWidth: theme.components.canvas.borderWidth,
        borderStyle: 'solid',
        borderColor: theme.components.canvas.border,
        boxShadow: theme.shadows.lg
      }}
    >
      {onAddButton && <AddButtons onAddButton={onAddButton} />}
      
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <div 
          style={{ 
            width: scaledWidth, 
            height: scaledHeight,
          }}
        >
          <svg
            ref={svgRef}
            width={scaledWidth}
            height={scaledHeight}
            viewBox={`0 0 ${config.width} ${config.height}`}
            onClick={handleSvgClick}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onDragStart={handleDragStart}
            className="mx-auto"
            id="controller-svg"
            style={{ transformOrigin: 'center' }}
            preserveAspectRatio="xMidYMid meet"
          >
            <rect
              x="0"
              y="0"
              width={config.width}
              height={config.height}
              rx="20"
              ry="20"
              fill={config.caseColor}
              stroke={theme.colors.dark.border}
              strokeWidth="2"
            />
            
            {config.buttons.map(renderButton)}
          </svg>
        </div>
      </div>
      
      <div className="mt-3 text-center text-sm">
        <p>{t('controller.canvas.help')}</p>
      </div>
    </div>
  );
};

export default ControllerCanvas;