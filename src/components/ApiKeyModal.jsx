import React, { useState } from 'react';

export default function ApiKeyModal({ onSave, onClose }) {
  const [key, setKey] = useState(() => localStorage.getItem('gemini_api_key') || '');
  const [selectedModel, setSelectedModel] = useState(() => localStorage.getItem('gemini_model') || 'gemini-2.5-flash');

  const [showModelMenu, setShowModelMenu] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (key.trim()) {
      localStorage.setItem('gemini_model', selectedModel);
      onSave(key.trim(), selectedModel);
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
        border: '1px solid var(--sys-color-outline-variant)',
        position: 'relative'
      }}>
        <h2 style={{ marginTop: 0, marginBottom: '12px', color: 'var(--sys-color-on-surface)', fontSize: '20px' }}>
          Gemini API Configuration
        </h2>
        <p style={{ color: 'var(--sys-color-on-surface-variant)', fontSize: '14px', marginBottom: '20px', lineHeight: '1.5' }}>
          Configure your preferred reasoning model and API key.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '8px', color: 'var(--sys-color-on-surface-variant)' }}>
              API KEY
            </label>
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
                boxSizing: 'border-box',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          {showModelMenu && (
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '8px', color: 'var(--sys-color-on-surface-variant)' }}>
                SELECT MODEL
              </label>
              <select 
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid var(--sys-color-outline-variant)',
                  backgroundColor: 'var(--sys-color-surface)',
                  color: 'var(--sys-color-on-surface)',
                  boxSizing: 'border-box',
                  fontSize: '14px',
                  outline: 'none',
                  cursor: 'pointer'
                }}
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
              >
                <option value="gemini-3.1-flash-preview">gemini-3.1-flash-preview</option>
                <option value="gemini-3-flash-preview">gemini-3-flash-preview</option>
                <option value="gemini-2.5-flash">gemini-2.5-flash</option>
                <option value="gemini-2.5-pro">gemini-2.5-pro</option>
                <option value="gemini-2.0-flash">gemini-2.0-flash</option>
                <option value="gemini-2.0-pro-exp">gemini-2.0-pro-exp</option>
              </select>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a 
              href="https://ai.studio/apikey" 
              target="_blank" 
              rel="noreferrer"
              style={{ color: 'var(--sys-color-primary)', fontSize: '14px', textDecoration: 'none', fontWeight: '500' }}
            >
              Get API key
            </a>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <span 
                className="material-symbols-outlined" 
                style={{ 
                  cursor: 'pointer', 
                  color: showModelMenu ? 'var(--sys-color-primary)' : 'var(--sys-color-on-surface-variant)', 
                  fontSize: '24px',
                  userSelect: 'none'
                }} 
                onClick={() => setShowModelMenu(!showModelMenu)}
                title="Advanced Model Settings"
              >
                settings
              </span>

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
