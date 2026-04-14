import React, { useRef, useState, useEffect } from 'react';
import { useDynamicClock, useAnimateIn, GeminiSparkIcon } from './shared';

export const PhoneNotificationPreview = ({ action, orchData }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0.6);
  const currentTime = useDynamicClock(action);
  const animateStyle = useAnimateIn(action);

  const howData = orchData && orchData.how ? orchData.how : null;
  const specific = howData ? (howData.phone_notification || howData) : null;
  const displayTitle = specific ? (specific.Headline || specific.headline || specific.title || action?.title || 'Notification') : (action?.title || 'Notification');
  const displayWhy = specific ? (specific.Subheading || specific.subheading || specific.message || action?.why || '') : (action?.why || '');
  const displayAction1 = specific ? (specific.action1 || specific.Action1 || specific['Action 1'] || specific.Action || '') : 'Review';
  const displayAction2 = specific ? (specific.action2 || specific.Action2 || specific['Action 2'] || '') : 'Dismiss';

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const parent = containerRef.current.parentElement;
      if (!parent) return;
      
      const availableWidth = parent.clientWidth - 80;
      const availableHeight = parent.clientHeight - 80;
      
      const targetWidth = 452;
      const targetHeight = 904;

      const scaleX = availableWidth / targetWidth;
      const scaleY = availableHeight / targetHeight;
      
      const newScale = Math.min(scaleX, scaleY, 1);
      setScale(newScale);
    };

    const observer = new ResizeObserver(updateScale);
    if (containerRef.current && containerRef.current.parentElement) {
      observer.observe(containerRef.current.parentElement);
    }
    
    updateScale();

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'var(--lofi-surface)' }}>
      <div 
        style={{ 
          position: 'absolute', 
          width: '452px', 
          height: '904px',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div style={{ position: 'absolute', backgroundColor: 'var(--lofi-container5)', height: '84px', right: '8px', top: '233px', width: '4px', borderTopRightRadius: '20px', borderBottomRightRadius: '20px' }} />
        <div style={{ position: 'absolute', backgroundColor: 'var(--lofi-container5)', height: '84px', right: '8px', top: '343px', width: '4px', borderTopRightRadius: '20px' }} />
        <div style={{ position: 'absolute', backgroundColor: 'var(--lofi-container5)', height: '84px', right: '8px', top: '429px', width: '4px', borderBottomRightRadius: '20px' }} />

        <div 
          style={{ 
            position: 'absolute', 
            backgroundColor: 'var(--lofi-container2)', 
            border: '6px solid var(--lofi-container5)', 
            height: '892px', 
            left: '20px', 
            top: '6px', 
            width: '412px', 
            borderRadius: '54px',
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '96px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px 36px 40px', boxSizing: 'border-box' }}>
            <div style={{ width: '60px', height: '60px', backgroundColor: 'var(--lofi-container5)', borderRadius: '50%' }} />
            <div style={{ width: '108px', height: '4px', backgroundColor: 'var(--lofi-container5)', borderRadius: '12px', alignSelf: 'flex-end', marginBottom: '12px' }} />
            <div style={{ width: '60px', height: '60px', backgroundColor: 'var(--lofi-container5)', borderRadius: '50%' }} />
          </div>

          <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', width: '356px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: '14px', color: 'var(--lofi-container5)', fontWeight: 500 }}>{currentTime}</div>
            {/* Camera Hole - Absolutely centered */}
            <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: '26px', height: '26px', backgroundColor: 'var(--lofi-container5)', borderRadius: '50%' }} />
            {/* Status Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--lofi-container5)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>signal_cellular_4_bar</span>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>wifi</span>
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>battery_full</span>
            </div>
          </div>

          {/* Lock Screen Content */}
          <div style={{ position: 'absolute', top: '120px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '346px' }}>
            <div style={{ fontSize: '120px', fontWeight: 200, color: 'var(--lofi-text1)', lineHeight: '120px', letterSpacing: '-2px', fontFamily: 'sans-serif' }}>
              {currentTime}
            </div>
            <div style={{ fontSize: '20px', color: 'var(--lofi-container5)', marginTop: '12px', fontWeight: 400, fontFamily: 'Redacted, sans-serif' }}>
              Tuesday, October 24
            </div>
          </div>

          {/* Suggested Primitive (Gemini Notification) */}
          <div 
            style={{ 
              position: 'absolute',
              backgroundColor: '#f7ecfe', 
              ...animateStyle, 
              left: '16px', 
              right: '16px',
              top: '326px', 
              padding: '16px', 
              borderRadius: '30px',
              display: 'flex',
              gap: '13px',
              alignItems: 'flex-start',
              boxSizing: 'border-box',
              boxShadow: '0 4px 12px rgba(86, 41, 164, 0.05)'
            }}
          >
            {/* Spark Icon */}
            <div style={{ backgroundColor: '#d9bafd', padding: '3px', borderRadius: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', flexShrink: 0 }}>
              <GeminiSparkIcon size={16} color="#5629a4" />
            </div>

            {/* Notification Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '12px', color: '#c597ff', fontWeight: 500, letterSpacing: '0.12px' }}>
                Gemini • now
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ fontSize: '16px', color: '#5629a4', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: 'Google Sans, sans-serif' }}>
                  {displayTitle}
                </div>
                <div style={{ fontSize: '14px', color: '#7438d2', lineHeight: '1.3', fontFamily: 'Google Sans, sans-serif' }}>
                  {displayWhy}
                </div>
              </div>

              {/* Actionable Buttons */}
              {(displayAction1 || displayAction2) && (
                <div style={{ display: 'flex', gap: '24px', marginTop: '8px', fontSize: '12px', color: '#5629a4', fontWeight: 600 }}>
                  {displayAction1 && <div style={{ cursor: 'pointer' }}>{displayAction1}</div>}
                  {displayAction2 && <div style={{ cursor: 'pointer' }}>{displayAction2}</div>}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
