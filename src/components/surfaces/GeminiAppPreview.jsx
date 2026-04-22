import React, { useRef, useState, useEffect } from 'react';
import { useAnimateIn } from './shared';

export const GeminiAppPreview = ({ action, orchData, showPrimitive }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const animateStyle = useAnimateIn(action);

  const howData = orchData && orchData.how ? orchData.how : null;
  const specific = howData ? (howData.gemini_app || howData) : null;

  const displayTitle = specific ? (specific.headline || specific.Headline || specific.title || action?.title || 'Header') : (action?.title || 'Header');
  const displaySubtitle = specific ? (specific.subheading || specific.Subheading || specific.message || action?.why || 'Subheading') : (action?.why || 'Subheading');

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const parent = containerRef.current.parentElement;
      if (!parent) return;

      const availableWidth = parent.clientWidth - 80;
      const availableHeight = parent.clientHeight - 80;

      const targetWidth = 412;
      const targetHeight = 892;

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
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
      <div
        style={{
          position: 'absolute',
          width: '412px',
          height: '892px',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          backgroundColor: 'var(--lofi-container2)',
          border: '6px solid var(--lofi-outline)',
          borderRadius: '54px',
          overflow: 'hidden',
          boxShadow: '0 12px 32px rgba(0,0,0,0.08)',
          fontFamily: "'Google Sans Flex', 'Google Sans Text', sans-serif",
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Status Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px 10px 24px', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--lofi-text2)', width: '76px', fontFamily: "'Google redacted', 'Redacted', sans-serif" }}>9:30</div>
          <div style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: 'var(--lofi-tint3)' }} />
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', width: '76px', justifyContent: 'flex-end' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--lofi-container5)' }}>signal_cellular_4_bar</span>
            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--lofi-container5)' }}>wifi</span>
            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--lofi-container5)' }}>battery_full</span>
          </div>
        </div>

        {/* App Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px', height: '64px', width: '100%', boxSizing: 'border-box' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '24px', color: 'var(--lofi-tint3)', cursor: 'pointer' }}>menu</span>
          <div style={{ fontSize: '22px', fontWeight: 500, color: 'var(--lofi-text3)', fontFamily: "'Google Sans Flex', sans-serif" }}>Gemini</div>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--lofi-tint3)', cursor: 'pointer' }} />
        </div>

        {/* Main Body Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '33px 20px 0 20px', width: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
          {/* Greeting */}
          <div style={{ fontSize: '22px', fontWeight: 500, color: 'var(--lofi-text3)', fontFamily: "'Google redacted', 'Redacted', sans-serif" }}>Hi Heiko</div>
          <div style={{ fontSize: '32px', fontWeight: 500, color: 'var(--lofi-text3)', marginTop: '4px', fontFamily: "'Google redacted', 'Redacted', sans-serif" }}>Where should we start?</div>

          {/* Intent Pills/Chips */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '24px', alignItems: 'flex-start' }}>
            {['Create image', 'Write anything', 'Build an idea', 'Deep Research', 'Create video'].map((text, idx) => (
              <div key={idx} style={{ backgroundColor: 'var(--lofi-surface)', padding: '12px 16px', borderRadius: '999px', fontSize: '16px', color: 'var(--lofi-text2)', textAlign: 'center', fontFamily: "'Google redacted', 'Redacted', sans-serif", minWidth: '120px' }}>
                {text}
              </div>
            ))}
          </div>

          {/* Suggestions Area */}
          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
            <div style={{ fontSize: '14px', color: 'var(--lofi-text3)', fontFamily: "'Google Sans', sans-serif" }}>Suggestions:</div>
            <style>{`
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
              .hide-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>
            <div className="hide-scrollbar" style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', width: '100%', overflowX: 'auto', paddingBottom: '10px' }}>
              
              {/* SuggestedPrimitive Card (Gemini Card) */}
              {showPrimitive && (
                <div 
                  style={{ 
                    backgroundColor: 'var(--lofi-color2)', 
                    border: '1px solid var(--lofi-color3)', 
                    padding: '12px 16px', 
                    borderRadius: '30px', 
                    width: '280px', 
                    minHeight: '120px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '8px',
                    boxSizing: 'border-box',
                    flexShrink: 0,
                    ...animateStyle 
                  }}
                >
                  <div style={{ fontSize: '16px', fontWeight: 500, color: 'var(--lofi-color9)', fontFamily: "'Google Sans Flex', sans-serif" }}>
                    {displayTitle}
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--lofi-color8)', fontFamily: "'Google Sans Flex', sans-serif" }}>
                    {displaySubtitle}
                  </div>
                </div>
              )}

              {/* Generic Suggestion Chip (Blank Canvas alternative) */}
              <div 
                style={{ 
                  backgroundColor: 'var(--lofi-container1)', 
                  padding: '12px 16px', 
                  borderRadius: '30px', 
                  width: '280px', 
                  minHeight: '120px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '8px',
                  boxSizing: 'border-box',
                  flexShrink: 0,
                  opacity: 0.5
                }}
              >
                <div style={{ fontSize: '16px', color: 'var(--lofi-text2)', fontFamily: "'Google redacted', 'Redacted', sans-serif" }}>
                  Suggested action 2
                </div>
                <div style={{ fontSize: '14px', color: 'var(--lofi-text1)', fontFamily: "'Google redacted', 'Redacted', sans-serif" }}>
                  Explanation of what the action is and why
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Input Bar */}
        <div style={{ borderTop: '1px solid var(--lofi-outline-low)', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', boxSizing: 'border-box', backgroundColor: 'var(--lofi-surface)', paddingBottom: '20px', borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}>
          {/* Input Text Box */}
          <div style={{ padding: '16px 16px 12px 16px', width: '100%', display: 'flex', boxSizing: 'border-box' }}>
            <div style={{ fontSize: '16px', color: 'var(--lofi-text1)', fontFamily: "'Google redacted', 'Redacted', sans-serif", width: '100%' }}>
              Ask Gemini
            </div>
          </div>

          {/* Actions Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '0 8px 0 4px', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '24px', color: 'var(--lofi-text2)' }}>add</span>
              </div>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '24px', color: 'var(--lofi-text2)' }}>page_info</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div style={{ border: '1px solid var(--lofi-outline-low)', padding: '8px 16px', borderRadius: '28px', cursor: 'pointer' }}>
                <div style={{ fontSize: '14px', color: 'var(--lofi-text2)', fontFamily: "'Google redacted', 'Redacted', sans-serif" }}>Fast</div>
              </div>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid var(--lofi-outline-low)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '24px', color: 'var(--lofi-text2)' }}>mic</span>
              </div>
            </div>
          </div>

          {/* Bottom Swipe Bar */}
          <div style={{ width: '134px', height: '5px', backgroundColor: '#000', borderRadius: '100px', marginTop: '16px' }} />
        </div>

      </div>
    </div>
  );
};
