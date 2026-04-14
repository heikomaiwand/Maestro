import React from 'react';

export default function LogicMapping({ selectedAction, orchestrationCache = {}, onToggle, isFullScreen, onFullScreenToggle }) {
  const oData = selectedAction ? orchestrationCache[selectedAction.id] : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <div>
        <div className="title-medium" style={{ textAlign: 'center', marginBottom: '24px' }}>Logic mapping</div>
        
        <div style={{ margin: '0 24px', padding: '20px', backgroundColor: 'var(--sys-color-surface-variant)', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sys-color-on-surface)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--sys-color-primary)' }}>auto_awesome</span>
            Orchestration Engine (When, Where, How)
          </div>
          
          {(() => {
            if (!selectedAction) {
              return <div style={{ fontSize: '14px', color: 'var(--sys-color-on-surface-variant)' }}>No action selected.</div>;
            }
            if (!oData || oData === 'loading') {
              return <div style={{ fontSize: '14px', fontStyle: 'italic', color: 'var(--sys-color-on-surface-variant)' }}>Reasoning about multi-surface delivery...</div>;
            }
            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: 'var(--sys-color-on-surface-variant)' }}>
                <div>
                  <strong style={{ color: 'var(--sys-color-on-surface)' }}>When:</strong> {oData.when?.decision} 
                  <div style={{ fontSize: '13px', marginTop: '4px', opacity: 0.8 }}>{oData.when?.reasoning}</div>
                </div>
                <hr style={{ border: 'none', borderTop: '1px solid var(--sys-color-outline-variant)', margin: '4px 0' }} />
                <div>
                  <strong style={{ color: 'var(--sys-color-on-surface)' }}>Where:</strong> {oData.where?.surfaces?.join(', ') || 'Ecosystem-wide'}
                  <div style={{ fontSize: '13px', marginTop: '4px', opacity: 0.8 }}>{oData.where?.reasoning}</div>
                </div>
                <hr style={{ border: 'none', borderTop: '1px solid var(--sys-color-outline-variant)', margin: '4px 0' }} />
                <div>
                  <strong style={{ color: 'var(--sys-color-on-surface)' }}>How (Multi-Surface Primitive Payload):</strong>
                  <pre style={{ fontSize: '12px', marginTop: '8px', backgroundColor: 'var(--sys-color-surface)', padding: '12px', borderRadius: '8px', overflowX: 'auto', border: '1px solid var(--sys-color-outline-variant)', fontFamily: 'monospace', color: 'var(--sys-color-on-surface)' }}>
                    {JSON.stringify(oData.how, null, 2)}
                  </pre>
                </div>

              </div>
            );
          })()}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 24px', marginTop: 'auto' }}>
        <span 
          className="material-symbols-outlined" 
          onClick={onFullScreenToggle}
          style={{ cursor: 'pointer', color: 'var(--sys-color-on-surface-variant)' }}
          title={isFullScreen ? "Restore Width" : "Full Width"}
        >
          {isFullScreen ? 'zoom_in_map' : 'zoom_out_map'}
        </span>
        <span 
          className="material-symbols-outlined" 
          style={{ cursor: 'pointer', color: 'var(--sys-color-primary)' }} 
          onClick={onToggle}
          title="Back to Interface Preview"
        >
          info
        </span>
      </div>
    </div>
  );
}
