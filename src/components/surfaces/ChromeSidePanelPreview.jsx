import React, { useRef, useState, useEffect } from 'react';
import { useAnimateIn, GeminiSparkIcon } from './shared';

const ChromeSidePanelPrimitive = ({ displayTitle, displaySubtitle, displayAction1, displayAction2, animateStyle }) => {
  return (
    <div style={{
      width: '315px',
      backgroundColor: 'var(--lofi-color2)',
      border: '1px solid var(--lofi-color3)',
      borderRadius: '12px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '8px',
      boxSizing: 'border-box'
    }}>
      {/* Window Floating Controls */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px', color: 'var(--lofi-tint-color3)', padding: '4px' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '20px', cursor: 'pointer' }}>more_vert</span>
        <span className="material-symbols-outlined" style={{ fontSize: '16.67px', cursor: 'pointer', fontVariationSettings: "'FILL' 1, 'GRAD' 0, 'ROND' 100, 'opsz' 24" }}>dock_to_left</span>
        <span className="material-symbols-outlined" style={{ fontSize: '20px', cursor: 'pointer' }}>close</span>
      </div>

      {/* Middle Prompt suggested workspace details */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '100px 8px 20px 8px',
        gap: '12px',
        ...animateStyle
      }}>
        {/* Gemini Logo */}
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
        }}>
          <GeminiSparkIcon size={20} color="var(--lofi-color4)" />
        </div>
        
        {/* Title */}
        <div style={{ fontSize: '20px', fontWeight: 500, color: 'var(--lofi-color9)', fontFamily: "'Google Sans Flex', sans-serif" }}>
          {displayTitle}
        </div>
        
        {/* Subtitle */}
        <div style={{ fontSize: '14px', color: 'var(--lofi-color8)', fontFamily: "'Google Sans Flex', sans-serif" }}>
          {displaySubtitle}
        </div>
      </div>

      {/* Suggestions buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px', marginBottom: '16px' }}>
        {displayAction1 && (
          <button style={{
            alignSelf: 'flex-start',
            backgroundColor: 'var(--lofi-tint-color1)',
            border: 'none',
            borderRadius: '50px',
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--lofi-color9)',
            cursor: 'pointer',
            fontFamily: "'Google Sans Flex', sans-serif"
          }}>
            {displayAction1}
          </button>
        )}
        {displayAction2 && (
          <button style={{
            alignSelf: 'flex-start',
            backgroundColor: 'var(--lofi-tint-color1)',
            border: 'none',
            borderRadius: '50px',
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--lofi-color9)',
            cursor: 'pointer',
            fontFamily: "'Google Sans Flex', sans-serif"
          }}>
            {displayAction2}
          </button>
        )}
      </div>

      {/* Text Input Footer Field */}
      <div style={{
        border: '1px solid var(--lofi-color4)',
        borderRadius: '10px',
        padding: '12px',
        backgroundColor: 'var(--lofi-surface)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <div style={{ fontSize: '14px', color: 'var(--lofi-color5)', opacity: 0.5, fontFamily: "'Google Sans Flex', sans-serif" }}>
          Type @ to ask about a tab
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '16.67px', color: 'var(--lofi-tint-color3)', cursor: 'pointer' }}>add</span>
          <div style={{ width: '40px', height: '16px', backgroundColor: 'var(--lofi-tint-color2)', borderRadius: '4px' }} />
        </div>
      </div>

    </div>
  );
};

export const ChromeSidePanelPreview = ({ action, orchData, showPrimitive }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const animateStyle = useAnimateIn(action);

  const howData = orchData && orchData.how ? orchData.how : null;
  const specific = howData ? (howData.chrome_side_panel || howData) : null;
  
  // Clean fallback mapping matching robust schema extraction rules
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
          backgroundColor: 'var(--lofi-surface)',
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
                backgroundColor: 'var(--lofi-container1)',
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

        {/* Browser Content Layout */}
        <div style={{ flex: 1, display: 'flex', position: 'relative', width: '100%', minHeight: 0, padding: '8px', boxSizing: 'border-box', gap: '8px' }}>
          {/* Default Web Canvas */}
          <div style={{ flex: 1, backgroundColor: 'var(--lofi-surface)' }} />

          {/* Gemini Side Dock Interface (Suggestions Drawer) */}
          {showPrimitive && (
            <ChromeSidePanelPrimitive 
              displayTitle={displayTitle}
              displaySubtitle={displaySubtitle}
              displayAction1={displayAction1}
              displayAction2={displayAction2}
              animateStyle={animateStyle}
            />
          )}
        </div>

      </div>
    </div>
  );
};
