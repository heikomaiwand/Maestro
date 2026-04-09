import React, { useState, useEffect } from 'react';

// Generic placeholder using the Figma selection style (rounded box, shadow)
export const GenericSurfacePlaceholder = ({ label, type = 'generic', customStyle = {} }) => {
  let aspectRatio = '16 / 9';
  let wide = true;

  if (type === 'desktop') {
    aspectRatio = '640 / 410';
    wide = true;
  } else if (type === 'mobile') {
    aspectRatio = '412 / 917';
    wide = false;
  } else if (type === 'square') {
    aspectRatio = '1 / 1';
    wide = true;
  } else if (type === 'tv') {
    aspectRatio = '16 / 9';
    wide = true;
  }

  return (
    <div className="surface-placeholder" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', padding: '24px', boxSizing: 'border-box' }}>
      <div style={{ 
             width: wide ? '100%' : 'auto', 
             height: wide ? 'auto' : '100%', 
             maxWidth: '100%', 
             maxHeight: '100%', 
             aspectRatio: aspectRatio,
             backgroundColor: 'var(--sys-color-surface-container-low)',
             boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
             borderRadius: '16px',
             border: '1px solid var(--sys-color-outline-variant)',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             padding: '24px',
             boxSizing: 'border-box',
             ...customStyle
           }}>
        <div style={{ color: 'var(--sys-color-on-surface-variant)', fontStyle: 'italic', textAlign: 'center' }}>
          {label} Preview
        </div>
      </div>
    </div>
  );
};

// Authentic Rounded Rubber Wristband Component
export const WatchStrapIcon = ({ width = 247, height = 106, color = '#f0f4f9' }) => (
  <svg width={width} height={height} viewBox="0 0 247 106" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 9.0001C30 9.0001 86.8172 0 123.5 0C160.183 0 217 9.0001 217 9.0001C217 9.0001 221.386 38.9939 227 57.5001C232.614 76.0063 247 106 247 106H0C0 106 14.7613 75.8061 20 57.5001C25.2387 39.1941 30 9.0001 30 9.0001Z" fill={color} />
  </svg>
);

// Authentic Four-Pointed Gemini Spark Vector Component
export const GeminiSparkIcon = ({ size = 20, color = '#5629a4' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 15.4667C7.92222 15.4667 7.85741 15.4407 7.80556 15.3889C7.7537 15.337 7.71481 15.2722 7.68889 15.1944C7.48148 14.3778 7.15741 13.5935 6.71667 12.8417C6.28889 12.0769 5.78333 11.3963 5.2 10.8C4.6037 10.2037 3.92315 9.69167 3.15833 9.26389C2.40648 8.83611 1.62222 8.51852 0.805555 8.31111C0.727778 8.28519 0.662963 8.2463 0.611111 8.19444C0.559259 8.14259 0.533333 8.07778 0.533333 8C0.533333 7.92222 0.559259 7.85741 0.611111 7.80556C0.662963 7.7537 0.727778 7.71481 0.805555 7.68889C1.62222 7.48148 2.40648 7.16389 3.15833 6.73611C3.91019 6.30833 4.59074 5.7963 5.2 5.2C5.7963 4.61667 6.30833 3.94259 6.73611 3.17778C7.16389 2.41296 7.48148 1.62222 7.68889 0.805555C7.71481 0.727777 7.7537 0.662962 7.80556 0.611111C7.85741 0.559259 7.92222 0.533333 8 0.533333C8.07778 0.533333 8.14259 0.559259 8.19444 0.611111C8.2463 0.662962 8.28519 0.727777 8.31111 0.805555C8.51852 1.62222 8.83611 2.41296 9.26389 3.17778C9.69167 3.92963 10.2037 4.6037 10.8 5.2C11.3963 5.7963 12.0704 6.30833 12.8222 6.73611C13.587 7.16389 14.3778 7.48148 15.1944 7.68889C15.2722 7.71481 15.337 7.7537 15.3889 7.80556C15.4407 7.85741 15.4667 7.92222 15.4667 8C15.4667 8.07778 15.4407 8.14259 15.3889 8.19444C15.337 8.2463 15.2722 8.28519 15.1944 8.31111C14.3778 8.51852 13.587 8.83611 12.8222 9.26389C12.0574 9.69167 11.3833 10.2037 10.8 10.8C10.2037 11.4093 9.69167 12.0898 9.26389 12.8417C8.83611 13.5935 8.51852 14.3778 8.31111 15.1944C8.28519 15.2722 8.2463 15.337 8.19444 15.3889C8.14259 15.4407 8.07778 15.4667 8 15.4667Z" fill={color} />
  </svg>
);

// Hook to grab scenario time or default to live system time
export const useDynamicClock = (action) => {
  const [timeString, setTimeString] = useState('9:41');

  useEffect(() => {
    if (action && action.time) {
      setTimeString(action.time);
      return;
    }

    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      hours = hours % 12 || 12; // 12-hour format without leading zero
      setTimeString(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, [action]);

  return timeString;
};

// Premium Micro-Animation Hook for Gemini Suggested Actions
export const useAnimateIn = (action) => {
  const [style, setStyle] = useState({ 
    opacity: 0, 
    transform: 'scale(0.96) translateY(12px)', 
    transition: 'none' 
  });

  useEffect(() => {
    if (!action) return;

    // Instantly reset state to invisible
    setStyle({ 
      opacity: 0, 
      transform: 'scale(0.96) translateY(12px)', 
      transition: 'none' 
    });

    // Trigger smooth slide-in animation on next browser frame
    const timer = setTimeout(() => {
      setStyle({ 
        opacity: 1, 
        transform: 'scale(1) translateY(0px)', 
        transition: 'all 0.4s cubic-bezier(0.2, 0.85, 0.3, 1.1)' 
      });
    }, 80);

    return () => clearTimeout(timer);
  }, [action]);

  return style;
};
