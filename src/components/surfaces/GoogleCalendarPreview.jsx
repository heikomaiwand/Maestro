import React, { useRef, useState, useEffect } from 'react';
import { useAnimateIn } from './shared';

export const GoogleCalendarPreview = ({ action, orchData, showPrimitive }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0.6);
  const animateStyle = useAnimateIn(action);

  const howData = orchData && orchData.how ? orchData.how : null;
  const specific = howData ? (howData.google_calendar || howData) : null;

  const displayTitle = specific ? (specific.headline || specific.Headline || specific.title || action?.title || 'Event name') : (action?.title || 'Event name');
  const displayStartTime = specific ? (specific.start_time || specific.startTime || specific['start-time'] || '2:00 PM') : '2:00 PM';
  const displayEndTime = specific ? (specific.end_time || specific.endTime || specific['end-time'] || '3:00 PM') : '3:00 PM';
  const displayAction1 = specific ? (specific.action1 || specific.Action1 || specific.Action || 'Action1') : 'Action1';

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
          boxSizing: 'border-box',
          fontFamily: "'Google Sans Flex', 'Google Sans Text', sans-serif"
        }}
      >
        {/* Left Nav Drawer */}
        <div style={{ width: '248px', padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: '24px', boxSizing: 'border-box', flexShrink: 0 }}>
          {/* Logo & Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', height: '65px', padding: '0 14px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '24px', color: 'var(--lofi-tint3)' }}>calendar_today</span>
            <span style={{ fontSize: '22px', color: 'rgba(105,145,214,0.29)', fontFamily: "'Google Sans Flex', sans-serif" }}>Calendar</span>
          </div>

          {/* FAB - Compose */}
          <div style={{ backgroundColor: 'var(--lofi-container1)', display: 'flex', gap: '12px', padding: '16px 20px', borderRadius: '16px', alignItems: 'center', cursor: 'pointer', width: 'fit-content' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '24px', color: 'var(--lofi-tint3)' }}>add</span>
            <span style={{ fontSize: '14px', color: 'var(--lofi-text3)', opacity: 0.3, fontFamily: "'Google redacted', 'Redacted', sans-serif" }}>Compose</span>
          </div>

          {/* Mini Calendar */}
          <div style={{ display: 'flex', flexDirection: 'column', padding: '0 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '32px' }}>
              <span style={{ fontSize: '16px', color: 'var(--lofi-text2)', fontFamily: "'Google redacted', 'Redacted', sans-serif" }}>Month Year</span>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--lofi-tint3)' }}>arrows_outward</span>
            </div>
            {/* Dots grid for calendar */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', marginTop: '12px' }}>
              {Array.from({ length: 35 }).map((_, idx) => (
                <div key={idx} style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: idx === 10 ? 'var(--lofi-color7)' : 'var(--lofi-tint3)' }} />
              ))}
            </div>
          </div>

          {/* Calendar List filters */}
          <div style={{ display: 'flex', flexDirection: 'column', padding: '0 16px', gap: '8px' }}>
            <div style={{ fontSize: '16px', color: 'var(--lofi-text2)', fontFamily: "'Google redacted', 'Redacted', sans-serif", height: '32px', display: 'flex', alignItems: 'center' }}>My calendars</div>
            {['Heiko Maiwand', 'Birthdays', 'Personal', 'Tasks'].map((cal, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', height: '32px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--lofi-container5)' }}>label</span>
                <span style={{ fontSize: '14px', color: 'var(--lofi-text2)', fontFamily: "'Google redacted', 'Redacted', sans-serif" }}>{cal}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content Workspace */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, backgroundColor: 'var(--lofi-surface)', borderRadius: '24px', margin: '8px 16px 20px 0', overflow: 'hidden' }}>
          {/* Top Workspace Bar */}
          <div style={{ height: '65px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 26px', borderBottom: '1px solid var(--lofi-outline-low)' }}>
            {/* Search */}
            <div style={{ flex: 1, maxWidth: '600px', height: '48px', backgroundColor: 'var(--lofi-container4)', borderRadius: '28px', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '12px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--lofi-text3)' }}>search</span>
              <span style={{ fontSize: '16px', color: 'var(--lofi-text1)', fontFamily: "'Google redacted', 'Redacted', sans-serif" }}>Search</span>
              <div style={{ flex: 1 }} />
              <span className="material-symbols-outlined" style={{ fontSize: '24px', color: 'rgba(105,145,214,0.29)' }}>tune</span>
            </div>

            {/* Profile controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '24px', color: 'var(--lofi-text3)', opacity: 0.9 }}>help</span>
              <span className="material-symbols-outlined" style={{ fontSize: '24px', color: 'var(--lofi-text3)', opacity: 0.9 }}>settings</span>
              <div style={{ border: '1px solid var(--lofi-outline)', borderRadius: '8px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: 'var(--lofi-text3)', opacity: 0.5 }}>Google</span>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--lofi-tint3)' }} />
              </div>
            </div>
          </div>

          {/* Days Header */}
          <div style={{ height: '96px', borderBottom: '1px solid var(--lofi-outline-low)', display: 'flex' }}>
            <div style={{ width: '64px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', paddingBottom: '8px' }}>
              <span style={{ fontSize: '10px', color: 'var(--lofi-text2)', fontFamily: "'Google redacted', 'Redacted', sans-serif" }}>GMT-4</span>
            </div>
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
              {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day, idx) => {
                const dateNum = 12 + idx;
                const isActive = dateNum === 15;
                return (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', borderLeft: '1px solid var(--lofi-container3)' }}>
                    <div style={{ fontSize: '10px', color: isActive ? 'var(--lofi-text3)' : 'var(--lofi-text2)', fontFamily: "'Google redacted', 'Redacted', sans-serif", letterSpacing: '1px' }}>{day}</div>
                    {isActive ? (
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--lofi-tint4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '24px', fontWeight: 600, color: '#fff', fontFamily: "'Google Sans Flex', sans-serif" }}>{dateNum}</span>
                      </div>
                    ) : (
                      <span style={{ fontSize: '24px', color: 'var(--lofi-text3)', fontFamily: "'Google Sans Flex', sans-serif" }}>{dateNum}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scrollable Main Grid */}
          <style>{`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
          <div className="hide-scrollbar" style={{ flex: 1, display: 'flex', overflowY: 'auto', position: 'relative' }}>
            {/* Time Column */}
            <div style={{ width: '64px', display: 'flex', flexDirection: 'column', paddingTop: '16px', boxSizing: 'border-box' }}>
              {Array.from({ length: 10 }).map((_, idx) => {
                let labelText = 'TIME';
                if ((idx === 4 || idx === 6) && showPrimitive) {
                  labelText = idx === 4 ? displayStartTime : displayEndTime;
                }
                const isDynamic = (idx === 4 || idx === 6) && showPrimitive;
                return (
                  <div key={idx} style={{ height: '64px', paddingRight: '8px', boxSizing: 'border-box', textAlign: 'right' }}>
                    <span style={{ fontSize: '10px', color: isDynamic ? 'var(--lofi-color7)' : 'var(--lofi-text1)', fontFamily: isDynamic ? "'Google Sans Flex', sans-serif" : "'Google redacted', 'Redacted', sans-serif" }}>
                      {labelText}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Grid Matrix Area */}
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', height: '1200px', position: 'relative', borderLeft: '1px solid var(--lofi-container3)' }}>
              {/* Column Grid Lines */}
              {Array.from({ length: 7 }).map((_, idx) => (
                <div key={idx} style={{ borderRight: '1px solid var(--lofi-container3)', height: '100%', gridRow: '1 / -1' }} />
              ))}

              {/* Row Dividers */}
              <div style={{ position: 'absolute', top: '24px', left: 0, right: 0, display: 'flex', flexDirection: 'column' }}>
                {Array.from({ length: 10 }).map((_, idx) => (
                  <div key={idx} style={{ height: '64px', borderBottom: '1px solid var(--lofi-container2)' }} />
                ))}
              </div>

              {/* Hardcoded Standard Events (Gray placeholders) */}
              {/* Monday Review */}
              <div style={{ position: 'absolute', top: '24px', left: '14.28%', right: '71.44%', height: '128px', padding: '2px 4px', boxSizing: 'border-box' }}>
                <div style={{ backgroundColor: 'var(--lofi-container3)', borderLeft: '4px solid var(--lofi-container5)', height: '100%', borderRadius: '6px', padding: '8px 12px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--lofi-text3)', fontFamily: "'Google redacted', 'Redacted', sans-serif" }}>Weekly Product Review</div>
                  <div style={{ fontSize: '9px', color: 'var(--lofi-text2)', fontFamily: "'Google redacted', 'Redacted', sans-serif" }}>TIME - TIME</div>
                </div>
              </div>

              {/* Design Sync on Wednesday */}
              <div style={{ position: 'absolute', top: '152px', left: '42.9%', right: '42.9%', height: '64px', padding: '2px 4px', boxSizing: 'border-box' }}>
                <div style={{ backgroundColor: 'var(--lofi-container3)', borderLeft: '4px solid var(--lofi-container5)', height: '100%', borderRadius: '6px', padding: '8px 12px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--lofi-text3)', fontFamily: "'Google redacted', 'Redacted', sans-serif" }}>Design Sync</div>
                  <div style={{ fontSize: '9px', color: 'var(--lofi-text2)', fontFamily: "'Google redacted', 'Redacted', sans-serif" }}>TIME - TIME</div>
                </div>
              </div>

              {/* Deep Work on Thursday */}
              <div style={{ position: 'absolute', top: '88px', left: '57.2%', right: '28.6%', height: '192px', padding: '2px 4px', boxSizing: 'border-box' }}>
                <div style={{ backgroundColor: 'var(--lofi-container3)', borderLeft: '4px solid var(--lofi-container5)', height: '100%', borderRadius: '6px', padding: '8px 12px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--lofi-text3)', fontFamily: "'Google redacted', 'Redacted', sans-serif" }}>Deep Work</div>
                  <div style={{ fontSize: '9px', color: 'var(--lofi-text2)', fontFamily: "'Google redacted', 'Redacted', sans-serif" }}>TIME - TIME</div>
                </div>
              </div>

              {/* Friday Sync */}
              <div style={{ position: 'absolute', top: '344px', left: '71.46%', right: '14.34%', height: '64px', padding: '2px 4px', boxSizing: 'border-box' }}>
                <div style={{ backgroundColor: 'var(--lofi-container3)', borderLeft: '4px solid var(--lofi-container5)', height: '100%', borderRadius: '6px', padding: '8px 12px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--lofi-text3)', fontFamily: "'Google redacted', 'Redacted', sans-serif" }}>Design Sync</div>
                  <div style={{ fontSize: '9px', color: 'var(--lofi-text2)', fontFamily: "'Google redacted', 'Redacted', sans-serif" }}>TIME - TIME</div>
                </div>
              </div>

              {/* SuggestedPrimitive Event on Wednesday */}
              {showPrimitive && (
                <div 
                  style={{ 
                    position: 'absolute', 
                    top: '281px', 
                    left: '42.9%', 
                    right: '42.9%', 
                    height: '127px', 
                    padding: '2px 4px', 
                    boxSizing: 'border-box',
                    ...animateStyle 
                  }}
                >
                  <div 
                    style={{ 
                      backgroundColor: 'var(--lofi-color3)', 
                      borderLeft: '4px solid var(--lofi-color7)', 
                      height: '100%', 
                      borderRadius: '6px', 
                      padding: '8px 12px', 
                      boxSizing: 'border-box', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '4px' 
                    }}
                  >
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--lofi-color9)', fontFamily: "'Google Sans Flex', sans-serif" }}>
                      {displayTitle}
                    </div>
                    <div style={{ fontSize: '9px', color: 'var(--lofi-color7)', fontFamily: "'Google Sans Flex', sans-serif" }}>
                      {displayStartTime}
                    </div>
                    {displayAction1 && (
                      <div style={{ marginTop: 'auto', backgroundColor: 'var(--lofi-color1)', padding: '4px 8px', borderRadius: '50px', fontSize: '8px', color: 'var(--lofi-color9)', width: 'fit-content', fontFamily: "'Google Sans Text', sans-serif", fontWeight: 500, cursor: 'pointer' }}>
                        {displayAction1}
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
