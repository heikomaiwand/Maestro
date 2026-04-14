import React, { useRef, useState, useEffect } from 'react';
import { useDynamicClock, useAnimateIn, WatchStrapIcon, GeminiSparkIcon } from './shared';

export const WatchPreview = ({ action, orchData }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0.8);
  const currentTime = useDynamicClock(action);
  const animateStyle = useAnimateIn(action);

  useEffect(() => {

    const updateScale = () => {
      if (!containerRef.current) return;
      const parent = containerRef.current.parentElement;
      if (!parent) return;
      
      const availableWidth = parent.clientWidth;
      const availableHeight = parent.clientHeight;
      
      const targetWidth = 460;
      const targetHeight = 520;

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

  const howData = orchData && orchData.how ? orchData.how : null;

  const watchSpecific = howData ? (howData.watch_notification || howData) : null;
  const displayTitle = watchSpecific ? (watchSpecific.Headline || watchSpecific.headline || watchSpecific.title || action?.title || 'Notification') : (action?.title || 'Notification');
  const displayWhy = watchSpecific ? (watchSpecific.Subheading || watchSpecific.subheading || watchSpecific.message || action?.why || '') : (action?.why || '');

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'var(--lofi-surface)' }}>
      <div 
        style={{ 
          position: 'absolute', 
          width: '460px', 
          height: '520px',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          transition: 'transform 0.1s ease-out'
        }}
      >
        {/* Authentic Curved Top Watch Strap */}
        <div style={{ position: 'absolute', top: '4px', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
          <WatchStrapIcon width={247} height={106} color="var(--lofi-container3)" />
        </div>

        {/* Authentic Curved Bottom Watch Strap */}
        <div style={{ position: 'absolute', top: '369px', left: '50%', transform: 'translateX(-50%) rotate(180deg)', zIndex: 1 }}>
          <WatchStrapIcon width={247} height={106} color="var(--lofi-container3)" />
        </div>

        {/* Right Hardware Crown */}
        <div style={{ position: 'absolute', top: '230px', right: '24px', width: '24px', height: '60px', backgroundColor: 'var(--lofi-container4)', borderRadius: '0 12px 12px 0', boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.05)', zIndex: 2 }} />

        {/* Main Circular Bezel Frame */}
        <div 
          style={{ 
            position: 'absolute', 
            top: '60px', 
            left: '45px', 
            width: '370px', 
            height: '370px', 
            backgroundColor: 'var(--lofi-container5)', 
            borderRadius: '50%',
            border: '4px solid var(--lofi-container1)', 
            boxShadow: '0 16px 32px rgba(0,0,0,0.08), inset 0 4px 12px rgba(0,0,0,0.05)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: action ? 'flex-start' : 'center',
            padding: '24px',
            boxSizing: 'border-box',
            zIndex: 3
          }}
        >
          {/* Glossy Glass Reflection Layer */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0) 50%)', pointerEvents: 'none', zIndex: 10 }} />

          {action ? (
            <>
              <div style={{ fontSize: '24px', color: 'rgba(105, 145, 214, 0.4)', fontWeight: 500, marginTop: '12px', marginBottom: '16px' }}>
                {currentTime}
              </div>

              <div 
                style={{ 
                  width: '100%', 
                  backgroundColor: '#f7ecfe', 
                  borderRadius: '32px', 
                  padding: '20px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '12px',
                  boxSizing: 'border-box',
                  boxShadow: '0 8px 24px rgba(86, 41, 164, 0.1)',
                  zIndex: 5,
                  ...animateStyle
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ backgroundColor: '#d9bafd', padding: '4px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px' }}>
                      <GeminiSparkIcon size={12} color="#5629a4" />
                    </div>
                    <div style={{ fontSize: '12px', color: '#c597ff', fontWeight: 500, fontFamily: 'Google Sans, sans-serif' }}>Gemini • now</div>
                  </div>
                  <div style={{ fontSize: '12px', color: '#c597ff', fontWeight: 500, fontFamily: 'Google Sans, sans-serif' }}>1m</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ fontSize: '18px', color: '#5629a4', fontWeight: 600, fontFamily: 'Google Sans, sans-serif' }}>{displayTitle}</div>
                  <div style={{ fontSize: '14px', color: '#7438d2', lineHeight: '1.3', fontFamily: 'Google Sans, sans-serif' }}>{displayWhy}</div>
                </div>
              </div>
            </>
          ) : (
            <div style={{ fontSize: '80px', color: 'rgba(105, 145, 214, 0.25)', fontWeight: 500, letterSpacing: '-2px' }}>
              {currentTime}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

