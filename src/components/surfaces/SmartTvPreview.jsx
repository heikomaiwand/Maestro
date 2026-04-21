import React, { useRef } from 'react';
import { useAnimateIn, useCanvasScale, GeminiSparkIcon } from './shared';

const SmartTvPrimitive = ({ displayTitle, displayWhy, displayAction1, displayAction2, animateStyle }) => {
  return (
    <div 
      style={{ 
        position: 'absolute',
        backgroundColor: '#f7ecfe', 
        border: '1px solid #eedcfe',
        ...animateStyle, 
        right: '34px', 
        top: '34px', 
        padding: '16px', 
        borderRadius: '16px',
        display: 'flex',
        gap: '13px',
        alignItems: 'flex-start',
        boxSizing: 'border-box',
        width: '424px',
        boxShadow: '0 4px 12px rgba(86, 41, 164, 0.05)'
      }}
    >
      {/* Spark Icon */}
      <div style={{ backgroundColor: '#d9bafd', padding: '3px', borderRadius: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', flexShrink: 0 }}>
        <GeminiSparkIcon size={16} color="#5629a4" />
      </div>

      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '16px', color: '#5629a4', fontWeight: 600, fontFamily: 'Google Sans, sans-serif' }}>
          {displayTitle}
        </div>
        <div style={{ fontSize: '14px', color: '#7438d2', lineHeight: '1.3', fontFamily: 'Google Sans, sans-serif' }}>
          {displayWhy}
        </div>

        {/* Actionable Buttons */}
        {(displayAction1 || displayAction2) && (
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            {displayAction1 && (
              <div style={{ 
                backgroundColor: '#fdf8ff', 
                padding: '4px 12px', 
                borderRadius: '50px', 
                fontSize: '12px', 
                color: '#5629a4', 
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0px 0px 8px 0px rgba(146,84,234,0.16)'
              }}>
                {displayAction1}
              </div>
            )}
            {displayAction2 && (
              <div style={{ 
                padding: '4px 12px', 
                borderRadius: '50px', 
                fontSize: '12px', 
                color: '#5629a4', 
                fontWeight: 600,
                cursor: 'pointer'
              }}>
                {displayAction2}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Image Placeholder */}
      <div style={{ backgroundColor: '#eedcfe', borderRadius: '4px', width: '105px', alignSelf: 'stretch', flexShrink: 0 }} />
    </div>
  );
};

export const SmartTvPreview = ({ action, orchData, showPrimitive }) => {
  const containerRef = useRef(null);
  const scale = useCanvasScale(containerRef, 1280, 720);
  const animateStyle = useAnimateIn(action);

  const howData = orchData && orchData.how ? orchData.how : null;
  const specific = howData ? (howData.googletv_streamer || howData.smart_tv || howData.tv || howData) : null;
  const displayTitle = specific ? (specific.Headline || specific.headline || specific.title || action?.title || 'Notification') : (action?.title || 'Notification');
  const displayWhy = specific ? (specific.Subheading || specific.subheading || specific.message || action?.why || '') : (action?.why || '');
  const displayAction1 = specific ? (specific.action1 || specific.Action1 || specific['Action 1'] || '') : 'Review';
  const displayAction2 = specific ? (specific.action2 || specific.Action2 || specific['Action 2'] || '') : 'Dismiss';

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'var(--lofi-surface)' }}>
      <div 
        style={{ 
          position: 'absolute', 
          width: '1280px', 
          height: '720px',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div 
          style={{ 
            position: 'absolute', 
            backgroundColor: 'var(--lofi-container2)', 
            border: '6px solid var(--lofi-container5)', 
            height: '720px', 
            left: 0, 
            top: 0, 
            width: '1280px', 
            borderRadius: '4px',
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}
        >
          {/* Suggested Primitive */}
          {showPrimitive && (
            <SmartTvPrimitive 
              displayTitle={displayTitle}
              displayWhy={displayWhy}
              displayAction1={displayAction1}
              displayAction2={displayAction2}
              animateStyle={animateStyle}
            />
          )}
        </div>

        {/* Stand */}
        <div style={{ position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', width: '189px', height: '10px', backgroundColor: 'var(--lofi-container5)', borderRadius: '2px' }} />
      </div>
    </div>
  );
};
