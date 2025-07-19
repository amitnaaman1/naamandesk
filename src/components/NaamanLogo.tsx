import { Box } from '@mui/material';
import React from 'react';

interface NaamanLogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
  [key: string]: any;
}

const NaamanLogo: React.FC<NaamanLogoProps> = ({ 
  size = 'medium',
  showText = true,
  onClick,
  style = {},
  className = '',
  ...props 
}) => {
  // Size configurations
  const sizeConfig = {
    small: {
      nSize: 24,
      lineWidth: 16,
      lineHeight: 2,
      textSize: 16,
      subtextSize: 10,
      spacing: 8
    },
    medium: {
      nSize: 48,
      lineWidth: 32,
      lineHeight: 4,
      textSize: 30,
      subtextSize: 14,
      spacing: 16
    },
    large: {
      nSize: 72,
      lineWidth: 48,
      lineHeight: 6,
      textSize: 45,
      subtextSize: 21,
      spacing: 24
    }
  };

  const config = sizeConfig[size] || sizeConfig.medium;

  // SVG N Logo Component
  const NLogo = () => (
    <svg
      viewBox={`0 0 ${config.lineWidth + 8} ${config.nSize + config.lineHeight + 4}`}
      style={{
        width: config.lineWidth + 8,
        height: config.nSize + config.lineHeight + 4,
        marginRight: showText ? config.spacing : 0
      }}
    >
      <defs>
        <linearGradient id={`blueGrad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="1" />
          <stop offset="100%" stopColor="#1E3A8A" stopOpacity="1" />
        </linearGradient>
        <linearGradient id={`yellowGrad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" stopOpacity="1" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="1" />
        </linearGradient>
      </defs>
      
      {/* Bold N */}
      <text 
        x="0" 
        y={config.nSize * 0.75} 
        fontFamily="Arial, sans-serif" 
        fontSize={config.nSize} 
        fontWeight="900" 
        fill={`url(#blueGrad-${size})`}
      >
        N
      </text>
      
      {/* Yellow underline */}
      <rect 
        x="0" 
        y={config.nSize * 0.75 + 8} 
        width={config.lineWidth} 
        height={config.lineHeight} 
        fill={`url(#yellowGrad-${size})`} 
        rx={config.lineHeight / 2}
      />
    </svg>
  );

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    cursor: onClick ? 'pointer' : 'default',
    ...style
  };

  const textContainerStyles = {
    display: 'flex',
    flexDirection: 'column' as const
  };

  const mainTextStyles: React.CSSProperties = {
    fontSize: config.textSize,
    fontWeight: 'bold',
    color: '#1E3A8A',
    lineHeight: 1,
    fontFamily: 'Arial, sans-serif',
    margin: 0
  };

  const subTextStyles: React.CSSProperties = {
    fontSize: config.subtextSize,
    color: '#6B7280',
    fontWeight: 500,
    marginTop: 4,
    fontFamily: 'Arial, sans-serif',
    margin: '4px 0 0 0'
  };

  return (
    <Box
      style={containerStyles}
      className={className}
      onClick={onClick}
      {...props}
    >
      <NLogo />
      
      {showText && (
        <Box sx={textContainerStyles}>
          <span style={mainTextStyles}>
            נעמן
          </span>
          <span style={subTextStyles}>
            סוכנות לביטוח
          </span>
        </Box>
      )}
    </Box>
  );
};

export default NaamanLogo; 