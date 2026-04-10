import React, { useRef, useState, useEffect } from 'react';
import { useDynamicClock, useAnimateIn, GeminiSparkIcon } from './shared';

export const SmartDisplayPreview = ({ action }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0.5);
  const currentTime = useDynamicClock(action);
  const animateStyle = useAnimateIn(action);

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const parent = containerRef.current.parentElement;
      if (!parent) return;
      
      const availableWidth = parent.clientWidth;
      const availableHeight = parent.clientHeight;
      
      const targetWidth = 1164;
      const targetHeight = 800;

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
          width: '1164px', 
          height: '800px',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          transition: 'transform 0.1s ease-out'
        }}
      >
        {/* Physical Stand (Bottom Curve) */}
        <div 
          style={{ 
            position: 'absolute', 
            bottom: '0px', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            width: '800px', 
            height: '120px', 
            backgroundColor: 'var(--lofi-container4)', 
            borderTopLeftRadius: '50% 100%', 
            borderTopRightRadius: '50% 100%',
            zIndex: 1
          }} 
        />

        {/* Main Bezel */}
        <div 
          style={{ 
            position: 'absolute', 
            top: '20px', 
            left: '0', 
            width: '1164px', 
            height: '750px', 
            backgroundColor: 'var(--lofi-container1)', 
            border: '8px solid var(--lofi-container5)', 
            borderRadius: '64px',
            boxSizing: 'border-box',
            boxShadow: '0 24px 48px rgba(0,0,0,0.05)',
            zIndex: 2
          }}
        >
          {/* Hardware Sensors / Cutouts at top bezel */}
          <div style={{ position: 'absolute', top: '24px', left: '50%', transform: 'translateX(-50%)', width: '32px', height: '20px', backgroundColor: 'var(--lofi-container3)', borderRadius: '10px' }} />
          <div style={{ position: 'absolute', top: '28px', left: '340px', width: '16px', height: '10px', backgroundColor: 'var(--lofi-container3)', borderRadius: '5px' }} />
          <div style={{ position: 'absolute', top: '28px', right: '340px', width: '16px', height: '10px', backgroundColor: 'var(--lofi-container3)', borderRadius: '5px' }} />

          {/* Inner Display Screen */}
          <div 
            style={{ 
              position: 'absolute', 
              top: '64px', 
              left: '64px', 
              right: '64px', 
              bottom: '64px', 
              backgroundColor: 'var(--lofi-container2)', 
              borderRadius: '24px',
              border: '2px solid var(--lofi-text3)',
              overflow: 'hidden',
              padding: '32px 42px',
              boxSizing: 'border-box'
            }}
          >
            {/* Top Navigation Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <div style={{ display: 'flex', gap: '40px', fontFamily: 'Redacted, sans-serif', fontSize: '24px', color: 'var(--lofi-text3)' }}>
                <span style={{ color: 'var(--lofi-text3)', position: 'relative' }}>
                  Home control
                  <div style={{ position: 'absolute', bottom: '-12px', left: 0, width: '100%', height: '4px', backgroundColor: 'var(--lofi-container5)', borderRadius: '2px' }} />
                </span>
                <span>Media</span>
                <span>Communicate</span>
                <span>Discover</span>
              </div>
              <div style={{ fontSize: '24px', color: 'var(--lofi-text2)', fontWeight: 500 }}>
                {currentTime}
              </div>
            </div>

            {/* Main Content Grid */}
            <div style={{ display: 'flex', gap: '24px', height: '460px' }}>
              
              {/* Big Left Tile (4x) */}
              <div style={{ flex: '0 0 456px', backgroundColor: 'var(--lofi-container1)', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', boxSizing: 'border-box' }}>
                <div style={{ width: '36px', height: '36px', backgroundColor: 'var(--lofi-container5)', borderRadius: '50%', alignSelf: 'flex-start' }} />
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div style={{ fontFamily: 'Redacted, sans-serif', fontSize: '36px', color: 'var(--lofi-text2)' }}>Song name</div>
                  <div style={{ fontFamily: 'Redacted, sans-serif', fontSize: '16px', color: 'var(--lofi-text2)' }}>Album name</div>
                </div>

                <div style={{ width: '200px', height: '200px', backgroundColor: 'var(--lofi-container4)', borderRadius: '50%' }} />
              </div>

              {/* Right Column (Stack of Tiles) */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* Top Right Tile (2x) - Renders Gemini Primitive if active */}
                {action ? (
                  <div 
                    style={{ 
                      height: '216px', 
                      backgroundColor: 'var(--lofi-color1)', 
                      borderRadius: '16px', 
                      padding: '24px', 
                      display: 'flex', 
                      alignItems: 'flex-start',
                      gap: '16px',
                      boxSizing: 'border-box',
                      boxShadow: '0 4px 12px rgba(86, 41, 164, 0.05)',
                      ...animateStyle
                    }}
                  >
                    <div style={{ backgroundColor: 'var(--lofi-color2)', padding: '6px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', flexShrink: 0 }}>
                      <GeminiSparkIcon size={20} color="var(--lofi-color8)" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ fontSize: '24px', color: 'var(--lofi-color8)', fontWeight: 600, fontFamily: 'Google Sans, sans-serif' }}>{action.title}</div>
                      <div style={{ fontSize: '16px', color: 'var(--lofi-color8)', lineHeight: '1.4', fontFamily: 'Google Sans, sans-serif' }}>{action.why}</div>
                    </div>
                  </div>
                ) : (
                  <div style={{ height: '216px', backgroundColor: 'var(--lofi-container1)', borderRadius: '16px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxSizing: 'border-box' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ width: '36px', height: '36px', backgroundColor: 'var(--lofi-container5)', borderRadius: '50%' }} />
                      <div style={{ fontFamily: 'Redacted, sans-serif', fontSize: '36px', color: 'var(--lofi-text2)' }}>Lights on</div>
                      <div style={{ fontFamily: 'Redacted, sans-serif', fontSize: '16px', color: 'var(--lofi-text2)' }}>Living room</div>
                    </div>
                    <div style={{ width: '140px', height: '140px', backgroundColor: 'var(--lofi-container4)', borderRadius: '50%' }} />
                  </div>
                )}

                {/* Bottom Right Row (Two 1x Tiles) */}
                <div style={{ display: 'flex', gap: '24px', height: '220px' }}>
                  
                  <div style={{ flex: 1, backgroundColor: 'var(--lofi-container1)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
                    <div style={{ width: '36px', height: '36px', backgroundColor: 'var(--lofi-container5)', borderRadius: '50%' }} />
                    <div style={{ fontSize: '40px', color: 'var(--lofi-text2)', fontWeight: 300 }}>68°</div>
                    <div style={{ fontFamily: 'Redacted, sans-serif', fontSize: '16px', color: 'var(--lofi-text2)' }}>Thermostat</div>
                  </div>

                  <div style={{ flex: 1, backgroundColor: 'var(--lofi-container1)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
                    <div style={{ width: '36px', height: '36px', backgroundColor: 'var(--lofi-container5)', borderRadius: '50%' }} />
                    <div style={{ fontSize: '40px', color: 'var(--lofi-text2)', fontWeight: 300 }}>{currentTime}</div>
                    <div style={{ fontFamily: 'Redacted, sans-serif', fontSize: '16px', color: 'var(--lofi-text2)' }}>Timer</div>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
