import { useState, useRef, useEffect } from 'react';

export default function TopBar({ onClearApiKey, onDebugClick, onShowTour }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (localStorage.getItem('use_experimental_logic') === null) {
      localStorage.setItem('use_experimental_logic', 'false');
    }
  }, []);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const handleConfirmClear = () => {
    if (onClearApiKey) onClearApiKey();
    setShowConfirmModal(false);
    setShowMenu(false);
  };

  return (
    <header className="top-bar">
      <div 
        style={{ fontSize: '20px', color: 'var(--sys-color-on-surface)', cursor: 'pointer', position: 'relative' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        <span style={{ fontWeight: 500 }}>MAESTRO prototype</span>
        <a 
          href="http://go/maestro-proto" 
          target="_blank" 
          rel="noreferrer"
          style={{ 
            marginLeft: '8px', 
            fontSize: '16px', 
            color: 'var(--sys-color-outline)', 
            textDecoration: 'none',
            fontWeight: 300
          }}
        >
          (go/maestro-proto)
        </a>
        
        {isHovered && (
          <div 
            className="signal-tooltip"
            style={{ 
              left: `${mousePos.x + 12}px`, 
              top: `${mousePos.y + 12}px`,
              position: 'fixed',
              zIndex: 1000,
              width: '320px',
              fontWeight: 'normal'
            }}
          >
            Multi-device Adaptive Engine for Smart Task Recommendation & Orchestration
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', position: 'relative' }}>
        <span 
          className="material-symbols-outlined" 
          title="Open Debug Panel"
          style={{ cursor: 'pointer', color: 'var(--sys-color-on-surface)' }}
          onClick={onDebugClick}
        >
          bug_report
        </span>

        {/* Active Settings Menu */}
        <div ref={menuRef} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <span 
            className="material-symbols-outlined" 
            style={{ cursor: 'pointer', color: showMenu ? 'var(--sys-color-primary)' : 'var(--sys-color-on-surface)' }}
            onClick={() => setShowMenu(!showMenu)}
            title="Settings"
          >
            settings
          </span>

          {showMenu && (
            <div 
              style={{
                position: 'absolute',
                top: '40px',
                right: '0',
                backgroundColor: 'var(--sys-color-surface)',
                border: '1px solid var(--sys-color-outline-variant)',
                borderRadius: '12px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                width: '220px',
                zIndex: 2000,
                padding: '8px 0',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <button 
                className="btn btn-text"
                onClick={() => {
                  document.documentElement.classList.toggle('dark');
                }}
                style={{ 
                  justifyContent: 'space-between', 
                  width: '100%', 
                  padding: '12px 20px', 
                  borderRadius: 0,
                  color: 'var(--sys-color-on-surface)',
                  fontWeight: 400
                }}
              >
                <span>Change theme</span>
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>tonality</span>
              </button>

              <button 
                className="btn btn-text"
                onClick={() => {
                  const current = localStorage.getItem('showGuidedTour');
                  const newValue = (current === 'false') ? 'true' : 'false';
                  localStorage.setItem('showGuidedTour', newValue);
                  
                  // If turning it on, trigger it if possible
                  if (newValue === 'true' && onShowTour) {
                    onShowTour();
                  }
                  setShowMenu(false);
                }}
                style={{ 
                  justifyContent: 'space-between', 
                  width: '100%', 
                  padding: '12px 20px', 
                  borderRadius: 0,
                  color: 'var(--sys-color-on-surface)',
                  fontWeight: 400
                }}
              >
                <span>Show guided tour</span>
                {(localStorage.getItem('showGuidedTour') === 'true' || localStorage.getItem('showGuidedTour') === null) ? (
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>check_box</span>
                ) : (
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>check_box_outline_blank</span>
                )}
              </button>


              <button 
                className="btn btn-text"
                onClick={() => setShowConfirmModal(true)}
                style={{ 
                  justifyContent: 'flex-start', 
                  width: '100%', 
                  padding: '12px 20px', 
                  borderRadius: 0,
                  color: 'var(--sys-color-on-surface)',
                  fontWeight: 400
                }}
              >
                <span>Clear API key</span>
              </button>

              <div style={{ padding: '12px 20px', display: 'flex', flexDirection: 'column' }}>
                <select 
                  style={{ 
                    width: '100%', 
                    padding: '6px', 
                    borderRadius: '6px', 
                    border: '1px solid var(--sys-color-outline-variant)',
                    backgroundColor: 'var(--sys-color-surface-container)',
                    color: 'var(--sys-color-on-surface)',
                    fontSize: '12px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                  value={localStorage.getItem('gemini_model') || 'gemini-3.1-flash-preview'}
                  onChange={(e) => {
                    localStorage.setItem('gemini_model', e.target.value);
                    setShowMenu(false);
                    setTimeout(() => setShowMenu(true), 10);
                  }}
                >
                  <option value="gemini-3.1-flash-preview">gemini-3.1-flash-preview</option>
                  <option value="gemini-3-flash-preview">gemini-3-flash-preview</option>
                  <option value="gemini-2.5-flash">gemini-2.5-flash</option>
                  <option value="gemini-2.5-pro">gemini-2.5-pro</option>
                  <option value="gemini-2.0-flash">gemini-2.0-flash</option>
                  <option value="gemini-2.0-pro-exp">gemini-2.0-pro-exp</option>
                </select>
              </div>

              <div style={{ padding: '8px 20px', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--sys-color-outline-variant)' }}>
                <a 
                  href="http://who/heikomaiwand" 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ 
                    textDecoration: 'none',
                    color: 'var(--sys-color-outline-variant)'
                  }}
                  onMouseEnter={(e) => {
                    const sp = e.currentTarget.querySelector('span');
                    if (sp) sp.style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    const sp = e.currentTarget.querySelector('span');
                    if (sp) sp.style.textDecoration = 'none';
                  }}
                >
                  <span style={{ 
                    fontSize: '11px', 
                    fontWeight: 400
                  }}>
                    Heiko Maiwand
                  </span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Clean Confirmation Modal */}
      {showConfirmModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            backgroundColor: 'var(--sys-color-surface)',
            padding: '24px',
            borderRadius: '16px',
            width: '360px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
            border: '1px solid var(--sys-color-outline-variant)'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '12px', color: 'var(--sys-color-on-surface)', fontSize: '18px', fontWeight: 500 }}>
              Clear API Key?
            </h3>
            <p style={{ color: 'var(--sys-color-on-surface-variant)', fontSize: '14px', marginBottom: '24px', lineHeight: '1.5' }}>
              Are you sure you want to remove your Gemini API key from this browser? You will need to re-enter a valid key to run live simulations.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button 
                className="btn btn-text" 
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleConfirmClear}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
