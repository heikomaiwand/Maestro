import { useState } from 'react';
import { geminiDebugCache } from '../services/geminiService';

export default function DebugModal({ onClose, selectedAction }) {
  const [activeTab, setActiveTab] = useState('loop1');

  const loop1Data = geminiDebugCache.loop1;
  const loop2Data = selectedAction ? geminiDebugCache.loop2[selectedAction.id] : null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 3000
    }}>
      <div style={{
        width: '80vw',
        maxWidth: '1000px',
        height: '80vh',
        backgroundColor: 'var(--sys-color-surface-container)',
        borderRadius: '24px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.24)',
        border: '1px solid var(--sys-color-outline-variant)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 24px',
          borderBottom: '1px solid var(--sys-color-outline-variant)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--sys-color-primary)' }}>bug_report</span>
            <span className="title-medium" style={{ margin: 0 }}>Maestro Diagnostics</span>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--sys-color-outline)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px',
              borderRadius: '50%'
            }}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Tab Selection */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--sys-color-outline-variant)',
          backgroundColor: 'var(--sys-color-surface-container-low)'
        }}>
          <button
            onClick={() => setActiveTab('loop1')}
            style={{
              flex: 1,
              padding: '16px',
              border: 'none',
              backgroundColor: activeTab === 'loop1' ? 'var(--sys-color-secondary-container)' : 'transparent',
              color: activeTab === 'loop1' ? 'var(--sys-color-on-secondary-container)' : 'var(--sys-color-on-surface-variant)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            Loop 1: Context & Signals Engine
          </button>
          <button
            onClick={() => setActiveTab('loop2')}
            style={{
              flex: 1,
              padding: '16px',
              border: 'none',
              backgroundColor: activeTab === 'loop2' ? 'var(--sys-color-secondary-container)' : 'transparent',
              color: activeTab === 'loop2' ? 'var(--sys-color-on-secondary-container)' : 'var(--sys-color-on-surface-variant)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            Loop 2: Reasoning & Orchestration
          </button>
        </div>

        {/* Content Area */}
        <div style={{
          flex: 1,
          padding: '24px',
          overflowY: 'auto',
          backgroundColor: 'var(--sys-color-surface-container-lowest)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {activeTab === 'loop1' ? (
            loop1Data && loop1Data.systemInstruction ? (
              <>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '4px', fontSize: '13px', textTransform: 'uppercase', color: 'var(--sys-color-outline)' }}>Model Name</div>
                  <div style={{ fontSize: '15px', color: 'var(--sys-color-primary)', fontWeight: 500 }}>{loop1Data.model}</div>
                </div>

                <div>
                  <div style={{ fontWeight: 600, marginBottom: '8px', fontSize: '13px', textTransform: 'uppercase', color: 'var(--sys-color-outline)' }}>System Instruction</div>
                  <pre style={{
                    margin: 0,
                    padding: '16px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--sys-color-surface-container-high)',
                    color: 'var(--sys-color-on-surface)',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    fontSize: '13px',
                    fontFamily: 'sans-serif',
                    lineHeight: '1.5'
                  }}>{loop1Data.systemInstruction}</pre>
                </div>

                <div>
                  <div style={{ fontWeight: 600, marginBottom: '8px', fontSize: '13px', textTransform: 'uppercase', color: 'var(--sys-color-outline)' }}>Context Input</div>
                  <pre style={{
                    margin: 0,
                    padding: '16px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--sys-color-surface-container-high)',
                    color: 'var(--sys-color-on-surface)',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    fontSize: '13px',
                    fontFamily: 'sans-serif'
                  }}>{loop1Data.requestPayload}</pre>
                </div>

                <div>
                  <div style={{ fontWeight: 600, marginBottom: '8px', fontSize: '13px', textTransform: 'uppercase', color: 'var(--sys-color-outline)' }}>Response Payload</div>
                  <pre style={{
                    margin: 0,
                    padding: '16px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--sys-color-surface-container-high)',
                    color: 'var(--sys-color-on-surface)',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all',
                    fontSize: '13px',
                    fontFamily: 'monospace'
                  }}>{loop1Data.response}</pre>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--sys-color-outline)' }}>
                No active Loop 1 transactions cached. Submit a scenario prompt.
              </div>
            )
          ) : (
            loop2Data && loop2Data.systemInstruction ? (
              <>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '4px', fontSize: '13px', textTransform: 'uppercase', color: 'var(--sys-color-outline)' }}>Model Name</div>
                  <div style={{ fontSize: '15px', color: 'var(--sys-color-primary)', fontWeight: 500 }}>{loop2Data.model}</div>
                </div>

                <div>
                  <div style={{ fontWeight: 600, marginBottom: '8px', fontSize: '13px', textTransform: 'uppercase', color: 'var(--sys-color-outline)' }}>System Instruction</div>
                  <pre style={{
                    margin: 0,
                    padding: '16px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--sys-color-surface-container-high)',
                    color: 'var(--sys-color-on-surface)',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    fontSize: '13px',
                    fontFamily: 'sans-serif',
                    lineHeight: '1.5'
                  }}>{loop2Data.systemInstruction}</pre>
                </div>

                <div>
                  <div style={{ fontWeight: 600, marginBottom: '8px', fontSize: '13px', textTransform: 'uppercase', color: 'var(--sys-color-outline)' }}>Context Input</div>
                  <pre style={{
                    margin: 0,
                    padding: '16px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--sys-color-surface-container-high)',
                    color: 'var(--sys-color-on-surface)',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    fontSize: '13px',
                    fontFamily: 'sans-serif'
                  }}>{loop2Data.requestPayload}</pre>
                </div>

                <div>
                  <div style={{ fontWeight: 600, marginBottom: '8px', fontSize: '13px', textTransform: 'uppercase', color: 'var(--sys-color-outline)' }}>Response Payload</div>
                  <pre style={{
                    margin: 0,
                    padding: '16px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--sys-color-surface-container-high)',
                    color: 'var(--sys-color-on-surface)',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all',
                    fontSize: '13px',
                    fontFamily: 'monospace'
                  }}>{loop2Data.response}</pre>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--sys-color-outline)' }}>
                {selectedAction ? "Orchestration routing details haven't fully synced yet." : "Select an actionable intervention choice from Reasoning Panel first."}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}
