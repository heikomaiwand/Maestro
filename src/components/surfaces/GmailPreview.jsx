import React, { useRef, useState, useEffect } from 'react';

export const GmailPreview = ({ action }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0.6);

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
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', overflow: 'hidden' }}>
      <div 
        style={{ 
          position: 'absolute',
          width: '1280px', 
          height: '820px',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          backgroundColor: '#f3f7fc',
          display: 'flex',
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}
      >
        {/* Extreme Left Rail */}
        <div style={{ width: '72px', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '16px', gap: '36px', backgroundColor: '#f3f7fc', flexShrink: 0 }}>
          <span className="material-symbols-outlined" style={{ fontSize: '24px', color: 'rgba(105,145,214,0.5)' }}>menu</span>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
            <div style={{ width: '48px', height: '32px', backgroundColor: 'rgba(105,145,214,0.15)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'rgba(105,145,214,0.8)' }}>mail</span>
            </div>
            <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'rgba(105,145,214,0.4)' }}>chat</span>
            <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'rgba(105,145,214,0.4)' }}>videocam</span>
          </div>
        </div>

        {/* Center Workspace */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          
          {/* Top Header */}
          <div style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: '16px', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '206px' }}>
              <div style={{ width: '32px', height: '32px', backgroundColor: 'rgba(105,145,214,0.15)', borderRadius: '4px' }} />
              <span style={{ fontSize: '22px', fontFamily: 'Google Sans, sans-serif', color: 'rgba(105,145,214,0.7)', fontWeight: 500 }}>Gmail</span>
            </div>

            <div style={{ flex: 1, maxWidth: '720px', height: '48px', backgroundColor: '#e9eef6', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'rgba(105,145,214,0.4)' }}>search</span>
                <span style={{ fontSize: '16px', color: 'rgba(105,145,214,0.4)', fontFamily: 'Redacted, sans-serif' }}>Search mail</span>
              </div>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'rgba(105,145,214,0.4)' }}>tune</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#ffffff', border: '1px solid rgba(105,145,214,0.15)', borderRadius: '16px', padding: '4px 8px' }}>
                <div style={{ width: '8px', height: '8px', backgroundColor: '#34a853', borderRadius: '50%' }} />
                <span style={{ fontSize: '14px', color: 'rgba(105,145,214,0.5)', fontFamily: 'Redacted, sans-serif' }}>Active</span>
                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'rgba(105,145,214,0.3)' }}>arrow_drop_down</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'rgba(105,145,214,0.4)' }}>help</span>
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'rgba(105,145,214,0.4)' }}>settings</span>
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'rgba(105,145,214,0.4)' }}>apps</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#e9eef6', padding: '4px', paddingLeft: '16px', borderRadius: '24px' }}>
                <span style={{ fontSize: '14px', color: 'rgba(105,145,214,0.5)', fontFamily: 'Redacted, sans-serif' }}>Google Account</span>
                <div style={{ width: '32px', height: '32px', backgroundColor: 'rgba(105,145,214,0.2)', borderRadius: '50%' }} />
              </div>
            </div>
          </div>

          {/* Workspace Column Area */}
          <div style={{ flex: 1, display: 'flex', paddingBottom: '16px', paddingRight: '16px', minHeight: 0 }}>
            
            {/* Folder Drawer */}
            <div style={{ width: '256px', display: 'flex', flexDirection: 'column', paddingLeft: '16px', flexShrink: 0 }}>
              <div style={{ width: '140px', height: '56px', backgroundColor: '#c2e7ff', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px', padding: '0 16px', marginBottom: '16px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '24px', color: '#001d35' }}>edit</span>
                <span style={{ fontSize: '14px', color: '#001d35', fontFamily: 'Redacted, sans-serif' }}>Compose</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingRight: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', height: '32px', backgroundColor: '#d3e3fd', borderRadius: '16px', padding: '0 16px' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#041e49' }}>inbox</span>
                  <span style={{ fontSize: '14px', color: '#041e49', fontFamily: 'Redacted, sans-serif' }}>Inbox</span>
                </div>

                {['Starred', 'Snoozed', 'Sent', 'Drafts'].map((labelName, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', height: '32px', padding: '0 16px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'rgba(105,145,214,0.4)' }}>
                      {i === 0 ? 'star_border' : i === 1 ? 'schedule' : i === 2 ? 'send' : 'draft'}
                    </span>
                    <span style={{ fontSize: '14px', color: 'rgba(105,145,214,0.5)', fontFamily: 'Redacted, sans-serif' }}>
                      {labelName}
                    </span>
                  </div>
                ))}

                <div style={{ marginTop: '16px', paddingLeft: '16px', fontSize: '12px', color: 'rgba(105,145,214,0.5)', fontFamily: 'Redacted, sans-serif' }}>
                  Labels
                </div>
                
                {['Important', 'Chats', 'Scheduled', 'All Mail'].map((labelName, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', height: '32px', padding: '0 16px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'rgba(105,145,214,0.3)' }}>label</span>
                    <span style={{ fontSize: '14px', color: 'rgba(105,145,214,0.4)', fontFamily: 'Redacted, sans-serif' }}>
                      {labelName}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Inbox List */}
            <div style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: '24px', display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
              
              <div style={{ height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', borderBottom: '1px solid rgba(105,145,214,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'rgba(105,145,214,0.3)' }}>check_box_outline_blank</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'rgba(105,145,214,0.3)' }}>arrow_drop_down</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'rgba(105,145,214,0.3)' }}>refresh</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'rgba(105,145,214,0.3)' }}>more_vert</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                  <span style={{ fontSize: '12px', color: 'rgba(105,145,214,0.4)', fontFamily: 'Redacted, sans-serif' }}>1-50 of 200</span>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'rgba(105,145,214,0.2)' }}>chevron_left</span>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'rgba(105,145,214,0.4)' }}>chevron_right</span>
                  </div>
                </div>
              </div>

              <div style={{ height: '56px', display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(105,145,214,0.06)', paddingLeft: '16px', gap: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', height: '100%', borderBottom: '3px solid #0b57d0' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#0b57d0' }}>inbox</span>
                  <span style={{ fontSize: '14px', color: '#0b57d0', fontWeight: 500, fontFamily: 'Redacted, sans-serif' }}>Primary</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', height: '100%' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'rgba(105,145,214,0.4)' }}>sell</span>
                  <span style={{ fontSize: '14px', color: 'rgba(105,145,214,0.4)', fontFamily: 'Redacted, sans-serif' }}>Promotions</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', height: '100%' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'rgba(105,145,214,0.4)' }}>group</span>
                  <span style={{ fontSize: '14px', color: 'rgba(105,145,214,0.4)', fontFamily: 'Redacted, sans-serif' }}>Social</span>
                </div>
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {[...Array(8)].map((_, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid rgba(105,145,214,0.04)', padding: '12px 16px', gap: '8px' }}>
                    
                    {/* Main email row info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'rgba(105,145,214,0.3)' }}>check_box_outline_blank</span>
                      <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'rgba(105,145,214,0.3)' }}>star_border</span>
                      <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'rgba(105,145,214,0.3)' }}>label_important_outline</span>
                      
                      <span style={{ width: '140px', fontSize: '14px', color: 'rgba(105,145,214,0.5)', fontFamily: 'Redacted, sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        Google Cloud Team
                      </span>
                      
                      <span style={{ width: '220px', fontSize: '14px', color: 'rgba(105,145,214,0.6)', fontFamily: 'Redacted, sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        Important update regarding your service
                      </span>
                      
                      <span style={{ flex: 1, fontSize: '14px', color: 'rgba(105,145,214,0.35)', fontFamily: 'Redacted, sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        This message contains details about your upcoming renewal schedule and billing cycle.
                      </span>

                      <span style={{ fontSize: '12px', color: 'rgba(105,145,214,0.3)', fontFamily: 'Redacted, sans-serif' }}>Apr 8</span>
                    </div>

                    {/* In-line Attachments for rows 2 and 6 */}
                    {(i === 1 || i === 5) && (
                      <div style={{ display: 'flex', gap: '12px', paddingLeft: '116px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 12px', border: '1px solid rgba(105,145,214,0.2)', borderRadius: '16px' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '14px', color: 'rgba(105,145,214,0.5)' }}>image</span>
                          <span style={{ fontSize: '12px', color: 'rgba(105,145,214,0.4)', fontFamily: 'Redacted, sans-serif' }}>screenshot.png</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 12px', border: '1px solid rgba(105,145,214,0.2)', borderRadius: '16px' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '14px', color: 'rgba(105,145,214,0.5)' }}>description</span>
                          <span style={{ fontSize: '12px', color: 'rgba(105,145,214,0.4)', fontFamily: 'Redacted, sans-serif' }}>document_report.pdf</span>
                        </div>
                      </div>
                    )}

                  </div>
                ))}
              </div>

            </div>

            {/* Extreme Right Companion Rail */}
            <div style={{ width: '56px', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '16px', gap: '32px', flexShrink: 0 }}>
              <span className="material-symbols-outlined" style={{ fontSize: '22px', color: 'rgba(105,145,214,0.5)' }}>calendar_today</span>
              <span className="material-symbols-outlined" style={{ fontSize: '22px', color: 'rgba(105,145,214,0.5)' }}>lightbulb</span>
              <span className="material-symbols-outlined" style={{ fontSize: '22px', color: 'rgba(105,145,214,0.5)' }}>task_alt</span>
              <span className="material-symbols-outlined" style={{ fontSize: '22px', color: 'rgba(105,145,214,0.5)' }}>person</span>
              <div style={{ width: '20px', height: '1px', backgroundColor: 'rgba(105,145,214,0.15)' }} />
              <span className="material-symbols-outlined" style={{ fontSize: '22px', color: 'rgba(105,145,214,0.3)' }}>add</span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
