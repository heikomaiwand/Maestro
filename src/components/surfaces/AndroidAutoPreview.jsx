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
      
      // Incorporating safe padding directly into the layout ratio calculation
      const paddingX = 96; // 48px padding on left + 48px on right
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
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', overflow: 'hidden' }}>
      
      {/* Absolute Frame perfectly scaled with safe edges so it never clips the view */}
      <div 
        style={{ 
          position: 'absolute', 
          width: '1024px', 
          height: '600px',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          backgroundColor: '#f8fafd',
          border: '1.5px solid #dde3ea',
          borderRadius: '32px',
          boxShadow: '0 24px 48px rgba(0,0,0,0.08)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        
        {/* Main Widescreen Split Layout */}
        <div style={{ flex: 1, display: 'flex', padding: '24px', gap: '24px', boxSizing: 'border-box' }}>
          
          {/* Left Pane: Giant Map Canvas */}
          <div 
            style={{ 
              flex: 1, 
              backgroundColor: '#e9eef6', 
              borderRadius: '24px', 
              position: 'relative', 
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Solid Vector Arrow GPS Indicator */}
            <div 
              style={{ 
                position: 'absolute', 
                bottom: '80px', 
                width: '96px', 
                height: '96px', 
                backgroundColor: '#d3e3fd', 
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
                  borderBottom: '32px solid #ffffff',
                  transform: 'translateY(-4px)'
                }} 
              />
            </div>
          </div>

          {/* Right Pane: 50/50 Split Utility Cards */}
          <div style={{ width: '456px', display: 'flex', flexDirection: 'column', gap: '18px', height: '100%' }}>
            
            {/* Top Right Quad: Dynamic Notification or Default Navigation Instruction */}
            {action ? (
              <div 
                style={{ 
                  flex: 1,
                  minHeight: 0,
                  backgroundColor: '#f7ecfe', 
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
                    color: '#5629a4', 
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
                    color: '#7438d2', 
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
                  backgroundColor: '#ffffff', 
                  borderRadius: '24px', 
                  padding: '24px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  boxSizing: 'border-box',
                  border: '1px solid #dde3ea'
                }}
              >
                <div style={{ fontFamily: 'Redacted, sans-serif', fontSize: '28px', color: '#3c4043' }}>In 500 feet</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '36px', height: '36px', backgroundColor: '#76acff', borderRadius: '50%' }} />
                  <div style={{ fontFamily: 'Redacted, sans-serif', fontSize: '24px', color: '#3c4043' }}>Turn right on Main St</div>
                </div>
              </div>
            )}

            {/* Bottom Right Quad: Media Player */}
            <div 
              style={{ 
                flex: 1,
                minHeight: 0,
                backgroundColor: '#ffffff', 
                borderRadius: '24px', 
                padding: '24px', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                boxSizing: 'border-box',
                border: '1px solid #dde3ea'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '80px', height: '24px', backgroundColor: '#e9eef6', borderRadius: '4px' }} />
                  <div style={{ width: '120px', height: '24px', backgroundColor: '#e9eef6', borderRadius: '4px' }} />
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '140px', height: '20px', backgroundColor: '#e9eef6', borderRadius: '4px' }} />
                  <div style={{ width: '100px', height: '20px', backgroundColor: '#e9eef6', borderRadius: '4px' }} />
                </div>
                <div style={{ width: '100%', height: '4px', backgroundColor: '#d3e3fd', borderRadius: '2px', marginTop: '8px' }} />
              </div>

              {/* Official Material Symbols rendering with FILL variation for absolute fidelity */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '48px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '36px', color: '#a8c7fa', fontVariationSettings: "'FILL' 1" }}>skip_previous</span>
                <span className="material-symbols-outlined" style={{ fontSize: '64px', color: '#d3e3fd', fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                <span className="material-symbols-outlined" style={{ fontSize: '36px', color: '#a8c7fa', fontVariationSettings: "'FILL' 1" }}>skip_next</span>
              </div>

            </div>

          </div>

        </div>

        {/* Bottom Persistent Interaction Bar */}
        <div 
          style={{ 
            height: '80px', 
            backgroundColor: '#ffffff', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '0 32px',
            boxSizing: 'border-box'
          }}
        >
          {/* Left Section: 9-Dot App Launcher Grid & Voice Trigger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 6px)', gap: '4px' }}>
              {[...Array(9)].map((_, i) => (
                <div key={i} style={{ width: '6px', height: '6px', backgroundColor: '#d3e3fd', borderRadius: '50%' }} />
              ))}
            </div>

            {/* Official Material Symbol for Mic */}
            <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#d3e3fd', fontVariationSettings: "'FILL' 1" }}>mic</span>

          </div>

          {/* Center Stage: Four perfectly grouped App Launcher Circles */}
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '24px' }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{ width: '48px', height: '48px', backgroundColor: '#e9eef6', borderRadius: '50%' }} />
            ))}
          </div>
          
          {/* Right Section: Vertical Status Display */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {/* Official Material Symbols for Signal and Battery */}
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#d3e3fd', fontVariationSettings: "'FILL' 1" }}>signal_cellular_4_bar</span>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#d3e3fd', fontVariationSettings: "'FILL' 1" }}>battery_full</span>
            </div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#e9eef6', fontFamily: 'Redacted, sans-serif' }}>
              12:33
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
