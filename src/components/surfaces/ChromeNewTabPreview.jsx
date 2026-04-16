import React, { useRef, useState, useEffect } from 'react';
import { useAnimateIn, GeminiSparkIcon } from './shared';

const ChromeNewTabPrimitive = ({ displayTitle, displaySubtitle, displayAction1, displayAction2, animateStyle }) => {
  return (
    <div style={{
      width: '100%',
      backgroundColor: 'var(--lofi-color2)',
      border: '1px solid var(--lofi-color3)',
      borderRadius: '16px',
      padding: '16px',
      display: 'flex',
      gap: '13px',
      boxSizing: 'border-box',
      ...animateStyle
    }}>
      {/* Spark Icon */}
      <div style={{
        width: '24px',
        height: '24px',
        backgroundColor: 'var(--lofi-color4)',
        borderRadius: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        <GeminiSparkIcon size={16} color="#ffffff" />
      </div>

      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
        <div style={{ fontSize: '16px', fontWeight: 500, color: 'var(--lofi-color9)', fontFamily: "'Google Sans Flex', sans-serif" }}>
          {displayTitle}
        </div>
        <div style={{ fontSize: '14px', color: 'var(--lofi-color8)', fontFamily: "'Google Sans Flex', sans-serif" }}>
          {displaySubtitle}
        </div>
        <div style={{ display: 'flex', gap: '24px', marginTop: '4px', fontSize: '12px', fontWeight: 500, color: 'var(--lofi-color9)', fontFamily: "'Google Sans Text', sans-serif" }}>
          {displayAction1 && <span style={{ cursor: 'pointer' }}>{displayAction1}</span>}
          {displayAction2 && <span style={{ cursor: 'pointer' }}>{displayAction2}</span>}
        </div>
      </div>
    </div>
  );
};

export const ChromeNewTabPreview = ({ action, orchData, showPrimitive }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const animateStyle = useAnimateIn(action);

  const howData = orchData && orchData.how ? orchData.how : null;
  const specific = howData ? (howData.chrome_new_tab || howData) : null;
  
  const displayTitle = specific ? (specific.headline || specific.Headline || specific.title || action?.title || 'Header') : (action?.title || 'Header');
  const displaySubtitle = specific ? (specific.subheading || specific.Subheading || specific.message || action?.why || 'Subtitle') : (action?.why || 'Subtitle');
  const displayAction1 = specific ? (specific.action1 || specific.Action1 || specific['Action 1'] || specific.Action || '') : 'Action1';
  const displayAction2 = specific ? (specific.action2 || specific.Action2 || specific['Action 2'] || '') : 'Action2';

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const parent = containerRef.current.parentElement;
      if (!parent) return;
      
      const availableWidth = parent.clientWidth - 120;
      const availableHeight = parent.clientHeight - 120;
      
      const targetWidth = 1200;
      const targetHeight = 720;

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
      <div
        style={{
          position: 'absolute',
          width: '1200px',
          height: '720px',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          transition: 'transform 0.1s ease-out',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 12px 32px rgba(0,0,0,0.08)',
          border: '1px solid var(--lofi-outline)',
          overflow: 'hidden',
          fontFamily: "'Google Sans Flex', 'Google Sans Text', sans-serif"
        }}
      >
        {/* Top Chrome Header Row */}
        <div style={{ backgroundColor: 'var(--lofi-container3)', display: 'flex', flexDirection: 'column', width: '100%' }}>
          
          {/* Tab Strip */}
          <div style={{ height: '40px', display: 'flex', alignItems: 'center', padding: '0 6px', gap: '6px' }}>
            {/* Window dot controls */}
            <div style={{ display: 'flex', gap: '8px', padding: '0 12px', alignItems: 'center' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--lofi-tint3)' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--lofi-tint3)' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--lofi-tint3)' }} />
            </div>

            {/* Chrome Tab Container */}
            <div style={{
              display: 'flex',
              alignItems: 'end',
              height: '40px',
              paddingTop: '6px',
              position: 'relative'
            }}>
              <div style={{
                backgroundColor: 'var(--lofi-surface)', // Active tab is white
                height: '34px',
                minWidth: '200px',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '0 12px',
                boxSizing: 'border-box'
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--lofi-tint3)', fontVariationSettings: "'FILL' 1, 'GRAD' 0, 'ROND' 50" }}>circle</span>
                <span style={{ fontSize: '14px', color: 'var(--lofi-text2)', fontFamily: "'Google Redacted', sans-serif" }}>New Tab</span>
                <span className="material-symbols-outlined" style={{ fontSize: '14px', color: 'rgba(105, 145, 214, 0.16)', cursor: 'pointer' }}>close</span>
              </div>
            </div>

            {/* Plus button */}
            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'rgba(105, 145, 214, 0.16)', cursor: 'pointer', paddingLeft: '4px' }}>add</span>
          </div>

          {/* URL & Navigation controls */}
          <div style={{
            backgroundColor: 'var(--lofi-surface)',
            borderBottom: '1px solid var(--lofi-outline-low)',
            height: '46px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--lofi-tint4)', cursor: 'pointer' }}>arrow_back</span>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--lofi-tint2)', cursor: 'pointer' }}>arrow_forward</span>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--lofi-tint4)', cursor: 'pointer' }}>refresh</span>
            </div>

            {/* Search Address bar pill */}
            <div style={{
              flex: 1,
              height: '34px',
              backgroundColor: 'var(--lofi-container3)',
              borderRadius: '50px',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '12px',
              color: 'var(--lofi-outline-low)',
              fontFamily: "'Google Redacted', sans-serif",
              fontSize: '14px'
            }}>
              Search Google or type a URL
            </div>

            {/* RHS Extension Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--lofi-tint4)' }}>star</span>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--lofi-tint4)' }} />
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#444746' }}>more_vert</span>
            </div>
          </div>

        </div>

        {/* Browser Content Layout (New Tab Page) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'var(--lofi-container2)', overflowY: 'auto' }}>
          
          {/* OGB Bar */}
          <div style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 16px', gap: '24px' }}>
            <span style={{ fontSize: '14px', color: 'var(--lofi-outline-low)', fontFamily: "'Google Redacted', sans-serif" }}>Gmail</span>
            <span style={{ fontSize: '14px', color: 'var(--lofi-outline-low)', fontFamily: "'Google Redacted', sans-serif" }}>Images</span>
            <span className="material-symbols-outlined" style={{ fontSize: '24px', color: 'var(--lofi-tint4)' }}>apps</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--lofi-tint4)' }} />
          </div>

          {/* Main Center Content */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 20px', gap: '24px', maxWidth: '800px', width: '100%', margin: '0 auto' }}>
            
            {/* Google Logo */}
            <div style={{ fontSize: '72px', fontWeight: 500, color: 'var(--lofi-tint4)', fontFamily: "'Google Sans', sans-serif", marginTop: '40px' }}>
              Google
            </div>

            {/* Realbox (Search Bar) */}
            <div style={{
              width: '100%',
              height: '44px',
              backgroundColor: 'var(--lofi-container4)',
              borderRadius: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 16px',
              boxSizing: 'border-box'
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--lofi-tint4)' }}>search</span>
              <div style={{ flex: 1 }} />
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--lofi-tint4)' }}>mic</span>
            </div>

            {/* Suggested Primitive (Gemini Card) */}
            {showPrimitive && (
              <ChromeNewTabPrimitive 
                displayTitle={displayTitle}
                displaySubtitle={displaySubtitle}
                displayAction1={displayAction1}
                displayAction2={displayAction2}
                animateStyle={animateStyle}
              />
            )}

            {/* Task Cards (Dimmed) */}
            <div style={{ display: 'flex', gap: '10px', width: '100%', height: '330px', opacity: 0.3, marginBottom: '40px' }}>
              {/* Card 1 */}
              <div style={{ flex: 1, backgroundColor: 'var(--lofi-container3)', border: '2px solid var(--lofi-container5)', borderRadius: '16px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: 'var(--lofi-text3)', fontFamily: "'Google Redacted', sans-serif" }}>Google Calendar</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--lofi-tint4)' }}>more_vert</span>
                </div>
                <div style={{ flex: 1, backgroundColor: 'var(--lofi-container5)', borderRadius: '12px' }} />
              </div>
              {/* Card 2 */}
              <div style={{ flex: 1, backgroundColor: 'var(--lofi-container3)', border: '2px solid var(--lofi-container5)', borderRadius: '16px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: 'var(--lofi-text3)', fontFamily: "'Google Redacted', sans-serif" }}>Google Calendar</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--lofi-tint4)' }}>more_vert</span>
                </div>
                <div style={{ flex: 1, backgroundColor: 'var(--lofi-container5)', borderRadius: '12px' }} />
              </div>
              {/* Card 3 */}
              <div style={{ flex: 1, backgroundColor: 'var(--lofi-container3)', border: '2px solid var(--lofi-container5)', borderRadius: '16px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: 'var(--lofi-text3)', fontFamily: "'Google Redacted', sans-serif" }}>Google Drive</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--lofi-tint4)' }}>more_vert</span>
                </div>
                <div style={{ flex: 1, backgroundColor: 'var(--lofi-container5)', borderRadius: '12px' }} />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
