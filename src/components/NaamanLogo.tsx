import { Box } from '@mui/material';
import React from 'react';

interface NaamanLogoProps {
  size?: 'small' | 'small-medium' | 'medium' | 'large';
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
    'small-medium': {
      nSize: 36,
      lineWidth: 24,
      lineHeight: 4,
      textSize: 24,
      subtextSize: 16,
      spacing: 12
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

  // CSS N Logo Component
  const NLogo = () => (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-block',
        marginInlineEnd: showText ? "10px" : 0,
        minWidth: config.lineWidth,
        minHeight: config.nSize + config.lineHeight + 8,
      }}
    >
      {/* Bold N with gradient */}
      <Box
        component="span"
        sx={{
          fontSize: config.nSize,
          fontWeight: 900,
          fontFamily: 'Arial, Helvetica, sans-serif',
          background: 'linear-gradient(135deg, #2563EB 0%, #1E3A8A 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'block',
          lineHeight: 1,
          position: 'relative',
          zIndex: 2,
        }}
      >
        N
      </Box>
      
      {/* Yellow underline */}
      <Box
        sx={{
          position: 'absolute',
          bottom: "4px",
          left: 0,
          width: config.lineWidth,
          height: config.lineHeight,
          background: 'linear-gradient(135deg, #FDE047 0%, #F59E0B 100%)',
          borderRadius: config.lineHeight / 2,
          zIndex: 1,
        }}
      />
    </Box>
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
    fontFamily: 'Arial, Helvetica, sans-serif',
    margin: 0
  };

  const subTextStyles: React.CSSProperties = {
    fontSize: config.subtextSize,
    color: '#6B7280',
    fontWeight: 500,
    fontFamily: 'Arial, Helvetica, sans-serif',
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