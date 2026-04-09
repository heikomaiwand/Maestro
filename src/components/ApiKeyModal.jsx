import React, { useState } from 'react';

export default function ApiKeyModal({ onSave, onClose }) {
  const [key, setKey] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (key.trim()) {
      onSave(key.trim());
    }
  };

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      backdropFilter: 'blur(4px)'
    }}>
      <div className="modal-content" style={{
        backgroundColor: 'var(--sys-color-surface)',
        padding: '24px',
        borderRadius: '16px',
        width: '420px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
        border: '1px solid var(--sys-color-outline-variant)'
      }}>
        <h2 style={{ marginTop: 0, marginBottom: '12px', color: 'var(--sys-color-on-surface)', fontSize: '20px' }}>
          Enter Gemini API Key
        </h2>
        <p style={{ color: 'var(--sys-color-on-surface-variant)', fontSize: '14px', marginBottom: '20px', lineHeight: '1.5' }}>
          To run live predictions, please provide your own Gemini API Key. 
          Your key is stored locally in your browser and never shared.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Paste your key here..."
            value={key}
            onChange={(e) => setKey(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid var(--sys-color-outline-variant)',
              backgroundColor: 'var(--sys-color-surface)',
              color: 'var(--sys-color-on-surface)',
              marginBottom: '24px',
              boxSizing: 'border-box',
              fontSize: '14px',
              outline: 'none'
            }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a 
              href="https://ai.studio/apikey" 
              target="_blank" 
              rel="noreferrer"
              style={{ color: 'var(--sys-color-primary)', fontSize: '14px', textDecoration: 'none', fontWeight: '500' }}
            >
              Get API key
            </a>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {onClose && (
                <button 
                  type="button" 
                  disabled
                  title="Demo mode is temporarily unavailable while we update the static state"
                  className="btn btn-text"
                >
                  Try Demo Mode
                </button>
              )}
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={!key.trim()}
              >
                Save Key
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
