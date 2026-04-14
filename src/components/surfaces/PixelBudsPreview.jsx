import React, { useRef, useState, useEffect } from 'react';
import { useAnimateIn } from './shared';
import PixelBudGraphic from '../../assets/PixelBudGraphic.svg';

export const PixelBudsPreview = ({ action, orchData }) => {

  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const animateStyle = useAnimateIn(action);

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const parent = containerRef.current.parentElement;
      if (!parent) return;
      
      const availableWidth = parent.clientWidth;
      const availableHeight = parent.clientHeight;
      
      // Using the exact custom canvas dimension defined by your Figma blueprint
      const targetWidth = 900;
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

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      
      {/* Unbounded Canvas directly reflecting your transparent Figma frame */}
      <div 
        style={{ 
          position: 'absolute', 
          width: '900px', 
          height: '520px',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          transition: 'transform 0.1s ease-out',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        
        {/* Floating Centerpiece: The Pixel Buds Graphic */}
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
          <img src={PixelBudGraphic} alt="Pixel Buds" style={{ width: '260px', height: 'auto' }} />
        </div>

        {/* Floating Spoken Cue layer */}
        {action && (
          <div 
            style={{ 
              position: 'relative',
              marginTop: '24px',
              width: '820px',
              ...animateStyle
            }}
          >
            {/* Authentic Spoken Cue Tail (pointing upward toward the graphic) */}
            <div 
              style={{
                position: 'absolute',
                top: '-16px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '16px solid transparent',
                borderRight: '16px solid transparent',
                borderBottom: '18px solid var(--lofi-color2)',
                zIndex: 1
              }}
            />
            {/* White inner mask to keep the tail hollow/bordered */}
            <div 
              style={{
                position: 'absolute',
                top: '-13px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '14px solid transparent',
                borderRight: '14px solid transparent',
                borderBottom: '16px solid var(--lofi-color1)',
                zIndex: 2
              }}
            />

            {/* The Speech Bubble Box */}
            <div 
              style={{
                backgroundColor: 'var(--lofi-color1)',
                border: '2px solid var(--lofi-color2)',
                borderRadius: '16px',
                padding: '24px 32px',
                boxShadow: '0 8px 24px rgba(86, 41, 164, 0.04)',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                zIndex: 3
              }}
            >
              <div style={{ fontSize: '24px', color: 'var(--lofi-color8)', fontFamily: 'Google Sans, sans-serif', fontWeight: 400 }}>
                "{orchData && orchData.how && (orchData.how.pixel_buds || orchData.how) 
                  ? ((orchData.how.pixel_buds && (orchData.how.pixel_buds["Text-to-speech"] || orchData.how.pixel_buds.TextToSpeech || orchData.how.pixel_buds.text_to_speech)) || (orchData.how && (orchData.how["Text-to-speech"] || orchData.how.TextToSpeech || orchData.how.text_to_speech)) || action.why) 
                  : action.why}"
              </div>


            </div>
            
          </div>
        )}

      </div>
    </div>
  );
};
