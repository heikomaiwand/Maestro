import React, { useRef, useState, useEffect } from 'react';
import { useDynamicClock, useAnimateIn } from './shared';

export const AndroidAutoPreview = ({ action }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0.6);
  const currentTime = useDynamicClock(action);
  const animateStyle = useAnimateIn(action);

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const parent = containerRef.current.parentElement;
      if (!parent) return;
      
      const availableWidth = parent.clientWidth;
      const availableHeight = parent.clientHeight;
      
      const paddingX = 96; 
      const paddingY = 96;
      
      const targetWidth = 1024 + paddingX;
      const targetHeight = 600 + paddingY;

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
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'var(--lofi-surface)', overflow: 'hidden' }}>
      
      {/* Fully themed Auto dashboard frame */}
      <div 
        style={{ 
          position: 'absolute', 
          width: '1024px', 
          height: '600px',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          backgroundColor: 'var(--lofi-container2)',
          border: '1.5px solid var(--lofi-container5)',
          borderRadius: '32px',
          boxShadow: '0 24px 48px rgba(0,0,0,0.08)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >

        <div style={{ flex: 1, display: 'flex', padding: '24px', gap: '24px', boxSizing: 'border-box' }}>
          
          {/* Map Canvas */}
          <div 
            style={{ 
              flex: 1, 
              backgroundColor: 'var(--lofi-container4)', 
              borderRadius: '24px', 
              position: 'relative', 
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div 
              style={{ 
                position: 'absolute', 
                bottom: '80px', 
                width: '96px', 
                height: '96px', 
                backgroundColor: 'var(--lofi-container5)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}
            >
              <div 
                style={{
                  width: 0, 
                  height: 0, 
                  borderLeft: '16px solid transparent', 
                  borderRight: '16px solid transparent', 
                  borderBottom: '32px solid var(--lofi-container1)',
                  transform: 'translateY(-4px)'
                }} 
              />
            </div>
          </div>

          {/* 50/50 Split Utility Cards */}
          <div style={{ width: '456px', display: 'flex', flexDirection: 'column', gap: '18px', height: '100%' }}>

            {action ? (
              <div 
                style={{ 
                  flex: 1,
                  minHeight: 0,
                  backgroundColor: 'var(--lofi-color1)', 
                  borderRadius: '24px', 
                  padding: '24px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'flex-start',
                  gap: '8px',
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                  ...animateStyle
                }}
              >
                <div 
                  style={{ 
                    fontSize: '32px', 
                    color: 'var(--lofi-color8)', 
                    fontWeight: 600, 
                    fontFamily: 'Google Sans, sans-serif',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {action.title}
                </div>
                <div 
                  style={{ 
                    fontSize: '20px', 
                    color: 'var(--lofi-color8)', 
                    lineHeight: '1.4', 
                    fontFamily: 'Google Sans, sans-serif',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {action.why}
                </div>
              </div>
            ) : (
              <div 
                style={{ 
                  flex: 1,
                  minHeight: 0,
                    backgroundColor: 'var(--lofi-container1)', 
                  borderRadius: '24px', 
                  padding: '24px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  boxSizing: 'border-box',
                    border: '1px solid var(--lofi-container5)'
                }}
              >
                  <div style={{ fontFamily: 'Redacted, sans-serif', fontSize: '28px', color: 'var(--lofi-text3)' }}>In 500 feet</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '36px', height: '36px', backgroundColor: 'var(--lofi-container5)', borderRadius: '50%' }} />
                    <div style={{ fontFamily: 'Redacted, sans-serif', fontSize: '24px', color: 'var(--lofi-text3)' }}>Turn right on Main St</div>
                </div>
              </div>
            )}

            {/* Media Player */}
            <div 
              style={{ 
                flex: 1,
                minHeight: 0,
                backgroundColor: 'var(--lofi-container1)', 
                borderRadius: '24px', 
                padding: '24px', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                boxSizing: 'border-box',
                border: '1px solid var(--lofi-container5)'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '80px', height: '24px', backgroundColor: 'var(--lofi-container4)', borderRadius: '4px' }} />
                  <div style={{ width: '120px', height: '24px', backgroundColor: 'var(--lofi-container4)', borderRadius: '4px' }} />
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '140px', height: '20px', backgroundColor: 'var(--lofi-container4)', borderRadius: '4px' }} />
                  <div style={{ width: '100px', height: '20px', backgroundColor: 'var(--lofi-container4)', borderRadius: '4px' }} />
                </div>
                <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--lofi-container5)', borderRadius: '2px', marginTop: '8px' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '48px' }}>
                <span className="material-symbols-filled" style={{ fontSize: '36px', color: 'var(--lofi-text3)' }}>skip_previous</span>
                <span className="material-symbols-filled" style={{ fontSize: '64px', color: 'var(--lofi-text3)' }}>play_circle</span>
                <span className="material-symbols-filled" style={{ fontSize: '36px', color: 'var(--lofi-text3)' }}>skip_next</span>
              </div>

            </div>

          </div>

        </div>

        {/* Bottom Dock */}
        <div 
          style={{ 
            height: '80px', 
            backgroundColor: 'var(--lofi-container1)', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '0 32px',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 6px)', gap: '4px' }}>
              {[...Array(9)].map((_, i) => (
                <div key={i} style={{ width: '6px', height: '6px', backgroundColor: 'var(--lofi-container5)', borderRadius: '50%' }} />
              ))}
            </div>

            <span className="material-symbols-filled" style={{ fontSize: '32px', color: 'var(--lofi-text3)' }}>mic</span>

          </div>

          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '24px' }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{ width: '48px', height: '48px', backgroundColor: 'var(--lofi-container4)', borderRadius: '50%' }} />
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="material-symbols-filled" style={{ fontSize: '20px', color: 'var(--lofi-text3)' }}>signal_cellular_4_bar</span>
              <span className="material-symbols-filled" style={{ fontSize: '20px', color: 'var(--lofi-text3)' }}>battery_full</span>
            </div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--lofi-text3)', fontFamily: 'Redacted, sans-serif' }}>
              12:33
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
