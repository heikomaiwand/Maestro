import React, { useRef, useState, useEffect } from 'react';
import { useAnimateIn, GeminiSparkIcon } from './shared';

export const GmailPreview = ({ action, orchData, showPrimitive }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0.6);
  const animateStyle = useAnimateIn(action);

  const howData = orchData && orchData.how ? orchData.how : null;
  const specific = howData ? (howData.gmail || howData) : null;

  const displayTitle = specific ? (specific.headline || specific.Headline || specific.title || action?.title || 'Header') : (action?.title || 'Header');
  const displaySubtitle = specific ? (specific.subheading || specific.Subheading || specific.message || action?.why || 'Subheading') : (action?.why || 'Subheading');
  const displayAction1 = specific ? (specific.action1 || specific.Action1 || specific['Action 1'] || specific.Action || '') : 'Action1';
  const displayAction2 = specific ? (specific.action2 || specific.Action2 || specific['Action 2'] || '') : 'Action2';

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const parent = containerRef.current.parentElement;
      if (!parent) return;
      
      const availableWidth = parent.clientWidth;
      const availableHeight = parent.clientHeight;
      
      const targetWidth = 1280;
      const targetHeight = 820;

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
      <div 
        style={{ 
          position: 'absolute',
          width: '1280px', 
          height: '820px',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          backgroundColor: 'var(--lofi-container3)',
          display: 'flex',
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}
      >
        {/* Extreme Left Rail */}
        <div style={{ width: '72px', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '16px', gap: '36px', backgroundColor: 'var(--lofi-container3)', flexShrink: 0 }}>
          <span className="material-symbols-filled" style={{ fontSize: '24px', color: 'var(--lofi-text3)', fontVariationSettings: "'FILL' 1" }}>menu</span>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
            <div style={{ width: '48px', height: '32px', backgroundColor: 'var(--lofi-container4)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--lofi-tint3)', fontVariationSettings: "'FILL' 1" }}>mail</span>
            </div>
            {/* Chat and Videocam remain outlined as requested */}
            <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--lofi-text3)' }}>chat</span>
            <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--lofi-text3)' }}>videocam</span>
          </div>
        </div>

        {/* Center Workspace */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          
          {/* Top Header */}
          <div style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: '16px', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '206px' }}>
              <div style={{ width: '32px', height: '32px', backgroundColor: 'var(--lofi-container5)', borderRadius: '4px' }} />
              <span style={{ fontSize: '22px', fontFamily: 'Google Sans, sans-serif', color: 'var(--lofi-text3)', fontWeight: 500 }}>Gmail</span>
            </div>

            <div style={{ flex: 1, maxWidth: '720px', height: '48px', backgroundColor: 'var(--lofi-container4)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--lofi-text3)', fontVariationSettings: "'FILL' 1" }}>search</span>
                <span style={{ fontSize: '16px', color: 'var(--lofi-text3)', fontFamily: 'Redacted, sans-serif' }}>Search mail</span>
              </div>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--lofi-text3)', fontVariationSettings: "'FILL' 1" }}>tune</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'transparent', border: 'none', borderRadius: '16px', padding: '4px 8px' }}>
                <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--lofi-green)', borderRadius: '50%' }} />
                <span style={{ fontSize: '14px', color: 'var(--lofi-text3)', fontFamily: 'Redacted, sans-serif' }}>Active</span>
                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--lofi-text3)', fontVariationSettings: "'FILL' 1" }}>arrow_drop_down</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* Help and Settings remain outlined as requested */}
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--lofi-text3)' }}>help</span>
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--lofi-text3)' }}>settings</span>
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--lofi-text3)', fontVariationSettings: "'FILL' 1" }}>apps</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'var(--lofi-container4)', padding: '4px', paddingLeft: '16px', borderRadius: '24px' }}>
                <span style={{ fontSize: '14px', color: 'var(--lofi-text3)', fontFamily: 'Redacted, sans-serif' }}>Google Account</span>
                <div style={{ width: '32px', height: '32px', backgroundColor: 'var(--lofi-container5)', borderRadius: '50%' }} />
              </div>
            </div>
          </div>

          {/* Workspace Column Area */}
          <div style={{ flex: 1, display: 'flex', paddingBottom: '16px', paddingRight: '16px', minHeight: 0 }}>
            
            {/* Folder Drawer */}
            <div style={{ width: '256px', display: 'flex', flexDirection: 'column', paddingLeft: '16px', flexShrink: 0 }}>
              <div style={{ width: '140px', height: '56px', backgroundColor: 'var(--lofi-primary)', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px', padding: '0 16px', marginBottom: '16px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '24px', color: 'var(--lofi-tint3)', fontVariationSettings: "'FILL' 1" }}>edit</span>
                <span style={{ fontSize: '14px', color: 'var(--lofi-tint3)', fontFamily: 'Redacted, sans-serif' }}>Compose</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingRight: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', height: '32px', backgroundColor: 'var(--lofi-container4)', borderRadius: '16px', padding: '0 16px' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--lofi-text2)', fontVariationSettings: "'FILL' 1" }}>inbox</span>
                  <span style={{ fontSize: '14px', color: 'var(--lofi-text2)', fontFamily: 'Redacted, sans-serif' }}>Inbox</span>
                </div>

                {['Starred', 'Snoozed', 'Sent', 'Drafts'].map((labelName, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', height: '32px', padding: '0 16px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--lofi-text3)', fontVariationSettings: i === 0 ? 'normal' : "'FILL' 1" }}>
                      {i === 0 ? 'star_border' : i === 1 ? 'schedule' : i === 2 ? 'send' : 'draft'}
                    </span>
                    <span style={{ fontSize: '14px', color: 'var(--lofi-text3)', fontFamily: 'Redacted, sans-serif' }}>
                      {labelName}
                    </span>
                  </div>
                ))}

                <div style={{ marginTop: '16px', paddingLeft: '16px', fontSize: '12px', color: 'var(--lofi-text3)', fontFamily: 'Redacted, sans-serif' }}>
                  Labels
                </div>
                
                {['Important', 'Chats', 'Scheduled', 'All Mail'].map((labelName, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', height: '32px', padding: '0 16px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--lofi-text3)', fontVariationSettings: "'FILL' 1" }}>label</span>
                    <span style={{ fontSize: '14px', color: 'var(--lofi-text3)', fontFamily: 'Redacted, sans-serif' }}>
                      {labelName}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Inbox List */}
            <div style={{ flex: 1, backgroundColor: 'var(--lofi-container1)', borderRadius: '24px', display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
              
              <div style={{ height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', borderBottom: '1px solid var(--lofi-container5)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {/* Checkbox remains outlined */}
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--lofi-text3)' }}>check_box_outline_blank</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--lofi-text3)', fontVariationSettings: "'FILL' 1" }}>arrow_drop_down</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--lofi-text3)', fontVariationSettings: "'FILL' 1" }}>refresh</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--lofi-text3)', fontVariationSettings: "'FILL' 1" }}>more_vert</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--lofi-text3)', fontFamily: 'Redacted, sans-serif' }}>1-50 of 200</span>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--lofi-text3)', fontVariationSettings: "'FILL' 1" }}>chevron_left</span>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--lofi-text3)', fontVariationSettings: "'FILL' 1" }}>chevron_right</span>
                  </div>
                </div>
              </div>

              {showPrimitive && (
                <div 
                  style={{ 
                    backgroundColor: 'var(--lofi-color2)', 
                    border: '1px solid var(--lofi-color3)', 
                    borderRadius: '16px', 
                    margin: '16px',
                    padding: '16px', 
                    display: 'flex', 
                    gap: '16px', 
                    alignItems: 'flex-start', 
                    boxSizing: 'border-box',
                    boxShadow: '0 4px 12px rgba(86, 41, 164, 0.05)',
                    ...animateStyle
                  }}
                >
                  {/* Spark Icon */}
                  <div style={{ backgroundColor: 'var(--lofi-color4)', padding: '3px', borderRadius: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', flexShrink: 0 }}>
                    <GeminiSparkIcon size={16} color="#ffffff" />
                  </div>

                  {/* Details */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '16px', color: 'var(--lofi-color9)', fontWeight: 600, fontFamily: "'Google Sans Flex', sans-serif" }}>
                      {displayTitle}
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--lofi-color8)', lineHeight: '1.3', fontFamily: "'Google Sans Flex', sans-serif" }}>
                      {displaySubtitle}
                    </div>
                    
                    {/* Actions */}
                    {(displayAction1 || displayAction2) && (
                      <div style={{ display: 'flex', gap: '24px', marginTop: '8px', fontSize: '14px', color: 'var(--lofi-color9)', fontWeight: 600, fontFamily: "'Google Sans Text', sans-serif" }}>
                        {displayAction1 && <div style={{ cursor: 'pointer' }}>{displayAction1}</div>}
                        {displayAction2 && <div style={{ cursor: 'pointer' }}>{displayAction2}</div>}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div style={{ height: '56px', display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--lofi-container5)', paddingLeft: '16px', gap: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', height: '100%', borderBottom: '3px solid var(--lofi-text2)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--lofi-text2)', fontVariationSettings: "'FILL' 1" }}>inbox</span>
                  <span style={{ fontSize: '14px', color: 'var(--lofi-text2)', fontWeight: 500, fontFamily: 'Redacted, sans-serif' }}>Primary</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', height: '100%' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--lofi-text3)', fontVariationSettings: "'FILL' 1" }}>sell</span>
                  <span style={{ fontSize: '14px', color: 'var(--lofi-text3)', fontFamily: 'Redacted, sans-serif' }}>Promotions</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', height: '100%' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--lofi-text3)', fontVariationSettings: "'FILL' 1" }}>group</span>
                  <span style={{ fontSize: '14px', color: 'var(--lofi-text3)', fontFamily: 'Redacted, sans-serif' }}>Social</span>
                </div>
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {[...Array(8)].map((_, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid var(--lofi-container4)', padding: '12px 16px', gap: '8px' }}>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      {/* Row action indicators remain strictly outlined */}
                      <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--lofi-text3)' }}>check_box_outline_blank</span>
                      <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--lofi-text3)' }}>star_border</span>
                      <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--lofi-text3)' }}>label_important_outline</span>
                      
                      <span style={{ width: '140px', fontSize: '14px', color: 'var(--lofi-text2)', fontFamily: 'Redacted, sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        Google Cloud Team
                      </span>
                      
                      <span style={{ width: '220px', fontSize: '14px', color: 'var(--lofi-text2)', fontFamily: 'Redacted, sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        Important update regarding your service
                      </span>
                      
                      <span style={{ flex: 1, fontSize: '14px', color: 'var(--lofi-text3)', fontFamily: 'Redacted, sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        This message contains details about your upcoming renewal schedule and billing cycle.
                      </span>

                      <span style={{ fontSize: '12px', color: 'var(--lofi-text3)', fontFamily: 'Redacted, sans-serif' }}>Apr 8</span>
                    </div>

                    {(i === 1 || i === 5) && (
                      <div style={{ display: 'flex', gap: '12px', paddingLeft: '116px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 12px', border: '1px solid var(--lofi-container5)', borderRadius: '16px' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '14px', color: 'var(--lofi-text3)', fontVariationSettings: "'FILL' 1" }}>image</span>
                          <span style={{ fontSize: '12px', color: 'var(--lofi-text3)', fontFamily: 'Redacted, sans-serif' }}>screenshot.png</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 12px', border: '1px solid var(--lofi-container5)', borderRadius: '16px' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '14px', color: 'var(--lofi-text3)', fontVariationSettings: "'FILL' 1" }}>description</span>
                          <span style={{ fontSize: '12px', color: 'var(--lofi-text3)', fontFamily: 'Redacted, sans-serif' }}>document_report.pdf</span>
                        </div>
                      </div>
                    )}

                  </div>
                ))}
              </div>

            </div>

            {/* Extreme Right Companion Rail */}
            <div style={{ width: '56px', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '16px', gap: '32px', flexShrink: 0 }}>
              <span className="material-symbols-outlined" style={{ fontSize: '22px', color: 'var(--lofi-text3)', fontVariationSettings: "'FILL' 1" }}>calendar_today</span>
              <span className="material-symbols-outlined" style={{ fontSize: '22px', color: 'var(--lofi-text3)', fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
              <span className="material-symbols-outlined" style={{ fontSize: '22px', color: 'var(--lofi-text3)', fontVariationSettings: "'FILL' 1" }}>task_alt</span>
              <span className="material-symbols-outlined" style={{ fontSize: '22px', color: 'var(--lofi-text3)', fontVariationSettings: "'FILL' 1" }}>person</span>
              <div style={{ width: '20px', height: '1px', backgroundColor: 'var(--lofi-container5)' }} />
              <span className="material-symbols-outlined" style={{ fontSize: '22px', color: 'var(--lofi-text3)', fontVariationSettings: "'FILL' 1" }}>add</span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
